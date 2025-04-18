
const CEILING = 3; // 3 choices max

// Map nums to choices
const map = new Map();
map.set(0, "rock");
map.set(1, "paper");
map.set(2, "scissors");

// get a choice
function get_computer_choice() {
  let choice = Math.floor(Math.random() * CEILING);
  return map.get(choice);
}

//
function get_human_choice() {
  let choice = prompt("rock, paper, or scissors?");
  return choice;
}


function play_round(human_choice) {
  //

  let computer_choice = get_computer_choice();

  let not_a_tie = true;
  let human_wins = false;

  if (human_choice == computer_choice) {
    not_a_tie = false;
  } else if (human_choice == "rock") {
    if (computer_choice == "paper") {
      computer_score++;
    } else if (computer_choice == "scissors") {
      human_score++;
      human_wins = true;
    }
  } else if (human_choice == "paper") {
    // computer is rock, or scissors
    if (computer_choice == "rock") {
      human_score++;
      human_wins = true;
    } else if (computer_choice == "scissors") {
      computer_score++;
    }
  } else if (human_choice == "scissors") {
    if (computer_choice == "paper") {
      human_score++;
      human_wins = true;
    } else if (computer_choice == "rock") {
      computer_score++;
    }
  }

  let msg = "";
  if (not_a_tie) {
    if (human_wins) {
      msg = (`Round won! ${human_choice} beats ${computer_choice}.`);
    } else {
      msg = (`Round lost. ${human_choice} loses to ${computer_choice}.`);
    }


  } else {
    msg = (`Tie round. ${human_choice} ties with ${computer_choice}.`);
  }

  update_display(msg);

}

function determine_outcome(human_score, computer_score) {
    if (human_score > computer_score) {
      return "You won the game!";
    } else if (human_score < computer_score) {
      return "You lost this time.";
    } else if (human_score === computer_score) {
      return "Tie game.";
    }
  }

// display and output
const message_elem = document.querySelector(".message");
const player_score_elem = document.querySelector(".player_score");
const comp_score_elem = document.querySelector(".computer_score");


// Track game state

let computer_score = 0;
let human_score    = 0;

function clear_display(first_half){
  computer_score = 0;
  human_score = 0;
  update_display(`${first_half} Make a choice to play again.`);
}

function update_display(new_msg) {
  
  message_elem.textContent = new_msg;
  player_score_elem.textContent =`You: ${human_score}`;
  comp_score_elem.textContent =`Computer: ${computer_score}`;

  if (human_score >= 5 || computer_score >= 5){
    let msg = determine_outcome(human_score, computer_score);
    clear_display(msg);
  }
}

// define listeners for buttons
const container = document.querySelector("#game");

const buttons = container.querySelectorAll("button");

const rock = buttons[0];
const paper = buttons[1];
const scissors = buttons[2];

function handle_hit(button_name) {
  play_round(button_name);
}
rock.addEventListener("click", () => handle_hit("rock"));
paper.addEventListener("click", () => handle_hit("paper"));
scissors.addEventListener("click", () => handle_hit("scissors"));
