import { defineConfig } from 'vite'
import { resolve } from 'path'
export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                home: resolve(__dirname, 'index.html'),
                login: resolve(__dirname, 'login.html'),
                posts: resolve(__dirname, 'posts.html'),
                landingpage: resolve(__dirname, 'landingpage.html'),
                signup: resolve(__dirname, 'signup.html'),
                createpost: resolve(__dirname, 'createpost.html'),
                singlepost: resolve(__dirname, 'single-post.html'),
                edit: resolve(__dirname, 'edit.html'),
            },
        },
    }
});