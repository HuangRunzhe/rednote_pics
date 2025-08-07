from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from openai import OpenAI
import json
import os
from typing import List, Dict, Any

app = FastAPI(title="小红书笔记出图API", version="1.0.0")

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# OpenAI客户端配置
client = OpenAI(
    base_url='https://tbnx.plus7.plus/v1',
    api_key='sk-vkpkb8mYASM5YDWzaZCobiB0T7KcSdfpyxo0WNwUJvEfDDs9'
)

class NoteRequest(BaseModel):
    text: str
    style: str = "小红书风格"

class NoteItem(BaseModel):
    title: str
    content: List[str]
    tags: List[str]
    style: str

class NoteResponse(BaseModel):
    notes: List[NoteItem]
    total_notes: int
    summary: str

@app.get("/")
async def root():
    return {"message": "小红书笔记出图API服务运行中"}

@app.post("/api/generate-note", response_model=NoteResponse)
async def generate_note(request: NoteRequest):
    try:
        # 构建AI提示词
        system_prompt = """你是一个专业的小红书笔记创作者。请根据用户输入的长文本，将其智能拆分成多个精美的小红书笔记卡片。

强制要求：
1. 必须将用户的所有内容都包含在笔记中，不能省略或截断
2. 必须拆分成多张卡片，不能只生成一张
3. 每张卡片内容要完整，逻辑清晰
4. 确保所有原始内容都被保留和展示

每个笔记卡片应该：
1. 有吸引人的标题（10-15字）
2. 包含4-6个要点内容（每个要点25-50字，确保内容完整）
3. 有3-5个相关标签（#标签格式）
4. 保持小红书风格：亲切、实用、有感染力
5. 内容连贯，逻辑清晰

智能拆分原则：
- 如果内容很长（超过400字），必须拆分成至少3张卡片
- 如果内容中等（200-400字），必须拆分成至少2张卡片
- 如果内容较短（少于200字），可以拆分成1-2张卡片
- 每张卡片的内容要相对均衡，不要一张卡片内容过多
- 必须确保所有原始内容都被包含，不能遗漏

重要：你必须严格按照以下JSON格式返回，必须包含多个notes，不能只返回一张卡片。不要添加任何其他文字，不要使用markdown格式，只返回纯JSON：

{
    "notes": [
        {
            "title": "第一个笔记标题",
            "content": ["完整的要点1内容", "完整的要点2内容", "完整的要点3内容", "完整的要点4内容"],
            "tags": ["#标签1", "#标签2", "#标签3"],
            "style": "小红书风格"
        },
        {
            "title": "第二个笔记标题", 
            "content": ["完整的要点1内容", "完整的要点2内容", "完整的要点3内容", "完整的要点4内容"],
            "tags": ["#标签1", "#标签2", "#标签3"],
            "style": "小红书风格"
        }
    ],
    "total_notes": 2,
    "summary": "整体内容概述"
}"""

        user_prompt = f"""请将以下长文本内容智能拆分成多个小红书笔记卡片，确保所有内容都被完整保留：

{request.text}

智能拆分要求：
1. 所有原始内容都要包含在笔记中，不能遗漏任何信息
2. 必须拆分成多张卡片，不能只生成一张
3. 每张卡片内容完整，不要省略或截断
4. 保持内容的逻辑性和连贯性
5. 确保所有文字内容都被包含在生成的笔记中
6. 如果内容很长（超过400字），必须拆分成至少3张卡片
7. 如果内容中等（200-400字），必须拆分成至少2张卡片
8. 根据文本长度自动调整拆分数量

请严格按照JSON格式返回，不要添加任何其他文字，不要使用markdown格式。"""

        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            stream=False
        )

        # 解析AI返回的内容
        ai_response = response.choices[0].message.content
        print(f"AI返回的原始内容: {ai_response}")
        
        # 尝试解析JSON
        try:
            # 清理AI返回的内容，移除可能的markdown标记
            cleaned_response = ai_response.strip()
            if cleaned_response.startswith('```json'):
                cleaned_response = cleaned_response[7:]
            if cleaned_response.endswith('```'):
                cleaned_response = cleaned_response[:-3]
            cleaned_response = cleaned_response.strip()
            
            # 如果返回的是JSON格式
            note_data = json.loads(cleaned_response)
            
            # 验证数据结构
            if "notes" not in note_data:
                # 如果是旧格式，转换为新格式
                note_data = {
                    "notes": [note_data],
                    "total_notes": 1,
                    "summary": f"关于{request.text[:20]}的分享"
                }
            
            # 智能拆分逻辑：根据文本长度自动拆分
            text_length = len(request.text)
            print(f"文本长度: {text_length}")
            print(f"AI返回的笔记数量: {len(note_data['notes'])}")
            
            # 如果只有一张卡片，根据文本长度强制拆分
            if len(note_data["notes"]) == 1:
                # 根据文本长度决定拆分数量
                if text_length > 800:
                    split_count = 5
                elif text_length > 600:
                    split_count = 4
                elif text_length > 400:
                    split_count = 3
                elif text_length > 200:
                    split_count = 2
                else:
                    split_count = 1
                
                if split_count > 1:
                    # 智能拆分文本内容
                    original_note = note_data["notes"][0]
                    original_content = original_note.get("content", [])
                    
                    # 将原始文本按句子分割
                    sentences = request.text.split('。')
                    sentences = [s.strip() for s in sentences if s.strip()]
                    
                    # 计算每张卡片应该包含的句子数量
                    sentences_per_card = max(1, len(sentences) // split_count)
                    
                    # 创建多个笔记卡片
                    new_notes = []
                    for i in range(split_count):
                        start_idx = i * sentences_per_card
                        end_idx = min((i + 1) * sentences_per_card, len(sentences))
                        
                        if i == split_count - 1:  # 最后一张卡片包含剩余所有句子
                            end_idx = len(sentences)
                        
                        card_sentences = sentences[start_idx:end_idx]
                        
                        # 构建卡片内容
                        card_content = []
                        for j, sentence in enumerate(card_sentences):
                            if j < 5:  # 每张卡片最多5个要点，提高信息密度
                                card_content.append(f"✨ {sentence}")
                        
                        # 如果内容不够，添加默认内容
                        while len(card_content) < 3:
                            card_content.append(f"💡 这是第{i+1}部分的重要内容")
                        
                        new_note = {
                            "title": f"{original_note['title']} (第{i+1}部分)",
                            "content": card_content,
                            "tags": original_note.get("tags", ["#分享", "#生活", "#笔记"]),
                            "style": "小红书风格"
                        }
                        new_notes.append(new_note)
                    
                    note_data = {
                        "notes": new_notes,
                        "total_notes": split_count,
                        "summary": f"已将长文本智能拆分成{split_count}张精美笔记卡片"
                    }
                
        except json.JSONDecodeError:
            # 如果不是JSON格式，手动构建
            note_data = {
                "notes": [
                    {
                        "title": f"关于{request.text[:10]}的分享",
                        "content": [
                            f"✨ {request.text[:25]}...",
                            "💡 这是一个很有价值的内容",
                            "🌟 值得分享给大家",
                            "📝 更多精彩内容等你发现"
                        ],
                        "tags": ["#分享", "#生活", "#笔记"],
                        "style": "小红书风格"
                    }
                ],
                "total_notes": 1,
                "summary": f"关于{request.text[:20]}的分享"
            }

        return NoteResponse(**note_data)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"生成笔记失败: {str(e)}")

