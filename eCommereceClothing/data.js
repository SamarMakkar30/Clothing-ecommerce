/* ============================================
   OBSCURA - Product Data Store
   Categories: Women & Men
   ============================================ */

// Default product data with named collections
const defaultProducts = [
    // ============================================
    // WOMEN'S COLLECTION
    // ============================================
    {
        id: 1,
        name: "Silk Cascade Drape Gown",
        category: "women",
        collection: "",
        price: 89000,
        originalPrice: 95000,
        description: "A fluid silk gown with architectural draping that cascades like water. Hand-finished seams and mother-of-pearl buttons create an ethereal silhouette.",
        details: [
            "100% Mulberry Silk",
            "Hand-draped construction",
            "Mother-of-pearl buttons",
            "Concealed side zipper",
            "Dry clean only",
            "Made in India"
        ],
        sizes: ["XS", "S", "M", "L"],
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800",
        images: [
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800",
            "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800",
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800"
        ],
        limited: true,
        edition: "Limited to 15 pieces",
        new: true
    },
    {
        id: 2,
        name: "Ivory Sculptural Blazer",
        category: "women",
        collection: "",
        price: 62000,
        originalPrice: null,
        description: "A masterpiece of tailoring with sculptural shoulders and a cinched waist. The perfect blend of power and femininity.",
        details: [
            "Italian virgin wool blend",
            "Sculptural shoulder pads",
            "Single-button closure",
            "Fully lined in silk",
            "Dry clean only",
            "Made in India"
        ],
        sizes: ["XS", "S", "M", "L", "XL"],
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800",
        images: [
            "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800",
            "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800"
        ],
        limited: false,
        new: true
    },
    {
        id: 3,
        name: "Pleated Palazzo Ensemble",
        category: "women",
        collection: "",
        price: 48000,
        originalPrice: 55000,
        description: "Flowing pleated palazzo pants paired with a cropped silk blouse. Movement becomes poetry in this ensemble.",
        details: [
            "Crepe de chine fabric",
            "Permanent knife pleats",
            "Elasticated waistband",
            "High-rise fit",
            "Machine washable",
            "Made in India"
        ],
        sizes: ["S", "M", "L"],
        image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800",
        images: [
            "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800",
            "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800"
        ],
        limited: false,
        new: false
    },
    
    // ============================================
    // WOMEN'S COLLECTION
    // ============================================
    {
        id: 4,
        name: "Velvet Noir Evening Coat",
        category: "women",
        collection: "",
        price: 78000,
        originalPrice: null,
        description: "A dramatic floor-length coat in midnight velvet. The perfect statement piece for evenings that demand presence.",
        details: [
            "Silk velvet exterior",
            "Quilted silk lining",
            "Shawl collar",
            "Hidden snap closure",
            "Side pockets",
            "Dry clean only"
        ],
        sizes: ["XS", "S", "M", "L"],
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
        images: [
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800"
        ],
        limited: true,
        edition: "8 pieces worldwide",
        new: true
    },
    {
        id: 5,
        name: "Embroidered Bloom Saree",
        category: "women",
        collection: "",
        price: 125000,
        originalPrice: null,
        description: "Hand-embroidered blooms dance across this midnight blue silk saree. 200 hours of artisan craftsmanship in every piece.",
        details: [
            "Pure Banarasi silk",
            "Hand-embroidered florals",
            "Zardozi and thread work",
            "Includes matching blouse piece",
            "Dry clean only",
            "Made by master weavers"
        ],
        sizes: ["Free Size"],
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800",
        images: [
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800",
            "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800"
        ],
        limited: true,
        edition: "5 pieces",
        new: true
    },
    {
        id: 6,
        name: "Asymmetric Silk Blouse",
        category: "women",
        collection: "",
        price: 32000,
        originalPrice: 38000,
        description: "An architectural blouse with asymmetric hemline and dramatic sleeves. Where art meets fashion.",
        details: [
            "100% Silk crepe",
            "Asymmetric design",
            "Bell sleeves",
            "Back button closure",
            "Dry clean only",
            "Made in India"
        ],
        sizes: ["XS", "S", "M", "L", "XL"],
        image: "https://images.unsplash.com/photo-1551803091-e20673f15770?w=800",
        images: [
            "https://images.unsplash.com/photo-1551803091-e20673f15770?w=800"
        ],
        limited: false,
        new: false
    },
    
    // ============================================
    // MEN'S COLLECTION
    // ============================================
    {
        id: 7,
        name: "Draped Linen Kurta Set",
        category: "men",
        collection: "",
        price: 45000,
        originalPrice: null,
        description: "A contemporary kurta with draped panels and minimal aesthetic. Paired with tapered trousers for the modern gentleman.",
        details: [
            "Belgian linen",
            "Draped front panels",
            "Mother-of-pearl buttons",
            "Includes matching trousers",
            "Machine washable",
            "Made in India"
        ],
        sizes: ["S", "M", "L", "XL", "XXL"],
        image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800",
        images: [
            "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"
        ],
        limited: false,
        new: true
    },
    {
        id: 8,
        name: "Deconstructed Wool Bandhgala",
        category: "men",
        collection: "",
        price: 85000,
        originalPrice: 95000,
        description: "A deconstructed take on the classic bandhgala. Raw edges meet refined tailoring for a piece that defies convention.",
        details: [
            "Italian merino wool",
            "Deconstructed seams",
            "Mandarin collar",
            "Concealed closure",
            "Fully canvassed",
            "Made to order"
        ],
        sizes: ["S", "M", "L", "XL"],
        image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800",
        images: [
            "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"
        ],
        limited: true,
        edition: "Made to order",
        new: true
    },
    {
        id: 9,
        name: "Flowing Silk Shirt",
        category: "men",
        collection: "",
        price: 28000,
        originalPrice: null,
        description: "An oversized silk shirt with a fluid drape. Effortless elegance for those who appreciate the finer details.",
        details: [
            "100% Silk twill",
            "Relaxed fit",
            "French cuffs",
            "Shell buttons",
            "Dry clean recommended",
            "Made in India"
        ],
        sizes: ["S", "M", "L", "XL"],
        image: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=800",
        images: [
            "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=800"
        ],
        limited: false,
        new: false
    },
    
    // ============================================
    // MEN'S COLLECTION
    // ============================================
    {
        id: 10,
        name: "Velvet Sherwani - Noir",
        category: "men",
        collection: "",
        price: 145000,
        originalPrice: null,
        description: "A regal sherwani in midnight velvet with subtle tonal embroidery. For occasions that demand nothing less than extraordinary.",
        details: [
            "Silk velvet",
            "Tonal embroidery",
            "Antique gold buttons",
            "Includes churidar",
            "Silk lined",
            "Made to measure available"
        ],
        sizes: ["S", "M", "L", "XL", "XXL"],
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800",
        images: [
            "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800"
        ],
        limited: true,
        edition: "12 pieces",
        new: true
    },
    {
        id: 11,
        name: "Embroidered Nehru Jacket",
        category: "men",
        collection: "",
        price: 55000,
        originalPrice: 62000,
        description: "A contemporary Nehru jacket with intricate floral embroidery. The perfect layer for celebrations.",
        details: [
            "Raw silk base",
            "Hand embroidery",
            "Contrast silk lining",
            "Five-button front",
            "Welt pockets",
            "Dry clean only"
        ],
        sizes: ["S", "M", "L", "XL"],
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
        images: [
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"
        ],
        limited: false,
        new: false
    },
    {
        id: 12,
        name: "Textured Bandi Vest",
        category: "men",
        collection: "",
        price: 35000,
        originalPrice: null,
        description: "A textured bandi vest with contemporary cuts. Versatile enough for traditional and modern ensembles.",
        details: [
            "Jacquard fabric",
            "Textured weave",
            "Contrast piping",
            "Adjustable back",
            "Fully lined",
            "Made in India"
        ],
        sizes: ["S", "M", "L", "XL", "XXL"],
        image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800",
        images: [
            "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800"
        ],
        limited: false,
        new: true
    }
];

