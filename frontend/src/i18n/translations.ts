export const translations = {
  zh: {
    // 页面标题和头部
    title: "小红书笔记出图",
    subtitle: "AI智能拆分长文本，一键生成精美笔记卡片",
    
    // 输入区域
    inputHeader: "📝 输入你的长文本",
    inputDescription: "文章、演讲稿、学习笔记、生活感悟...AI会智能拆分所有内容，长文本会自动拆分成多张卡片",
    inputPlaceholder: "在这里输入你的长文本内容，比如：文章、演讲稿、学习笔记、生活感悟等。AI会智能拆分并自动生成多张精美卡片！",
    generateButton: "🚀 生成笔记卡片",
    
    // 加载状态
    generating: "正在生成中...",
    generatingDescription: "AI正在智能拆分你的内容，请稍候",
    
    // 成功消息
    successTitle: "✨ 生成成功！",
    successDescription: "已为你生成 {count} 张精美笔记卡片",
    
    // 错误消息
    errorTitle: "请输入文本内容",
    errorDescription: "请检查网络连接或稍后重试",
    
    // 下载按钮
    downloadSingle: "📱 保存单张",
    downloadAll: "📦 保存全部",
    
    // 提示区域
    tipsTitle: "💡 使用提示",
    tipsDescription: "让AI帮你把长文本变成精美的小红书笔记",
    tipsToggle: "💡 使用提示",
    tipsToggleClose: "收起提示",
    tipsStepsTitle: "🎯 使用步骤",
    tipsExamplesTitle: "📝 输入示例",
    tipsTipsTitle: "🚀 小贴士",
    
    tips: [
      {
        icon: "💡",
        title: "输入你的长文本",
        content: "可以是你的文章、演讲稿、学习笔记、生活感悟...任何你想分享的长文本内容！"
      },
      {
        icon: "✂️",
        title: "智能拆分",
        content: "AI会智能分析你的长文本，根据内容长度自动拆分成多张精美笔记卡片，确保不遗漏任何信息"
      },
      {
        icon: "📱",
        title: "批量保存",
        content: "可以单独保存每张图片，也可以一键保存全部图片，直接发小红书"
      },
      {
        icon: "🎨",
        title: "小红书风格",
        content: "每张卡片都是3:4比例，符合小红书推荐尺寸，让你的内容更吸引眼球"
      }
    ],
    
    tipsList: [
      "✨ 输入内容越长，生成的笔记卡片越多",
      "🎨 每张卡片都会自动添加合适的标题和标签",
      "📱 可以单独保存每张图片，也可以批量保存全部",
      "🔄 可以多次生成，直到满意为止",
      "📝 适合长文章、演讲稿、学习笔记等内容",
      "💡 AI会智能拆分并完整保留所有内容，不会遗漏任何信息"
    ],
    
    examples: [
      "今天我想分享一下我的学习心得。最近在学习React开发，发现了很多有趣的知识点。首先，React的组件化思想让我对前端开发有了新的认识。每个组件都是独立的，可以复用，这让代码更加清晰。其次，JSX语法虽然一开始有点不习惯，但用久了发现真的很方便。最后，React的状态管理也很重要，useState和useEffect这两个Hook是基础中的基础。总的来说，React是一个很强大的框架，值得深入学习。",
      "分享一下我的护肤心得。作为一个敏感肌，我试过很多护肤品，终于找到了适合自己的搭配。首先是清洁，我推荐氨基酸洗面奶，温和不刺激。然后是爽肤水，我用的是一款含有神经酰胺的产品，可以修复皮肤屏障。精华液我选择含有维生素C的，可以提亮肤色。面霜很重要，我用的是一款保湿面霜，含有玻尿酸成分。最后是防晒，每天都要涂，我用的是一款物理防晒，不会过敏。这套护肤流程坚持了三个月，皮肤状态明显改善。",
      "刚读完《活着》这本书，感触很深。这本书讲述了福贵的人生，从地主少爷到穷困潦倒，再到最后的平静。书中最让我印象深刻的是福贵面对苦难时的态度，他没有放弃，而是选择活着。作者余华用朴实的语言描述了人生的无常，但同时也展现了生命的韧性。这本书让我明白，活着本身就是一种幸福，无论遇到什么困难，都要珍惜生命。推荐给所有想要思考人生意义的朋友。"
    ],
    
    // 页脚
    footerDescription: "✨ 让AI帮你拆分长文本，让分享更简单 ✨",
    footerLinks: [
      "💡 智能拆分",
      "📱 批量保存",
      "🎨 精美设计"
    ],
    
    // 语言切换
    languageSwitch: "语言切换",
    currentLanguage: "当前语言",
    
    // 其他文本
    free: "免费使用",
    fast: "快速生成",
    clear: "清空",
    shareBeautifulLife: "分享美好生活",
    watermark: "小红书笔记出图",
    regenerate: "重新生成"
  },
  
  en: {
    // Page title and header
    title: "Red Note Generator",
    subtitle: "AI intelligently splits long text and generates beautiful note cards with one click",
    
    // Input area
    inputHeader: "📝 Enter your long text",
    inputDescription: "Articles, speeches, study notes, life insights...AI intelligently splits all content, long text will be automatically split into multiple cards",
    inputPlaceholder: "Enter your long text content here, such as: articles, speeches, study notes, life insights, etc. AI will intelligently split and automatically generate multiple beautiful cards!",
    generateButton: "🚀 Generate Note Cards",
    
    // Loading state
    generating: "Generating...",
    generatingDescription: "AI is intelligently splitting your content, please wait",
    
    // Success message
    successTitle: "✨ Generated successfully!",
    successDescription: "Generated {count} beautiful note cards for you",
    
    // Error message
    errorTitle: "Please enter text content",
    errorDescription: "Please check your network connection or try again later",
    
    // Download buttons
    downloadSingle: "📱 Save Single",
    downloadAll: "📦 Save All",
    
    // Tips area
    tipsTitle: "💡 Usage Tips",
    tipsDescription: "Let AI help you turn long text into beautiful Red notes",
    tipsToggle: "💡 Usage Tips",
    tipsToggleClose: "Hide Tips",
    tipsStepsTitle: "🎯 Usage Steps",
    tipsExamplesTitle: "📝 Input Examples",
    tipsTipsTitle: "🚀 Tips",
    
    tips: [
      {
        icon: "💡",
        title: "Enter your long text",
        content: "Can be your articles, speeches, study notes, life insights... any long text content you want to share!"
      },
      {
        icon: "✂️",
        title: "Intelligent splitting",
        content: "AI intelligently analyzes your long text and automatically splits it into multiple beautiful note cards based on content length, ensuring no information is missed"
      },
      {
        icon: "📱",
        title: "Batch save",
        content: "You can save each image individually or save all images at once, ready to post on Red"
      },
      {
        icon: "🎨",
        title: "Red style",
        content: "Each card has a 3:4 ratio, meeting Red's recommended dimensions, making your content more eye-catching"
      }
    ],
    
    tipsList: [
      "✨ The longer the input content, the more note cards will be generated",
      "🎨 Each card will automatically have appropriate titles and tags added",
      "📱 You can save each image individually or batch save all",
      "🔄 You can generate multiple times until you're satisfied",
      "📝 Suitable for long articles, speeches, study notes and other content",
      "💡 AI intelligently splits and completely preserves all content without missing any information"
    ],
    
    examples: [
      "Today I want to share my learning experience. Recently I've been learning React development and discovered many interesting concepts. First, React's component-based thinking gave me a new understanding of frontend development. Each component is independent and reusable, making the code clearer. Second, JSX syntax was a bit unfamiliar at first, but after using it for a while, I found it really convenient. Finally, React's state management is also important, useState and useEffect are the foundation of foundations. Overall, React is a very powerful framework worth in-depth study.",
      "Let me share my skincare routine. As someone with sensitive skin, I've tried many skincare products and finally found a combination that works for me. First is cleansing - I recommend amino acid cleanser, gentle and non-irritating. Then toner - I use a product containing ceramides that can repair the skin barrier. For serum, I choose one with vitamin C to brighten the complexion. Moisturizer is important - I use a hydrating cream with hyaluronic acid. Finally, sunscreen - apply daily, I use a physical sunscreen that doesn't cause allergies. I've been following this skincare routine for three months and my skin condition has improved significantly.",
      "Just finished reading 'To Live' and I'm deeply moved. This book tells the story of Fugui's life, from being a landlord's son to poverty, to eventual peace. What impressed me most was Fugui's attitude when facing hardships - he didn't give up, but chose to live. Author Yu Hua uses simple language to describe life's impermanence, but also shows life's resilience. This book made me understand that living itself is a kind of happiness, no matter what difficulties you encounter, cherish life. Recommended to all friends who want to think about the meaning of life."
    ],
    
    // Footer
    footerDescription: "✨ Let AI help you split long text and make sharing easier ✨",
    footerLinks: [
      "💡 Intelligent splitting",
      "📱 Batch save",
      "🎨 Beautiful design"
    ],
    
    // Language switch
    languageSwitch: "Language",
    currentLanguage: "Current language",
    
    // Other text
    free: "Free",
    fast: "Fast",
    clear: "Clear",
    shareBeautifulLife: "Share Beautiful Life",
    watermark: "Red Note Generator",
    regenerate: "Regenerate"
  }
};

export type Language = 'zh' | 'en'; 