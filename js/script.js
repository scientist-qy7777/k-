// 平滑滚动功能
function smoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 导航栏滚动效果
function navbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(26, 26, 46, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = '#1a1a2e';
            navbar.style.boxShadow = 'none';
        }
    });
}

// 卡片悬停效果增强
function cardHoverEffects() {
    const cards = document.querySelectorAll('.skill-card, .resource-card, .feature, .mission, .vision');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}



// 分类展开/收起功能
function categoryExpand() {
    const expandBtns = document.querySelectorAll('.expand-btn');
    
    expandBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const skillItems = this.closest('.category').querySelector('.skill-items');
            skillItems.classList.toggle('expanded');
            const isExpanded = skillItems.classList.contains('expanded');
            this.textContent = isExpanded ? '收起' : '展开';
            this.setAttribute('aria-expanded', isExpanded);
        });
    });
}

// 返回顶部按钮功能
function backToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// 数字计数器动画（如果需要）
// 当元素进入视口时，从0开始计数到目标值
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    // 如果没有计数器元素，直接返回
    if (counters.length === 0) {
        return;
    }
    
    let animated = false;
    
    function checkScroll() {
        if (!animated) {
            // 计算触发动画的视口位置
            const triggerBottom = window.innerHeight * 0.8;
            
            counters.forEach(counter => {
                const counterTop = counter.getBoundingClientRect().top;
                
                if (counterTop < triggerBottom) {
                    // 获取目标值
                    const target = parseInt(counter.getAttribute('data-target'));
                    if (isNaN(target)) return;
                    
                    let count = 0;
                    // 计算每次递增的值
                    const increment = target / 100;
                    
                    // 使用setInterval实现计数动画
                    const timer = setInterval(() => {
                        count += increment;
                        counter.textContent = Math.ceil(count);
                        
                        if (count >= target) {
                            counter.textContent = target;
                            clearInterval(timer);
                        }
                    }, 20);
                }
            });
            
            animated = true;
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // 初始检查
}

// 响应式导航栏
// 实现移动端菜单的展开和收起功能
function responsiveNavbar() {
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    
    // 点击汉堡菜单切换菜单状态
    menuToggle.addEventListener('click', function() {
        const isActive = menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isActive);
    });
    
    // 点击导航链接后自动关闭菜单
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// 主题切换功能
function themeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = themeToggle.querySelector('.sun');
    const moonIcon = themeToggle.querySelector('.moon');
    const html = document.documentElement;
    
    // 检查本地存储中的主题偏好
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    
    // 更新图标状态
    if (savedTheme === 'dark') {
        sunIcon.style.opacity = '0.5';
        moonIcon.style.opacity = '1';
    } else {
        sunIcon.style.opacity = '1';
        moonIcon.style.opacity = '0.5';
    }
    
    // 主题切换事件
    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        
        // 更新图标状态
        if (newTheme === 'dark') {
            sunIcon.style.opacity = '0.5';
            moonIcon.style.opacity = '1';
        } else {
            sunIcon.style.opacity = '1';
            moonIcon.style.opacity = '0.5';
        }
        
        // 存储主题偏好
        localStorage.setItem('theme', newTheme);
    });
}

