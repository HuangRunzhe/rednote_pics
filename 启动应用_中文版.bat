@echo off
:: 设置代码页为UTF-8
chcp 65001 > nul
:: 设置控制台字体为支持中文的字体
reg add "HKEY_CURRENT_USER\Console\%cd:~0,2%" /v "FaceName" /t REG_DWORD /d 0 /f > nul
reg add "HKEY_CURRENT_USER\Console\%cd:~0,2%" /v "FontFamily" /t REG_DWORD /d 0x36 /f > nul
reg add "HKEY_CURRENT_USER\Console\%cd:~0,2%" /v "FontSize" /t REG_DWORD /d 0x00140000 /f > nul

title 小红书笔记出图应用启动器

echo.
echo ========================================
echo    小红书笔记出图应用启动器
echo ========================================
echo.

:: 检查Python是否安装
python --version > nul 2>&1
if errorlevel 1 (
    echo ❌ 错误：未检测到Python，请先安装Python 3.7+
    echo 下载地址：https://www.python.org/downloads/
    pause
    exit /b 1
)

:: 检查Node.js是否安装
node --version > nul 2>&1
if errorlevel 1 (
    echo ❌ 错误：未检测到Node.js，请先安装Node.js
    echo 下载地址：https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ 环境检查通过
echo.

:: 安装Python依赖
echo 📦 正在安装Python依赖...
pip install -r requirements.txt
if errorlevel 1 (
    echo ❌ Python依赖安装失败
    pause
    exit /b 1
)
echo ✅ Python依赖安装完成
echo.

:: 启动后端服务
echo 🚀 正在启动后端服务...
start "后端服务" cmd /k "cd backend && python main.py"
echo ✅ 后端服务已启动 (端口: 8000)
echo.

:: 等待后端启动
echo ⏳ 等待后端服务启动...
timeout /t 5 /nobreak > nul

:: 测试后端连接
echo 🔍 测试后端连接...
python test_api.py
if errorlevel 1 (
    echo ⚠️  后端连接测试失败，但继续启动前端...
    echo.
)

:: 安装前端依赖
echo 📦 正在安装前端依赖...
cd frontend
npm install
if errorlevel 1 (
    echo ❌ 前端依赖安装失败
    pause
    exit /b 1
)
echo ✅ 前端依赖安装完成
echo.

:: 启动前端服务
echo 🚀 正在启动前端服务...
start "前端服务" cmd /k "npm start"
echo ✅ 前端服务已启动 (端口: 3000)
echo.

:: 等待前端启动
echo ⏳ 等待前端服务启动...
timeout /t 10 /nobreak > nul

echo.
echo ========================================
echo            🎉 启动完成！
echo ========================================
echo.
echo 📱 前端地址: http://localhost:3000
echo 🔧 后端地址: http://localhost:8000
echo.
echo 💡 使用提示：
echo    1. 在文本框中输入内容
echo    2. 点击"生成笔记"按钮
echo    3. 查看生成的笔记卡片
echo    4. 点击"保存图片"下载
echo.
echo ⚠️  注意事项：
echo    - 确保网络连接正常
echo    - 首次使用可能需要等待依赖下载
echo    - 如遇问题请检查控制台错误信息
echo.
echo 按任意键退出启动器...
pause > nul 