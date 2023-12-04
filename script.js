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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
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

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`;
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

const updateUI = function (currentAccount) {
  //display movements
  displayMovements(currentAccount.movements);
  //display balance
  calcDisplayBalance(currentAccount);
  //display summary
  calcDisplaySummary(currentAccount);
};

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

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    //Transfering
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //Add Movement
    currentAccount.movements.push(amount);

    //update UI
    updateUI(currentAccount);
    inputLoanAmount.value = '';
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // console.log(index);
    //Delete account
    accounts.splice(index, 1);

    //Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
// console.log(containerMovements.innerHTML);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const overalBalance = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance);

// const overalBalance2 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance2);
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);
//
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// console.log(owners.sort());

// console.log(movements);

// //   movements.sort((a, b) => {
// //     if (a > b) return 1;
// //     if (a < b) return -1;
// //   })
// // );
// movements.sort((a, b) => a - b);

// console.log(movements);
// // console.log(account4.movements.every(mov => mov > 0));

// const deposit = mov => mov > 0;
// console.log(movements.some(deposit));

// const arr = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
// ];

// const arrDeep = [
//   [[1, 2], 3],
//   [4, [5, 6]],
//   [7, 8, 9],
// ];
// console.log(arr.flat());
// console.log(arrDeep.flat(2));

// // const firstWithdrawal = movements.find(mov => mov < 0);
// // console.log(movements);
// // console.log(firstWithdrawal);
// console.log(movements);
// console.log(movements.some(mov => mov === -130));

// const anyDeposits = movements.some(mov => mov > 1500);
// console.log(anyDeposits);
// // console.log(accounts);

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
