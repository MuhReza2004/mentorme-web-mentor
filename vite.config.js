import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import javascriptObfuscator from "vite-plugin-javascript-obfuscator";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    process.env.NODE_ENV === "production" ? javascriptObfuscator() : null, // Obfuscate hanya di production
  ].filter(Boolean), // Hapus nilai null dari array plugin
});
