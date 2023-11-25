import * as path from "path";
import { defineConfig } from 'vite'

export default defineConfig({
  root: path.resolve(__dirname, "src"),
  base: "http://turing.cs.ttu.ee/teeleht/",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "src/index.html"),
        products: path.resolve(__dirname, "src/products/products.html"),
        product: path.resolve(__dirname, "src/product/product.html"),
        cart: path.resolve(__dirname, "src/cart/cart.html"),
        about: path.resolve(__dirname, "src/about/about.html"),
        checkout: path.resolve(__dirname, "src/checkout/checkout.html"),
        confirmation: path.resolve(
          __dirname,
          "src/confirmation/confirmation.html"
        ),
      },
    },
  },
  publicDir: "public",
  resolve: {
    alias: {
      "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
    },
  },
  server: {
    port: 8080,
    hot: true,
  },
});
