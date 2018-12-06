var questionOnPage = document.getElementById("questionOnPage");
var nextButton = document.getElementById("nextLink");
var prevButton = document.getElementById("backLink");
var suffix = document.getElementById("suffix");
var hasChanged=false;
var questionsToAsk = [
  {
    id: 1,
    question: "How likely are you to want kids in the future?",
    low: "not very likely",
    medium: "somewhat likely",
    high: "very likely"
  },
  {
    id: 2,
    question: "How much do you enjoy movies?",
    low: "not very much",
    medium: "kinda like them",
    high: "I fucking love movies"
  },
  {
    id: 3,
    question: "How interested are you in finding 'the one' on this site?",
    low: "just here for a good time",
    medium: "kind of",
    high: "I need love and this is where I've come to find it"
  },
  {
    id: 4,
    question: "How family-oriented would you consider yourself?",
    low: "not very",
    medium: "somewhat",
    high: "family is everything"
  },
  {
    id: 5,
    question: "How much do you like anime?",
    low: "not very much",
    medium: "kinda",
    high: "I live on anime"
  },
  {
    id: 6,
    question: "How likely are you to want pets in the future?",
    low: "not very likely",
    medium: "somewhat likely",
    high: "I want to die surrounded by pets"
  },
  {
    id: 7,
    question: "How seriously do you take yourself?",
    low: "not very serious",
    medium: "somewhat serious",
    high: "im a very serious person"
  },
  {
    id: 8,
    question: "How attractive do you consider yourself?",
    low: "not very",
    medium: "somewhat",
    high: "I am absolutely beautiful inside and out"
  },
  {
    id: 9,
    question:"How likely are you to be invested in a long-distance relationship?",
    low: "not very",
    medium: "somewhat",
    high: "Africa by Toto is my ringtone"
  },
  {
    id: 10,
    question: "WHY THO",
    low: "not very",
    medium: "somewhat",
    high: "Africa by Toto is my ringtone"
  }
];
var currentQuestion=0;
//maybe push Questions to localStorage
var scores = [];
console.log("JS LOADED");
console.log(questionsToAsk)

function nextQuestion(){
  console.log('time to show next question');

  //validate question was answered and save question to array to pass to DB once submit button is pressed
  if(hasChanged===true){

    //save question id, value of slider
  
    currentQuestion+=1;
    slider.value=3;
    questionOnPage.innerHTML=questionsToAsk[currentQuestion].question;
    document.getElementById("suffix").innerText="";
    if(currentQuestion===1){
      console.log("first q")
      prevButton.style.display="inherit";
    }
  }
  

  //update slider for status and set hasChanged back to false
  //update status bar width
  currentChoice.innerHTML="";
  hasChanged=false;
}

function previousQuestion(){
  console.log('time to show previous question');

  //ask previous question again
}

function sliderMoved(){
  hasChanged=true;
  let slider = document.getElementById("slider");
  console.log("current slider value: "+slider.value);
  document.getElementById("currentChoice").innerHTML=String(slider.value);

  let extraWords=document.getElementById("suffix");
  switch(slider.value){
    case "1":
      extraWords.innerHTML=questionsToAsk[currentQuestion].low;
    break;

    case "3":
     extraWords.innerText=questionsToAsk[currentQuestion].medium;
    break;

    case "5":
      extraWords.innerText=questionsToAsk[currentQuestion].high;
    break;

    default:
      extraWords.innerText="";
    break;
  }
  updateStatusBar();
}

function updateStatusBar(){
  let statusBar = document.querySelector(".statusRowTop");
  console.log(statusBar)
  // let statusBarWidth = getComputedStyle(statusBar);
  // need to get width 
}