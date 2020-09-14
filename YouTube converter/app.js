const inputURL = document.querySelector('.youtube-url')
const btnConvert = document.querySelector('.Converter')

btnConvert.onclick = () => {
    console.log(`URL:${inputURL.value}`)
    sendURL(inputURL.value)
}

const sendURL = (URL) =>{
        window.location.href = `http://localhost:4000/download?URL=${URL}`
}

