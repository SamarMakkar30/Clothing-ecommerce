/* ============================================
   RAHIL RAZA - Shop Page JavaScript
   Simple flow: Click product → Go to product page
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initHeader();
    initMobileMenu();
    initShop();
    updateCartCount();
});

// ============================================
// HEADER
// ============================================
function initHeader() {
    const header = document.getElementById('header');
    
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    const toggle = document.getElementById('menuToggle');
    const menu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileMenuOverlay');
    
    if (!toggle || !menu) return;
    
    toggle.addEventListener('click', function() {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        if (overlay) overlay.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking overlay
    if (overlay) {
        overlay.addEventListener('click', function() {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    var links = menu.querySelectorAll('.mobile-nav-link');
    links.forEach(function(link) {
        link.addEventListener('click', function() {
            // Immediately hide overlay to prevent flash
            if (overlay) {
                overlay.style.display = 'none';
            }
            toggle.classList.remove('active');
            menu.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ============================================
// SHOP FUNCTIONALITY
// ============================================
var currentFilter = 'all';
var currentSort = 'featured';

function initShop() {
    // Parse URL parameters
    var params = new URLSearchParams(window.location.search);
    var category = params.get('category');
    var collection = params.get('collection');
    var search = params.get('search');
    
    // Set initial filter
    if (category) {
        currentFilter = category;
        updatePageTitle(category, 'category');
    } else if (collection) {
        currentFilter = collection;
        updatePageTitle(collection, 'collection');
    } else if (search) {
        currentFilter = 'search:' + search;
        updatePageTitle(search, 'search');
    }
    
    // Highlight active tab
    var tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(function(tab) {
        if (tab.dataset.filter === currentFilter || 
            (currentFilter.startsWith('search:') && tab.dataset.filter === 'all')) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // Filter tabs click handlers
    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            tabs.forEach(function(t) { t.classList.remove('active'); });
            tab.classList.add('active');
            currentFilter = tab.dataset.filter;
            updatePageTitle(currentFilter, 'filter');
            renderProducts();
            
            // Update URL
            var url = new URL(window.location);
            url.searchParams.delete('category');
            url.searchParams.delete('collection');
            url.searchParams.delete('search');
            
            if (currentFilter !== 'all') {
                if (currentFilter === 'women' || currentFilter === 'men') {
                    url.searchParams.set('category', currentFilter);
                } else {
                    url.searchParams.set('collection', currentFilter);
                }
            }
            window.history.pushState({}, '', url);
        });
    });
    
    // Sort select
    var sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            currentSort = sortSelect.value;
            renderProducts();
        });
    }
    
    // Initial render
    renderProducts();
}

function updatePageTitle(filter, type) {
    var titleEl = document.getElementById('shopTitle');
    var subtitleEl = document.getElementById('shopSubtitle');
    var breadcrumbEl = document.getElementById('breadcrumbCurrent');
    
    var titles = {
        'all': { title: 'ALL PRODUCTS', subtitle: 'Explore our complete collection of luxury pieces' },
        'women': { title: 'WOMEN\'S COLLECTION', subtitle: 'Elegance redefined for the modern woman' },
        'men': { title: 'MEN\'S COLLECTION', subtitle: 'Contemporary luxury for the distinguished gentleman' }
    };
    
    if (type === 'search') {
        titleEl.textContent = 'SEARCH: "' + filter.toUpperCase() + '"';
        subtitleEl.textContent = 'Showing search results';
        breadcrumbEl.textContent = 'Search Results';
    } else {
        var content = titles[filter] || titles['all'];
        titleEl.textContent = content.title;
        subtitleEl.textContent = content.subtitle;
        breadcrumbEl.textContent = content.title.replace('\'S COLLECTION', '');
    }
}

function renderProducts() {
    var grid = document.getElementById('productsGrid');
    var countEl = document.getElementById('productsCount');
    
    if (!grid) return;
    
    var products = [];
    
    if (window.productsData && Array.isArray(window.productsData)) {
        products = window.productsData.slice();
    } else {
        try {
            var stored = localStorage.getItem('obscura_products');
            if (stored) products = JSON.parse(stored);
        } catch (e) {
            console.error('Error loading products:', e);
        }
    }
    
    // Filter products
    if (currentFilter.startsWith('search:')) {
        var searchTerm = currentFilter.replace('search:', '').toLowerCase();
        products = products.filter(function(p) {
            return p.name.toLowerCase().indexOf(searchTerm) !== -1 ||
                   p.description.toLowerCase().indexOf(searchTerm) !== -1 ||
                   p.category.toLowerCase().indexOf(searchTerm) !== -1 ||
                   (p.collection && p.collection.toLowerCase().indexOf(searchTerm) !== -1);
        });
    } else if (currentFilter !== 'all') {
        if (currentFilter === 'women' || currentFilter === 'men') {
            products = products.filter(function(p) { return p.category === currentFilter; });
        } else {
            products = products.filter(function(p) { return p.collection === currentFilter; });
        }
    }
    
    // Sort products
    switch (currentSort) {
        case 'newest':
            var newProducts = products.filter(function(p) { return p.new; });
            var oldProducts = products.filter(function(p) { return !p.new; });
            products = newProducts.concat(oldProducts);
            break;
        case 'price-low':
            products.sort(function(a, b) { return a.price - b.price; });
            break;
        case 'price-high':
            products.sort(function(a, b) { return b.price - a.price; });
            break;
    }
    
    // Update count
    if (countEl) countEl.textContent = products.length;
    
    if (products.length === 0) {
        grid.innerHTML = '<div class="empty-state">' +
            '<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">' +
                '<circle cx="11" cy="11" r="8"/>' +
                '<path d="m21 21-4.35-4.35"/>' +
            '</svg>' +
            '<h3>No Products Found</h3>' +
            '<p>Try adjusting your filters or search terms</p>' +
            '<a href="shop.html" class="btn-primary">VIEW ALL PRODUCTS</a>' +
        '</div>';
        return;
    }
    
    // Render product cards - clicking goes directly to product page
    grid.innerHTML = products.map(function(product) {
        var badge = '';
        if (product.new) {
            badge = '<span class="product-badge">NEW</span>';
        } else if (product.originalPrice) {
            badge = '<span class="product-badge sale">SALE</span>';
        } else if (product.limited) {
            badge = '<span class="product-badge limited">LIMITED</span>';
        }
        
        var categoryText = product.collection ? product.collection.replace('-', ' ') : product.category;
        
        var priceHtml = '₹ ' + product.price.toLocaleString();
        if (product.originalPrice) {
            priceHtml += '<span class="original">₹ ' + product.originalPrice.toLocaleString() + '</span>';
        }
        
        return '<article class="shop-product-card">' +
            '<a href="product.html?id=' + product.id + '" class="product-link">' +
                '<div class="product-image">' +
                    '<img src="' + product.image + '" alt="' + product.name + '" loading="lazy">' +
                    badge +
                '</div>' +
                '<div class="product-info">' +
                    '<span class="product-category">' + categoryText + '</span>' +
                    '<h3 class="product-name">' + product.name + '</h3>' +
                    '<span class="product-price">' + priceHtml + '</span>' +
                '</div>' +
            '</a>' +
        '</article>';
    }).join('');
    
    // Animate products
    if (typeof gsap !== 'undefined') {
        gsap.fromTo(grid.querySelectorAll('.shop-product-card'),
            { opacity: 0, y: 30 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.5, 
                stagger: 0.05,
                ease: 'power2.out'
            }
        );
    }
}

// ============================================
// UPDATE CART COUNT
// ============================================
function updateCartCount() {
    var countEl = document.getElementById('cartCount');
    if (!countEl) return;
    
    var cart = [];
    try {
        cart = JSON.parse(localStorage.getItem('obscura_cart')) || [];
    } catch (e) {
        cart = [];
    }
    
    var count = cart.reduce(function(total, item) {
        return total + (item.quantity || 1);
    }, 0);
    
    countEl.textContent = count;
    
    if (count > 0) {
        countEl.style.display = 'flex';
    } else {
        countEl.style.display = 'none';
    }
}
