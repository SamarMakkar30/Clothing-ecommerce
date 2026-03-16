/* ============================================
   OBSCURA - Main JavaScript
   Premium Interactions & Animations
   ============================================ */

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // ==================== PREMIUM PRELOADER ANIMATION ====================
    // Only run if the preloader exists on this page
    const preloader = document.querySelector('.preloader-overlay');
    if (preloader) {
        // Prevent scrolling while preloader is active
        document.body.style.overflow = 'hidden';

        const tlLoader = gsap.timeline({
            // When the entire sequence is done, re-enable scrolling
            onComplete: () => {
                document.body.style.overflow = '';
                // Optional: remove it from DOM completely after completion
                // preloader.remove(); 
            }
        });

        tlLoader
            // --- Phase 1: The Setup ---
            // Ensure initial states are set before animation starts
            .set('.char', { y: '110%', opacity: 0 })
            .set('.loader-line', { width: '0%', opacity: 0.5 })
            // --- Phase 2: The Draw ---
            // Draw the gold lines outwards from center
            .to('.loader-line', {
                width: '100%',
                duration: 0.9,
                ease: "power3.inOut"
            })
            // --- Phase 3: The Text Reveal (Staggered Rise) ---
            .to('.char', {
                y: '0%',
                opacity: 1,
                duration: 0.75,
                ease: "power4.out", // A very elegant, smooth deceleration
                stagger: 0.05 // The delay between each letter rising
            }, "-=0.8") // Start this overlap slightly before the lines finish drawing
            // --- Phase 4: The Hold ---
            // Let the brand name sit there for a moment of prestige
            .to({}, { duration: 0.75 }) 
            // --- Phase 5: The Exit (Text) ---
            // Animate text upwards and out
            .to('.char', {
                y: '-100%',
                opacity: 0,
                duration: 0.6,
                ease: "power2.in",
                stagger: 0.03
            })
            .to('.loader-line', {
                width: '0%',
                opacity: 0,
                duration: 0.4,
                ease: "power2.in"
            }, "-=0.8")
            // --- Phase 6: The Final Reveal (Curtain Up) ---
            .to('.preloader-overlay', {
                yPercent: -100, // Slide the whole screen upwards
                duration: 0.9,
                ease: "expo.inOut" // A dramatic, sharp ease for the final reveal
            });
        // --- EXISTING CODE BELOW ---
        // The rest of your script.js code goes here...
        // Make sure your existing GSAP/ScrollTrigger code runs AFTER this.
    }
    // ... rest of your existing DOMContentLoaded code
    initHeader();
    initMobileMenu();
    initSearch();
    initHeroAnimation();
    initScrollAnimations();
    initFeaturedProducts();
    initNewsletter();
    updateCartCount();
});

