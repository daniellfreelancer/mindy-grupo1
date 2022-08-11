const allProducts = async () => {
    try {
        const resp = await fetch("https://apipetshop.herokuapp.com/api/articulos")
        const dataProducts = await resp.json()
        let totalProducts = dataProducts.response
        console.log(totalProducts)
        //Division de arrays por: productos totales, juguetes y medicamentos
        /* let cat = totalProducts.map(e => e.tipo) */
        let arrayDeCategorias = filtroPorCategorias(totalProducts)

        let medicamento = totalProducts.filter(e => e.tipo.includes(arrayDeCategorias[1]))

        let card = document.getElementById("cardContainer")
        console.log(card)
        cardCreator(medicamento, card)

    } catch (err) { alert("There is a server error, contact us so we can help you") }
}
allProducts()


//Funcion para filtrar arrays segun el tipo
function filtroPorCategorias(array) {
    let categorias = []
    array.forEach(e => {
        if (!categorias.includes(e.tipo)) {
            categorias.push(e.tipo)
        }
    })
    return categorias
}

function cardCreator(array, donde) {
    array.map(e => {
        let cards = document.createElement("div")
        cards.style.width = "18rem"
        cards.style.transform = "scale(1.02)"
        cards.innerHTML = `
        <img src=${e.imagen} class="card-img-top w-100 p-4" style="height:20rem" alt="imagen">        
        <div class="card-body d-flex flex-wrap flex-column gap-4 align-items-center text-center">
        <h5 class="card-title " style="font-family: ghotamUlt font-size:14px">${e.nombre}</h5>        
        <a href="./details.html?id=${e._id}" class="btn w-50" style="border-radius: 10px; background: #e0e0e0;box-shadow: 10px -10px 24px #bebebe, -10px 10px 24px #ffffff;"><strong>Detail...<strong></a>
        </div>`
        donde.appendChild(cards)
    })
}

const url = "https://apipetshop.herokuapp.com/api/articulos"

async function cardsOff(api) {
    const res = await fetch(api)
    let data = await res.json()
    let productos = data.response
    console.log(productos)

    function farmacosOff(array) {
        let medicamentos = array.filter(p => p.tipo === "Medicamento")
        let medicamentosOff = medicamentos.filter(p => p.stock < 3)
        return medicamentosOff
    }
    let stock3 = farmacosOff(productos)

    function pintarMedicamentosOff(array) {
        const cardContainer = document.getElementById("card-container")
        array.forEach(e => {
            let cardMedicamentos = document.createElement("div")
            cardMedicamentos.className = "card text-bg-info align-items-center card-padre justify-content-center"
            cardMedicamentos.innerHTML = `<a href="./details.html?id=${e._id}">
             <img src="${e.imagen}"
                 class="card-img p-3" alt="product">
         </a>
         <p class="card-title text-center border-top">${e.nombre}</p>
         <p class="card-title text-center">$ ${e.precio}</p>
         <a href="./details.html?id=${e._id}" class="btn btn-info text-light">Ver más</a>`

            cardContainer.appendChild(cardMedicamentos)
        })
    }
    pintarMedicamentosOff(stock3)



}
cardsOff(url)