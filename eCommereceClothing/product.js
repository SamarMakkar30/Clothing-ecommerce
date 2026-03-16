/* ============================================
   RAHIL RAZA - Product Page JavaScript
   Redesigned with working size buttons
   ============================================ */

// Global state
let currentProduct = null;
let selectedSize = null;
let quantity = 1;
let isFavorite = false;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initHeader();
    initMobileMenu();
    loadProduct();
    initQuantity();
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
    
    const links = menu.querySelectorAll('.mobile-nav-link');
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
// LOAD PRODUCT
// ============================================
function loadProduct() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    
    if (!productId) {
        window.location.href = 'shop.html';
        return;
    }
    
    // Get product data
    currentProduct = window.getProductById ? window.getProductById(parseInt(productId)) : null;
    
    if (!currentProduct) {
        window.location.href = 'shop.html';
        return;
    }
    
    // Update page title
    document.title = currentProduct.name + ' | RAHIL RAZA';
    
    // Populate product info
    document.getElementById('breadcrumbProduct').textContent = currentProduct.name;
    
    // Collection Badge
    const collectionBadge = document.getElementById('productCollection');
    if (currentProduct.new) {
        collectionBadge.textContent = 'NEW RELEASE';
    } else if (currentProduct.collection) {
        collectionBadge.textContent = currentProduct.collection.replace('-', ' ').toUpperCase();
    } else {
        collectionBadge.textContent = currentProduct.category.toUpperCase();
    }
    
    // Product Title
    document.getElementById('productTitle').textContent = currentProduct.name;
    
    // Category
    const categoryEl = document.getElementById('productCategory');
    if (categoryEl) {
        categoryEl.textContent = currentProduct.category === 'women' ? "Women's Collection" : 
                                 currentProduct.category === 'men' ? "Men's Collection" : 
                                 currentProduct.category;
    }
    
    // Price
    document.getElementById('productPrice').textContent = '₹ ' + currentProduct.price.toLocaleString();
    
    // Original price
    const originalPriceEl = document.getElementById('productOriginalPrice');
    if (currentProduct.originalPrice) {
        originalPriceEl.textContent = '₹ ' + currentProduct.originalPrice.toLocaleString();
        originalPriceEl.style.display = 'inline';
    } else {
        originalPriceEl.style.display = 'none';
    }
    
    // Description
    const descEl = document.getElementById('productDescription');
    if (descEl) {
        descEl.textContent = currentProduct.description || '';
    }
    
    // Badge
    const badgeEl = document.getElementById('productBadge');
    if (currentProduct.new) {
        badgeEl.textContent = 'NEW';
        badgeEl.style.display = 'block';
    } else if (currentProduct.originalPrice) {
        badgeEl.textContent = 'SALE';
        badgeEl.style.display = 'block';
    }
    
    // Product details
    const detailsList = document.getElementById('productDetails');
    if (detailsList && currentProduct.details) {
        detailsList.innerHTML = currentProduct.details.map(function(detail) {
            return '<li>' + detail + '</li>';
        }).join('');
    }
    
    // Gallery
    loadGallery();
    
    // Sizes - this is the important part!
    loadSizes();
    
    // Add to cart button
    const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', handleAddToCart);
    }
    
    // Favorite button
    const favoriteBtn = document.getElementById('favoriteBtn');
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', handleFavorite);
    }
    
    // Load related products
    loadRelatedProducts();
    
    // Animate in
    animateProductEntry();
}

// ============================================
// GALLERY
// ============================================
function loadGallery() {
    const mainImage = document.getElementById('mainImage');
    const thumbsContainer = document.getElementById('galleryThumbs');
    
    if (!mainImage || !thumbsContainer) return;
    
    const images = currentProduct.images && currentProduct.images.length > 0 
        ? currentProduct.images 
        : [currentProduct.image];
    
    // Set main image
    mainImage.src = images[0];
    mainImage.alt = currentProduct.name;
    
    // Create thumbnails
    if (images.length > 1) {
        thumbsContainer.innerHTML = '';
        
        images.forEach(function(img, index) {
            const thumb = document.createElement('button');
            thumb.className = 'gallery-thumb' + (index === 0 ? ' active' : '');
            thumb.setAttribute('data-image', img);
            thumb.innerHTML = '<img src="' + img + '" alt="' + currentProduct.name + ' ' + (index + 1) + '">';
            
            thumb.addEventListener('click', function() {
                // Update main image
                mainImage.src = img;
                
                // Update active state
                const allThumbs = thumbsContainer.querySelectorAll('.gallery-thumb');
                allThumbs.forEach(function(t) {
                    t.classList.remove('active');
                });
                thumb.classList.add('active');
            });
            
            thumbsContainer.appendChild(thumb);
        });
    } else {
        thumbsContainer.style.display = 'none';
    }
}

// ============================================
// SIZES - WORKING VERSION
// ============================================
function loadSizes() {
    const sizesGrid = document.getElementById('sizesGrid');
    if (!sizesGrid) return;
    
    const sizes = currentProduct.sizes || ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    
    // Clear existing buttons
    sizesGrid.innerHTML = '';
    
    // Create size buttons
    sizes.forEach(function(size) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'size-btn';
        btn.setAttribute('data-size', size);
        btn.textContent = size;
        
        // Add click event listener
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Remove selected class from all buttons
            const allBtns = sizesGrid.querySelectorAll('.size-btn');
            allBtns.forEach(function(b) {
                b.classList.remove('selected');
            });
            
            // Add selected class to clicked button
            btn.classList.add('selected');
            
            // Update selected size
            selectedSize = size;
            
            // Hide error message
            const sizeError = document.getElementById('sizeError');
            if (sizeError) {
                sizeError.classList.remove('show');
            }
            
            console.log('Size selected:', selectedSize);
        });
        
        sizesGrid.appendChild(btn);
    });
}

