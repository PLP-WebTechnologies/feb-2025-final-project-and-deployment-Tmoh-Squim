document.addEventListener('DOMContentLoaded', () => {
    // --- Cart Functionality ---
    const cart = []; // In a real app, this might come from localStorage
    const cartCountElement = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    function updateCartCount() {
        if (cartCountElement) {
            cartCountElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        }
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.dataset.productId;
            const productName = event.target.dataset.productName;
            const productPrice = parseFloat(event.target.dataset.productPrice);
            const productImage = event.target.dataset.productImage;

            const existingProductIndex = cart.findIndex(item => item.id === productId);

            if (existingProductIndex > -1) {
                cart[existingProductIndex].quantity += 1;
            } else {
                cart.push({ id: productId, name: productName,image:productImage, price: productPrice, quantity: 1 });
            }

            updateCartCount();
            localStorage.setItem('shoppingCart', JSON.stringify(cart));
            alert(`${productName} added to cart!`);
        });
    });

    // Initialize cart count if loading from localStorage
     const savedCart = JSON.parse(localStorage.getItem('shoppingCart'));
     if (savedCart) {
         cart.push(...savedCart);
         updateCartCount();
     }

    // --- Price Range Filter Display ---
    const priceRangeInput = document.getElementById('price-range');
    const priceValueElement = document.getElementById('price-value');

    if (priceRangeInput && priceValueElement) {
        // Set initial value
        priceValueElement.textContent = `$${priceRangeInput.value}`;

        priceRangeInput.addEventListener('input', (event) => {
            priceValueElement.textContent = `$${event.target.value}`;
            // Here you would add logic to filter products based on this value
        });
    }

    // --- Mobile Navigation (Example from Blog, adapt if needed) ---
    const navToggle = document.querySelector('.nav-toggle'); // You'd need to add this button to your HTML
    const mainNav = document.querySelector('header nav');
    const body = document.body;

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            body.classList.toggle('nav-open'); // Add .nav-open class to body
            // CSS would then handle showing/hiding mainNav and animating the toggle
        });
    }

    // You would need to implement functions to:
    // - Display products on the cart.html page
    // - Allow removal/quantity updates on cart.html
    // - Implement actual filtering logic for product-grid
});

//cart js
// js/cart.js
document.addEventListener('DOMContentLoaded', () => {
    const cartItemsList = document.getElementById('cart-items-list');
    const cartSummarySubtotal = document.getElementById('summary-subtotal');
    const cartSummaryTotal = document.getElementById('summary-total');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartContainer = document.getElementById('cart-container'); // For showing/hiding summary
    const cartSummaryElement = document.getElementById('cart-summary');

    // Function to get cart from localStorage
    function getCart() {
        return JSON.parse(localStorage.getItem('shoppingCart')) || [];
    }

    // Function to save cart to localStorage
    function saveCart(cart) {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        updateCartCountHeader(); // Update header count whenever cart is saved
    }

    // Function to update cart count in the header (needs to be accessible globally or duplicated in main.js)
    function updateCartCountHeader() {
        const cart = getCart();
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        }
    }

    // Function to render cart items on the page
    function renderCartItems() {
        const cart = getCart();
        cartItemsList.innerHTML = ''; // Clear existing items

        if (cart.length === 0) {
            if (emptyCartMessage) emptyCartMessage.style.display = 'block';
            if (cartItemsList) cartItemsList.style.display = 'none';
            if (cartSummaryElement) cartSummaryElement.style.display = 'none';
        } else {
            if (emptyCartMessage) emptyCartMessage.style.display = 'none';
            if (cartItemsList) cartItemsList.style.display = 'flex'; // Or 'block' depending on your layout needs
            if (cartSummaryElement) cartSummaryElement.style.display = 'block';


            cart.forEach(item => {
                const itemSubtotal = item.price * item.quantity;
                const cartItemElement = document.createElement('article');
                cartItemElement.classList.add('cart-item');
                cartItemElement.dataset.productId = item.id; // Store product ID

                cartItemElement.innerHTML = `
                    <img src="${item.image || 'images/placeholder.png'}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                        <div class="cart-item-quantity">
                            <label for="quantity-${item.id}">Qty:</label>
                            <input type="number" id="quantity-${item.id}" value="${item.quantity}" min="1" class="item-quantity-input" data-product-id="${item.id}">
                        </div>
                    </div>
                    <div class="cart-item-actions">
                        <p class="cart-item-subtotal">Subtotal: $${itemSubtotal.toFixed(2)}</p>
                        <button class="remove-item-btn" data-product-id="${item.id}">Remove</button>
                    </div>
                `;
                cartItemsList.appendChild(cartItemElement);
            });
        }
        updateCartSummary();
        addEventListenersToCartItems();
    }

    // Function to update the order summary
    function updateCartSummary() {
        const cart = getCart();
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        // For simplicity, total is same as subtotal. Real app would add shipping, taxes.
        const total = subtotal;

        if (cartSummarySubtotal) cartSummarySubtotal.textContent = `$${subtotal.toFixed(2)}`;
        if (cartSummaryTotal) cartSummaryTotal.textContent = `$${total.toFixed(2)}`;
    }

    // Function to handle quantity changes
    function handleQuantityChange(productId, newQuantity) {
        let cart = getCart();
        const productIndex = cart.findIndex(item => item.id === productId);

        if (productIndex > -1) {
            cart[productIndex].quantity = parseInt(newQuantity, 10);
            if (cart[productIndex].quantity < 1) { // Ensure quantity doesn't go below 1
                cart[productIndex].quantity = 1;
            }
        }
        saveCart(cart);
        renderCartItems(); // Re-render to update subtotals and summary
    }

    // Function to handle item removal
    function handleRemoveItem(productId) {
        let cart = getCart();
        cart = cart.filter(item => item.id !== productId);
        saveCart(cart);
        renderCartItems(); // Re-render the cart
    }

    // Function to add event listeners to dynamically created cart items
    function addEventListenersToCartItems() {
        // Event listeners for "Remove" buttons
        document.querySelectorAll('.remove-item-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.productId;
                handleRemoveItem(productId);
            });
        });

        // Event listeners for quantity inputs
        document.querySelectorAll('.item-quantity-input').forEach(input => {
            input.addEventListener('change', (event) => { // 'change' or 'input'
                const productId = event.target.dataset.productId;
                const newQuantity = event.target.value;
                handleQuantityChange(productId, newQuantity);
            });
        });
    }

    // Initial render
    renderCartItems();
    updateCartCountHeader(); // Ensure header count is correct on page load

    // Checkout button (placeholder action)
    const checkoutButton = document.getElementById('checkout-btn');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            const cart = getCart();
            if (cart.length > 0) {
                alert('Proceeding to checkout \nYour cart: ' + JSON.stringify(cart, null, 2));
                // Potentially clear cart after "checkout" for demo purposes
                // saveCart([]);
                // renderCartItems();
            } else {
                alert('Your cart is empty!');
            }
        });
    }
});