// Load products from localStorage or use defaults
function loadProducts() {
    try {
        const stored = localStorage.getItem('obscura_products');
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed;
            }
        }
    } catch (e) {
        console.error('Error loading products:', e);
    }
    localStorage.setItem('obscura_products', JSON.stringify(defaultProducts));
    return [...defaultProducts];
}

// Save products to localStorage
function saveProducts(products) {
    localStorage.setItem('obscura_products', JSON.stringify(products));
    window.productsData = products;
}

// Initialize global products data
window.productsData = loadProducts();

// Get product by ID
function getProductById(id) {
    return window.productsData.find(p => p.id === parseInt(id));
}

// Get products by category
function getProductsByCategory(category) {
    if (!category || category === 'all') return window.productsData;
    return window.productsData.filter(p => p.category === category);
}

// Get products by collection
function getProductsByCollection(collection) {
    if (!collection || collection === 'all') return window.productsData;
    return window.productsData.filter(p => p.collection === collection);
}

// Search products
function searchProducts(query) {
    const searchTerm = query.toLowerCase().trim();
    return window.productsData.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm) ||
        p.collection.toLowerCase().includes(searchTerm)
    );
}

// Add new product (for admin)
function addProduct(product) {
    const products = window.productsData;
    const maxId = Math.max(...products.map(p => p.id), 0);
    product.id = maxId + 1;
    products.push(product);
    saveProducts(products);
    return product;
}

