#!/bin/bash

echo "================================"
echo "E-commerce 全栈应用启动脚本"
echo "================================"
echo

echo "正在检查依赖..."
if [ ! -d "node_modules" ]; then
    echo "安装根目录依赖..."
    npm install
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "安装前端依赖..."
    cd frontend
    npm install
    cd ..
fi

if [ ! -d "backend/node_modules" ]; then
    echo "安装后端依赖..."
    cd backend
    npm install
    cd ..
fi

if [ ! -d "admin/node_modules" ]; then
    echo "安装管理面板依赖..."
    cd admin
    npm install
    cd ..
fi

echo
echo "依赖检查完成！"
echo
echo "启动应用服务..."
echo "- 后端服务: http://localhost:4000"
echo "- 前端应用: http://localhost:5173"
echo "- 管理面板: http://localhost:5174"
echo
echo "按 Ctrl+C 停止所有服务"
echo

npm run dev