// ============================================
// HEADER
// ============================================
function initHeader() {
    const header = document.getElementById('header');
    const announcementBar = document.querySelector('.announcement-bar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class when past announcement bar
        if (currentScroll > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    const toggle = document.getElementById('menuToggle');
    const menu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileMenuOverlay');
    const links = menu?.querySelectorAll('.mobile-nav-link');
    
    if (!toggle || !menu) return;
    
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        overlay?.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking overlay
    overlay?.addEventListener('click', () => {
        toggle.classList.remove('active');
        menu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close menu when clicking a link - hide overlay immediately
    links?.forEach(link => {
        link.addEventListener('click', () => {
            // Immediately hide overlay to prevent flash
            if (overlay) {
                overlay.style.display = 'none';
            }
            toggle.classList.remove('active');
            menu.classList.remove('active');
            overlay?.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ============================================
// SEARCH
// ============================================
function initSearch() {
    const searchBtn = document.getElementById('searchBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    
    if (!searchBtn || !searchOverlay) return;
    
    searchBtn.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        setTimeout(() => searchInput?.focus(), 300);
        document.body.style.overflow = 'hidden';
    });
    
    searchClose?.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    searchForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput?.value.trim();
        if (query) {
            window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
        }
    });
    
    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// HERO ANIMATION
// ============================================
function initHeroAnimation() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Animate hero content on load
    gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-description', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.7,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-btn', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.9,
        ease: 'power3.out'
    });
    
    // Parallax effect on scroll
    gsap.to('.hero-image img', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Section headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Category cards
    gsap.utils.toArray('.category-card').forEach((card, i) => {
        gsap.from(card, {
            opacity: 0,
            y: 60,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Process cards
    gsap.utils.toArray('.process-card').forEach((card, i) => {
        gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // About section
    const aboutImage = document.querySelector('.about-image');
    const aboutContent = document.querySelector('.about-content');
    
    if (aboutImage) {
        gsap.from(aboutImage, {
            opacity: 0,
            x: -50,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: aboutImage,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    }
    
    if (aboutContent) {
        gsap.from(aboutContent, {
            opacity: 0,
            x: 50,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: aboutContent,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    }
    
    // Collection banner
    const bannerContent = document.querySelector('.banner-content');
    if (bannerContent) {
        gsap.from(bannerContent.children, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: bannerContent,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    }
    
    // Instagram items
    gsap.utils.toArray('.instagram-item').forEach((item, i) => {
        gsap.from(item, {
            opacity: 0,
            scale: 0.9,
            duration: 0.6,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        });
    });
}

// ============================================
// FEATURED PRODUCTS
// ============================================
function initFeaturedProducts() {
    const grid = document.getElementById('featuredGrid');
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    if (!grid) return;
    
    function renderProducts(category = 'all') {
        let products = [];
        
        if (window.productsData && Array.isArray(window.productsData)) {
            products = [...window.productsData];
        } else {
            try {
                const stored = localStorage.getItem('obscura_products');
                if (stored) products = JSON.parse(stored);
            } catch (e) {
                console.error('Error loading products:', e);
            }
        }
        
        if (category !== 'all') {
            products = products.filter(p => p.category === category);
        }
        
        // Show 8 products on homepage
        products = products.slice(0, 8);
        
        if (products.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                    <p style="color: #666; font-size: 1rem;">No products found.</p>
                    <a href="admin.html" style="color: #B8956B; text-decoration: underline; margin-top: 10px; display: inline-block;">Add products via admin panel</a>
                </div>
            `;
            return;
        }
        
        grid.innerHTML = products.map(product => `
            <article class="product-card">
                <a href="product.html?id=${product.id}" class="product-link">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}" loading="lazy">
                        ${product.new ? '<span class="product-badge">NEW</span>' : ''}
                        ${product.originalPrice ? '<span class="product-badge sale">SALE</span>' : ''}
                        <div class="product-actions">
                            <button class="product-action-btn quick-view-btn" data-id="${product.id}">QUICK VIEW</button>
                        </div>
                    </div>
                    <div class="product-info">
                        <span class="product-category">${product.collection ? product.collection.replace('-', ' ') : product.category}</span>
                        <h3 class="product-name">${product.name}</h3>
                        <span class="product-price">
                            ₹ ${product.price.toLocaleString()}
                            ${product.originalPrice ? `<span class="original">₹ ${product.originalPrice.toLocaleString()}</span>` : ''}
                        </span>
                    </div>
                </a>
            </article>
        `).join('');
        
        // Animate products
        gsap.fromTo(grid.querySelectorAll('.product-card'),
            { opacity: 0, y: 40 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.6, 
                stagger: 0.08,
                ease: 'power3.out'
            }
        );
        
        // Quick view buttons
        grid.querySelectorAll('.quick-view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const productId = btn.dataset.id;
                window.location.href = `product.html?id=${productId}`;
            });
        });
    }
    
    // Initial render
    renderProducts();
    
    // Tab filtering
    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProducts(btn.dataset.category);
        });
    });
}

// ============================================
// NEWSLETTER
// ============================================
function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = form.querySelector('input[type="email"]').value.trim();
        
        if (!email) {
            showToast('Please enter your email address', 'error');
            return;
        }
        
        // Save to localStorage
        const subscribers = JSON.parse(localStorage.getItem('obscura_subscribers') || '[]');
        
        if (subscribers.includes(email)) {
            showToast('You are already subscribed!', 'error');
            return;
        }
        
        subscribers.push(email);
        localStorage.setItem('obscura_subscribers', JSON.stringify(subscribers));
        
        form.reset();
        showToast('Thank you! Enjoy 10% off your first order.', 'success');
    });
}

// ============================================
// CART COUNT
// ============================================
function updateCartCount() {
    const countEl = document.getElementById('cartCount');
    if (!countEl) return;
    
    const count = window.getCartCount ? window.getCartCount() : 0;
    countEl.textContent = count;
    countEl.style.display = count > 0 ? 'flex' : 'none';
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================
function showToast(message, type = '') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    const messageEl = toast.querySelector('.toast-message');
    if (messageEl) messageEl.textContent = message;
    
    toast.className = 'toast show ' + type;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Make functions globally available
window.showToast = showToast;
window.updateCartCount = updateCartCount;
