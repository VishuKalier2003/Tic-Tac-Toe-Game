const board = document.querySelector('.board');      // Board element...
const winner = document.getElementById('winner');    // Winner div element...
const chance = document.getElementById('chance');    // Chance div element...

const switches = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);     // Creating an array of nine zeros...

var moves = 9;      // Maximum number of moves required to end the Game...

chance.innerHTML = 'Player I Chance';

// Function to check the chance of the Player...
function ChanceCheck() {
    if (first == false)
        chance.innerHTML = 'Player I Chance ';
    else if (first == true)
        chance.innerHTML = 'Player II Chance ';
}

let first = true;      // First Chance given to first player...
for(let i = 0; i < 9; i++) {
    const Piece = document.createElement('div');    // Creating a div element...
    Piece.addEventListener("click", () => {
        if (first == true) {
            const picture = document.createElement('img');     // Creating an Image element...
            picture.classList.add('circle');        // Adding CSS Class...
            Piece.appendChild(picture);
            switches[i] = 1;      // Clicked by Player I...
            ChanceCheck();             // Function call...
            first = false;
        }
        else if(first == false) {
            const picture = document.createElement('img');        // Creating an Image element...
            picture.classList.add('cross');        // Adding CSS Class...
            Piece.appendChild(picture);
            switches[i] = 2;      // Clicked by Player II...
            ChanceCheck();        // Function call...
            first = true;
        }
        Piece.disabled = true;     // Disabling the check board...
        moves--;
    });
    board.appendChild(Piece);
}

const Blocks = Array.from(document.querySelectorAll('.board div'));     // Creating the div elements as blocks...

// Function for Player I Wins...
function Winner1() {
    winner.classList.add('orient');
    winner.innerHTML = "Player 1 Wins !!";
    setTimeout(() => {
        location.reload();     // Reloading the window after Game Over in 3 seconds...
    }, 3000);
}

// Function for Player II Wins...
function Winner2() {
    winner.classList.add('orient');
    winner.innerHTML = "Player 2 Wins !!";
    setTimeout(() => {
        location.reload();      // Reloading the window after Game Over in 3 seconds...
    }, 3000);
}

// Checking the Winner after every 0.5 seconds...
setInterval(() => {
    // Vertical Wins Case...
    for(let i = 0; i < Blocks.length; i = i + 3) {
        if((switches[i] == 1) && (switches[i + 1] == 1) && (switches[i + 2] == 1))
            Winner1();
        else if((switches[i] == 2) && (switches[i + 1] == 2) && (switches[i + 2] == 2))
            Winner2();
    }
    // Horizontal Wins Case...
    for(let i = 0; i < Blocks.length; i++) {
        if((switches[i] == 1) && (switches[i + 3] == 1) && (switches[i + 6] == 1))
            Winner1();
        else if((switches[i] == 2) && (switches[i + 3] == 2) && (switches[i + 6] == 2))
            Winner2();
    }
    // Diagonal Wins Case...
    if((switches[0] == 1) && (switches[4] == 1) && (switches[8] == 1))
        Winner1();
    else if((switches[2] == 1) && (switches[4] == 1) && (switches[6] == 1))
        Winner1();
    if((switches[0] == 2) && (switches[4] == 2) && (switches[8] == 2))
        Winner2();
    else if((switches[2] == 2) && (switches[4] == 2) && (switches[6] == 2))
        Winner2();
    // If no moves are left and the board pieces are already covered...
    if(moves == 0)
        winner.innerHTML = 'It is a Draw !!';
}, 500);