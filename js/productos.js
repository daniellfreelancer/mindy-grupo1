const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
const ofertaDiv = document.getElementById("ofertas")

const tituloWeb = document.title

let carrito = {}

// Eventos

document.addEventListener('DOMContentLoaded', e => { fetchData()
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    }
});

cards.addEventListener('click', e => { addCarrito(e) });
items.addEventListener('click', e => { btnAumentarDisminuir(e) })

// Traer productos
const fetchData = async () => {
    const res = await fetch('https://apipetshop.herokuapp.com/api/articulos');
    const data = await res.json()
    const myData = data.response
    console.log(tituloWeb)

    if(tituloWeb == "Farmaco-Petshop"){
        pintarCards(myData)
    }


    

    

     function ultimasUnidades(array) {
         let liquidacion = array.filter(p => p.stock < 3)
         return liquidacion
     }
     let stock3 = ultimasUnidades(myData)
     console.log(stock3)

     liquidacion(stock3)

}



// productos
const pintarCards = data => {
    data.forEach(item => {
        templateCard.querySelector('h5').textContent = item.nombre
        templateCard.querySelector('p').textContent = item.precio
        templateCard.querySelector('img').setAttribute('src', item.imagen)
        templateCard.querySelector('button').dataset.id = item._id
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}

const liquidacion = data => {
    
    data.forEach(item => {
        templateCard.querySelector('h5').textContent = item.nombre
        templateCard.querySelector('p').textContent = item.precio
        templateCard.querySelector('img').setAttribute('src', item.imagen)
        templateCard.querySelector('button').dataset.id = item._id
        const clone = templateCard.cloneNode(true)
        ofertaDiv.appendChild(clone)
    })
    cards.appendChild(ofertaDiv)
}





// Agregar al carrito
const addCarrito = e => {
    if (e.target.classList.contains('btn-info')) {
        setCarrito(e.target.parentElement)
        Swal.fire( {
            icon: 'success',
            title: "Producto agregado con Exito!",
        } )
    }
    e.stopPropagation()
}

const setCarrito = item => {

    const producto = {
        title: item.querySelector('h5').textContent,
        precio: item.querySelector('p').textContent,
        id: item.querySelector('button').dataset.id,
        cantidad: 1
    }

    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = { ...producto }
    
    pintarCarrito()
}

const pintarCarrito = () => {
    items.innerHTML = ''

    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('span').textContent = producto.precio * producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    pintarFooter()


    localStorage.setItem('carrito', JSON.stringify(carrito))
}

const pintarFooter = () => {
    footer.innerHTML = ''
    
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito sin articulos</th>
        `
        return
    }
    

    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)


    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    //templateFooter.querySelectorAll('icono-carrito')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)

    footer.appendChild(fragment)

    const boton = document.querySelector('#vaciar-carrito')
    boton.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })

}

const btnAumentarDisminuir = e => {

    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = { ...producto }
        pintarCarrito()
    }

    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        } else {
            carrito[e.target.dataset.id] = {...producto}
        }
        pintarCarrito()
    }
    e.stopPropagation()
}