// ================== ДОПОМОЖНА ФУНКЦІЯ ДЛЯ КУКІ ==================
function getCookieValue(cookieName) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(cookieName + '=')) {
            return cookie.substring(cookieName.length + 1);
        }
    }
    return '';
}

// ================== КЛАС КОШИКА ==================
class ShoppingCart {
    constructor() {
        this.items = {};
        this.cartCounter = document.querySelector('.cart-counter'); // може бути null на cart.html
        this.loadCartFromCookies();
    }

    // завантаження з кукі
    loadCartFromCookies() {
        const cartCookie = getCookieValue('cart');
        if (cartCookie && cartCookie !== '') {
            try {
                this.items = JSON.parse(cartCookie);
            } catch (e) {
                console.error('Помилка парсингу cart з кукі', e);
                this.items = {};
            }
        }
        this.updateCounter();
    }

    // збереження в кукі
    saveCartToCookies() {
        const cartJSON = JSON.stringify(this.items);
        document.cookie = `cart=${cartJSON}; max-age=${60 * 60 * 24 * 7}; path=/`;
    }

    // лічильник у шапці
    updateCounter() {
        let count = 0;
        for (let key in this.items) {
            count += this.items[key].quantity;
        }
        if (this.cartCounter) {
            this.cartCounter.textContent = count;
        }
    }

    // загальна сума
    calculateTotal() {
        let total = 0;
        for (let key in this.items) {
            total += this.items[key].price * this.items[key].quantity;
        }
        return total;
    }

    // додати товар
    addItem(item) {
        const key = item.title || item.name || item.title1 || 'item_' + Object.keys(this.items).length;

        if (this.items[key]) {
            this.items[key].quantity += 1;
        } else {
            this.items[key] = {
                ...item,
                title: item.title || item.name || item.title1 || key,
                quantity: 1
            };
        }

        this.saveCartToCookies();
        this.updateCounter();
    }

   // змінити кількість (тепер по key)
updateQuantity(key, newQuantity) {
    if (this.items[key]) {
        this.items[key].quantity = newQuantity;
        if (this.items[key].quantity <= 0) {
            delete this.items[key];
        }
        this.saveCartToCookies();
        this.updateCounter();
    }
}

// ВИДАЛЕННЯ ТОВАРУ по key
removeItem(key) {
    if (this.items[key]) {
        delete this.items[key];
        this.saveCartToCookies();
        this.updateCounter();
    }
}


}

// глобальний кошик
let cart = new ShoppingCart();

// ================== ДОДАВАННЯ В КОШИК ==================
function addToCart(event) {
    const button = event.target.closest('.cart-btn');
    if (!button) return;

    const productData = button.getAttribute('data-product');
    if (!productData) return;

    try {
        const product = JSON.parse(productData);
        cart.addItem(product);
        console.log('Added to cart:', product, cart.items);
    } catch (e) {
        console.error('Невірний JSON у data-product', e, productData);
    }
}

// ================== ЗАВАНТАЖЕННЯ ТОВАРІВ З JSON ==================

// 1) КАВА – store_db.json → .products-list
async function getProducts() {
    let response = await fetch("store_db.json");
    let products = await response.json();
    return products;
}

function getCardHTML(product) {
    let productData = JSON.stringify(product);
    return `
    <div class="product-card">
        <div class="card-image-box">
            <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="card-info-box">
            <span class="product-name">${product.title}</span>
            <div class="product-footer">
                <span class="product-price">${product.price} ₴</span>
                <div class="add-to-cart-btn">
                    <button type="button" class="cart-btn" data-product='${productData}'>
                        <i class="fas fa-shopping-bag"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>`;
}

getProducts().then(function (products) {
    let productsList = document.querySelector('.products-list');
    if (productsList) {
        products.forEach(function (product) {
            productsList.innerHTML += getCardHTML(product);
        });

        let buyButtons = productsList.querySelectorAll('.cart-btn');
        buyButtons.forEach(function (button) {
            button.addEventListener('click', addToCart);
        });
    }
});

