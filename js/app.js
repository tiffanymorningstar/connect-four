

/*-------------------------------- Constants --------------------------------*/
let winningArray = [
  [0, 1, 2, 3], [41, 40, 39, 38], [7, 8, 9, 10],
  [34, 33, 32, 31], [14, 15, 16, 17], [27, 26, 25, 24],
  [21, 22, 23, 24], [20, 19, 18, 17], [28, 29, 30, 31],
  [13, 12, 11, 10], [35, 36, 37, 38], [6, 5, 4, 3],
  [0, 7, 14, 21], [41, 34, 27, 20], [1, 8, 15, 22],
  [40, 33, 26, 19], [2, 9, 16, 23], [39, 32, 25, 18],
  [3, 10, 17, 24], [38, 31, 24, 17], [4, 11, 18, 25],
  [37, 30, 23, 16], [5, 12, 19, 26], [36, 29, 22, 15],
  [6, 13, 20, 27], [35, 28, 21, 14], [0, 8, 16, 24],
  [41, 33, 25, 17], [7, 15, 23, 31], [34, 26, 18, 10],
  [14, 22, 30, 38], [27, 19, 11, 3], [35, 29, 23, 17],
  [6, 12, 18, 24], [28, 22, 16, 10], [13, 19, 25, 31],
  [21, 15, 9, 3], [20, 26, 32, 38], [36, 30, 24, 18],
  [5, 11, 17, 23], [37, 31, 25, 19], [4, 10, 16, 22],
  [2, 10, 18, 26], [39, 31, 23, 15], [1, 9, 17, 25],
  [40, 32, 24, 16], [9, 7, 25, 33], [8, 16, 24, 32],
  [11, 7, 23, 29], [12, 18, 24, 30], [1, 2, 3, 4],
  [5, 4, 3, 2], [8, 9, 10, 11], [12, 11, 10, 9],
  [15, 16, 17, 18], [19, 18, 17, 16], [22, 23, 24, 25],
  [26, 25, 24, 23], [29, 30, 31, 32], [33, 32, 31, 30],
  [36, 37, 38, 39], [40, 39, 38, 37], [7, 14, 21, 28],
  [8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31],
  [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34]
];


/*---------------------------- Variables (state) ----------------------------*/

let board, turn, winner

/*------------------------ Cached Element References ------------------------*/

const openingEls = document.querySelectorAll(".board > div")
console.log(openingEls)

const messageEls = document.querySelector("#message")

const boardEl = document.querySelector('.board')

/*----------------------------- Event Listeners -----------------------------*/
boardEl.addEventListener('click', handleClick)


/*-------------------------------- Functions
--------------------------------*/
init()

function init() {
  board = [
    null, null, null, null, null, null, null,
    null, null, null, null, null, null, null,
    null, null, null, null, null, null, null,
    null, null, null, null, null, null, null,
    null, null, null, null, null, null, null,
    null, null, null, null, null, null, null
  ]
  console.log(board)
  turn = 1
  winner = null
  render()
}

function render() {
  board.forEach(function (opening, idx) {
    if (opening === 1) {
      openingEls[idx].textContent = "Z"
    } else if (opening === -1) {
      openingEls[idx].textContent = "Q"
    }
  })



  if (winner === null) {
    if (turn === 1) {
      messageEls.textContent = "It is player 1's turn"
    } else {
      messageEls.textContent = "It is player 2's turn"
    }

  } else if (winner === 'T') {
    messageEls.textContent = 'It is a Stalemate!'
  } else if (winner === 1) {
    messageEls.textContent = 'Congrats Player 1, you won!'
  } else if (winner === -1) {
    messageEls.textContent = 'Congrats Player 2, you won!'
  }

}

function handleClick(evt) {
  //console.log(evt.target)
  let opIdx = parseInt(evt.target.id)
  //console.log(opIdx)
  //targeting id's of divs
  //right now divs are strings, which is why we use parse int to turn into numbers

  if (isNaN(opIdx)) {
    return
  }
  //just returning if someone clicks outside of board
  if (winner) {
    return
  }


  if (board[opIdx]) {
    return
  }

  if (board[opIdx + 7] !== 1 && board[opIdx + 7] !== -1) {
    if (opIdx >= 35) {
    } else {
      return
    }
  }
  
  board[opIdx] = turn

  turn = turn * -1
  winner = getWinner()
  render()
}

function getWinner() {
  let bestCombo = []
  winningArray.forEach(function (combo) {
    let comboValue = board[combo[0]]+ board [combo[1]] + board[combo[2]]+ board [combo[3]]
    //Adding up opening positions, to use below to see if it equals four and there s a winner
    bestCombo.push(Math.abs(comboValue))
  })
  //Why did we use Math.abs?
//Using index to get a combo

let winnersCombo = bestCombo.some(function(value){
  return value === 4
})
  if (winnersCombo === true) {
    return turn * -1
  } else if (!board.some((value)=> value === null)){
    return 'T'
  }
  return null
}

// 6b) Attach an event listener to the game board (you can do this to each // one of the existing `openingEls` OR add a new cached element reference // that will allow you to take advantage of event bubbling). On the // `'click'` event, it should call the `handleClick` function // you created in 6a. 
// 6c) Obtain the index of the opening that was clicked by "extracting" the // index from an `id` assigned to the element in the HTML. Assign this // to a constant called `opIdx`. 
// 6d) If the `board` has a value at the `opIdx`, immediately `return` // because that square is already taken. Also, if `winner` is not `null` // immediately `return` because the game is over. 
// 6e) Update the `board` array at the `opIdx` with the current value of // `turn`. 
// 6f) Change the turn by multiplying `turn` by `-1` (this flips a `1` to // `-1`, and vice-versa). 
// 6g) Set the `winner` variable if there's a winner by calling a new // function: `getWinner`. 
// 6h) All the state has been updated so we need to render our updated state // to the user by calling the `render` function we wrote earlier. 

// Step 7 - Build the `getWinner` function 
// 7a) Create a function called `getWinner` /* * There are two methods you can use to find out if there is a winner. * * Step b1 below is a more elegant method that takes advantage of the * `winningCombos` array you wrote above in step 5. * * Step b2 might be a little simpler to comprehend, but you'll need to write * more code. Step b2 also won't take advantage of the `winningCombos` * array, but using it as a reference will help you build a solution. * ***Ensure you choose only one path.*** *
// 7b1)Loop through each of the winning combination arrays defined in the // `winningCombos` array. Total up the three board positions using the // three indexes in the current combo. Convert the total to an absolute // value (convert any negative total to positive). If the total equals 3, // we have a winner! Set the `winner` variable to the board's value at // the index specified by the first index of that winning combination's // array by returning that value. 
// 7b2)For each one of the winning combinations you wrote in step 5, find the // total of each winning combination. Convert the total to an absolute // value (convert any negative total to positive). If the total equals 3, // we have a winner! Set the `winner` variable to the board's value at // the index specified by the first index of that winning combination's // array by returning that value. 
// 7c) If there is no winner, check to see if there is a tie. Set the // `winner` variable to `'T'` if there are no more nulls in the board // array byreturning the string `'T'`. 
// 7d) If there is no winner and there isn’t a tie, return `null`. 

// Step 8 - Create Reset functionality 
// 8a) Add a reset button to the HTML document. // 8b) Store the new reset button element in a constant named `resetBtnEl`. // 8c) Attach an event listener to the `resetBtnEl`. On the `'click'` event // it should call the `init` function you created in 3.
