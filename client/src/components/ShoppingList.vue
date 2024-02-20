<template>
    <div class="shopping-list">
        <h1>Shopping List</h1>
        <div class="input-container">
            <input class="quantity-input" type="number" v-model="newQuantity" min="1" placeholder="Quantity" />
            <input v-model="newItem" @keyup.enter="addItem" placeholder="Add new item" />
            <button @click="addItem">Add</button>
        </div>
        <ul>
            <li v-for="(item, index) in items" :key="index">
                <div class="item-container">
                    <span class="item-name">{{ item.name }} [{{ item.quantity }}]</span>
                    <span class="delete" @click="deleteItem(index)">X</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'ShoppingList',
    data() {
        return {
            newItem: '',
            newQuantity: 1,
            items: []
        }
    },
    methods: {
        addItem() {
            if (this.newItem !== '' && this.newQuantity > 0) {
                const existingItem = this.items.find(item => item.name.toLowerCase() === this.newItem.toLowerCase());
                if (existingItem) {
                    existingItem.quantity += this.newQuantity;
                } else {
                    this.items.push({ name: this.newItem, quantity: this.newQuantity });
                }
                this.newItem = '';
                this.newQuantity = 1;
            }
        },
        deleteItem(index) {
            this.items.splice(index, 1);
        },
        increaseQuantity(index) {
            this.items[index].quantity++;
        },
        decreaseQuantity(index) {
            if (this.items[index].quantity > 1) {
                this.items[index].quantity--;
            }
        }
    }
}
</script>

<style scoped>

.item-name {
    flex-grow: 1;
}

.shopping-list {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    grid-template-rows: 1fr 1f;
    text-align: top;
    margin-top: 50px;
    font-family: Arial, sans-serif;
}

/* The rest of your styles remain the same */

.input-container {
    grid-column: 2;
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 10px;
    align-items: center;
}

.quantity-input {
    grid-column: 1;
    width: 50px;
}

.shopping-list h1 {
    color: var(--text-color);
    grid-column: 2;
}

.shopping-list input {
    margin-bottom: 20px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.shopping-list ul {
    list-style-type: none;
    padding: 0;
    width: 100%;
    margin: 0 auto;
    grid-column: 2;
    color:black;
}

.shopping-list li {
    position: relative;
    background-color: #f9f9f9;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
    word-wrap: break-word;
}

.shopping-list .delete {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: darkgrey;
    cursor: pointer;
    transition: color 0.3s;
    font-weight: bold; /* Make the "X" thicker */
}

button {
    background-color: #4CAF50;
    color: white;
    font-size: 16px;
    margin-bottom: 20px;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
background-color: #45a049;
}


.shopping-list .delete:hover {
    color: red;
}
</style>