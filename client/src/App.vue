<template>
  <div id="app" :class="theme">
    <header>
      <h1><span class="font-one">My</span><span class="font-two">Grocer</span></h1>
      <nav class="nav-style">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/shopping-list">Shopping List</router-link>
        <span v-if="isLoggedIn" class="dropdown">
          <button class="nav-link" @click="toggleDropdown">
            Hi, {{ userEmail }}! 
            <i class="arrow" :class="{ 'down': !dropdownOpen, 'up': dropdownOpen }"></i>
          </button>
          <div id="dropdown-content" class="dropdown-content" :class="{ 'show-dropdown': dropdownOpen }">
            <router-link to="/account-settings">Account Settings</router-link>
            <router-link to="/preferences">Preferences</router-link>
            <a href="#" @click="signOut">Sign Out</a>
          </div>
        </span>
        <router-link v-else to="/login">Login</router-link>
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
import { mapState } from 'vuex';

export default {
  data() {
    return {
      dropdownOpen: false,
      theme: localStorage.getItem('theme') || 'light',
    };
  },
  computed: {
    ...mapState(['user']), // Map the 'user' state to a computed property
    isLoggedIn() {
      return this.user !== null; // The user is logged in if 'user' is not null
    },
    userEmail() {
      return this.user ? this.user.email : ''; // Return the user's email if the user is logged in
    },
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', this.theme);
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    signOut() {
      // Add your sign out logic here
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

.nav-style {
  padding-top: 3%;
  font-weight: bold;
  color: var(--text-color);
  font-family: 'Roboto Condensed', sans-serif; /* Match the font with the header */
  display: flex;
  justify-content: space-around; /* Space out the links */
  align-items: center; /* Center the links vertically */
}

nav a {
  font-size: 1.3em;
  color: var(--text-color);
  text-decoration: none;
}

nav a:hover {
  color: rgb(1, 157, 1); /* Change the text to green on hover */
}

.nav-link {
  font-size: 1.3em;
  color: var(--text-color);
  text-decoration: none;
  background-color: inherit;
  border: none;
  font-family: inherit;
  font-weight: inherit;
}

.nav-link:hover {
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

.dropdown {
  position: relative;
}

.dropdown-content {
  position: absolute;
  width: 100%;
  display: none;
  min-width: 160px;
  z-index: 1;
  transition: max-height 0.2s ease-out;
  overflow: hidden;
  max-height: 0;
  background-color: var(--background-color);
}

.dropdown-content a {
  color: var(--text-color); /* Match the text color with the header */
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  font-size: 1em; /* Smaller font size */
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
  color: rgb(1, 157, 1); /* Change the text to green on hover */
}

.show-dropdown {
  display: block;
  top: 100%;
  max-height: 200px;
}

.arrow {
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  margin-left: 5px; /* Add some space to the left of the arrow */
  transition: transform 0.3s ease; /* Smooth transition for the rotation */
}

.down {
  transform: rotate(45deg);
}

.up {
  transform: rotate(-135deg);
}


.footer-container {
  grid-column: 1 / -1;
  min-height: 100vh;
  background-color: var(--background-color)
}
</style>