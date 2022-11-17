const modalProducto = new bootstrap.Modal(document.getElementById('modalProducto'))
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}
on(document, 'click', '.btnEditar', e =>{
    const fila = e.target.parentNode.parentNode
    id_editar.value = fila.children[0].innerHTML
    nombre_editar.value = fila.children[1].innerHTML
    descripcion_editar.value = fila.children[3].innerHTML
    stock_editar.value = fila.children[2].innerHTML
    precio_editar.value = fila.children[4].innerHTML
    marca_editar.value = fila.children[5].innerHTML
    modalProducto.show()
})