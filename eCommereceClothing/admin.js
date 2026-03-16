/* ============================================
   OBSCURA - Admin Panel JavaScript
   ============================================ */

// Default credentials
const ADMIN_USERNAME = 'RahilRaza07';
const ADMIN_PASSWORD = '@Rahil.Raza07';

// State
let isLoggedIn = false;

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    initLogin();
    initPasswordToggle();
    initTabs();
    initMobileSidebar();
    initProductModal();
});

// ============================================
// PASSWORD TOGGLE
// ============================================
function initPasswordToggle() {
    const toggle = document.getElementById('passwordToggle');
    const passwordInput = document.getElementById('password');
    
    if (!toggle || !passwordInput) return;
    
    const eyeOpen = toggle.querySelector('.eye-open');
    const eyeClosed = toggle.querySelector('.eye-closed');
    
    toggle.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eyeOpen.style.display = 'none';
            eyeClosed.style.display = 'block';
        } else {
            passwordInput.type = 'password';
            eyeOpen.style.display = 'block';
            eyeClosed.style.display = 'none';
        }
    });
}

// ============================================
// AUTHENTICATION
// ============================================
function checkAuth() {
    isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    
    if (isLoggedIn) {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('dashboard').style.display = 'flex';
        loadProducts();
        loadSubscribers();
    }
}

function initLogin() {
    const form = document.getElementById('loginForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            localStorage.setItem('adminLoggedIn', 'true');
            isLoggedIn = true;
            
            document.getElementById('loginScreen').style.display = 'none';
            document.getElementById('dashboard').style.display = 'flex';
            loadProducts();
            loadSubscribers();
            
            showToast('Welcome back, Admin!', 'success');
        } else {
            showToast('Invalid credentials', 'error');
        }
    });
    
    // Logout
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('adminLoggedIn');
        isLoggedIn = false;
        
        document.getElementById('dashboard').style.display = 'none';
        document.getElementById('loginScreen').style.display = 'flex';
        
        // Clear form
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        
        showToast('Logged out successfully', '');
    });
}

// ============================================
// TABS
// ============================================
function initTabs() {
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const tab = item.dataset.tab;
            
            // Update nav
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');
            
            // Update content
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            document.getElementById(`${tab}Tab`).classList.add('active');
            
            // Update title
            document.getElementById('pageTitle').textContent = item.textContent.trim();
            
            // Close mobile sidebar
            document.querySelector('.admin-sidebar').classList.remove('open');
        });
    });
}

// ============================================
// MOBILE SIDEBAR
// ============================================
function initMobileSidebar() {
    const toggle = document.getElementById('mobileSidebarToggle');
    const sidebar = document.querySelector('.admin-sidebar');
    
    if (toggle && sidebar) {
        toggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }
}

