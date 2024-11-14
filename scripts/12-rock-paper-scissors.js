let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScoreElement();

let isAutoPlaying = false;
let intervalId;
function autoPlay() {
    const buttonElement = document.querySelector('.js-auto-play-button')
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGames(playerMove);
        }, 1000);
        isAutoPlaying = true;
        buttonElement.innerHTML = 'Stop Play';
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
        buttonElement.innerHTML = 'Auto Play';
    }
    
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
    playGames('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGames('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
    playGames('scissors');
});

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGames('rock');
    } else if (event.key === 'p') {
        playGames('paper');
    } else if(event.key === 's') {
        playGames('scissors');
    }
});

function playGames(playerMove) {
    const computerMove = pickComputerMove();
    let result = '';
    
    if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie.';
        } else if (computerMove === 'paper') {
            result = 'You lose.';
        } else if (computerMove === 'scissors') {
            result = 'You win.';
        }
    } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win.';
        } else if (computerMove === 'paper') {
            result = 'Tie.';
        } else if (computerMove === 'scissors') {
            result = 'You lose.';
        }
    } else if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You lose.';
        } else if (computerMove === 'paper') {
            result = 'You win.';
        } else if (computerMove === 'scissors') {
            result = 'Tie.';
        }
    }

    if (result === 'You win.') {
        score.wins += 1;
    } else if (result === 'You lose.') {
        score.losses += 1;
    } else if (result === 'Tie.') {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    //alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result}\nWins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);
    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `You
<img src="img/${playerMove}-emoji.png" class="move-icon">
<img src="img/${computerMove}-emoji.png" class="move-icon">
Computer</p>`;
    updateScoreElement();
}

function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove(){
    const randomNumber = Math.random();
    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        return 'rock';
    } 
    else if (randomNumber >= 1/3 && randomNumber < 2 / 3) {
        return 'paper';
    }
    else if (randomNumber >= 2/3 && randomNumber < 1) {
        return 'scissors';
    }
}