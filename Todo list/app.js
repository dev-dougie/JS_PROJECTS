const typedItem = document.querySelector('#item')
const btnAdd = document.querySelector('#addItem')
const list = document.querySelector('ol')

const items = JSON.parse(localStorage.getItem('todos')) || [];

const addItem = () => {
    let i = typedItem.value
    items.push(i)
    typedItem.value = '';
    renderItems()
    saveToStorage()
}

const renderItems = () => {
    
    list.innerHTML =  ''

    for(item of items){
            let listEl = document.createElement('li')
            let listText = document.createTextNode(item)

            let excludeEl = document.createElement('a')
            excludeEl.setAttribute('href', '#')
            let excludeText = document.createTextNode("Excluir")
            
            
            excludeEl.addEventListener('click', deleteTodo)

            excludeEl.appendChild(excludeText)
            listEl.appendChild(listText)
            listEl.appendChild(excludeEl)
            list.appendChild(listEl)
    }
}



const deleteTodo = (pos) =>{
        items.splice(pos, 1)
        renderItems()
        saveToStorage()
}

btnAdd.onclick = () => (typedItem.value == 0) ? alert('Por favor, preencha o campo') : addItem()

const saveToStorage = () => {
        localStorage.setItem('todos', JSON.stringify(items))
}