// ============================================
// PRODUCTS
// ============================================
function loadProducts() {
    const products = window.productsData || [];
    const tbody = document.getElementById('productsTableBody');
    
    // Update stats
    document.getElementById('totalProducts').textContent = products.length;
    document.getElementById('womenCount').textContent = products.filter(p => p.category === 'women').length;
    document.getElementById('menCount').textContent = products.filter(p => p.category === 'men').length;
    
    // Render table
    tbody.innerHTML = products.map(product => `
        <tr>
            <td>
                <div class="product-cell">
                    <img src="${product.image}" alt="${product.name}" class="product-cell-image">
                    <span class="product-cell-name">${product.name}</span>
                </div>
            </td>
            <td>${product.collection ? product.collection.replace('-', ' ').toUpperCase() : '—'}</td>
            <td>${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</td>
            <td>₹ ${product.price.toLocaleString()}</td>
            <td>
                ${product.new ? '<span class="status-badge new">New</span>' : ''}
                ${product.featured ? '<span class="status-badge featured">Featured</span>' : ''}
                ${product.originalPrice ? '<span class="status-badge sale">Sale</span>' : ''}
            </td>
            <td>
                <div class="table-actions">
                    <button class="action-btn-small" onclick="editProduct(${product.id})">Edit</button>
                    <button class="action-btn-small delete" onclick="deleteProduct(${product.id})">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// ============================================
// PRODUCT MODAL
// ============================================
function initProductModal() {
    const modal = document.getElementById('productModal');
    const addBtn = document.getElementById('addProductBtn');
    const closeBtn = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const form = document.getElementById('productForm');
    const overlay = modal.querySelector('.modal-overlay');
    
    // Open modal for new product
    addBtn.addEventListener('click', () => {
        document.getElementById('modalTitle').textContent = 'Add Product';
        form.reset();
        document.getElementById('productId').value = '';
        modal.classList.add('active');
    });
    
    // Close modal
    const closeModal = () => {
        modal.classList.remove('active');
        form.reset();
    };
    
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    // Submit form
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const productId = document.getElementById('productId').value;
        const productData = {
            name: document.getElementById('productName').value,
            category: document.getElementById('productCategory').value,
            collection: document.getElementById('productCollection').value || null,
            price: parseInt(document.getElementById('productPrice').value),
            originalPrice: document.getElementById('productOriginalPrice').value ? 
                parseInt(document.getElementById('productOriginalPrice').value) : null,
            image: document.getElementById('productImage').value,
            description: document.getElementById('productDescription').value,
            new: document.getElementById('productNew').checked,
            featured: document.getElementById('productFeatured').checked
        };
        
        if (productId) {
            // Update existing product
            const index = window.productsData.findIndex(p => p.id === parseInt(productId));
            if (index !== -1) {
                window.productsData[index] = { ...window.productsData[index], ...productData };
                localStorage.setItem('obscura_products', JSON.stringify(window.productsData));
                showToast('Product updated successfully', 'success');
            }
        } else {
            // Add new product
            const newId = Math.max(...window.productsData.map(p => p.id), 0) + 1;
            window.productsData.push({
                id: newId,
                ...productData,
                sizes: ['S', 'M', 'L', 'XL'],
                details: ['Premium quality fabric', 'Handcrafted details', 'Dry clean only']
            });
            localStorage.setItem('obscura_products', JSON.stringify(window.productsData));
            showToast('Product added successfully', 'success');
        }
        
        closeModal();
        loadProducts();
    });
}

function editProduct(id) {
    const product = window.productsData.find(p => p.id === id);
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    document.getElementById('modalTitle').textContent = 'Edit Product';
    
    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productCollection').value = product.collection || '';
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productOriginalPrice').value = product.originalPrice || '';
    document.getElementById('productImage').value = product.image;
    document.getElementById('productDescription').value = product.description || '';
    document.getElementById('productNew').checked = product.new || false;
    document.getElementById('productFeatured').checked = product.featured || false;
    
    modal.classList.add('active');
}

function deleteProduct(id) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    window.productsData = window.productsData.filter(p => p.id !== id);
    localStorage.setItem('obscura_products', JSON.stringify(window.productsData));
    
    loadProducts();
    showToast('Product deleted', '');
}

// ============================================
// SUBSCRIBERS
// ============================================
function loadSubscribers() {
    const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
    const tbody = document.getElementById('subscribersTableBody');
    
    // Update stats
    document.getElementById('totalSubscribers').textContent = subscribers.length;
    
    if (subscribers.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="3" style="text-align: center; padding: 3rem; color: var(--text-light);">
                    No subscribers yet
                </td>
            </tr>
        `;
        return;
    }
    
    // Render table
    tbody.innerHTML = subscribers.map((sub, index) => `
        <tr>
            <td>${sub.email}</td>
            <td>${sub.date ? new Date(sub.date).toLocaleDateString() : 'N/A'}</td>
            <td>
                <button class="action-btn-small delete" onclick="deleteSubscriber(${index})">Remove</button>
            </td>
        </tr>
    `).join('');
    
    // Export button
    document.getElementById('exportSubscribersBtn').addEventListener('click', exportSubscribers);
}

function deleteSubscriber(index) {
    if (!confirm('Remove this subscriber?')) return;
    
    const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
    subscribers.splice(index, 1);
    localStorage.setItem('subscribers', JSON.stringify(subscribers));
    
    loadSubscribers();
    showToast('Subscriber removed', '');
}

function exportSubscribers() {
    const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
    
    if (subscribers.length === 0) {
        showToast('No subscribers to export', 'error');
        return;
    }
    
    // Create CSV
    let csv = 'Email,Date\n';
    subscribers.forEach(sub => {
        csv += `${sub.email},${sub.date || 'N/A'}\n`;
    });
    
    // Download
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'obscura-subscribers.csv';
    a.click();
    URL.revokeObjectURL(url);
    
    showToast('CSV exported successfully', 'success');
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
