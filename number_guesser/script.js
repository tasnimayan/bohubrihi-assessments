// Implement random pin generation functionality;

let correct_ans;
let tryCount;;

const low = 1;
const high = 10;

const wait = document.getElementById("wait");
const message = document.querySelector(".message");
const tryLeft = document.querySelector(".try-left");

function generateNumber(){
  tryCount = 3;
  correct_ans = Math.round(Math.random() * (high - low) + low);
  wait.style.display = "block";
  message.innerHTML = '" "';
  tryLeft.style.display = "block";
  tryLeft.innerHTML = `${tryCount} Try Left`;
  console.log(correct_ans);

  setTimeout(userInput, 500);
}


function userInput(input){
  tryLeft.style.display = "block";

  while(tryCount > 0){
    let input = parseInt(prompt("Enter Your Guessed Number!"));
    
    tryLeft.innerHTML = `${tryCount} Try Left`;
    if(input == correct_ans){
      message.innerHTML = "✅ YAY! You Won."
      wait.style.display = "none";
      tryLeft.style.display = "none"
      break;
    }
    else if(correct_ans > input){
      alert("Correct answer is greater!");
      message.innerHTML = "❌ Number Didn't Match!";
    }
    else if(correct_ans < input){
      alert("Correct answer is smaller!")
      message.innerHTML = "❌ Number Didn't Match!";
    }
    else{
      wait.style.display = "none";
      message.innerHTML = "Something went wrong!"    
    }
    tryCount--;
  }

  if(tryCount === 0){
    wait.style.display = "none";
    message.innerHTML = "❌ You Loose!"
    tryLeft.innerHTML = `${tryCount} Try Left`
    document.querySelector(".start-btn").innerHTML = "Restart"
  }

}


