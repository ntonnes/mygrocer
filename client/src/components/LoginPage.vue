<template>
    <div class="login">
        <h1>Login</h1>
        <div class="input-container">
            <input v-model="email" type="text" placeholder="Email" />
            <input v-model="password" type="password" placeholder="Password" />
            <button @click="login">Login</button>
            <button @click="register">Register</button>
        </div>
        <transition name="fade">
            <div v-if="message" :class="messageClass">{{ message }}</div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'LoginPage',
    data() {
        return {
            email: '',
            password: '',
            message: null,
            messageType: null
        }
    },
    computed: {
        messageClass() {
            return {
                message: true,
                'message-success': this.messageType === 'success',
                'message-error': this.messageType === 'error'
            }
        }
    },
    methods: {
        async login() {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.email,
                    password: this.password
                })
            });

            if (response.ok) {
                this.showMessage('Logged in', 'success');
            } else {
                this.showMessage('Invalid username or password', 'error');
            }
        },
        async register() {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.email,
                    password: this.password
                })
            });

            if (response.status === 201) {
                this.showMessage('User registered successfully', 'success');
            } else if (response.status === 400) {
                this.showMessage('Invalid email address');
            } else if (response.status === 409) {
                this.showMessage('Email address already in use');
            } else {
                this.showMessage('Registration failed');
            }
        },
        showMessage(msg, type) {
            this.message = msg;
            this.messageType = type;
            setTimeout(() => {
                this.message = null;
            }, 3000); // Message disappears after 3 seconds
        }
    }
}
</script>

<style scoped>
.login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    font-family: Arial, sans-serif;
    padding-top: 10vh;
}

.login h1 {
    color: var(--text-color);
    margin-top: 0;
}

.input-container {
    display: flex;
    flex-direction: column;
    width: 300px;
    gap: 10px;
}

.login input, button {
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 20px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #45a049;
}

.message {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px;
    border: 1px solid #f5c6cb;
    border-radius: 4px;
}

.message-success {
    background-color: #d4edda;
    color: #155724;
    border-color: #c3e6cb;
}

.message-error {
    background-color: #f8d7da;
    color: #721c24;
    border-color: #f5c6cb;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>