// ============================================
// QUANTITY
// ============================================
function initQuantity() {
    const minusBtn = document.getElementById('qtyMinus');
    const plusBtn = document.getElementById('qtyPlus');
    const input = document.getElementById('qtyInput');
    
    if (!minusBtn || !plusBtn || !input) return;
    
    minusBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (quantity > 1) {
            quantity--;
            input.value = quantity;
        }
    });
    
    plusBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (quantity < 10) {
            quantity++;
            input.value = quantity;
        }
    });
    
    input.addEventListener('change', function() {
        let val = parseInt(input.value) || 1;
        val = Math.max(1, Math.min(10, val));
        quantity = val;
        input.value = quantity;
    });
}

// ============================================
// ADD TO CART
// ============================================
function handleAddToCart(e) {
    e.preventDefault();
    
    if (!selectedSize) {
        // Show error
        const sizeError = document.getElementById('sizeError');
        if (sizeError) {
            sizeError.classList.add('show');
        }
        showToast('Please select a size', 'error');
        return;
    }
    
    if (!currentProduct) return;
    
    // Add to cart using global function
    if (window.addToCart) {
        window.addToCart(currentProduct.id, selectedSize, quantity);
    }
    
    updateCartCount();
    showToast('Added ' + currentProduct.name + ' (Qty: ' + quantity + ') to bag!', 'success');
}

// ============================================
// FAVORITE
// ============================================
function handleFavorite(e) {
    e.preventDefault();
    
    isFavorite = !isFavorite;
    
    const btn = document.getElementById('favoriteBtn');
    if (btn) {
        if (isFavorite) {
            btn.classList.add('active');
            showToast('Added to favorites!', 'success');
        } else {
            btn.classList.remove('active');
            showToast('Removed from favorites', 'success');
        }
    }
}

// ============================================
// UPDATE CART COUNT
// ============================================
function updateCartCount() {
    const countEl = document.getElementById('cartCount');
    if (!countEl) return;
    
    const cart = JSON.parse(localStorage.getItem('obscura_cart')) || [];
    const count = cart.reduce(function(total, item) {
        return total + (item.quantity || 1);
    }, 0);
    
    countEl.textContent = count;
    
    if (count > 0) {
        countEl.style.display = 'flex';
    } else {
        countEl.style.display = 'none';
    }
}

// ============================================
// TOAST NOTIFICATION
// ============================================
function showToast(message, type) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    const messageEl = toast.querySelector('.toast-message');
    if (messageEl) {
        messageEl.textContent = message;
    }
    
    toast.className = 'toast';
    if (type) {
        toast.classList.add(type);
    }
    toast.classList.add('show');
    
    setTimeout(function() {
        toast.classList.remove('show');
    }, 3000);
}

// ============================================
// RELATED PRODUCTS
// ============================================
function loadRelatedProducts() {
    const grid = document.getElementById('relatedGrid');
    if (!grid || !window.getProducts) return;
    
    const allProducts = window.getProducts();
    
    // Filter related products (same category, different product)
    const related = allProducts.filter(function(p) {
        return p.category === currentProduct.category && p.id !== currentProduct.id;
    }).slice(0, 4);
    
    if (related.length === 0) {
        // If no same category, show any 4 products
        const others = allProducts.filter(function(p) {
            return p.id !== currentProduct.id;
        }).slice(0, 4);
        renderRelatedProducts(others);
    } else {
        renderRelatedProducts(related);
    }
}

function renderRelatedProducts(products) {
    const grid = document.getElementById('relatedGrid');
    if (!grid) return;
    
    grid.innerHTML = products.map(function(product) {
        return '<article class="product-card">' +
            '<a href="product.html?id=' + product.id + '" class="product-link">' +
                '<div class="product-image">' +
                    '<img src="' + product.image + '" alt="' + product.name + '">' +
                    (product.new ? '<span class="badge">NEW</span>' : '') +
                '</div>' +
                '<div class="product-details">' +
                    '<h3 class="product-name">' + product.name + '</h3>' +
                    '<p class="product-price">₹ ' + product.price.toLocaleString() + '</p>' +
                '</div>' +
            '</a>' +
        '</article>';
    }).join('');
}

// ============================================
// ANIMATIONS
// ============================================
function animateProductEntry() {
    if (typeof gsap === 'undefined') return;
    
    const tl = gsap.timeline();
    
    tl.from('.gallery-main', {
        opacity: 0,
        x: -30,
        duration: 0.6,
        ease: 'power2.out'
    })
    .from('.gallery-thumbs .gallery-thumb', {
        opacity: 0,
        y: 20,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power2.out'
    }, '-=0.3')
    .from('.product-info-section > *', {
        opacity: 0,
        y: 20,
        duration: 0.4,
        stagger: 0.08,
        ease: 'power2.out'
    }, '-=0.4');
}
