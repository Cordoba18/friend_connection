import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [

                //-------------CSS------------------
                'resources/css/form.css',
                'resources/css/home.css',
                'resources/css/detailsprofile.css',
                 //-------------JS------------------
                'resources/js/app.js',
                'resources/js/home.js',
                'resources/js/register.js',
                'resources/js/login.js',
                'resources/js/header.js'

            ],
            refresh: true,
        }),
    ],
});
