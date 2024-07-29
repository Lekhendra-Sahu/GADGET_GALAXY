import { getCartProductFromLS } from "./getCartProducts";
import { showToast } from "./showToast";
import { updateCartValue } from "./updateCartValue";

getCartProductFromLS();

export const addToCart = (event, id, stock) => {

    let arrLocalStorageProduct = getCartProductFromLS();

    const currentProdElem = document.querySelector(`#card${id}`);
    let quantity = currentProdElem.querySelector(".productQuantity").innerHTML;
    let price = currentProdElem.querySelector(".productPrice").innerHTML;

    //  console.log(quantity, price);
    price = price.replace("₹", "");

    let existingProd = arrLocalStorageProduct.find((curProd) => curProd.id === id);

    console.log(existingProd);

    if(existingProd && quantity > 1) {
        quantity = Number(existingProd.quantity) + Number(quantity);
        price = Number(price * quantity);
        let updateCart = { id, quantity, price };

        updateCart = arrLocalStorageProduct.map((curProd) => {

            return curProd.id === id ? updateCart : curProd;
        });
        console.log(updateCart);

        localStorage.setItem("cartProductLS", JSON.stringify(updateCart));
        // Show toast when product added to the cart
        showToast("add", id);

    }

    if (existingProd) {
     //   alert("Bhai dublicate hai!!")
        return false;
    }

    
    price = Number(price * quantity);
    quantity = Number(quantity);

    arrLocalStorageProduct.push({id, quantity, price});
    localStorage.setItem("cartProductLS", JSON.stringify(arrLocalStorageProduct));

    // update the cart button value
    updateCartValue(arrLocalStorageProduct);

     // Show toast when product added to the cart
     showToast("add", id);


};