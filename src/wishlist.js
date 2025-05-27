import { addToCart } from "./addToCart";

	
	document.addEventListener("DOMContentLoaded", () => {
	  const wishlistContainer = document.getElementById("wishlist-products");
	  const template = document.getElementById("wishlistCardTemplate");
	  
	  if (!wishlistContainer || !template) {
			console.warn("wishlistContainer or wishlistCardTemplate not found in the DOM.");
			return;
		}

	  let wishlistData = JSON.parse(localStorage.getItem("wishlist")) || [];
	
	  function renderWishlist() {
		wishlistContainer.innerHTML = ""; // Clear existing
		wishlistData.forEach(product => {
		  const clone = template.content.cloneNode(true);
	
		  clone.querySelector(".product-image").src = product.productImage;
		  clone.querySelector(".product-name").textContent = product.productName;
		  clone.querySelector(".product-mrp").innerHTML = `<del>$${parseFloat(product.mrp).toFixed(2)}</del>`;
		  clone.querySelector(".product-price").textContent = `$${parseFloat(product.price).toFixed(2)}`;
		  clone.querySelector(".addtocart").setAttribute("data-id", product.id);

            // 👇 Add unique card ID and required structure for addToCart.js
            const card = clone.querySelector(".prodcard");
            card.setAttribute("id", `card${product.id}`);
            card.classList.add("product-card");

            // Add required classes/structure for `addToCart.js`
            clone.querySelector(".product-name").classList.add("productname");
            clone.querySelector(".product-image").classList.add("productimg");

            // Add a default quantity and price structure for compatibility
            const quantitySpan = document.createElement("span");
            quantitySpan.className = "quantityvalue";
            quantitySpan.style.display = "none";
            quantitySpan.textContent = "1"; // Default quantity
            card.appendChild(quantitySpan);

            const actualPriceSpan = document.createElement("span");
            actualPriceSpan.className = "actualprice";
            actualPriceSpan.style.display = "none";
            actualPriceSpan.textContent = `$${parseFloat(product.price).toFixed(2)}`;
            card.appendChild(actualPriceSpan);

		  clone.querySelector(".viewbtn").href = `product-details.html?id=${product.id}`;

		  clone.querySelector('.addtocart').addEventListener('click', (event) => {
            console.log("add to cart clicked");
        
            const id = product.id;
            const stock = product.stock || 10; // Default to 10 if stock not defined
            addToCart(event, id, stock);
        
            // Optional: Redirect to cart page
            setTimeout(() => {
                window.location.href = "cart.html";
            }, 100);
        });
		  // Set data-id on the remove icon
		  clone.querySelector(".wishlist-remove").setAttribute("data-id", product.id);
	
		  wishlistContainer.appendChild(clone);
		});
	
		// Add event listeners to remove buttons
		document.querySelectorAll(".wishlist-remove").forEach(button => {
		  button.addEventListener("click", (e) => {
			const productId = button.getAttribute("data-id");
			wishlistData = wishlistData.filter(item => item.id !== productId);
			localStorage.setItem("wishlist", JSON.stringify(wishlistData));
			renderWishlist(); // Re-render the list
		  });
		});
	  }
	
	  renderWishlist();
	});