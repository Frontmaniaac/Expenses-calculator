const incomeSection = document.querySelector('.income-area');
const expenseSection = document.querySelector('.expenses-area');
const availableMoney = document.querySelector('.available-money');
const addTransactionPanel = document.querySelector('.add-transaction-panel');
const nameInput = document.querySelector('#name')
const amountInput = document.querySelector('#amount')
const categorySelect = document.querySelector('#category')
const addTransactionBtn = document.querySelector('.add-transaction')
const saveBtn = document.querySelector('.save')
const cancelBtn = document.querySelector('.cancel')
const deleteBtn = document.querySelector('.delete')
const deleteAllBtn = document.querySelector('.delete-all')
const lightStyleBtn = document.querySelector('.light')
const darkStyleBtn = document.querySelector('.dark')

let root =document.documentElement;
let ID = 0;
let categoryIcon;
let selectedCategory;
let moneyArr = [0];
const showPanel = () =>{
    addTransactionPanel.style.display = 'flex';
}
const closePanel = () =>{
    addTransactionPanel.style.display = 'none';
    clearInputs();
}
const checkForm = () =>{
    if(nameInput.value !== '' && amountInput.value !== '' && categorySelect.value !== 'none'){
    }
    else{
        alert('Fill all forms')
    }
}
const clearInputs = () =>{
    nameInput.value = '';
    amountInput.value = '';
    categorySelect.selectedIndex = 0;
}
const createNewTransaction = () =>{
    checkForm();
    const newTransaction = document.createElement('div');
    newTransaction.classList.add('transaction');
    newTransaction.setAttribute('id',ID);
    checkCategory(selectedCategory);
    newTransaction.innerHTML = `
    <p class="transaction-name">${categoryIcon} ${nameInput.value}</p>
    <p class="transaction-amount"> ${amountInput.value}<button class="delete" onclick="deleteTransaction(${ID})>
    <i class="fas fa-times"></i></button></p>`
    amountInput.value > 0 ? incomeSection.appendChild(newTransaction) && newTransaction.classList.add('.income') : expenseSection.appendChild(newTransaction) && newTransaction.classList.add('expense');
    moneyArr.push(parseFloat(amountInput.value))
    countMoney(moneyArr);

    closePanel()
    ID++;
}
const selectCategory = () =>{
    selectedCategory = categorySelect.options[categorySelect.selectedIndex].text;
}
const checkCategory = transaction =>{
    switch(transaction){
        case '[+] Income':
            categoryIcon = '<i class="fas fa-money-bill-wave"></i>';
            break;
        case '[+] Savings':
            categoryIcon = '<i class="fas fa-piggy-bank"></i>';
            break;
        case '[-] Food':
            categoryIcon = '<i class="fas fa-pizza-slice"></i>';
            break;
        case '[-] Shopping':
            categoryIcon = '<i class="fas fa-shopping-cart"></i>';
            break;
        case '[-] Cinema':
            categoryIcon = '<i class="fas fa-film"></i>';
            break;
        case '[-] Car':
            categoryIcon = '<i class="fas fa-car"></i>';
            break;
        case '[-] Party':
            categoryIcon = '<i class="fas fa-glass-cheers"></i>';
            break;
    }

}
const countMoney = money =>{
    const newMoney = money.reduce((a,b) => a+b);
    availableMoney.textContent = `${newMoney}$`
}

const deleteTransaction = id =>{
    const transactionToDelete = document.getElementById(id);
    const transactionAmount = parseFloat(transactionToDelete.childNodes[3].innerText);
    const indexOfTransaction = moneyArr.indexOf(transactionAmount)
    moneyArr.splice(indexOfTransaction,1);
    transactionToDelete.classList.contains('income') ? incomeSection.removeChild(transactionToDelete) : expenseSection.removeChild(transactionToDelete);
    countMoney(moneyArr)

}
const deleteAllTransactions = () =>{
    incomeSection.innerHTML = '<h3>Income</h3>';
    expenseSection.innerHTML = '<h3>Expenses</h3>'
    availableMoney.textContent = '0$';
    moneyArr = [0];
}

const changeStyleToLight = () =>{
    root.style.setProperty('--first-color','#F9F9F9')
    root.style.setProperty('--second-color','#14161F')
    root.style.setProperty('--border-color','rgba(0,0,0,.2')
}
const changeStyleToDark = () =>{
    root.style.setProperty('--first-color','#14161F')
    root.style.setProperty('--second-color','#F9F9F9')
    root.style.setProperty('--border-color','rgba(255,255,255,.4')
}
addTransactionBtn.addEventListener('click',showPanel)
cancelBtn.addEventListener('click',closePanel)
saveBtn.addEventListener('click',createNewTransaction)
deleteAllBtn.addEventListener('click',deleteAllTransactions)
lightStyleBtn.addEventListener('click',changeStyleToLight)
darkStyleBtn.addEventListener('click',changeStyleToDark)