// 技能卡片点击功能
function skillCardClick() {
    const skillCards = document.querySelectorAll('.skill-card');
    const modal = document.getElementById('skillModal');
    const closeBtn = document.querySelector('.close');
    const modalTitle = document.getElementById('modalTitle');
    const modalIdiom = document.getElementById('modalIdiom');
    const modalDescription = document.getElementById('modalDescription');
    const modalDetail = document.getElementById('modalDetail');
    
    // 技能卡片详细信息
    const skillDetails = {
        '阳线与阴线': {
            idiom: '阴阳交替',
            description: '了解基本的K线形态，判断市场趋势',
            detail: '阳线是指收盘价高于开盘价的K线，通常表示多头占优；阴线是指收盘价低于开盘价的K线，通常表示空头占优。通过观察阳线和阴线的数量、大小和组合，可以判断市场的整体趋势。'
        },
        '十字星': {
            idiom: '十字指路',
            description: '掌握十字星形态的含义和应用',
            detail: '十字星是指开盘价和收盘价相近，上下影线长度相近的K线形态。十字星通常表示多空双方势均力敌，市场处于平衡状态，是即将变盘的信号。'
        },
        '锤子线与上吊线': {
            idiom: '锤吊反转',
            description: '识别反转信号，把握买卖时机',
            detail: '锤子线是指下影线较长，实体较小且位于K线上方的K线形态，通常出现在下跌趋势末端，是底部反转信号；上吊线是指下影线较长，实体较小且位于K线上方的K线形态，通常出现在上涨趋势末端，是顶部反转信号。'
        },
        '吞没形态': {
            idiom: '吞没反转',
            description: '判断趋势反转的强烈信号',
            detail: '吞没形态是指后一根K线的实体完全覆盖前一根K线的实体。看涨吞没形态是指阳线吞没阴线，通常出现在下跌趋势末端；看跌吞没形态是指阴线吞没阳线，通常出现在上涨趋势末端。'
        },
        '早晨之星与黄昏之星': {
            idiom: '星象指引',
            description: '识别底部和顶部反转信号',
            detail: '早晨之星是由三根K线组成，第一根阴线，第二根十字星，第三根阳线，通常出现在下跌趋势末端，是底部反转信号；黄昏之星是由三根K线组成，第一根阳线，第二根十字星，第三根阴线，通常出现在上涨趋势末端，是顶部反转信号。'
        },
        '红三兵与黑三鸦': {
            idiom: '三兵列阵',
            description: '把握连续上涨或下跌的趋势',
            detail: '红三兵是指连续三根阳线，每根收盘价高于前一天，表明多头势力强大，后市看涨；黑三鸦是指连续三根阴线，每根收盘价低于前一天，表明空头势力强大，后市看跌。'
        },
        '移动平均线': {
            idiom: '均线趋势',
            description: '判断趋势方向和支撑阻力',
            detail: '移动平均线是将一定时期内的股价加以平均，然后连成一条线，用以观察股价变动趋势的一种技术指标。常用的有5日、10日、20日、30日、60日、120日和250日均线。当股价在均线之上，表明处于上升趋势；当股价在均线之下，表明处于下降趋势。'
        },
        'MACD指标': {
            idiom: 'MACD金叉',
            description: '识别买卖信号和趋势强度',
            detail: 'MACD（Moving Average Convergence Divergence）是一种趋势跟踪指标，由快线（DIF）、慢线（DEA）和柱状图（MACD）组成。当DIF上穿DEA时，形成金叉，是买入信号；当DIF下穿DEA时，形成死叉，是卖出信号。'
        },
        'RSI指标': {
            idiom: '超买超卖',
            description: '判断市场超买超卖状态',
            detail: 'RSI（Relative Strength Index）是一种动量指标，用于衡量市场的超买超卖状态。RSI值在0-100之间，通常以70作为超买界限，30作为超卖界限。当RSI超过70时，市场可能处于超买状态，可能会出现回调；当RSI低于30时，市场可能处于超卖状态，可能会出现反弹。'
        },
        '趋势线分析': {
            idiom: '趋势追踪',
            description: '绘制和利用趋势线进行交易',
            detail: '趋势线是连接价格波动的高点或低点的直线，用于判断市场趋势的方向和强度。上升趋势线是连接依次上升的低点，下降趋势线是连接依次下降的高点。当价格突破趋势线时，通常表示趋势可能发生变化。'
        },
        '支撑阻力位': {
            idiom: '支撑阻力',
            description: '识别关键价格水平',
            detail: '支撑位是指价格下跌时可能遇到支撑，从而止跌回升的价格水平；阻力位是指价格上涨时可能遇到阻力，从而回调下跌的价格水平。支撑位和阻力位可以通过历史价格低点和高点、移动平均线、趋势线等方法确定。'
        },
        '量价关系': {
            idiom: '量价配合',
            description: '通过成交量判断价格走势',
            detail: '量价关系是指成交量与价格之间的关系。通常情况下，价格上涨时成交量放大，表明上涨趋势强劲；价格下跌时成交量放大，表明下跌趋势强劲。如果价格上涨但成交量缩小，可能表明上涨趋势乏力；如果价格下跌但成交量缩小，可能表明下跌趋势乏力。'
        },
        '红三兵': {
            idiom: '红三兵',
            description: '连续三根阳线，每根收盘价高于前一天，表明多头势力强大，后市看涨',
            detail: '红三兵是一种强烈的看涨信号，由三根连续的阳线组成，每根阳线的收盘价都高于前一天的收盘价，且每根阳线的开盘价都在前一天阳线的实体范围内。红三兵通常出现在下跌趋势末端或上升趋势中，表明多头势力强大，后市看涨。'
        },
        '白三兵': {
            idiom: '白三兵',
            description: '与红三兵类似，连续三根阳线，形态上更加标准，是强烈的看涨信号',
            detail: '白三兵是红三兵的一种变体，形态上更加标准，三根阳线的长度和力度都比较均匀。白三兵通常出现在下跌趋势末端，是更加明确的底部反转信号，表明多头势力已经完全控制市场，后市看涨。'
        },
        '早晨之星': {
            idiom: '早晨之星',
            description: '由三根K线组成，第一根阴线，第二根十字星，第三根阳线，是底部反转信号',
            detail: '早晨之星是一种重要的底部反转信号，由三根K线组成：第一根是阴线，第二根是十字星或小实体K线，第三根是阳线。早晨之星通常出现在下跌趋势末端，表明市场已经见底，即将开始上涨。'
        },
        '黎明之星': {
            idiom: '黎明之星',
            description: '与早晨之星类似，是底部反转的重要信号，预示着黑暗即将过去，光明即将到来',
            detail: '黎明之星与早晨之星类似，也是一种底部反转信号，通常出现在下跌趋势末端。黎明之星的形态更加明显，第二根K线通常是十字星，第三根阳线的力度更强，表明多头势力已经开始反攻。'
        },
        '曙光初现': {
            idiom: '曙光初现',
            description: '第一根大阴线，第二根大阳线，阳线收盘价超过阴线实体的一半，是底部反转信号',
            detail: '曙光初现是一种底部反转信号，由两根K线组成：第一根是大阴线，第二根是大阳线，阳线的收盘价超过阴线实体的一半。曙光初现通常出现在下跌趋势末端，表明多头势力已经开始反击，市场即将反转。'
        },
        '旭日东升': {
            idiom: '旭日东升',
            description: '第一根阴线，第二根阳线，阳线收盘价高于阴线开盘价，是强烈的看涨信号',
            detail: '旭日东升是一种强烈的看涨信号，由两根K线组成：第一根是阴线，第二根是阳线，阳线的收盘价高于阴线的开盘价。旭日东升通常出现在下跌趋势末端，表明多头势力已经完全控制市场，后市看涨。'
        },
        '双针探底': {
            idiom: '双针探底',
            description: '两根带长下影线的K线，表明底部支撑强劲，是反弹的信号',
            detail: '双针探底是一种底部反转信号，由两根带长下影线的K线组成，两根K线的低点相近。双针探底表明市场在该价位附近有强大的支撑，空头势力已经耗尽，多头势力开始反击。'
        },
        '一针见底': {
            idiom: '一针见底',
            description: '单根带长下影线的K线，表明底部支撑强烈，是短期见底的信号',
            detail: '一针见底是一种短期底部信号，由单根带长下影线的K线组成。长下影线表明市场在下跌过程中遇到了强烈的支撑，空头势力已经无法继续打压价格，是短期见底的信号。'
        },
        '出水芙蓉': {
            idiom: '出水芙蓉',
            description: '一根大阳线突破多条均线，表明多头势力强大，是强烈的看涨信号',
            detail: '出水芙蓉是一种强烈的看涨信号，由一根大阳线组成，该阳线突破了多条均线。出水芙蓉表明多头势力强大，已经完全控制市场，后市看涨。'
        },
        '探底回升': {
            idiom: '探底回升',
            description: '价格先下跌后上涨，形成V形反转，是底部反转的信号',
            detail: '探底回升是一种V形反转形态，价格先快速下跌，然后快速上涨，形成V字形。探底回升表明市场已经见底，空头势力已经耗尽，多头势力开始反攻。'
        },
        '阳包阴': {
            idiom: '阳包阴',
            description: '阳线实体完全覆盖前一天的阴线实体，是强烈的看涨信号',
            detail: '阳包阴是一种强烈的看涨信号，由两根K线组成：第一根是阴线，第二根是阳线，阳线的实体完全覆盖了阴线的实体。阳包阴表明多头势力已经完全击败空头势力，后市看涨。'
        },
        '多方炮': {
            idiom: '多方炮',
            description: '两阳夹一阴的形态，表明多头势力占优，是看涨信号',
            detail: '多方炮是一种看涨信号，由三根K线组成：第一根是阳线，第二根是阴线，第三根是阳线，形成两阳夹一阴的形态。多方炮表明多头势力占优，后市看涨。'
        },
        '旱地拔葱': {
            idiom: '旱地拔葱',
            description: '价格突然大幅上涨，如同旱地拔葱，是强烈的看涨信号',
            detail: '旱地拔葱是一种强烈的看涨信号，价格突然大幅上涨，如同从旱地中拔出葱一样。旱地拔葱通常出现在市场突破重要阻力位后，表明多头势力非常强大，后市看涨。'
        },
        '金针探底': {
            idiom: '金针探底',
            description: '带长下影线的K线，表明底部支撑强劲，是反弹的信号',
            detail: '金针探底是一种底部反转信号，由带长下影线的K线组成。长下影线表明市场在下跌过程中遇到了强烈的支撑，空头势力已经耗尽，多头势力开始反击。'
        },
        '步步高升': {
            idiom: '步步高升',
            description: '价格逐渐上涨，每一波高点都高于前一波，表明多头势力持续增强',
            detail: '步步高升是一种上升趋势形态，价格逐渐上涨，每一波高点都高于前一波，每一波低点也都高于前一波。步步高升表明多头势力持续增强，市场处于健康的上升趋势中。'
        },
        '乌云盖顶': {
            idiom: '乌云盖顶',
            description: '第一根阳线，第二根阴线，阴线收盘价低于阳线实体的一半，是顶部反转信号',
            detail: '乌云盖顶是一种顶部反转信号，由两根K线组成：第一根是阳线，第二根是阴线，阴线的收盘价低于阳线实体的一半。乌云盖顶表明空头势力已经开始反击，市场即将反转。'
        },
        '乌云压顶': {
            idiom: '乌云压顶',
            description: '与乌云盖顶类似，是顶部反转的重要信号，预示着下跌即将开始',
            detail: '乌云压顶与乌云盖顶类似，也是一种顶部反转信号，通常出现在上涨趋势末端。乌云压顶的形态更加明显，第二根阴线的力度更强，表明空头势力已经开始主导市场。'
        },
        '三只乌鸦': {
            idiom: '三只乌鸦',
            description: '连续三根阴线，每根收盘价低于前一天，表明空头势力强大，后市看跌',
            detail: '三只乌鸦是一种强烈的看跌信号，由连续三根阴线组成，每根阴线的收盘价都低于前一天的收盘价。三只乌鸦通常出现在上涨趋势末端，表明空头势力强大，后市看跌。'
        },
        '黑三鸦': {
            idiom: '黑三鸦',
            description: '与三只乌鸦类似，连续三根阴线，是强烈的看跌信号',
            detail: '黑三鸦与三只乌鸦类似，也是一种强烈的看跌信号，由连续三根阴线组成。黑三鸦的形态更加标准，三根阴线的长度和力度都比较均匀，表明空头势力已经完全控制市场。'
        },
        '黄昏之星': {
            idiom: '黄昏之星',
            description: '由三根K线组成，第一根阳线，第二根十字星，第三根阴线，是顶部反转信号',
            detail: '黄昏之星是一种重要的顶部反转信号，由三根K线组成：第一根是阳线，第二根是十字星或小实体K线，第三根是阴线。黄昏之星通常出现在上涨趋势末端，表明市场已经见顶，即将开始下跌。'
        },
        '落日黄昏': {
            idiom: '落日黄昏',
            description: '与黄昏之星类似，是顶部反转的重要信号，预示着上涨即将结束',
            detail: '落日黄昏与黄昏之星类似，也是一种顶部反转信号，通常出现在上涨趋势末端。落日黄昏的形态更加明显，第二根K线通常是十字星，第三根阴线的力度更强，表明空头势力已经开始主导市场。'
        },
        '阴包阳': {
            idiom: '阴包阳',
            description: '阴线实体完全覆盖前一天的阳线实体，是强烈的看跌信号',
            detail: '阴包阳是一种强烈的看跌信号，由两根K线组成：第一根是阳线，第二根是阴线，阴线的实体完全覆盖了阳线的实体。阴包阳表明空头势力已经完全击败多头势力，后市看跌。'
        },
        '倾盆大雨': {
            idiom: '倾盆大雨',
            description: '第一根阳线，第二根大阴线，阴线收盘价低于阳线开盘价，是强烈的看跌信号',
            detail: '倾盆大雨是一种强烈的看跌信号，由两根K线组成：第一根是阳线，第二根是大阴线，阴线的收盘价低于阳线的开盘价。倾盆大雨表明空头势力已经完全控制市场，后市看跌。'
        },
        '断头铡刀': {
            idiom: '断头铡刀',
            description: '一根大阴线突破多条均线，表明空头势力强大，是强烈的看跌信号',
            detail: '断头铡刀是一种强烈的看跌信号，由一根大阴线组成，该阴线突破了多条均线。断头铡刀表明空头势力强大，已经完全控制市场，后市看跌。'
        },
        '一阴破三线': {
            idiom: '一阴破三线',
            description: '一根阴线同时跌破三条均线，表明空头势力强大，是强烈的看跌信号',
            detail: '一阴破三线是一种强烈的看跌信号，由一根阴线组成，该阴线同时跌破了三条均线。一阴破三线表明空头势力强大，已经完全控制市场，后市看跌。'
        },
        '空方炮': {
            idiom: '空方炮',
            description: '两阴夹一阳的形态，表明空头势力占优，是看跌信号',
            detail: '空方炮是一种看跌信号，由三根K线组成：第一根是阴线，第二根是阳线，第三根是阴线，形成两阴夹一阳的形态。空方炮表明空头势力占优，后市看跌。'
        },
        '节节败退': {
            idiom: '节节败退',
            description: '价格逐渐下跌，每一波低点都低于前一波，表明空头势力持续增强',
            detail: '节节败退是一种下跌趋势形态，价格逐渐下跌，每一波低点都低于前一波，每一波高点也都低于前一波。节节败退表明空头势力持续增强，市场处于健康的下跌趋势中。'
        },
        '高台跳水': {
            idiom: '高台跳水',
            description: '价格从高位突然大幅下跌，如同高台跳水，是强烈的看跌信号',
            detail: '高台跳水是一种强烈的看跌信号，价格从高位突然大幅下跌，如同从高台上跳水一样。高台跳水通常出现在市场突破重要支撑位后，表明空头势力非常强大，后市看跌。'
        },
        '流星赶月': {
            idiom: '流星赶月',
            description: '带长上影线的K线，表明上方压力强劲，是短期见顶的信号',
            detail: '流星赶月是一种短期顶部信号，由带长上影线的K线组成。长上影线表明市场在上涨过程中遇到了强烈的阻力，多头势力已经无法继续推高价格，是短期见顶的信号。'
        },
        '见顶回落': {
            idiom: '见顶回落',
            description: '价格达到高点后开始下跌，形成倒V形反转，是顶部反转的信号',
            detail: '见顶回落是一种倒V形反转形态，价格先快速上涨，然后快速下跌，形成倒V字形。见顶回落表明市场已经见顶，多头势力已经耗尽，空头势力开始反攻。'
        },
        '孕线形态': {
            idiom: '孕线形态',
            description: '后一根K线实体完全包含在前一根K线实体内，表明市场进入盘整阶段，即将选择方向',
            detail: '孕线形态是一种盘整形态，由两根K线组成：前一根是大实体K线，后一根是小实体K线，小实体K线的实体完全包含在前一根大实体K线的实体内。孕线形态表明市场进入盘整阶段，即将选择方向。'
        },
        '身怀六甲': {
            idiom: '身怀六甲',
            description: '与孕线形态类似，是市场进入盘整阶段的信号，预示着即将变盘',
            detail: '身怀六甲与孕线形态类似，也是一种盘整形态，由两根K线组成：前一根是大实体K线，后一根是小实体K线，小实体K线的实体完全包含在前一根大实体K线的实体内。身怀六甲表明市场进入盘整阶段，即将选择方向。'
        },
        '十字星线': {
            idiom: '十字星线',
            description: '开盘价与收盘价相近，上下影线长度相近，表明多空双方势均力敌，市场即将变盘',
            detail: '十字星线是一种重要的变盘信号，开盘价与收盘价相近，上下影线长度相近。十字星线表明多空双方势均力敌，市场处于平衡状态，即将选择方向。'
        },
        '平顶平底': {
            idiom: '平顶平底',
            description: '多个K线的最高点或最低点相近，形成水平直线，表明市场进入盘整阶段',
            detail: '平顶是指多个K线的最高点相近，形成水平直线；平底是指多个K线的最低点相近，形成水平直线。平顶和平底都表明市场进入盘整阶段，即将选择方向。'
        },
        '旗形整理': {
            idiom: '旗形整理',
            description: '价格在上涨或下跌过程中形成的旗形形态，是趋势暂时休息的信号，整理后将继续原趋势',
            detail: '旗形整理是一种持续形态，价格在上涨或下跌过程中形成的旗形形态。旗形整理通常是趋势暂时休息的信号，整理后将继续原趋势。'
        },
        '楔形整理': {
            idiom: '楔形整理',
            description: '价格在上涨或下跌过程中形成的楔形形态，是趋势暂时休息的信号，整理后将继续原趋势',
            detail: '楔形整理是一种持续形态，价格在上涨或下跌过程中形成的楔形形态。楔形整理通常是趋势暂时休息的信号，整理后将继续原趋势。'
        },
        '矩形整理': {
            idiom: '矩形整理',
            description: '价格在一定范围内上下波动，形成矩形形态，是市场进入盘整阶段的信号',
            detail: '矩形整理是一种盘整形态，价格在一定范围内上下波动，形成矩形形态。矩形整理表明市场进入盘整阶段，即将选择方向。'
        },
        '收敛形态': {
            idiom: '收敛形态',
            description: '价格波动幅度逐渐缩小，形成收敛三角形，表明市场即将变盘',
            detail: '收敛形态是一种盘整形态，价格波动幅度逐渐缩小，形成收敛三角形。收敛形态表明市场即将变盘，突破方向将决定未来的趋势。'
        },
        '横盘整理': {
            idiom: '横盘整理',
            description: '价格在一定范围内持续波动，没有明显的趋势方向，是市场进入盘整阶段的信号',
            detail: '横盘整理是一种盘整形态，价格在一定范围内持续波动，没有明显的趋势方向。横盘整理表明市场进入盘整阶段，即将选择方向。'
        },
        '上下震荡': {
            idiom: '上下震荡',
            description: '价格在一定范围内上下波动，是市场进入盘整阶段的信号，即将选择方向',
            detail: '上下震荡是一种盘整形态，价格在一定范围内上下波动。上下震荡表明市场进入盘整阶段，即将选择方向。'
        },
        '仙人指路': {
            idiom: '仙人指路',
            description: '带长上影线的阳线，表明多头试探上方压力，是看涨信号',
            detail: '仙人指路是一种看涨信号，由带长上影线的阳线组成。长上影线表明多头试探上方压力，虽然暂时受到阻力，但多头势力仍然强大，后市看涨。'
        },
        '天量天价': {
            idiom: '天量天价',
            description: '成交量达到历史天量，价格也达到高点，是顶部信号',
            detail: '天量天价是一种顶部信号，成交量达到历史天量，价格也达到高点。天量天价表明市场已经过热，多头势力已经耗尽，后市看跌。'
        },
        '地量地价': {
            idiom: '地量地价',
            description: '成交量达到历史地量，价格也达到低点，是底部信号',
            detail: '地量地价是一种底部信号，成交量达到历史地量，价格也达到低点。地量地价表明市场已经超跌，空头势力已经耗尽，后市看涨。'
        },
        '放量突破': {
            idiom: '放量突破',
            description: '价格突破重要阻力位，同时成交量放大，是强烈的看涨信号',
            detail: '放量突破是一种强烈的看涨信号，价格突破重要阻力位，同时成交量放大。放量突破表明多头势力强大，已经完全控制市场，后市看涨。'
        },
        '缩量回调': {
            idiom: '缩量回调',
            description: '价格回调时成交量缩小，表明卖盘枯竭，是看涨信号',
            detail: '缩量回调是一种看涨信号，价格回调时成交量缩小。缩量回调表明卖盘枯竭，空头势力已经耗尽，多头势力即将反攻。'
        },
        '高开高走': {
            idiom: '高开高走',
            description: '开盘价高于前一天收盘价，并且价格持续上涨，是强烈的看涨信号',
            detail: '高开高走是一种强烈的看涨信号，开盘价高于前一天收盘价，并且价格持续上涨。高开高走表明多头势力强大，已经完全控制市场，后市看涨。'
        },
        '低开低走': {
            idiom: '低开低走',
            description: '开盘价低于前一天收盘价，并且价格持续下跌，是强烈的看跌信号',
            detail: '低开低走是一种强烈的看跌信号，开盘价低于前一天收盘价，并且价格持续下跌。低开低走表明空头势力强大，已经完全控制市场，后市看跌。'
        },
        '高开低走': {
            idiom: '高开低走',
            description: '开盘价高于前一天收盘价，但价格随后下跌，是看跌信号',
            detail: '高开低走是一种看跌信号，开盘价高于前一天收盘价，但价格随后下跌。高开低走表明多头势力已经耗尽，空头势力开始反攻，后市看跌。'
        },
        '低开高走': {
            idiom: '低开高走',
            description: '开盘价低于前一天收盘价，但价格随后上涨，是看涨信号',
            detail: '低开高走是一种看涨信号，开盘价低于前一天收盘价，但价格随后上涨。低开高走表明空头势力已经耗尽，多头势力开始反攻，后市看涨。'
        },
        '一飞冲天': {
            idiom: '一飞冲天',
            description: '价格突然大幅上涨，如同火箭发射，是强烈的看涨信号',
            detail: '一飞冲天是一种强烈的看涨信号，价格突然大幅上涨，如同火箭发射一样。一飞冲天通常出现在市场突破重要阻力位后，表明多头势力非常强大，后市看涨。'
        },
        '单边下跌': {
            idiom: '单边下跌',
            description: '价格持续下跌，没有明显的反弹，是强烈的看跌信号',
            detail: '单边下跌是一种强烈的看跌信号，价格持续下跌，没有明显的反弹。单边下跌表明空头势力非常强大，已经完全控制市场，后市看跌。'
        }
    };
    
    // 为每个技能卡片添加点击事件
    skillCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            const description = this.querySelector('p').textContent;
            const detail = skillDetails[title] ? skillDetails[title].detail : '暂无详细介绍';
            
            // 填充模态框内容
            if (modalTitle) modalTitle.textContent = title;
            if (modalDescription) modalDescription.textContent = description;
            if (modalDetail) modalDetail.textContent = detail;
            
            // 显示模态框
            if (modal) {
                modal.style.display = 'block';
                setTimeout(() => {
                    modal.style.opacity = '1';
                    modal.querySelector('.modal-content').style.transform = 'scale(1)';
                }, 10);
            }
        });
    });
    
    // 关闭模态框
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            if (modal) {
                modal.style.opacity = '0';
                modal.querySelector('.modal-content').style.transform = 'scale(0.8)';
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // 点击模态框外部关闭
    window.addEventListener('click', function(event) {
        if (modal && event.target == modal) {
            modal.style.opacity = '0';
            modal.querySelector('.modal-content').style.transform = 'scale(0.8)';
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    });
}

// 初始化所有功能
function init() {
    smoothScroll();
    navbarScrollEffect();
    cardHoverEffects();
    animateCounters();
    responsiveNavbar();
    themeToggle();
    skillCardClick();
    categoryExpand();
    backToTop();
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', init);