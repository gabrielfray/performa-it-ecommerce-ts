export const database = [
    {
        id: 104893,
        img: "./assets/shirt.svg",
        name: "casaco Jumping bear vermelho",
        price: 499.9,
        promotionPrice: 399.9,
        quantity: 1,
    },
    {
        id: 104894,
        img: "./assets/blusa-verde.svg",
        name: "t-shirt jumping bear verde",
        price: 299.0,
        promotionPrice: 129.9,
        quantity: 1,
    },
    {
        id: 104895,
        img: "./assets/calça-rosa.svg",
        name: "calça moletom bear",
        price: 359.0,
        promotionPrice: 299.9,
        quantity: 1,
    },
    {
        id: 104896,
        img: "./assets/blusa-cinza.svg",
        name: "t-shirt jumping bear cinza",
        price: 299.0,
        promotionPrice: 269.9,
        quantity: 1,
    },
    {
        id: 104897,
        img: "./assets/blusa-branca.svg",
        name: "t-shirt jumping bear branca",
        price: 299.0,
        promotionPrice: 199.9,
        quantity: 1,
    },
    {
        id: 104898,
        img: "./assets/jaqueta-azul.svg",
        name: "casaco jumping bear azul",
        price: 469.0,
        promotionPrice: 399.9,
        quantity: 1,
    },
];
const sizeInputs = document.querySelectorAll(".size-input");
const colorInputs = document.querySelectorAll(".color-input");
sizeInputs.forEach((input) => {
    input.addEventListener("click", function () {
        sizeInputs.forEach((otherInput) => {
            if (otherInput !== input) {
                otherInput.checked = false;
            }
        });
    });
});
colorInputs.forEach((input) => {
    input.addEventListener("click", function () {
        colorInputs.forEach((otherInput) => {
            if (otherInput !== input) {
                otherInput.checked = false;
            }
        });
    });
});
class Product {
    constructor(product) {
        this.product = product;
    }
    getFormattedPrice(price) {
        return `R$ ${price.toFixed(2)}`;
    }
    createParagraph(price, promotionPrice) {
        const paragraph = document.createElement("p");
        paragraph.innerHTML = `${this.getFormattedPrice(price)} <strong>${this.getFormattedPrice(promotionPrice)}</strong>`;
        return paragraph;
    }
    createInstallmentSpan(price) {
        const installmentValue = (price / 3).toFixed(2);
        const installmentSpan = document.createElement("span");
        installmentSpan.innerHTML = `ou 3x de R$ ${installmentValue}`;
        return installmentSpan;
    }
    createContentClothes() {
        const contentClothes = document.createElement("div");
        contentClothes.classList.add("content-clothes");
        const clotheImage = document.createElement("img");
        clotheImage.className = "clothes-img";
        clotheImage.src = this.product.img;
        clotheImage.alt = this.product.name;
        clotheImage.id = this.product.id.toString();
        const contentPrice = document.createElement("div");
        contentPrice.className = "content-clothe";
        const heading = document.createElement("h3");
        heading.innerHTML = `${this.product.name} <span>${this.product.id}</span>`;
        contentPrice.appendChild(heading);
        const clothesName = document.createElement("div");
        clothesName.className = "name";
        clothesName.append(this.createParagraph(this.product.price, this.product.promotionPrice), this.createInstallmentSpan(this.product.price));
        contentClothes.appendChild(clotheImage);
        contentClothes.appendChild(contentPrice);
        contentClothes.appendChild(clothesName);
        return contentClothes;
    }
}
function displayProducts(database) {
    const recommendedClothes = document.querySelector(".recommended-clothes");
    if (!recommendedClothes)
        return;
    database.forEach((product) => {
        const productInstance = new Product(product);
        const contentClothes = productInstance.createContentClothes();
        recommendedClothes.appendChild(contentClothes);
    });
}
displayProducts(database);
class ProductDisplay {
    constructor() {
        this.mainClothe = document.querySelector(".main-clothe");
        this.asideClothesList = document.querySelectorAll(".aside-clothes");
        this.clotheName = document.querySelector(".title");
        this.clotheId = document.querySelector(".clothe-id");
        this.clotheOriginalPrice = document.querySelector(".original-price");
        this.clothePromotionPrice = document.querySelector(".discount-price");
        this.clotheDivisionPrice = document.querySelector(".division-price");
        this.buttonBuy = document.querySelector(".button-buy");
        const recommendedClothes = document.querySelector(".recommended-clothes");
        if (recommendedClothes) {
            recommendedClothes.addEventListener("click", (event) => {
                if (event.target instanceof HTMLElement) {
                    const productId = parseInt(event.target.id);
                    const product = database.find((elem) => elem.id === productId);
                    if (product) {
                        this.displayProductDetails(product);
                    }
                }
            });
        }
        window.addEventListener("load", () => this.showRandomProduct());
    }
    displayProductDetails(product) {
        this.mainClothe.src = product.img;
        this.asideClothesList.forEach((asideClothes) => {
            asideClothes.src = product.img;
        });
        this.clotheName.innerHTML = product.name;
        this.clotheId.innerHTML = product.id.toString();
        this.buttonBuy.id = product.id.toString();
        const division = (product.price / 3).toFixed(2);
        this.clotheOriginalPrice.innerHTML = `R$ ${product.price.toFixed(2)}`;
        this.clothePromotionPrice.innerHTML = `R$ ${product.promotionPrice.toFixed(2)}`;
        this.clotheDivisionPrice.innerHTML = `R$ ${division}`;
    }
    showRandomProduct() {
        const randomIndex = Math.floor(Math.random() * database.length);
        const randomProduct = database[randomIndex];
        this.displayProductDetails(randomProduct);
    }
}
new ProductDisplay();
class ShoppingCart {
    saveItemsToLocalStorage() {
        localStorage.setItem("@item:", JSON.stringify(this.items));
    }
    constructor() {
        this.items = [];
        this.items = [];
        this.cartFooter = document.querySelector(".cart-footer");
        this.emptyCart = document.querySelector(".empty-cart");
        const storedItems = localStorage.getItem("@item:");
        if (storedItems) {
            this.items = JSON.parse(storedItems);
        }
        this.initEventHandlers();
        if (this.items.length == 0) {
            this.showEmptyCart();
        }
        else {
            this.updateCart();
        }
    }
    addItem(product) {
        this.items.push(product);
        this.updateCart();
    }
    removeItem(productId) {
        const itemIndex = this.items.findIndex((item) => item.id === productId);
        if (itemIndex !== -1) {
            this.items[itemIndex].quantity = 1;
            this.items.splice(itemIndex, 1);
            this.updateCart();
        }
    }
    calculateTotal() {
        return this.items.reduce((total, item) => total + item.promotionPrice, 0);
    }
    updateCart() {
        const cartAside = document.querySelector(".cart-sidebar");
        const cartCount = document.querySelector(".clothes-count");
        const headerClothesCount = document.querySelector(".header__clothes-count");
        const contentClothes = document.querySelector(".content__list-clothes");
        if (headerClothesCount && cartCount && contentClothes && cartAside) {
            const totalQuantity = this.items.reduce((acc, item) => acc + item.quantity, 0);
            headerClothesCount.innerHTML = totalQuantity.toString();
            cartCount.innerHTML = totalQuantity.toString();
            contentClothes.innerHTML = "";
            if (this.items.length > 0) {
                this.items.forEach((item) => {
                    this.createClothesCard(item);
                });
                this.cartFooter.classList.remove("invisible");
                this.emptyCart.classList.add("invisible");
                this.showCartFooter();
            }
            else {
                this.showEmptyCart();
                this.cartFooter.classList.add("invisible");
                this.emptyCart.classList.remove("invisible");
            }
            cartAside.appendChild(contentClothes);
        }
    }
    createClothesCard(item) {
        const contentClothes = document.querySelector(".content__list-clothes");
        const clothesCard = document.createElement("li");
        clothesCard.dataset.id = item.id;
        const clotheImage = document.createElement("img");
        clotheImage.classList.add("clothe-image");
        clotheImage.src = item.img;
        clotheImage.alt = item.name;
        const contentClothesInformation = document.createElement("div");
        contentClothesInformation.classList.add("content__clothes-information");
        const clotheTitle = document.createElement("h3");
        clotheTitle.innerHTML = item.name;
        const contentPrices = document.createElement("div");
        contentPrices.classList.add("content-prices");
        const originalPrice = document.createElement("span");
        originalPrice.classList.add("original-price");
        originalPrice.innerHTML = `R$ ${item.price.toFixed(2)}`;
        const promotionalPrice = document.createElement("span");
        promotionalPrice.classList.add("promotional-price");
        promotionalPrice.innerHTML = `R$ ${item.promotionPrice.toFixed(2)}`;
        const contentQuantityClothes = document.createElement("div");
        contentQuantityClothes.classList.add("content__quantity-clothes");
        const buttonQuantityLess = document.createElement("button");
        buttonQuantityLess.classList.add("button-quantity");
        const imageLess = document.createElement("img");
        imageLess.src = "./assets/icon-menos-cart.svg";
        imageLess.alt = "Icone de menos";
        imageLess.classList.add("button-quantity-less");
        const quantityCount = document.createElement("span");
        quantityCount.classList.add("quantity-count");
        quantityCount.innerHTML = item.quantity;
        this.handleQuantityButton(contentQuantityClothes, quantityCount, item);
        const buttonQuantityMore = document.createElement("button");
        buttonQuantityMore.classList.add("button-quantity");
        const imageMore = document.createElement("img");
        imageMore.src = "./assets/icon-soma-cart.svg";
        imageMore.alt = "Icone de mais";
        imageMore.classList.add("button-quantity-more");
        const buttonDelete = document.createElement("button");
        buttonDelete.classList.add("button-delete");
        const imageDelete = document.createElement("img");
        imageDelete.src = "./assets/icon-delete-cart.svg";
        imageDelete.alt = "Icone de lixeira";
        imageDelete.classList.add("trash-icon");
        imageDelete.id = item.id;
        contentClothes.appendChild(clothesCard);
        clothesCard.append(clotheImage, contentClothesInformation);
        contentClothesInformation.append(clotheTitle, contentPrices, contentQuantityClothes);
        contentPrices.append(originalPrice, promotionalPrice);
        buttonQuantityLess.appendChild(imageLess);
        buttonQuantityMore.appendChild(imageMore);
        contentQuantityClothes.append(buttonQuantityLess, quantityCount, buttonQuantityMore);
        clothesCard.appendChild(buttonDelete);
        buttonDelete.appendChild(imageDelete);
        const clothesLine = document.createElement("div");
        clothesLine.classList.add("clothe-line");
        const divChildElement = document.createElement("div");
        clothesLine.appendChild(divChildElement);
        contentClothes.appendChild(clothesLine);
    }
    showEmptyCart() {
        this.emptyCart = document.querySelector(".empty-cart");
        const buttonKeepBrowsing = document.querySelector(".keep-browsing");
        this.emptyCart.innerHTML = "";
        const img = document.createElement("img");
        img.src = "./assets/icon-carrinho.svg";
        img.alt = "Icone de sacola vazia";
        const h3 = document.createElement("h3");
        h3.textContent = "Você não possui itens";
        const span = document.createElement("span");
        span.textContent = "Continue navegando para adicionar produtos aqui";
        this.emptyCart.appendChild(img);
        this.emptyCart.appendChild(h3);
        this.emptyCart.appendChild(span);
        this.emptyCart.appendChild(buttonKeepBrowsing);
    }
    showCartFooter() {
        const cartAside = document.querySelector(".cart-sidebar");
        const keepShopping = document.querySelector(".cart-button");
        this.cartFooter.innerHTML = "";
        if (this.cartFooter) {
            if (this.items.length > 0) {
                this.cartFooter.classList.remove("invisible");
            }
            else {
                this.cartFooter.classList.add("invisible");
            }
        }
        const subFooterCart = document.createElement("div");
        subFooterCart.classList.add("sub__footer-cart");
        const subtotalTitle = document.createElement("h4");
        subtotalTitle.innerHTML = "Subtotal:";
        const subtotalPrice = document.createElement("span");
        subtotalPrice.classList.add("subtotal");
        subtotalPrice.innerHTML = (0).toFixed(2);
        this.calculateSubtotal(subtotalPrice);
        subFooterCart.append(subtotalTitle, subtotalPrice);
        const subtotalLine = document.createElement("div");
        subtotalLine.classList.add("subtotal-line");
        const subtotalLineChild = document.createElement("div");
        subtotalLine.appendChild(subtotalLineChild);
        const contentSubtotalButtons = document.createElement("div");
        contentSubtotalButtons.classList.add("subtotal-buttons");
        const text = document.createElement("p");
        text.innerHTML = "Frete e descontos calculados no carrinho";
        const buttonCheckout = document.createElement("button");
        buttonCheckout.classList.add("cart-button", "checkout");
        buttonCheckout.type = "button";
        buttonCheckout.innerHTML = "Finalizar compra";
        buttonCheckout.addEventListener("click", () => {
            console.log(`Seu pedido: ${JSON.stringify(this.items)}`);
        });
        contentSubtotalButtons.append(text, keepShopping, buttonCheckout);
        this.cartFooter.append(subFooterCart, subtotalLine, contentSubtotalButtons);
        cartAside.appendChild(this.cartFooter);
    }
    handleBuyButton(event) {
        const clickTarget = event.target;
        if (clickTarget.classList.contains("button-buy")) {
            const sizeInputs = document.querySelectorAll(".size-input");
            const colorInputs = document.querySelectorAll(".color-input");
            let selectedSize = null;
            let selectedColor = null;
            sizeInputs.forEach((input) => {
                if (input.checked) {
                    selectedSize = input.value;
                }
            });
            colorInputs.forEach((input) => {
                if (input.checked) {
                    selectedColor = input.value;
                }
            });
            if (selectedSize && selectedColor) {
                const targetId = parseInt(clickTarget.id);
                const verifyItem = this.items.some((elem) => elem.id === targetId);
                if (!verifyItem) {
                    const selectedItem = database.find((item) => item.id === targetId);
                    if (selectedItem) {
                        selectedItem.size = selectedSize;
                        selectedItem.color = selectedColor;
                        this.addItem(selectedItem);
                        this.updateCart();
                        this.saveItemsToLocalStorage();
                    }
                }
            }
            else {
                alert("Por favor, selecione um tamanho e uma cor antes de comprar.");
            }
        }
        if (clickTarget.classList.value == "trash-icon") {
            const itemId = parseInt(clickTarget.id);
            this.removeItem(itemId);
            this.updateCart();
            this.saveItemsToLocalStorage();
        }
    }
    handleQuantityButton(contentQuantityClothes, quantityCount, item) {
        if (contentQuantityClothes) {
            contentQuantityClothes.addEventListener("click", (event) => {
                const subtotalPrice = document.querySelector(".subtotal");
                const target = event.target;
                if (target) {
                    if (target.classList.value == "button-quantity-more") {
                        item.quantity++;
                        quantityCount.innerHTML = item.quantity.toString();
                        if (subtotalPrice) {
                            this.calculateSubtotal(subtotalPrice);
                            this.saveItemsToLocalStorage();
                            this.updateCart();
                        }
                    }
                    if (target.classList.value == "button-quantity-less" && item.quantity >= 1) {
                        if (item.quantity === 1) {
                            this.removeItem(item.id);
                            this.saveItemsToLocalStorage();
                        }
                        else {
                            item.quantity--;
                            quantityCount.innerHTML = item.quantity.toString();
                            if (subtotalPrice) {
                                this.calculateSubtotal(subtotalPrice);
                                this.saveItemsToLocalStorage();
                                this.updateCart();
                            }
                        }
                    }
                }
            });
        }
    }
    calculateSubtotal(subtotalPrice) {
        const cartItems = this.items.reduce((acc, currentValue) => {
            return acc + currentValue.promotionPrice * currentValue.quantity;
        }, 0);
        if (subtotalPrice) {
            subtotalPrice.innerHTML = `R$ ${cartItems.toFixed(2)}`;
        }
    }
    initEventHandlers() {
        document.addEventListener("click", (event) => {
            this.handleBuyButton(event);
        });
    }
}
const shoppingCart = new ShoppingCart();
shoppingCart.initEventHandlers();
document.querySelectorAll(".toggle-cart").forEach((elem) => elem.addEventListener("click", () => {
    const cartElement = document.querySelector(".cart-sidebar");
    if (cartElement) {
        cartElement.classList.toggle("cart-enable");
        cartElement.classList.toggle("cart-disable");
    }
}));
