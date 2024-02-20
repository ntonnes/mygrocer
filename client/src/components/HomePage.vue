<template>
    <div class="home-page">
        <transition name="fade" appear>
            <h1 class="site-name" v-if="showSiteName">MyGrocer</h1>
        </transition>
        <transition-group name="fade" tag="div" class="router-links" appear>
            <router-link v-if="showLinks" to="/" key="home" class="link">Home</router-link>
            <router-link v-if="showLinks" to="/about" key="about" class="link">About</router-link>
            <router-link v-if="showLinks" to="/shopping-list" key="shopping-list" class="link">Shopping List</router-link>
        </transition-group>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showSiteName: false,
            showLinks: false
        };
    },
    mounted() {
        setTimeout(() => {
            this.showSiteName = true;
        }, 1000); // Delay of 1 second
        setTimeout(() => {
            this.showLinks = true;
        }, 2000); // Delay of 2 seconds
    }
};
</script>

<style scoped>
@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

.home-page {
    background: url('../assets/saby.jpg') no-repeat center center fixed;
    background-size: cover;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding-left: 50px;
    color: #4CAF50; /* Adjust to match your theme */
}

.site-name {
    font-size: 3em;
    text-align: left;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.fade-enter-to, .fade-leave {
  opacity: 1;
}

.router-links {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.link {
    font-size: 2em;
    text-decoration: none;
    color: inherit;
}
</style>