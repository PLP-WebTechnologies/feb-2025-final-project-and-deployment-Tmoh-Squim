# Final Project and Deployment

## Objectives
Build a fully functional web application.
Apply HTML, CSS, and JavaScript concepts learned.
Deploy the project using GitHub Pages, Netlify, or Vercel.

## Instructions
Choose one of the following project ideas:
Blog Website: Implement a multi-page site with navigation.
Ecommerce Website: Implement a multi-page site with navigation.

>[!NOTE]
> - Include at least:
> - A responsive design.
> - JavaScript interactivity.
> - A deployment link.

## Tasks

Create a well-structured HTML5 document.
Use at least 5 different HTML elements.
Ensure semantic correctness.

Good luck and happy coding! 🚀💻


Okay, here's a real-world documentation example you can add to your GitHub repository for your static e-commerce website hosted on GitHub Pages, featuring "add to cart" and "view cart" functionalities. This documentation is typically added as a `README.md` file in the root of your repository.

```markdown
# Static E-commerce Website

[![GitHub Pages](https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME/actions/workflows/pages/pages-build-deployment/badge.svg)](https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPOSITORY_NAME)

## Overview

This is a simple, static e-commerce website built using HTML, CSS, and JavaScript. It allows users to browse products, add them to a shopping cart, and view the contents of their cart. The website is hosted on GitHub Pages.

**Key Features:**

* **Product Catalog:** Displays a list of available products with details like name, price, and image.
* **Add to Cart:** Users can easily add products to their virtual shopping cart.
* **View Cart:** A dedicated page to view the items added to the cart, including quantities and the total price.
* **Local Storage:** The shopping cart data is persisted locally using the browser's `localStorage`.
* **Static Content:** The website is built with static files, making it fast and easy to deploy on platforms like GitHub Pages.

## Technologies Used

* **HTML:** For structuring the website content.
* **CSS:** For styling the website and making it visually appealing.
* **JavaScript:** For implementing the interactive features like adding to cart and managing the shopping cart.

## File Structure

```

├── index.html             \# Homepage with product listings
├── product.html           \# Template or specific page for individual products (if applicable)
├── cart.html              \# Page displaying the shopping cart
├── css/
│   └── style.css          \# Main stylesheet
├── js/
│   └── script.js          \# Main JavaScript file for interactivity
│   └── cart.js            \# JavaScript file for cart-related functionality
├── assets/
│   ├── images/            \# Contains product images and other assets
│   └── data/              \# (Optional) Contains product data (e.g., products.json)
└── README.md            \# This documentation file

````

## Setup and Deployment

This website is designed to be hosted on GitHub Pages. Here's how to set it up:

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/PLP-WebTechnologies/feb-2025-final-project-and-deployment-Tmoh-Squim.git
    cd YOUR_REPOSITORY_NAME
    ```

2.  **Ensure Correct File Structure:** Verify that your HTML, CSS, and JavaScript files are organized as shown in the "File Structure" section.

3.  **Enable GitHub Pages:**
    * Go to your repository on GitHub.
    * Navigate to **Settings** > **Pages**.
    * Under the **Source** section, select **Branch: main** (or your main branch name) and choose the `/ (root)` directory.
    * Click **Save**.

4.  **Access Your Website:** Your website will be live at `https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPOSITORY_NAME`. It might take a few minutes for the changes to propagate.

## Functionality Details

### Adding to Cart

* On the product listing or product detail pages, users will find an "Add to Cart" button (or similar).
* When a user clicks this button, the JavaScript code in `js/script.js` (or a related file) will:
    * Identify the unique product ID of the item being added.
    * Store this product ID (and potentially the quantity) in the browser's `localStorage` under a specific key (e.g., `'cartItems'`).
    * Provide visual feedback to the user that the item has been added (e.g., a notification or a change in a cart icon).

    ```javascript
    // Example (simplified) from js/script.js
    function addToCart(productId) {
      let cart = localStorage.getItem('cartItems');
      cart = cart ? JSON.parse(cart) : [];
      cart.push(productId); // Or store as { id: productId, quantity: 1 }
      localStorage.setItem('cartItems', JSON.stringify(cart));
      alert('Product added to cart!');
      updateCartBadge(); // Function to update a cart icon if present
    }
    ```

### Viewing the Cart

* The `cart.html` page displays the items that the user has added to their cart.
* The JavaScript code in `js/cart.js` (or `js/script.js`) will:
    * Retrieve the cart data from `localStorage` using the same key used when adding items.
    * Parse the JSON data to get the list of product IDs (and quantities, if stored).
    * (Optionally) Fetch product details (name, price, image) based on these IDs. This might involve:
        * Looking up data from a JavaScript array or object defined within the script.
        * Reading from a `products.json` file (if implemented).
    * Dynamically generate the HTML elements to display each item in the cart, including its name, quantity, and price.
    * Calculate and display the total price of all items in the cart.
    * Provide functionality to update quantities or remove items from the cart (which would also update `localStorage`).

    ```javascript
    // Example (simplified) from js/cart.js
    document.addEventListener('DOMContentLoaded', function() {
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const cartContainer = document.getElementById('cart-items-container');
      let totalPrice = 0;

      if (cartItems.length > 0) {
        // Assuming you have a way to get product details by ID
        cartItems.forEach(productId => {
          const product = getProductDetails(productId); // Replace with your actual logic
          if (product) {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.textContent = `${product.name} - $${product.price}`;
            cartContainer.appendChild(cartItemDiv);
            totalPrice += product.price; // Assuming quantity is 1 for simplicity
          }
        });
        document.getElementById('cart-total').textContent = `Total: $${totalPrice.toFixed(2)}`;
      } else {
        cartContainer.textContent = 'Your cart is empty.';
      }
    });
    ```

## Contributing

If you'd like to contribute to this project, feel free to:

* Fork the repository.
* Create a new branch for your feature or bug fix.
* Make your changes and commit them.
* Push your changes to your fork.
* Submit a pull request.

## License

[Specify your license here, e.g., MIT License]

---

This documentation provides a good overview of your static e-commerce website's functionality and setup for anyone viewing your GitHub repository. Remember to replace the placeholder URLs and code snippets with your actual implementation details. You can also expand on specific aspects as needed.
````