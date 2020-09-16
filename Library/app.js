const typedBook = document.querySelector('#book')
const btnSearch = document.querySelector('#search')
const result = document.querySelector('.result')

let books = JSON.parse(localStorage.getItem('shielf')) ||  []  

const getBook = () =>{

        const name =  typedBook.value;
        const api = `https://www.googleapis.com/books/v1/volumes?q=${name}`

        fetch(api)
        .then(res => res.json())
        .then(data => {

                const {items} = data

                items.forEach(book => {
                    let { title, authors, publisher, language, description, imageLinks, previewLink} = book.volumeInfo
                    console.log(previewLink)

                   switch(language){
                       case 'pt':
                           language = 'Português'
                        break;
                        case 'eng':
                            language = 'Inglês'
                        break;
                        default:
                            language = '';
                   }

                   if(description == 'undefined'){description = 'Descrição não informada';}

                    const {thumbnail} = imageLinks;

                    addBook(title, authors, language, publisher, description, thumbnail, previewLink)
                    renderBooks();
                    saveToStorage();
                });
        }  
       ).catch(err => alert('Não encontramos este livro! :('))

       typedBook.value = '';    

}



btnSearch.onclick = () => (typedBook.value === '') ? alert('Por favor, digite o nome ou autor do livro') : getBook() 


const addBook = (bookTitle, bookAuthors, bookLanguage, bookPublisher, bookDescription, bookImage, bookPreview) => {
    books.push({bookTitle, bookAuthors, bookLanguage, bookPublisher, bookDescription, bookImage, bookPreview})

}

const renderBooks = () => {

            result.innerHTML = '';

           
            
            books.forEach(e => {

                const mainDiv = document.createElement('div')

                const title = document.createElement('strong');
                const infoTitle = document.createTextNode(`📚 Título:  ${e.bookTitle}`)
    
                const authors = document.createElement('p')
                const infoAuthors = document.createTextNode(`🙋‍♂️ Autor: ${e.bookAuthors}`)
    
                const language = document.createElement('p')
                const infoLanguage = document.createTextNode(`🌐 Idioma: ${e.bookLanguage}`)
                
                const publisher = document.createElement('p')
                const infoPublisher = document.createTextNode(`✍🏻 Publicado por: ${e.bookPublisher}`)

                const description = document.createElement('p')
                const infoDescription = document.createTextNode(`🏻 Descrição: ${e.bookDescription}`)

                const preview = document.createElement('a')
                preview.setAttribute('href', e.bookPreview)
                preview.setAttribute('target', '_blank')
                const linkText = document.createTextNode('Visualizar')

                const image = document.createElement('img')
                image.setAttribute('src', e.bookImage)
    
                title.appendChild(infoTitle)
                authors.appendChild(infoAuthors)
                language.appendChild(infoLanguage)
                publisher.appendChild(infoPublisher)
                description.appendChild(infoDescription)
                preview.appendChild(linkText)

                //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    
                mainDiv.appendChild(title)
                mainDiv.appendChild(authors)
                mainDiv.appendChild(language)
                mainDiv.appendChild(publisher)
                mainDiv.appendChild(description)
                mainDiv.appendChild(image)
                mainDiv.appendChild(preview)
                result.appendChild(mainDiv)
            
            });
}


const saveToStorage = () => {
    localStorage.setItem('shelf', JSON.stringify(`Livros procurados anteriormente: ${books}`))
}

