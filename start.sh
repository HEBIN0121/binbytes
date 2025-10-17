#!/bin/bash

echo "🔧 BIN工具箱网站启动脚本"
echo "=========================="

# 检查Python是否可用
if command -v python3 &> /dev/null; then
    echo "🚀 使用Python3启动本地服务器..."
    echo "📱 请在浏览器中访问: http://localhost:8000"
    echo "⏹️  按 Ctrl+C 停止服务器"
    echo ""
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "🚀 使用Python2启动本地服务器..."
    echo "📱 请在浏览器中访问: http://localhost:8000"
    echo "⏹️  按 Ctrl+C 停止服务器"
    echo ""
    python -m SimpleHTTPServer 8000
elif command -v php &> /dev/null; then
    echo "🚀 使用PHP启动本地服务器..."
    echo "📱 请在浏览器中访问: http://localhost:8000"
    echo "⏹️  按 Ctrl+C 停止服务器"
    echo ""
    php -S localhost:8000
elif command -v node &> /dev/null; then
    echo "🚀 使用Node.js启动本地服务器..."
    echo "📱 请在浏览器中访问: http://localhost:8000"
    echo "⏹️  按 Ctrl+C 停止服务器"
    echo ""
    npx serve . -p 8000
else
    echo "❌ 未找到可用的服务器程序"
    echo "💡 请安装Python、PHP或Node.js，或者直接在浏览器中打开index.html文件"
    echo ""
    echo "🔧 直接打开文件方式："
    echo "   在浏览器中打开: $(pwd)/index.html"
fi
