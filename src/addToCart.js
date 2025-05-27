import { getCartDataFromLS } from "./getCartDataFromLS";

export const addToCart = (event, id, stock) => {
    let arrLocalStorageProduct = getCartDataFromLS();

    const currentProductElement = document.querySelector(`#card${id}`);
    let quantity = parseInt(currentProductElement.querySelector('.quantityvalue').innerText);
    let priceText = currentProductElement.querySelector('.actualprice').innerText.replace("$", "");
    // let price = parseFloat(priceText);
    let unitPrice = parseFloat(priceText); 

    // 👇 New: Get product name and image URL
    let name = currentProductElement.querySelector('.productname').innerText;
    let image = currentProductElement.querySelector('.productimg').getAttribute('src');

    let existingProduct = arrLocalStorageProduct.find(product => product.id === id);

    if (existingProduct) {
        existingProduct.quantity = parseInt(existingProduct.quantity) + quantity;
        existingProduct.price = price * existingProduct.quantity;
    } else {
        arrLocalStorageProduct.push({
            id,
            name,
            image,
            quantity,
            unitPrice,
            price: unitPrice * quantity
        });
    }

    localStorage.setItem("cartProductsLS", JSON.stringify(arrLocalStorageProduct));
};
