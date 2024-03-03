import './assets/main.css'

import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import Home from './pages/Home.vue'
import Favorite from './pages/Favorite.vue'

const app = createApp(App)

const routes = [
    {path: '/', name: 'Home', component: Home},
    {path: '/favorites', name: 'Favorite', component: Favorite},
    
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

app.use(router)
app.use(autoAnimatePlugin)
app.mount('#app')
