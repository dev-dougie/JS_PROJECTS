alert('Preenchimento da área de texto obrigatório')

const textArea = document.querySelector('#text-area');
const btnUpper = document.querySelector('#upper')
const btnLower = document.querySelector('#lower')
const btnBold = document.querySelector('#bold')
const btnItalic = document.querySelector('#italic')
const btnStrike = document.querySelector('#strike')
const result = document.querySelector('.result')

const convert = (btn) =>{
        let choice = btn;
        let mainText = textArea.value;

        switch (choice) {
            case 'upper':
                result.innerHTML = mainText.toUpperCase();
            break;
            case 'lower':
                result.innerHTML = mainText.toLowerCase();
            break;
            case 'bold':
                result.innerHTML = mainText.bold();
            break;
            case 'strike':
                result.innerHTML = mainText.strike()
            break;
            default: result.innerHTML = '';
    }
}


btnUpper.onclick = () => convert('upper')
btnLower.onclick = () => convert('lower')
btnBold.onclick = () => convert('bold')
btnStrike.onclick = () => convert('strike')
