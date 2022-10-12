import { defineConfig } from 'vite'
import { resolve } from 'path'
export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                home: resolve(__dirname, 'index.html'),
                login: resolve(__dirname, 'login.html'),
                posts: resolve(__dirname, 'posts.html'),
                landingPage: resolve(__dirname, 'landingPage.html'),
            },
        },
    }
});