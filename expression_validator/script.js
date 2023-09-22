

const err = document.querySelector(".show-error");
const isOk = document.querySelector(".isOk");
const option = document.getElementById("selectOption");

const userInput = document.getElementById("getExpression");

let selectedOption = "";

const mailExp = RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
const phoneExp = RegExp(/^01([0-9]){9}$/)
const zipExp = RegExp(/^\d{4}$/)


const isPhone = document.querySelector(".isPhone");
option.addEventListener('change', ()=>{
  selectedOption = option.value;

  if(selectedOption === "phone"){
    userInput.setAttribute("type", "number")
    isPhone.style.display = "inline-block"
  }
  else{
    userInput.setAttribute("type", "text")
    isPhone.style.display = "none"
  }
})


userInput.addEventListener("keyup", (event)=>{
  let text = event.target.value;
  let result;

  if(text){
    switch(selectedOption){
      case "email":
        result = mailExp.test(text);
        console.log(result);
        isError(result);
        break;
      case "phone":
        result = phoneExp.test(text);
        isError(result);
        break;
      case "zip":
        result = zipExp.test(parseInt(text));
        isError(result);
        break;
      default:
        break;
    }
  }
  else{
    err.style.display = "none"
  }
  
})


function isError(result){
  if(result){
    err.style.display = "none";
    isOk.style.display = "inline-block";
  }
  else{
    err.style.display = "block";
    isOk.style.display = "none";
  }
}