// 2) ЧАЙ – store_db2.json → .products-list-2
async function getProducts2() {
    let response = await fetch("store_db2.json");
    let products = await response.json();
    return products;
}

function getCardHTML2(product) {
    let productData = JSON.stringify(product);
    return `
    <div class="product-card-2">
        <div class="card-info-box">
            <span class="product-name">${product.title}</span>
            <div class="product-footer">
                <span class="product-price">${product.price} ₴</span>
                <div class="add-to-cart-btn">
                    <button type="button" class="cart-btn" data-product='${productData}'>
                        <i class="fas fa-shopping-bag"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>`;
}

getProducts2().then(function (products) {
    let productsList = document.querySelector('.products-list-2');
    if (productsList) {
        products.forEach(function (product) {
            productsList.innerHTML += getCardHTML2(product);
        });

        let buyButtons = productsList.querySelectorAll('.cart-btn');
        buyButtons.forEach(function (button) {
            button.addEventListener('click', addToCart);
        });
    }
});

// 3) ЛИМОНАДИ – store_db3.json → .products-list-3
async function getProducts3() {
    let response = await fetch("store_db3.json");
    let products = await response.json();
    return products;
}

function getCardHTML3(product) {
    let productData = JSON.stringify(product);
    return `
    <div class="product-card-6">
        <div class="card-image-box">
            <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="card-info-box">
            <span class="product-name">${product.title}</span>
            <div class="product-footer">
                <span class="product-price">${product.price} ₴</span>
                <div class="add-to-cart-btn">
                    <button type="button" class="cart-btn" data-product='${productData}'>
                        <i class="fas fa-shopping-bag"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>`;
}

getProducts3().then(function (products) {
    let productsList = document.querySelector('.products-list-3');
    if (productsList) {
        products.forEach(function (product) {
            productsList.innerHTML += getCardHTML3(product);
        });

        let buyButtons = productsList.querySelectorAll('.cart-btn');
        buyButtons.forEach(function (button) {
            button.addEventListener('click', addToCart);
        });
    }
});

// 4) СІК/ВОДА – store_db4.json → .products-list-4
async function getProducts4() {
    let response = await fetch("store_db4.json");
    let products = await response.json();
    return products;
}

function getCardHTML4(product) {
    let productData = JSON.stringify(product);
    return `
    <div class="product-card-7">
        <div class="card-info-box">
            <span class="product-name">${product.title}</span>
            <div class="product-footer">
                <span class="product-price">${product.price} ₴</span>
                <div class="add-to-cart-btn">
                    <button type="button" class="cart-btn" data-product='${productData}'>
                        <i class="fas fa-shopping-bag"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>`;
}

getProducts4().then(function (products) {
    let productsList = document.querySelector('.products-list-4');
    if (productsList) {
        products.forEach(function (product) {
            productsList.innerHTML += getCardHTML4(product);
        });

        let buyButtons = productsList.querySelectorAll('.cart-btn');
        buyButtons.forEach(function (button) {
            button.addEventListener('click', addToCart);
        });
    }
});

// 5) Сиропи – store_db5.json → .products-list-5
async function getProducts5() {
    let response = await fetch("store_db5.json");
    let products = await response.json();
    return products;
}

function getCardHTML5(product) {
    let productData = JSON.stringify(product);
    return `
    <div class="product-card-3">
        <div class="card-info-box">
            <span class="product-name">${product.title}</span>
            <div class="product-footer">
                <span class="product-price">+${product.price} ₴</span>
                <div class="add-to-cart-btn">
                    <button type="button" class="cart-btn" data-product='${productData}'>
                        <i class="fas fa-shopping-bag"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>`;
}

getProducts5().then(function (products) {
    let productsList = document.querySelector('.products-list-5');
    if (productsList) {
        products.forEach(function (product) {
            productsList.innerHTML += getCardHTML5(product);
        });

        let buyButtons = productsList.querySelectorAll('.cart-btn');
        buyButtons.forEach(function (button) {
            button.addEventListener('click', addToCart);
        });
    }
});

