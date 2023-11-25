'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance} €`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposite => (deposite * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int > 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumIn.textContent = `${incomes}€`;
  labelSumOut.textContent = `${Math.abs(out)}€`;
  labelSumInterest.textContent = `${Math.abs(interest)}€`;
};

const user = 'Steven Thomas Williams';
const username = user;

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};

createUsernames(accounts);
//console.log(accounts);

//Event Handlers
let currentAccount;
btnLogin.addEventListener('click', function (event) {
  event.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //display UI and welcome message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    //Clear Input Feilds
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    containerApp.style.opacity = 100;
    //display movements
    displayMovements(currentAccount.movements);
    //display balance
    calcDisplayBalance(currentAccount.movements);
    //display summary
    calcDisplaySummary(currentAccount);
  }
});

// console.log(containerMovements.innerHTML);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);
//
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(movements);
// console.log(firstWithdrawal);

// console.log(accounts);

// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

// const eurToUsd = 1.1;
// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   .map((mov, i, arr) => {
//     // console.log(arr);
//     return mov * eurToUsd;
//   })
//   //.map(mov => mov * eurToUsd)
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(totalDepositsUSD);
// const balance = movements.reduce((acc, cur) => acc + cur, 0);
// console.log(balance);

// const deposits = movements.filter(function (mov) {
//   return mov > 0;
// });
// console.log(movements);
// console.log(deposits);

// const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);
// /////////////////////////////////////////////////
// const currentUnique = new Set(['USD', 'GBG', 'USD', 'EUR', 'GBG']);
// console.log(currentUnique);
// currentUnique.forEach(function (value, key, map) {
//   console.log(`${key} : ${value}`);
// });
// currencies.forEach(function (value, key, map) {
//   console.log(`${key} : ${value}`);
// });
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1}: you deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i + 1}: you withdrew ${Math.abs(movement)}`);
//   }
// }

// movements.forEach(function (mov, i, arr) {
//   if (mov > 0) {
//     console.log(`Movement ${i + 1}: you deposited ${mov}`);
//   } else {
//     console.log(`Movement ${i + 1}: you withdrew ${Math.abs(mov)}`);
//   }
// });

// const eurToUsd = 1.1;
// const movementUSD = movements.map(mov => mov * eurToUsd);

// console.log(movements);
// console.log(movementUSD);

// // const movementsUSDfor = [];
// // for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
// // console.log(movementsUSDfor);

// const movementsDescription = movements.map((mov, i) => {
//   return `Movement ${i + 1}: you ${
//     mov > 0 ? 'you deposited' : 'you withdrew'
//   } ${Math.abs(mov)}`;
// });

// console.log(movementsDescription);

// const max = movements.reduce((acc, mov) => {
//   if (acc > mov) return acc;
//   else return mov;
// }, movements[0]);

// console.log(max);

// const testDataOne = [5, 2, 4, 1, 15, 8, 3];
// const testDataTwo = [16, 6, 10, 5, 6, 1, 4];

// const humanAge = function (arr) {
//   return arr
//     .map(years => (years >= 2 ? 16 + years * 4 : years * 2))
//     .filter(years => years >= 18)
//     .reduce((acc, years, i, arr) => acc + years / arr.length, 0);
// };

// console.log(humanAge(testDataOne));
