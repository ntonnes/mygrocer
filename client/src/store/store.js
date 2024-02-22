import { createStore } from 'vuex';

export default createStore({
    state: {
        user: null,
        isLoggedIn: false, // Add this line
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setIsLoggedIn(state, isLoggedIn) { // Add this mutation
            state.isLoggedIn = isLoggedIn;
        },
    },
});