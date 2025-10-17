# 部署指南

## 🚀 GitHub Pages 部署

### 方法一：通过GitHub网页界面

1. **创建新仓库**
   - 访问 [GitHub](https://github.com)
   - 点击右上角的 "+" 号，选择 "New repository"
   - 仓库名称建议使用英文，如 `bin-toolbox` 或 `toolbox-website`
   - 设置为 Public（公开）
   - 勾选 "Add a README file"

2. **上传文件**
   - 在仓库页面点击 "uploading an existing file"
   - 将项目文件夹中的所有文件拖拽到上传区域
   - 填写提交信息，如 "Initial commit"
   - 点击 "Commit changes"

3. **启用GitHub Pages**
   - 进入仓库的 "Settings" 页面
   - 滚动到 "Pages" 部分
   - 在 "Source" 下选择 "Deploy from a branch"
   - 选择 "main" 分支和 "/ (root)" 文件夹
   - 点击 "Save"

4. **访问网站**
   - 等待几分钟后，访问 `https://yourusername.github.io/仓库名/`

### 方法二：通过Git命令行

1. **初始化Git仓库**
```bash
cd BIN工具箱网站
git init
git add .
git commit -m "Initial commit"
```

2. **连接到GitHub仓库**
```bash
git remote add origin https://github.com/yourusername/your-repo-name.git
git branch -M main
git push -u origin main
```

3. **启用GitHub Pages**
   - 按照方法一的步骤3-4操作

## 🌐 其他部署平台

### Vercel 部署

1. 访问 [Vercel](https://vercel.com)
2. 使用GitHub账号登录
3. 点击 "New Project"
4. 导入你的GitHub仓库
5. 点击 "Deploy"

### Netlify 部署

1. 访问 [Netlify](https://netlify.com)
2. 使用GitHub账号登录
3. 点击 "New site from Git"
4. 选择你的GitHub仓库
5. 点击 "Deploy site"

### 自托管服务器

1. **Apache服务器**
   - 将文件上传到服务器的 `public_html` 目录
   - 确保 `index.html` 在根目录

2. **Nginx服务器**
   - 配置Nginx指向项目目录
   - 确保正确处理静态文件

## 🔧 自定义域名

### GitHub Pages 自定义域名

1. 在项目根目录创建 `CNAME` 文件
2. 在文件中写入你的域名，如：`toolbox.yourdomain.com`
3. 在域名提供商处添加CNAME记录指向GitHub Pages

### 其他平台自定义域名

- **Vercel**: 在项目设置中添加域名
- **Netlify**: 在站点设置中添加自定义域名

## 📊 性能优化

### 启用压缩

在服务器配置中启用Gzip压缩：

```apache
# Apache .htaccess
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>
```

```nginx
# Nginx
gzip on;
gzip_types text/html text/plain text/xml text/css text/javascript application/javascript application/json;
```

### 缓存设置

```apache
# Apache .htaccess
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
```

## 🛡️ 安全设置

### HTTPS

- 确保使用HTTPS协议
- 大多数现代部署平台都默认提供HTTPS

### 内容安全策略

在HTML的 `<head>` 中添加：

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">
```

## 📈 监控和分析

### Google Analytics

在 `index.html` 的 `<head>` 中添加：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### 其他监控工具

- **百度统计**
- **友盟统计**
- **51.la统计**

## 🔄 自动部署

### GitHub Actions

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

## ❗ 常见问题

### 1. 页面显示空白
- 检查文件路径是否正确
- 确保所有CSS和JS文件都已上传

### 2. 样式不生效
- 检查CSS文件路径
- 清除浏览器缓存

### 3. 图片不显示
- 检查图片文件是否已上传
- 确保图片路径正确

### 4. GitHub Pages 不更新
- 等待5-10分钟
- 检查仓库设置中的Pages配置
- 清除浏览器缓存

## 📞 技术支持

如果遇到部署问题，可以：

1. 查看平台的官方文档
2. 在GitHub Issues中提问
3. 联系技术支持
