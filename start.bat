@echo off
echo 启动小红书笔记出图应用...

echo.
echo 1. 安装Python依赖...
pip install -r requirements.txt

echo.
echo 2. 启动后端服务...
start "后端服务" cmd /k "cd backend && python main.py"

echo.
echo 3. 等待后端启动...
timeout /t 3 /nobreak > nul

echo.
echo 4. 安装前端依赖...
cd frontend
npm install

echo.
echo 5. 启动前端服务...
start "前端服务" cmd /k "npm start"

echo.
echo 应用启动完成！
echo 前端地址: http://localhost:3000
echo 后端地址: http://localhost:8000
echo.
echo 按任意键退出...
pause > nul 