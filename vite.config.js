import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        shop: resolve(__dirname, 'shop.html'),
        productDetails: resolve(__dirname, 'product-details.html'),
        cart: resolve(__dirname, 'cart.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
        wishlist: resolve(__dirname, 'wishlist.html'),
        checkout: resolve(__dirname, 'checkout.html'),
        signIn: resolve(__dirname, 'sign-in.html'),
        signUp: resolve(__dirname, 'signup.html'), 
        thankYou: resolve(__dirname, 'thank-you.html') 
      }
    }
  }
});
