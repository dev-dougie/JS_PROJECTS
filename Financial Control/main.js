const transactionsUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector("#money-minus")
const balanceDisplay = document.querySelector("#balance")
const form = document.querySelector("form")
const inputTransactionName = document.querySelector("#text")
const inputTransactionAmount = document.querySelector("#amount")


const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []

const removeTransaction = ID => {
    transactions = transactions.filter(transaction => transaction.id !== ID)
    saveToLocalStorage()
    init()
}

const addTransactionIntoDOM = transaction => {
    const operator = transaction.amount < 0 ? '-' : ' '
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(transaction.amount)

    const li = document.createElement('li')
    li.classList.add(CSSClass)
    li.innerHTML = `
    ${transaction.name} <span> ${operator} R$ ${amountWithoutOperator}
    </span>
    <button class="delete-btn" onClick="removeTransaction(${transaction.id})">
        x
    </button>
    `
    transactionsUl.append(li)
}

const updateBalancevalues = () => {
    const transactionsAmount =
        transactions.map(transaction => transaction.amount)
    const total = transactionsAmount
        .reduce((accumulator, amount) => accumulator + amount, 0)
        .toFixed(2)
        console.log(transactionsAmount)
    const income = transactionsAmount.filter(value => value > 0)
        .reduce((total, value) => total + value, 0)
        .toFixed(2)
    const expense = Math.abs(transactionsAmount
        .filter(value => value < 0)
        .reduce((total, next) => total + next, 0).toFixed(2))

    balanceDisplay.textContent = `R$${total}`
    expenseDisplay.textContent = `R$${expense}`
    incomeDisplay.textContent = `R$${income}`

}

const init = () => {
    transactionsUl.innerHTML = ""
    transactions.forEach(addTransactionIntoDOM)
    updateBalancevalues()
}

init()

const saveToLocalStorage = localStorage.setItem('transactions', JSON.stringify(transactions))

const generateID = () => Math.round(Math.random() * 1000)

const addToTransactionArray = (transactionName, transactionAmount) => {
    transactions.push( {
        id: generateID(),
        name: transactionName,
        amount: Number(transactionAmount)
    })
}

const cleanInputs = () => {
    transactionName.value = ""
    transactionAmount.value = ""
}

const handleFormSubmit = event => {
    event.preventDefault()

    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()
    const isSomeInputEmpty = transactionName === "" || transactionAmount === ""

    if (isSomeInputEmpty) {
        alert('Por favor, preencha todos os campos')
        return
    }

    addToTransactionArray(transactionName, transactionAmount)
   
    init()
    saveToLocalStorage()
    cleanInputs()

}

form.addEventListener('submit', handleFormSubmit)

