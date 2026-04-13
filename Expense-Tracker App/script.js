const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');

// Initialize data from localStorage
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function renderExpenses() {
    expenseList.innerHTML = '';
    expenses.forEach((expense, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.name}</td>
            <td>$${expense.amount}</td>
            <td>${expense.date}</td>
            <td>${expense.category}</td>
            <td><button class="edit-btn" onclick="editExpense(${index})">Edit</button></td>
            <td><button class="delete-btn" onclick="deleteExpense(${index})">Delete</button></td>
        `;
        expenseList.appendChild(row);
    });
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function addExpense(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const amount = document.getElementById('amount').value;
    const date = document.getElementById('date').value;

    const newExpense = {
        name,
        amount: parseFloat(amount).toFixed(2),
        date
    };

    expenses.push(newExpense);
    renderExpenses();
    expenseForm.reset();
}

window.editExpense = function(index) {
    const expense = expenses[index];
    document.getElementById('name').value = expense.name;
    document.getElementById('amount').value = expense.amount;
    document.getElementById('date').value = expense.date;
    expenses.splice(index, 1);
    renderExpenses();
};

window.deleteExpense = function(index) {
    expenses.splice(index, 1);
    renderExpenses();
};

expenseForm.addEventListener('submit', addExpense);

// Initial render
renderExpenses();
