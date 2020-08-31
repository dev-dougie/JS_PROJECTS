const characterAmountRange = document.getElementById('characterRange')
const characterAmountNumber = document.getElementById('characterNumber')
const includeUpperCaseElement = document.getElementById('includeUpperCase')
const includeNumberElement = document.getElementById('includeNumber')
const includeSymbolElement = document.getElementById('includeSymbols')
const form = document.getElementById('passwordGeneratorForm')
const passwordDisplay = document.getElementById('passwordDisplay')


//Usando informações da tabela de códigos dos caracteres
const LOWERCASE_CHARCODES = arrayFromHighToLow(97, 122) 
const UPPERCASE_CHARCODES = arrayFromHighToLow(65, 90)
const NUMBER_CHARCODES = arrayFromHighToLow(48, 57)
const SYMBOL_CHARCODES = arrayFromHighToLow(33, 47)

characterAmountRange.addEventListener('input', syncCharacterAmount)
characterAmountNumber.addEventListener('input', syncCharacterAmount)

form.addEventListener('submit', e => {
    e.preventDefault();
    const characterAmount = characterAmountNumber.value
    const includeUpperCase =includeUpperCaseElement.checked
    const includeNumbers = includeNumberElement.checked
    const includeSymbol = includeSymbolElement.checked
    const password = generatePassword(characterAmount, includeUpperCase, includeNumbers, includeSymbol)
    passwordDisplay.innerText =  password
})

function generatePassword (characterAmount, upperCase, numbers, symbol){
    let charCodes = LOWERCASE_CHARCODES
    if(upperCase) charCodes = charCodes.concat(UPPERCASE_CHARCODES)
    if(numbers) charCodes = charCodes.concat(NUMBER_CHARCODES)
    if(symbol) charCodes = charCodes.concat(SYMBOL_CHARCODES)

    const passwordCharacters = [];
    for(i = 0; i <= characterAmount; i++){
        const character = charCodes[Math.floor(Math.random() * charCodes.length)]
        passwordCharacters.push(String.fromCharCode(character))
    }
    return passwordCharacters.join('')
    //Usando os códigos de caracteres para gerar minhas senhas
    //String.fromCharCode(65)
}

function arrayFromHighToLow(low, high){
    let array = []
    for(let i = low; i <= high; i++){
         array.push(i)
    }
    return array
}

//Faz com que o número do meu range seja igual ao do meu input e vice-versa
function syncCharacterAmount (e){
    const value = e.target.value
    characterAmountRange.value = value;
    characterAmountNumber.value = value;

}