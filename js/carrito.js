let allItem = JSON.parse(localStorage.getItem("carrito"))
console.log(allItem)


function carritoVacio(){
    let container = document.getElementById("carritoVacio")
    let bannerVacio = document.createElement("div")
    bannerVacio.innerHTML = ` <img class="w-50" src="https://trello.com/1/cards/62f2b631d2e21d19cbb57e6f/attachments/62f582fed542b0119f066f2b/previews/62f582ffd542b0119f066f46/download/bannerCarrito.png" alt="banner carrito" > `
    container.appendChild(bannerVacio)
}


function carritoLleno(){

    let container = document.getElementById("carritoItems")
    
    allItem.forEach(element => {
        
        let divProductos = document.createElement("div")
        divProductos.classList.add("producto")
        divProductos.innerHTML = `<div class="p-4 d-flex justify-content-between align-items-center flex-wrap ">
        <img class="w-25" src="${element.imagen} "
            alt="">
        <div class="text-center" >
        <p>${element.nombre}</p>
        <p>$ ${element.precio}</p>
        </div>

        <div class="d-flex justify-content-center align-items-baseline gap-3 flex-wrap">
            <button  class="btn btn-info fs-4 restar">-</button>
            <p  class="fs-4 cantidadStock">1</p>
            <button class="btn btn-info fs-4 sumar">+</button>
        </div>
        <div>
            <p>$ total </p>
        </div>
    </div>
    <hr>`

    container.appendChild(divProductos)


    });

    let stockeo = document.querySelector(".cantidadStock")
    console.log( parseInt(stockeo.innerText) )

 //
 let suma = document.querySelectorAll('.sumar')
    console.log(suma)

    suma.forEach((element) => element.addEventListener("click", ()=>{

        stockeo.innerText++

    }));




    // suma.addEventListener("click", ()=>{
        
    //     stockeo.innerText++
    // })

 let resta =  document.getElementsByClassName('restar')

    // resta.addEventListener("click", ()=>{
    //     if (stockeo.innerText > 0) {
    //         stockeo.innerText--
    //     }
    // })
}



if(allItem == null){
    carritoVacio()
    
} else {
    carritoLleno(allItem)
}


function vaciarCarrito(){
    localStorage.clear()
    location.reload()
}

    
