// ================== ЕЛЕМЕНТИ СТОРІНКИ КОШИКА ==================
var cart_list    = document.querySelector('.cart-items-list');
var cart_total   = document.querySelector('.cart-total');
var orderBtn     = document.querySelector("#orderBtn");
var orderSection = document.querySelector(".order");

// ================== ГОЛОВНА ФУНКЦІЯ ПОБУДОВИ ТАБЛИЦІ ==================
function getOrderTableHTML() {

    if (!window.cart) {
        console.warn('cart не знайдено, створюю новий ShoppingCart');
        window.cart = new ShoppingCart();
    }

    var items = cart.items || {};
    var keys  = Object.keys(items);

    if (keys.length === 0) {
        return '<div class="order-empty">У кошику ще немає товарів</div>';
    }

    var rowsHTML = '';

    for (var i = 0; i < keys.length; i++) {
        var key  = keys[i];
        var item = items[key];

        rowsHTML +=
        '<div class="order-row">' +
            '<button type="button" class="order-cell order-trash delete-btn" data-key="' + key + '">' +
                '<i class="bi bi-trash"></i>' +
            '</button>' +

            '<div class="order-cell order-name">' +
                item.title +
            '</div>' +

            '<div class="order-cell order-qty">' +
                '<input data-key="' + key + '" class="form-control quantity-input" type="number" name="quantity" min="1" value="' + item.quantity + '">' +
            '</div>' +

            '<div class="order-cell order-sum" data-price="' + item.price + '">' +
                (item.price * item.quantity) + ' ₴' +
            '</div>' +
        '</div>';
    }

    return '' +
    '<div class="order-table">' +
        '<div class="order-row order-header">' +
            '<div class="order-cell order-trash"></div>' +
            '<div class="order-cell order-name">Найменування</div>' +
            '<div class="order-cell order-qty">кількість</div>' +
            '<div class="order-cell order-sum">сума</div>' +
        '</div>' +

        rowsHTML +

        '<div class="order-row order-footer">' +
            '<div class="order-cell order-trash"></div>' +
            '<div class="order-cell order-name"></div>' +
            '<div class="order-cell order-qty order-total-label">разом до сплати:</div>' +
            '<div class="order-cell order-sum order-total-value">' +
                '<span class="cart-total-inner">' + cart.calculateTotal() + '</span> ₴' +
            '</div>' +
        '</div>' +
    '</div>';
}

// ================== ВИВІД КОШИКА ==================
function showCartList() {
    if (!cart_list) return;
    cart_list.innerHTML = getOrderTableHTML();

    if (cart_total && window.cart) {
        cart_total.textContent = cart.calculateTotal();
    }
}

showCartList();

// ================== ЗМІНА КІЛЬКОСТІ ==================
if (cart_list) {
    cart_list.addEventListener('change', function(event) {
        var target = event.target;
        if (!target.classList.contains('quantity-input')) return;

        var key = target.getAttribute('data-key');
        var newQuantity = +target.value;

        if (newQuantity > 0) {
            cart.updateQuantity(key, newQuantity);
            showCartList();
        }
    });

    // ================== ВИДАЛЕННЯ ТОВАРУ ==================
    cart_list.addEventListener('click', function(event) {
        var btn = event.target.closest('.delete-btn');
        if (!btn) return;

        var key = btn.getAttribute('data-key');
        cart.removeItem(key);
        showCartList();
    });
}

// ================== АНІМАЦІЯ КОШИКА ==================
if (typeof anime === 'function') {
    anime({
        targets: '.cart',
        opacity: 1,
        duration: 500,
        easing: 'easeInOutQuad'
    });
}

// ================== ПОКАЗ ФОРМИ ОФОРМЛЕННЯ ==================
if (orderBtn && orderSection) {
    orderBtn.addEventListener("click", function () {
        orderBtn.style.display = "none";
        orderSection.style.display = "block";

        if (typeof anime === 'function') {
            anime({
                targets: '.order',
                opacity: 1,
                duration: 1000,
                easing: 'easeInOutQuad'
            });
        } else {
            orderSection.style.opacity = 1;
        }
    });
}
