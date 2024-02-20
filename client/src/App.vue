<template>
  <div id="app" :class="theme">
    <header>
      <h1><span class="font-one">My</span><span class="font-two">Grocer</span></h1>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/shopping-list">Shopping List</router-link>
        <label class="switch">
          <input type="checkbox" v-model="isDarkMode" @change="toggleTheme">
          <span class="slider round"></span>
        </label>
      </nav>
    </header>
    <hr />
    <router-view/>
    <div class="footer-container"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme: localStorage.getItem('theme') || 'light',
    };
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', this.theme);
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&family=Roboto+Slab:wght@300;400;700&display=swap');

#app {
  color: var(--text-color);
  background-color: var(--background-color);
}
body {
  margin: 0;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-color);
  background-color: var(--background-color);
}

header {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
}

header h1 {
  padding-top: 5%;
  padding-bottom: 2%;
  padding-right: 20%;
  margin: 0;
  font-size: 2em;
  font-weight: bold;
}

header h1 .font-one {
  font-family: 'Roboto Condensed', sans-serif;
  color:rgb(1, 157, 1)
}

header h1 .font-two {
  font-family: 'Roboto Slab', serif;
  color:var(--text-color)
}

nav {
  padding-top: 3%;
  font-weight: bold;
  color: var(--text-color);
  font-family: 'Roboto Condensed', sans-serif; /* Match the font with the header */
  display: flex;
  justify-content: space-around; /* Space out the links */
}

nav a {
  font-size: 1.3em;
  color: var(--text-color);
  text-decoration: none;
}

nav a:hover {
  color: rgb(1, 157, 1); /* Change the text to green on hover */
}

hr {
  border: none;
  border-top: 2px solid var(--text-color);
  width: 90%;
  margin: auto;
}

.light {
  --text-color: #2c3e50;
  --background-color: #ECF0F1;
}

.dark {
  --text-color: #ECF0F1;
  --background-color: #2c3e50;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #717171;
  transition: .4s;
}

.slider.round {
  border-radius: 30px;
}

.slider.round:before {
  border-radius: 50%;
}

.footer-container {
  grid-column: 1 / -1;
  min-height: 100vh;
  background-color: var(--background-color)
}
</style>