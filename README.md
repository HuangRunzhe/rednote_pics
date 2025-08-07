# 小红书笔记出图应用

一个基于React前端和Python后端的AI笔记生成应用，可以将用户输入的文本转换为精美的小红书风格笔记卡片。

## 功能特点

- 文本输入和AI处理
- 生成3:4比例的精美笔记卡片
- 支持截图保存
- 响应式设计

## 技术栈

- 前端：React + TypeScript + Tailwind CSS
- 后端：Python + FastAPI + OpenAI API
- 图片生成：HTML/CSS渲染

## 项目结构

```
rednote/
├── frontend/          # React前端
├── backend/           # Python后端
├── README.md         # 项目说明
└── requirements.txt  # Python依赖
```

## 快速开始

### 方法一：使用启动脚本（推荐）

#### 英文版启动脚本（解决中文乱码问题）
```bash
双击运行 启动应用.bat
```

#### 中文版启动脚本（需要支持中文的终端）
```bash
双击运行 启动应用_中文版.bat
```

#### PowerShell启动脚本（推荐，更好的中文支持）
```powershell
右键点击 启动应用.ps1，选择"使用PowerShell运行"
```

### 方法二：手动启动

1. 安装后端依赖：
```bash
pip install -r requirements.txt
```

2. 启动后端服务：
```bash
cd backend
python main.py
```

3. 启动前端服务：
```bash
cd frontend
npm install
npm start
```

4. 访问应用：http://localhost:3000 