@app.get("/api/note-template", response_class=HTMLResponse)
async def get_note_template():
    """返回笔记模板HTML"""
    template = """
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>小红书笔记模板</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                padding: 20px;
            }
            
             .note-card {
                 width: 360px;
                 height: 480px;
                 background: white;
                 border-radius: 16px;
                 box-shadow: 0 8px 32px rgba(0,0,0,0.12);
                 overflow: hidden;
                 position: relative;
                 border: 1px solid #f0f0f0;
             }
            
             .note-header {
                 background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                 color: white;
                 padding: 16px 20px;
                 text-align: left;
                 position: relative;
             }
            
             .note-title {
                 font-size: 16px;
                 font-weight: 600;
                 margin-bottom: 4px;
                 line-height: 1.3;
             }
            
                         .note-subtitle {
                 font-size: 11px;
                 opacity: 0.8;
                 font-weight: 400;
             }
            
             .note-content {
                 padding: 20px;
                 height: 320px;
                 overflow-y: auto;
                 background: #fafbfc;
             }
            
             .content-item {
                 background: white;
                 margin-bottom: 12px;
                 padding: 12px 16px;
                 border-radius: 8px;
                 border-left: 3px solid #667eea;
                 font-size: 13px;
                 line-height: 1.4;
                 color: #2c3e50;
                 box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                 position: relative;
             }
             
             .content-item:before {
                 content: "•";
                 color: #667eea;
                 font-weight: bold;
                 margin-right: 8px;
             }
            
             .note-footer {
                 position: absolute;
                 bottom: 0;
                 left: 0;
                 right: 0;
                 background: white;
                 padding: 12px 20px;
                 border-top: 1px solid #e9ecef;
             }
            
            .tags {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
            }
            
             .tag {
                 background: linear-gradient(135deg, #667eea, #764ba2);
                 color: white;
                 padding: 3px 10px;
                 border-radius: 12px;
                 font-size: 11px;
                 font-weight: 500;
                 box-shadow: 0 2px 4px rgba(102, 126, 234, 0.2);
             }
            
             .watermark {
                 position: absolute;
                 bottom: 8px;
                 right: 12px;
                 font-size: 9px;
                 color: #adb5bd;
                 opacity: 0.7;
                 font-weight: 400;
             }
        </style>
    </head>
    <body>
        <div class="note-card" id="noteCard">
            <div class="note-header">
                <div class="note-title" id="noteTitle">小红书笔记</div>
                <div class="note-subtitle">分享美好生活</div>
            </div>
            <div class="note-content" id="noteContent">
                <div class="content-item">✨ 这里将显示笔记内容</div>
                <div class="content-item">💡 每个要点都会单独显示</div>
                <div class="content-item">🌟 保持简洁明了</div>
            </div>
            <div class="note-footer">
                <div class="tags" id="noteTags">
                    <span class="tag">#分享</span>
                    <span class="tag">#生活</span>
                    <span class="tag">#笔记</span>
                </div>
            </div>
            <div class="watermark">小红书笔记出图</div>
        </div>
        
        <script>
            // 用于接收数据的函数
            function updateNote(data) {
                document.getElementById('noteTitle').textContent = data.title || '小红书笔记';
                
                const contentDiv = document.getElementById('noteContent');
                contentDiv.innerHTML = '';
                
                if (data.content && Array.isArray(data.content)) {
                    data.content.forEach(item => {
                        const itemDiv = document.createElement('div');
                        itemDiv.className = 'content-item';
                        itemDiv.textContent = item;
                        contentDiv.appendChild(itemDiv);
                    });
                }
                
                const tagsDiv = document.getElementById('noteTags');
                tagsDiv.innerHTML = '';
                
                if (data.tags && Array.isArray(data.tags)) {
                    data.tags.forEach(tag => {
                        const tagSpan = document.createElement('span');
                        tagSpan.className = 'tag';
                        tagSpan.textContent = tag;
                        tagsDiv.appendChild(tagSpan);
                    });
                }
            }
            
            // 监听来自父窗口的消息
            window.addEventListener('message', function(event) {
                if (event.data.type === 'UPDATE_NOTE') {
                    updateNote(event.data.note);
                }
            });
        </script>
    </body>
    </html>
    """
    return HTMLResponse(content=template)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 