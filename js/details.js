const queryString = location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

async function petshopDetail() {

    const mindyApi = await fetch("https://apipetshop.herokuapp.com/api/articulos");
    let myData = await mindyApi.json()
    let products = myData.response
    let detailProduct = products.find(e => e._id === id);
    
    console.log(detailProduct)

    function createDetails(amazing, container) {

        let detailDiv = document.getElementById(container);

        let detailCard = document.createElement("div");

        detailCard.className = "card text-justify"
        detailCard.innerHTML = `
            <div class="card-header bg-info text-center ">
                <h4 class="text-light" >${detailProduct.nombre}</h4>
            </div>
            <div class="card-body d-flex justify-content-between ">
                <div class="col d-flex flex-column align-items-center">
                    <img class="w-50 " src=" ${detailProduct.imagen} "
                        alt="image">
                    <div class="" >
                    <h4 class="text-center" >Descripción</h4>
                    <p class=" px-2 ">${detailProduct.descripcion}</p>
                    </div>
            </div>
                <div class="col d-flex flex-column gap-5 border-start ">
                    <h5 class="card-title text-center">Comprar</h5>
                    <p class="card-text text-center"> Stock Disponible ${detailProduct.stock}</p>
                    <div class="d-flex justify-content-center align-items-baseline gap-3">
                        <button class="btn btn-info fs-4">-</button>
                        <p class="fs-4">1</p>
                        <button class="btn btn-info fs-4">+</button>
                    </div>
                    <button id="botonAgregar"  class="btn btn-info align-self-center text-light w-50 text-center">Agregar al carrito</button>
                    <a  class="btn btn-success"  href="./carrito.html">Ir al Carrito</a> 

                    </div>

            </div>
            <div class="card-footer text-muted bg-warning">
                <marquee class="text-dark" >
                    Mindy PetShop - Prefiere compra On-Line - despachamos a todo el pais - Entra a nuestras Redes Sociales y mira los nuevos descuentos.
                </marquee>
            </div>`
        detailDiv.appendChild(detailCard)
    }

    createDetails(detailProduct, "containerDetails")

    const boton = document.getElementById("botonAgregar")

    boton.addEventListener("click", ()=>{
        addMyCart(detailProduct)
        Swal.fire( {
            icon: 'success',
            title: "Producto agregado con Exito!",
        } )

    })




    function addMyCart(producto){
        //creo en una nueva variable 
        let newcarrito = JSON.parse(localStorage.getItem("carrito"))


        console.log(newcarrito)

        if(!localStorage.getItem("carrito")){

            newcarrito = []
        }
        newcarrito.push(producto)

        localStorage.setItem("carrito",JSON.stringify(newcarrito)) //
    }

   
    // que hace primero


}

petshopDetail()
//onclick="addToCart('${detailProduct.nombre}, precio:${detailProduct.precio}, stock:${detailProduct.stock}, imagen:${detailProduct.imagen } ')"

const title = document.title
console.log(title)
