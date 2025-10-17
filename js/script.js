// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    
    // 导航栏功能
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 移动端菜单切换
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // 导航链接点击效果
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 移除所有活动状态
            navLinks.forEach(l => l.classList.remove('active'));
            // 添加当前活动状态
            this.classList.add('active');
            
            // 如果是移动端，关闭菜单
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
    
    // 搜索功能
    const searchInput = document.querySelector('.search-input');
    const toolItems = document.querySelectorAll('.tool-item');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            toolItems.forEach(item => {
                const toolName = item.querySelector('.tool-name').textContent.toLowerCase();
                const toolDesc = item.querySelector('.tool-desc').textContent.toLowerCase();
                const toolCategory = item.closest('.tool-category');
                
                if (toolName.includes(searchTerm) || toolDesc.includes(searchTerm)) {
                    item.style.display = 'flex';
                    toolCategory.style.display = 'block';
                } else {
                    item.style.display = 'none';
                    
                    // 检查分类下是否还有可见的工具
                    const visibleTools = toolCategory.querySelectorAll('.tool-item[style*="flex"]');
                    if (visibleTools.length === 0 && searchTerm !== '') {
                        toolCategory.style.display = 'none';
                    } else if (searchTerm === '') {
                        toolCategory.style.display = 'block';
                        item.style.display = 'flex';
                    }
                }
            });
            
            // 如果没有搜索结果，显示提示
            const visibleCategories = document.querySelectorAll('.tool-category[style*="block"], .tool-category:not([style*="none"])');
            if (visibleCategories.length === 0 && searchTerm !== '') {
                showNoResults();
            } else {
                hideNoResults();
            }
        });
    }
    
    // 显示无搜索结果提示
    function showNoResults() {
        let noResults = document.querySelector('.no-results');
        if (!noResults) {
            noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: #6b7280;">
                    <h3>🔍 没有找到相关工具</h3>
                    <p>请尝试其他关键词或浏览所有工具分类</p>
                </div>
            `;
            document.querySelector('.tools-grid').appendChild(noResults);
        }
        noResults.style.display = 'block';
    }
    
    // 隐藏无搜索结果提示
    function hideNoResults() {
        const noResults = document.querySelector('.no-results');
        if (noResults) {
            noResults.style.display = 'none';
        }
    }
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 滚动时导航栏效果
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 向下滚动，隐藏导航栏
            header.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动，显示导航栏
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // 工具项点击统计（可选）
    toolItems.forEach(item => {
        item.addEventListener('click', function() {
            const toolName = this.querySelector('.tool-name').textContent;
            console.log(`工具被点击: ${toolName}`);
            
            // 这里可以添加统计代码，比如发送到分析服务
            // trackToolClick(toolName);
        });
    });
    
    // 键盘快捷键
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K 聚焦搜索框
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // ESC 清空搜索
        if (e.key === 'Escape') {
            if (searchInput && document.activeElement === searchInput) {
                searchInput.value = '';
                searchInput.dispatchEvent(new Event('input'));
                searchInput.blur();
            }
        }
    });
    
    // 添加搜索框快捷键提示
    if (searchInput) {
        searchInput.placeholder = '搜索工具... (Ctrl+K)';
    }
    
    // 懒加载动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察所有工具分类
    document.querySelectorAll('.tool-category').forEach(category => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
        category.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(category);
    });
    
    // 影视模块功能
    const subnavTabs = document.querySelectorAll('.subnav-tab');
    const movieContents = document.querySelectorAll('.movie-content');
    
    subnavTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // 移除所有活动状态
            subnavTabs.forEach(t => t.classList.remove('active'));
            movieContents.forEach(c => c.classList.remove('active'));
            
            // 添加当前活动状态
            this.classList.add('active');
            document.getElementById(targetTab + '-content').classList.add('active');
        });
    });
    
    // 影视项目点击处理
    const movieItems = document.querySelectorAll('.movie-item');
    movieItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // 这里可以添加具体的链接跳转逻辑
            // 目前链接都是 #，可以根据需要替换为实际链接
            console.log('影视项目被点击:', this.querySelector('.movie-title').textContent);
        });
    });

    // 页面加载完成后的初始化
    setTimeout(() => {
        // 添加页面加载完成的类
        document.body.classList.add('loaded');
        
        // 显示欢迎消息（可选）
        console.log('🔧 BIN工具箱已加载完成！');
    }, 500);
    
    // 错误处理
    window.addEventListener('error', function(e) {
        console.error('页面错误:', e.error);
    });
    
    // 性能监控（可选）
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log(`页面加载时间: ${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`);
            }, 0);
        });
    }
});

// 工具点击统计函数（示例）
function trackToolClick(toolName) {
    // 这里可以集成Google Analytics或其他统计服务
    if (typeof gtag !== 'undefined') {
        gtag('event', 'tool_click', {
            'tool_name': toolName
        });
    }
    
    // 或者发送到自定义统计接口
    /*
    fetch('/api/track', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            action: 'tool_click',
            tool: toolName,
            timestamp: new Date().toISOString()
        })
    }).catch(err => console.log('统计发送失败:', err));
    */
}

// 主题切换功能（可选扩展）
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark-theme');
    
    if (isDark) {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    }
}

// 加载保存的主题
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

    // 页面加载时应用保存的主题
document.addEventListener('DOMContentLoaded', loadTheme);
