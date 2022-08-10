async function indexProducts(){
    const apiData = await fetch("https://apipetshop.herokuapp.com/api/articulos")
    let mindyData = await apiData.json()
    let items = mindyData.response
    let newItems = items.slice(10)
    function createItemsCarousel(){
        let divCarousel = document.getElementById("div-items")
        newItems.forEach(product => {
            let divItems = document.createElement("div")
            divItems.className = ""
            divItems.innerHTML = `
            <img  class="imgItems" src='${product.imagen}' alt='${product.imagen}'>
        `
        divCarousel.appendChild(divItems)
        });
    }
    createItemsCarousel()
}
indexProducts()