<template>
    <div class="about">
        <h1>About Us</h1>
        <p>This is a simple about page for our Vue application.</p>
        <p>We are a team of passionate developers building the best application ever.</p>
        <router-link to="/">Go to Home</router-link>
    </div>
</template>

<script>
export default {
    name: 'AboutPage'
}
</script>

<style scoped>
#app {
  color: var(--text-color);
  background-color: var(--background-color);
}
.about {
    text-align: center;
    margin-top: 50px;
}
</style>