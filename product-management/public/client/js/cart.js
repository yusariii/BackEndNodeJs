// Update quantity in cart
const quantityInputs = document.querySelectorAll("input[name='quantity']")
if (quantityInputs.length > 0){
    quantityInputs.forEach(input => {
        input.addEventListener("change", () => {

            const productId = input.getAttribute("product-id")
            const quantity = input.value

            window.location.href = `/cart/update/${productId}/${quantity}`
        })
    })
}
console.log("ok")
// End update quantity in cart