// const balance = document.querySelector(".balance-display");
// const income = document.querySelector(".income-display");
// const expense = document.querySelector(".expense-display");
// const text_input = document.querySelector(".text-input");
// const amount_input = document.querySelector(".amount-input");
// const form = document.querySelector(".form");
// const list = document.querySelector(".list");


// let updated_amount = 0;
// let updated_income = 0;
// let updated_expense = 0;

// function balance_input_func(temp_amount_input) {
//   temp_amount_input = Number(temp_amount_input);
//   updated_amount = updated_amount + temp_amount_input;
//   balance.innerHTML = updated_amount;
// }
// function income_display_func(temp_amount_input) {
//   if (temp_amount_input > 0) {
//     temp_amount_input = Number(temp_amount_input);
//     updated_income = updated_income + temp_amount_input;
//     income.innerHTML = updated_income;
//   }
// }
// function expense_display_func(temp_amount_input) {
//   if (temp_amount_input < 0) {
//     temp_amount_input = Number(temp_amount_input);
//     updated_expense = updated_expense + temp_amount_input;
//     expense.innerHTML = updated_expense;
//   }
// }

// function list_creation(temp_text_input, temp_amount_input) {
//   const item = document.createElement("li");
//   const item_delete = document.createElement("p");
//   const item_name = document.createElement("p");
//   const item_price = document.createElement("p");
 
//  item_delete.textContent="X"
//   item_name.textContent = temp_text_input;
//   item_price.textContent = temp_amount_input;
 

//   item_delete.classList.add("delete")
//   item.appendChild(item_delete);
//   item.appendChild(item_name);
//   item.appendChild(item_price);
 

//   const amount = parseFloat(temp_amount_input);

//   if(amount>0)
//   {
//     item.style.borderRight = "5px solid green";
//   }
//   else{
//     item.style.borderRight = "5px solid red";
//   }
//   list.prepend(item);

//   item_delete.addEventListener("click", () => {
//     item.remove();
//     updated_amount=updated_amount-amount
//     balance.innerHTML = updated_amount;

//     if(amount<0){
//       updated_expense=updated_expense-amount
//     expense.innerHTML = updated_expense;
//     }
//     else{
//       updated_income=updated_income-amount
//       income.innerHTML = updated_income;

//     }
   

    
//   });
// }

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   console.log(text_input.value);
//   console.log(amount_input.value);
//   const temp_text_input = text_input.value;
//   const temp_amount_input = amount_input.value;
//   text_input.value = "";
//   amount_input.value = "";

//   balance_input_func(temp_amount_input);
//   income_display_func(temp_amount_input);
//   expense_display_func(temp_amount_input);
//   list_creation(temp_text_input, temp_amount_input);
// });


const balance = document.querySelector(".balance-display");
const income = document.querySelector(".income-display");
const expense = document.querySelector(".expense-display");
const text_input = document.querySelector(".text-input");
const amount_input = document.querySelector(".amount-input");
const form = document.querySelector(".form");
const list = document.querySelector(".list");

let updated_amount = Number(localStorage.getItem('balance')) || 0;
let updated_income = Number(localStorage.getItem('income')) || 0;
let updated_expense = Number(localStorage.getItem('expense')) || 0;


let transactions = JSON.parse(localStorage.getItem('transactions')) || [];


balance.innerHTML = updated_amount;
income.innerHTML = updated_income;
expense.innerHTML = updated_expense;


transactions.forEach((transaction) => {
  list_creation(transaction.text, transaction.amount);
});

function updateLocalStorage() {
  localStorage.setItem('balance', updated_amount);
  localStorage.setItem('income', updated_income);
  localStorage.setItem('expense', updated_expense);
  localStorage.setItem('transactions', JSON.stringify(transactions)); 
}

function balance_input_func(temp_amount_input) {
  temp_amount_input = Number(temp_amount_input);
  updated_amount = updated_amount + temp_amount_input;
  balance.innerHTML = updated_amount;
  updateLocalStorage();
}

function income_display_func(temp_amount_input) {
  if (temp_amount_input > 0) {
    temp_amount_input = Number(temp_amount_input);
    updated_income = updated_income + temp_amount_input;
    income.innerHTML = updated_income;
    updateLocalStorage();
  }
}

function expense_display_func(temp_amount_input) {
  if (temp_amount_input < 0) {
    temp_amount_input = Number(temp_amount_input);
    updated_expense = updated_expense + temp_amount_input;
    expense.innerHTML = updated_expense;
    updateLocalStorage();
  }
}

function list_creation(temp_text_input, temp_amount_input) {
  const item = document.createElement("li");
  const item_delete = document.createElement("p");
  const item_name = document.createElement("p");
  const item_price = document.createElement("p");

  item_delete.textContent = "X";
  item_name.textContent = temp_text_input;
  item_price.textContent = temp_amount_input;

  item_delete.classList.add("delete");
  item.appendChild(item_delete);
  item.appendChild(item_name);
  item.appendChild(item_price);

  const amount = parseFloat(temp_amount_input);

  if (amount > 0) {
    item.style.borderRight = "5px solid green";
  } else {
    item.style.borderRight = "5px solid red";
  }

  list.prepend(item);

  item_delete.addEventListener("click", () => {
    item.remove();
    updated_amount = updated_amount - amount;
    balance.innerHTML = updated_amount;

    if (amount < 0) {
      updated_expense = updated_expense - amount;
      expense.innerHTML = updated_expense;
    } else {
      updated_income = updated_income - amount;
      income.innerHTML = updated_income;
    }

    // Remove the item from transactions array and update localStorage
    transactions = transactions.filter(
      (transaction) => transaction.text !== temp_text_input || transaction.amount !== temp_amount_input
    );
    updateLocalStorage();
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const temp_text_input = text_input.value;
  const temp_amount_input = amount_input.value;

  text_input.value = "";
  amount_input.value = "";

  balance_input_func(temp_amount_input);
  income_display_func(temp_amount_input);
  expense_display_func(temp_amount_input);
  list_creation(temp_text_input, temp_amount_input);

 
  transactions.push({ text: temp_text_input, amount: temp_amount_input });
  updateLocalStorage();
});