// Update product (for admin)
function updateProduct(id, updates) {
    const products = window.productsData;
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index > -1) {
        products[index] = { ...products[index], ...updates, id: parseInt(id) };
        saveProducts(products);
        return products[index];
    }
    return null;
}

// Delete product (for admin)
function deleteProduct(id) {
    const products = window.productsData;
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index > -1) {
        products.splice(index, 1);
        saveProducts(products);
        return true;
    }
    return false;
}

// Reset to defaults (for admin)
function resetProducts() {
    localStorage.removeItem('obscura_products');
    window.productsData = loadProducts();
    return window.productsData;
}

// Cart functions
function getCart() {
    try {
        let cart = JSON.parse(localStorage.getItem('obscura_cart') || '[]');
        // Migrate old cart items without IDs
        let needsSave = false;
        cart = cart.map(item => {
            if (!item.id) {
                item.id = 'cart_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                needsSave = true;
            }
            return item;
        });
        if (needsSave) {
            localStorage.setItem('obscura_cart', JSON.stringify(cart));
        }
        return cart;
    } catch {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem('obscura_cart', JSON.stringify(cart));
}

function addToCart(productId, size, quantity = 1) {
    const cart = getCart();
    const existingIndex = cart.findIndex(item => 
        item.productId === productId && item.size === size
    );
    
    if (existingIndex > -1) {
        cart[existingIndex].quantity += quantity;
    } else {
        // Generate unique ID for cart item
        const id = 'cart_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        cart.push({ id, productId, size, quantity });
    }
    
    saveCart(cart);
    return cart;
}

function removeFromCart(productId, size) {
    let cart = getCart();
    cart = cart.filter(item => 
        !(item.productId === productId && item.size === size)
    );
    saveCart(cart);
    return cart;
}

function updateCartQuantity(productId, size, quantity) {
    const cart = getCart();
    const index = cart.findIndex(item => 
        item.productId === productId && item.size === size
    );
    
    if (index > -1) {
        if (quantity <= 0) {
            cart.splice(index, 1);
        } else {
            cart[index].quantity = quantity;
        }
        saveCart(cart);
    }
    return cart;
}

function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => {
        const product = getProductById(item.productId);
        if (product) {
            total += product.price * item.quantity;
        }
        return total;
    }, 0);
}

function getCartCount() {
    const cart = getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
}

function clearCart() {
    localStorage.removeItem('obscura_cart');
}

// Make functions globally available
window.productsData = window.productsData;
window.getProducts = function() { return window.productsData || []; };
window.getProductById = getProductById;
window.getProductsByCategory = getProductsByCategory;
window.getProductsByCollection = getProductsByCollection;
window.searchProducts = searchProducts;
window.addProduct = addProduct;
window.updateProduct = updateProduct;
window.deleteProduct = deleteProduct;
window.resetProducts = resetProducts;
window.getCart = getCart;
window.saveCart = saveCart;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.getCartTotal = getCartTotal;
window.getCartCount = getCartCount;
window.clearCart = clearCart;
