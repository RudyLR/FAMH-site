document.addEventListener("DOMContentLoaded", () => {
    updateCartDisplay();
    setupCartButtons();
  
    const clearCartBtn = document.getElementById("clearCart");
    if (clearCartBtn) {
      clearCartBtn.addEventListener("click", () => {
        localStorage.removeItem("cart");
        updateCartDisplay();
        updateCart();
      });
    }
  
    const checkoutBtn = document.getElementById("checkout");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        if (cart.length === 0) {
          alert("Your cart is empty.");
        } else {
          alert("Thank you for your purchase!");
          localStorage.removeItem("cart");
          updateCartDisplay();
          updateCart();
        }
      });
    }
  });
  
  function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCountEL = document.getElementById("cartCount");
    const cartTotalEL = document.getElementById("cartTotal");
  
    let total = 0;
    cart.forEach(item => total += item.price);
  
    if (cartCountEL) cartCountEL.textContent = cart.length;
    if (cartTotalEL) cartTotalEL.textContent = total.toFixed(2);
  }
  
  function updateCart() {
    const cartItemsEL = document.getElementById("cartItems");
    const cartTotalEL = document.getElementById("cartTotal");
    const cartCountEL = document.getElementById("cartCount");
  
    if (!cartItemsEL || !cartTotalEL || !cartCountEL) return;
  
    cartItemsEL.innerHTML = "";
    let total = 0;
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    if (cart.length === 0) {
      cartTotalEL.textContent = "0.00";
      cartCountEL.textContent = "0";
      return;
    }
  
    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
  
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.onclick = () => {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
        updateCartDisplay();
      };
  
      li.appendChild(removeBtn);
      cartItemsEL.appendChild(li);
      total += item.price;
    });
  
    cartTotalEL.textContent = total.toFixed(2);
    cartCountEL.textContent = cart.length;
  }
  
  function setupCartButtons() {
    document.querySelectorAll(".cart-button").forEach((button) => {
      const newButton = button.cloneNode(true);
      button.parentNode.replaceChild(newButton, button);
  
      newButton.addEventListener("click", () => {
        const name = newButton.getAttribute("data-name");
        const price = parseFloat(newButton.getAttribute("data-price"));
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
        cart.push({ name, price });
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();
        updateCart();
      });
    });
  }
  
  // Add to Cart Buttons
  document.querySelectorAll(".cart-button").forEach((button) => {
    button.addEventListener("click", () => {
      const name = button.getAttribute("data-name");
      const price = parseFloat(button.getAttribute("data-price"));
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push({ name, price });
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCart();
    });
  });
  
  // Clear Cart Button
  const clearCartBtn = document.getElementById("clearCart");
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
      localStorage.removeItem("cart");
      updateCart();
    });
  }
  
  // Checkout Button
  const checkoutBtn = document.getElementById("checkout");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      if (cart.length === 0) {
        alert("Your cart is empty.");
      } else {
        alert("Thank you for your purchase!");
        localStorage.removeItem("cart");
        updateCart();
      }
    });
  }
  
  // Initial Load
  updateCart();
  
