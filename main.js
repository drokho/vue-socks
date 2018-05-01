Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
        <div class="product">
                
                <div class="product-image">
                    <img :src="image">
                        <div v-for="(variant, index) in variants" 
                             :key="variant.variantId"
                             class="color-box" 
                             :style="{ backgroundColor:variant.variantColor }"
                              @mouseover="updateProduct(index)">
                        </div>
                </div>
                
                <div class="product-info">
                    <h1>{{ title }}</h1>
                    <p v-show="onSale">On Sale!</p>
                    
                    <p v-show="inventory">InStock. Quantity: {{ inventory }}</p>
                    <p v-show="!inventory" :class="{ outOfStock: !inventory }">Out of Stock</p>
                    <p>Shipping: {{ shipping }}</p>
                   
                    <a :href="link">Reviews on Google</a>
                    
                    <product-details :details="details"></product-details>
                    
                    
                    
                    <div>Available Sizes:</div>
                    <ul class="sizes">
                        <li v-for="size in sizes" :key="size.sizeId">
                            {{ size.sizeName }}
                        </li>
                    </ul>
                    
                    <div>
                        <button 
                                    @click="addToCart"
                                    class="add" 
                                    :disabled="!inventory"
                                    :class="{ disabledButton: !inventory }"
                                >Add to Cart</button>

                        <button 
                                @click="removeItem"
                                class="remove" 
                        >Remove Item</button>
                    </div>

                    
                    
                </div>
                
            </div>
    `,
    data() { 
        return  {
            brand: "Vue Mastery",
            product: "Socks",
            selectedVariant: 0,
            link: 'https://www.google.com',
            details: ["80% cotton", "20% polyester", "Gender-neutral"],
            onSale: true,
            variants: [
                {
                    variantId: 2234,
                    variantColor: "green",
                    variantImage: "images/vmSocks-green-onWhite_preview.jpeg",
                    variantStock: 10
                },
                {
                    variantId: 2235,
                    variantColor: "blue",
                    variantImage: "images/vmSocks-blue-onWhite_preview.jpeg",
                    variantStock: 2
                }
            ],
            sizes: [
                {
                    sizeId: 1,
                    sizeName: "Small"
                }, 
                {
                    sizeId: 2,
                    sizeName: "Medium"
                },
                {
                    sizeId: 3,
                    sizeName: "Large"
                }
            ]
        }
    },
       
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },
        removeItem() {
            
                this.$emit('remove-item', this.variants[this.selectedVariant].variantId);
            

        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        }

    },
    computed: {
        title() {
            return this.brand + " " + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inventory() {
            return this.variants[this.selectedVariant].variantStock
        },
        shipping() {
            if(this.premium)
                return "Free"
            else
                return "$2.99"
        }
    }
    
})

Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
    `
})


var app = new Vue({
    el: '#app',
    data: {
        premium: false,
        cart: []
    },
    methods: {
        addToCart(id) {
            this.cart.push(id)
        },
        removeItem(id) {
            for(var i = this.cart.length - 1; i >= 0; i--) {
            if (this.cart[i] === id) {
               this.cart.splice(i, 1);
            }
          }
        }
    }
    
})