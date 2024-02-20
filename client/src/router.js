// Import the necessary functions from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

// Import the components that will be linked to the routes
import HomeComponent from './components/HomePage.vue'
import AboutPage from './components/AboutPage.vue'
import ShoppingList from './components/ShoppingList.vue'

// Define the routes for the application. Each route is mapped to a component.
const routes = [
    { path: '/', component: HomeComponent }, // When the user goes to the '/' path, the HomeComponent will be displayed
    { path: '/about', component: AboutPage }, // When the user goes to the '/about' path, the AboutPage will be displayed
    { path: '/shopping-list', component: ShoppingList }, // When the user goes to the '/about' path, the AboutPage will be displayed
    { path: '/:catchAll(.*)', redirect: '/'}
]

// Create the router instance, using the 'history' mode to avoid hash in URLs
const router = createRouter({
    history: createWebHistory(),
    routes // Pass the routes to the router
})

// Export the router instance. This will be imported in 'main.js' where it will be added to the Vue instance.
export default router