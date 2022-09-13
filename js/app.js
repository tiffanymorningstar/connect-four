
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

const mortalKombat = new Audio("../assets/audio/mkaudio.mp3")


let board, turn, winner


const openingEls = document.querySelectorAll(".board > div")
console.log(openingEls)

const messageEls = document.querySelector("#message")

const boardEl = document.querySelector('.board')

const resetBtnEl = document.querySelector("#reset-button")


const mklogoImg = document.querySelector("#mklogo")
console.log(mklogoImg)

// const playerEl = document.querySelector('#liukang');


boardEl.addEventListener('click', handleClick)

tokenEl.addEventListener('click', correctPlacement)

resetBtnEl.addEventListener('click', init)

mklogoImg.addEventListener('click', function (evt) {
  console.log(evt.target)
})

mklogoImg.addEventListener("click", function (evt) {
  mortalKombat.volume = .10
  mortalKombat.play()
})


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
  turn = 1
  winner = null
  render()
}

// function render() {
//   board.forEach(function (opening, idx) {
//     if (opening === 1) {
//       openingEls[idx].textContent = "Z"
//     } else if (opening === -1) {
//       openingEls[idx].textContent = "Q"
//     } else {
//       openingEls[idx].textContent = ''
//     }
//   })


function render() {
  board.forEach(function (opening, idx) {
    if (opening === 1) {
      openingEls[idx].classList.add("circle1")
    } else if (opening === -1) {
      openingEls[idx].classList.add("circle2")
    } else {
      openingEls[idx].className = ('openings')
    }
  })


  if (winner === null) {
    if (turn === 1) {
      messageEls.textContent = "Player 1 - FIGHT!"
    } else {
      messageEls.textContent = "Player 2 - FIGHT!"
    }

  } else if (winner === 'T') {
    messageEls.textContent = 'It is a Stalemate!'
  } else if (winner === 1) {
    messageEls.textContent = 'Player 1 wins, FLAWLESS VICTORY'
  } else if (winner === -1) {
    messageEls.textContent = 'Player 2 wins, FLAWLESS VICTORY'
  }

}

function handleClick(evt) {
  let opIdx = parseInt(evt.target.id)

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


  //
  if (board[opIdx + 7] !== 1 && board[opIdx + 7] !== -1) {
    if (opIdx >= 35) {
    } else {
      return
    }
  }


  // const corrIdx = haandlePlacement(idx)
  board[opIdx] = turn
  turn = turn * -1
  winner = getWinner()
  render()
}



function handlePlacement(opIdx) {
  for (let i =(opIdx % 7)+35; i >= 0; i -= 7 ) {
    if (board[i] === null) {
      return i
    }
  }
}

let openPosition = idx + 35
for (let i = 0; i >= 0; i++)








  function getWinner() {
    let bestCombo = []
    // titleEl.className = 'animate__animated animate__bounce'
    winningArray.forEach(function (combo) {
      let comboValue = board[combo[0]] + board[combo[1]] + board[combo[2]] + board[combo[3]]

      bestCombo.push(Math.abs(comboValue))
    })


    let winnersCombo = bestCombo.some(function (value) {
      return value === 4
    })
    if (winnersCombo === true) {
      return turn * -1
    } else if (!board.some((value) => value === null)) {
      return 'T'
    }
    return null
  }





