/* ============================================
   OBSCURA - Cart Page JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initMobileMenu();
    loadCart();
    updateCartCount();
    initCheckoutModal();
    
    document.getElementById('checkoutBtn').addEventListener('click', handleCheckout);
});

// ============================================
// HEADER
// ============================================
function initHeader() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
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
    
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        if (overlay) overlay.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking overlay
    if (overlay) {
        overlay.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    menu.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
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
// LOAD CART
// ============================================
function loadCart() {
    const cart = window.getCart ? window.getCart() : [];
    const itemsContainer = document.getElementById('cartItems');
    const emptyMessage = document.getElementById('cartEmpty');
    const summarySection = document.getElementById('orderSummary');
    const itemCountEl = document.getElementById('itemCount');
    
    if (!cart || cart.length === 0) {
        itemsContainer.style.display = 'none';
        emptyMessage.style.display = 'block';
        summarySection.style.display = 'none';
        itemCountEl.textContent = '0 items';
        return;
    }
    
    itemsContainer.style.display = 'flex';
    emptyMessage.style.display = 'none';
    summarySection.style.display = 'block';
    
    // Calculate total items
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    itemCountEl.textContent = `${totalItems} ${totalItems === 1 ? 'item' : 'items'}`;
    
    // Render cart items
    itemsContainer.innerHTML = cart.map(item => {
        const product = window.getProductById ? window.getProductById(item.productId) : null;
        if (!product) return '';
        
        const itemTotal = product.price * item.quantity;
        
        return `
            <div class="cart-item" data-cart-id="${item.id}">
                <div class="cart-item-image">
                    <a href="product.html?id=${product.id}">
                        <img src="${product.image}" alt="${product.name}">
                    </a>
                </div>
                <div class="cart-item-details">
                    <div>
                        <span class="cart-item-collection">${product.collection ? product.collection.replace('-', ' ') : product.category}</span>
                        <h3 class="cart-item-name">
                            <a href="product.html?id=${product.id}">${product.name}</a>
                        </h3>
                        <span class="cart-item-variant">Size: ${item.size}</span>
                    </div>
                    <div class="cart-item-actions">
                        <div class="cart-qty">
                            <button onclick="updateItemQuantity('${item.id}', -1)" aria-label="Decrease quantity">−</button>
                            <input type="text" value="${item.quantity}" readonly>
                            <button onclick="updateItemQuantity('${item.id}', 1)" aria-label="Increase quantity">+</button>
                        </div>
                        <button class="cart-item-remove" onclick="removeItem('${item.id}')">Remove</button>
                    </div>
                </div>
                <div class="cart-item-pricing">
                    <span class="cart-item-price">₹ ${itemTotal.toLocaleString()}</span>
                    ${item.quantity > 1 ? `<span class="cart-item-unit-price">₹ ${product.price.toLocaleString()} each</span>` : ''}
                </div>
            </div>
        `;
    }).join('');
    
    // Update summary
    updateSummary(cart);
    
    // Animate
    gsap.from('.cart-item', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out'
    });
}

// ============================================
// UPDATE SUMMARY
// ============================================
function updateSummary(cart) {
    let subtotal = 0;
    
    cart.forEach(item => {
        const product = window.getProductById ? window.getProductById(item.productId) : null;
        if (product) {
            subtotal += product.price * item.quantity;
        }
    });
    
    const shippingEl = document.getElementById('shipping');
    let shipping = 0;
    
    if (subtotal >= 15000) {
        shippingEl.textContent = 'FREE';
    } else {
        shipping = 500;
        shippingEl.textContent = `₹ ${shipping.toLocaleString()}`;
    }
    
    const total = subtotal + shipping;
    
    document.getElementById('subtotal').textContent = `₹ ${subtotal.toLocaleString()}`;
    document.getElementById('total').textContent = `₹ ${total.toLocaleString()}`;
}

// ============================================
// UPDATE ITEM QUANTITY
// ============================================
function updateItemQuantity(cartItemId, change) {
    const cart = window.getCart ? window.getCart() : [];
    const itemIndex = cart.findIndex(item => item.id === cartItemId);
    
    if (itemIndex === -1) return;
    
    const newQty = cart[itemIndex].quantity + change;
    
    if (newQty < 1) {
        removeItem(cartItemId);
        return;
    }
    
    if (newQty > 10) return;
    
    cart[itemIndex].quantity = newQty;
    window.saveCart(cart);
    
    loadCart();
    updateCartCount();
}

// ============================================
// REMOVE ITEM
// ============================================
function removeItem(cartItemId) {
    const cart = window.getCart ? window.getCart() : [];
    const newCart = cart.filter(item => item.id !== cartItemId);
    window.saveCart(newCart);
    
    loadCart();
    updateCartCount();
    showToast('Item removed from bag', '');
}

// ============================================
// CHECKOUT MODAL
// ============================================
function initCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    const closeBtn = document.getElementById('closeCheckoutModal');
    const overlay = modal?.querySelector('.checkout-modal-overlay');
    const form = document.getElementById('checkoutForm');
    
    closeBtn?.addEventListener('click', closeCheckoutModal);
    overlay?.addEventListener('click', closeCheckoutModal);
    
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        sendToWhatsApp();
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeCheckoutModal();
    });
}

function handleCheckout() {
    const cart = window.getCart ? window.getCart() : [];
    
    if (cart.length === 0) {
        showToast('Your bag is empty', 'error');
        return;
    }
    
    openCheckoutModal();
}

function openCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    const orderItemsEl = document.getElementById('modalOrderItems');
    const modalTotalEl = document.getElementById('modalTotal');
    
    const cart = window.getCart ? window.getCart() : [];
    let total = 0;
    
    // Populate order items
    orderItemsEl.innerHTML = cart.map(item => {
        const product = window.getProductById ? window.getProductById(item.productId) : null;
        if (!product) return '';
        
        const itemTotal = product.price * item.quantity;
        total += itemTotal;
        
        return `
            <div class="order-preview-item">
                <span class="item-name">${product.name}</span>
                <span class="item-qty">×${item.quantity} (${item.size})</span>
                <span>₹${itemTotal.toLocaleString()}</span>
            </div>
        `;
    }).join('');
    
    // Add shipping
    const shipping = total >= 15000 ? 0 : 500;
    if (shipping > 0) {
        orderItemsEl.innerHTML += `
            <div class="order-preview-item">
                <span class="item-name">Shipping</span>
                <span class="item-qty"></span>
                <span>₹${shipping.toLocaleString()}</span>
            </div>
        `;
    }
    
    modalTotalEl.textContent = `₹ ${(total + shipping).toLocaleString()}`;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    modal?.classList.remove('active');
    document.body.style.overflow = '';
}

function sendToWhatsApp() {
    const name = document.getElementById('customerName').value.trim();
    const email = document.getElementById('customerEmail').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const address = document.getElementById('customerAddress').value.trim();
    
    if (!name || !email || !phone) {
        showToast('Please fill in all required fields', 'error');
        return;
    }
    
    const cart = window.getCart ? window.getCart() : [];
    let total = 0;
    
    // Build order items text
    let itemsText = '';
    cart.forEach((item, index) => {
        const product = window.getProductById ? window.getProductById(item.productId) : null;
        if (product) {
            const itemTotal = product.price * item.quantity;
            total += itemTotal;
            itemsText += `${index + 1}. ${product.name}\n`;
            itemsText += `   Size: ${item.size} | Qty: ${item.quantity}\n`;
            itemsText += `   Price: ₹${itemTotal.toLocaleString()}\n\n`;
        }
    });
    
    // Calculate shipping
    const shipping = total >= 15000 ? 0 : 500;
    const grandTotal = total + shipping;
    
    // Build the complete message
    let message = `🛍️ *NEW ORDER FROM OBSCURA*\n`;
    message += `═══════════════════════\n\n`;
    message += `👤 *CUSTOMER DETAILS*\n`;
    message += `Name: ${name}\n`;
    message += `Email: ${email}\n`;
    message += `Phone: ${phone}\n`;
    if (address) {
        message += `Address: ${address}\n`;
    }
    message += `\n📦 *ORDER ITEMS*\n`;
    message += `───────────────────────\n`;
    message += itemsText;
    message += `───────────────────────\n`;
    message += `Subtotal: ₹${total.toLocaleString()}\n`;
    message += `Shipping: ${shipping === 0 ? 'FREE' : '₹' + shipping.toLocaleString()}\n`;
    message += `*TOTAL: ₹${grandTotal.toLocaleString()}*\n\n`;
    message += `═══════════════════════\n`;
    message += `Thank you for shopping with OBSCURA!`;
    
    // WhatsApp phone number (without + sign, just country code + number)
    const whatsappNumber = '917206889528';
    
    // Encode the message
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Clear cart after successful order
    if (window.clearCart) {
        window.clearCart();
    }
    
    // Close modal
    closeCheckoutModal();
    
    // Show success message
    showToast('Redirecting to WhatsApp...', 'success');
    
    // Open WhatsApp in new tab
    setTimeout(() => {
        window.open(whatsappURL, '_blank');
        // Reload page to reflect empty cart
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }, 500);
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
// TOAST
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