// 6) Додатково до чаю – Фрукти/Ягоди – store_db6.json → .products-list-6
async function getProducts6() {
    let response = await fetch("store_db6.json");
    let products = await response.json();
    return products;
}

function getCardHTML6(product) {
    let productData = JSON.stringify(product);
    return `
    <div class="product-card-4">
        <div class="card-info-box">
            <span class="product-name">
                <ul>
                    <li>${product.title1}</li>
                    <li>${product.title2}</li>
                    <li>${product.title3}</li>
                </ul>
            </span>
            <div class="product-footer">
                <span class="product-price">+${product.price} ₴</span>
                <div class="add-to-cart-btn">
                    <button type="button" class="cart-btn" data-product='${productData}'>
                        <i class="fas fa-shopping-bag"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>`;
}

getProducts6().then(function (products) {
    let productsList = document.querySelector('.products-list-6');
    if (productsList) {
        products.forEach(function (product) {
            productsList.innerHTML += getCardHTML6(product);
        });

        let buyButtons = productsList.querySelectorAll('.cart-btn');
        buyButtons.forEach(function (button) {
            button.addEventListener('click', addToCart);
        });
    }
});

// 7) Трави і квіти – store_db7.json → .products-list-7
async function getProducts7() {
    let response = await fetch("store_db7.json");
    let products = await response.json();
    return products;
}

function getCardHTML7(product) {
    let productData = JSON.stringify(product);
    return `
    <div class="product-card-4">
        <div class="card-info-box">
            <span class="product-name">
                <ul>
                    <li>${product.title1}</li>
                    <li>${product.title2}</li>
                </ul>
            </span>
            <div class="product-footer">
                <span class="product-price">+${product.price} ₴</span>
                <div class="add-to-cart-btn">
                    <button type="button" class="cart-btn" data-product='${productData}'>
                        <i class="fas fa-shopping-bag"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>`;
}

getProducts7().then(function (products) {
    let productsList = document.querySelector('.products-list-7');
    if (productsList) {
        products.forEach(function (product) {
            productsList.innerHTML += getCardHTML7(product);
        });

        let buyButtons = productsList.querySelectorAll('.cart-btn');
        buyButtons.forEach(function (button) {
            button.addEventListener('click', addToCart);
        });
    }
});

// 8) Мед/Горіхи – store_db8.json → .products-list-8
async function getProducts8() {
    let response = await fetch("store_db8.json");
    let products = await response.json();
    return products;
}

function getCardHTML8(product) {
    let productData = JSON.stringify(product);
    return `
    <div class="product-card-4">
        <div class="card-info-box">
            <span class="product-name">
                <ul>
                    <li>${product.title1}</li>
                    <li>${product.title2}</li>
                </ul>
            </span>
            <div class="product-footer">
                <span class="product-price">+${product.price} ₴</span>
                <div class="add-to-cart-btn">
                    <button type="button" class="cart-btn" data-product='${productData}'>
                        <i class="fas fa-shopping-bag"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>`;
}

getProducts8().then(function (products) {
    let productsList = document.querySelector('.products-list-8');
    if (productsList) {
        products.forEach(function (product) {
            productsList.innerHTML += getCardHTML8(product);
        });

        let buyButtons = productsList.querySelectorAll('.cart-btn');
        buyButtons.forEach(function (button) {
            button.addEventListener('click', addToCart);
        });
    }
});

// ================== ПЕРЕХІД МІЖ СТОРІНКАМИ ==================
const cartBtn = document.getElementById('cartBtn');
if (cartBtn) {
    cartBtn.addEventListener("click", function () {
        window.location.assign('cart.html');
    });
}

const menuBtn = document.getElementById('menuBtn');
if (menuBtn) {
    menuBtn.addEventListener("click", function () {
        window.location.assign('index.html');
    });
}
