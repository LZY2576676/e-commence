@echo off
echo ================================
echo E-commerce 全栈应用启动脚本
echo ================================
echo.

echo 正在检查依赖...
if not exist "node_modules" (
    echo 安装根目录依赖...
    npm install
)

if not exist "frontend/node_modules" (
    echo 安装前端依赖...
    cd frontend
    npm install
    cd ..
)

if not exist "backend/node_modules" (
    echo 安装后端依赖...
    cd backend
    npm install
    cd ..
)

if not exist "admin/node_modules" (
    echo 安装管理面板依赖...
    cd admin
    npm install
    cd ..
)

echo.
echo 依赖检查完成！
echo.
echo 启动应用服务...
echo - 后端服务: http://localhost:4000
echo - 前端应用: http://localhost:5173
echo - 管理面板: http://localhost:5174
echo.
echo 按 Ctrl+C 停止所有服务
echo.

npm run dev
