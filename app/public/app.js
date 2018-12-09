var questionOnPage = document.getElementById("questionOnPage");
var nextButton = document.getElementById("nextLink");
var prevButton = document.getElementById("backLink");
var suffix = document.getElementById("suffix");
var slider = document.getElementById("slider");
// var apiRoutes=require('./../routing/apiRoutes');
var hasChanged = false;
var questionsToAsk = [
  {
    id: 0,
    question: "How likely are you to want kids in the future?",
    low: "no thanks",
    medium: "I have no idea",
    high: "I can't wait to be a parent",
    score:0
  },
  {
    id: 1,
    question: "How much do you enjoy movies?",
    low: "not very much",
    medium: "kinda like them",
    high: "I fucking love movies",
    score:0
  },
  {
    id: 2,
    question: "How interested are you in finding 'the one' on this site?",
    low: "just here for a good time",
    medium: "kind of",
    high: "I need love and this is where I've come to find it",
    score:0
  },
  {
    id: 3,
    question: "How family-oriented would you consider yourself?",
    low: "not very",
    medium: "somewhat",
    high: "family is everything",
    score:0
  },
  {
    id: 4,
    question: "How much do you like anime?",
    low: "not very much",
    medium: "kinda",
    high: "I live on anime",
    score:0
  },
  {
    id: 5,
    question: "How likely are you to want pets in the future?",
    low: "not very likely",
    medium: "somewhat likely",
    high: "I want to die surrounded by pets",
    score:0
  },
  {
    id: 6,
    question: "How seriously do you take yourself?",
    low: "not very serious",
    medium: "somewhat serious",
    high: "im a very serious person",
    score:0
  },
  {
    id: 7,
    question: "How attractive do you consider yourself?",
    low: "not very",
    medium: "somewhat",
    high: "I am absolutely beautiful inside and out",
    score:0
  },
  {
    id: 8,
    question:
      "How likely are you to be invested in a long-distance relationship?",
    low: "not very",
    medium: "somewhat",
    high: "Africa by Toto is my ringtone",
    score:0
  },
  {
    id: 9,
    question: "How would you rate this site's design?",
    low: "trash",
    medium: "it's ok",
    high: "I really like it",
    score:0
  }
];
var currentQuestion = -1;
var userAnswers = {
  name: "",
  occupation:"",
  age:"",
  photo: "",
  scores: []
};
$(document).ready(function(){
  $('.modal').modal();
});
calculateResults();

function startSurvey() {
  //validate and save to userAnswers

  let goodToGo=false;
  let needAlert=false;
  let alertString='';
  let nameEntered=document.getElementById("name").value.trim();
  let occuapationEntered=document.getElementById("occupation").value.trim();
  let ageEntered=parseInt(document.getElementById("age").value.trim());
  let photoEntered=document.getElementById("photoLink").value.trim();

  if(nameEntered && occuapationEntered && ageEntered &&photoEntered){

    let fileType = photoEntered.substring(photoEntered.length-4,photoEntered.length);

    if(fileType!=".jpg"&&fileType!='.png'&&fileType!='jpeg'&&fileType!='.tif'&&fileType!='tiff'&&fileType!='.bmp'&&fileType!='.gif'){
       needAlert=true;
       alertString+="- Invalid photo link\nFile must end in .jpg, .jpeg, .png, etc...";
    }else{
      goodToGo=true;
    }

  }else{
    needAlert=true;
    alertString+="- Invalid/Missing fields";

    if(isNaN(ageEntered)){
      needAlert=true;
      alertString+="\n\n- Invalid Age"
    }
  }

  if(needAlert===true){
    alert(alertString);
  }

  if(goodToGo===true){
    userAnswers.name=nameEntered;
    userAnswers.occupation=occuapationEntered;
    userAnswers.age=ageEntered;
    userAnswers.photo=photoEntered;
    nextQuestion();
    document.getElementById("infoCard").style.display="none";
    document.getElementById("surveyCard").style.display="block";
  }
}

function nextQuestion() {
  // console.log("time to show next question");
 
  if(currentQuestion!=-1){
    questionsToAsk[currentQuestion].score=parseInt(slider.value);    
  }
  
  switch (currentQuestion) {
    case 0:
      prevButton.style.display = "inherit";
      break;

    case 8:
      nextButton.style.display = "none";
      document.getElementById("submitButton").style.display = "inherit";
      break;
  }
  if(currentQuestion<=10){
    currentQuestion += 1; 
  }
  changeCard();
}

function previousQuestion() {
  switch (currentQuestion) {
    case 1:
      prevButton.style.display = "none";
      break;

    case 9:
      nextButton.style.display = "inherit";
      document.getElementById("submitButton").style.display = "none";
      break;
  }
  if(currentQuestion>=1){
    currentQuestion-=1;
  }
  changeCard();
}

function changeCard() {
  console.log("this question is: "+currentQuestion)
  if(questionsToAsk[currentQuestion].score!=0){
    //this question has been answered already
    console.log("this question has been answered already");
    slider.value=questionsToAsk[currentQuestion].score;
    currentChoice.innerHTML=slider.value;
  }else{
    //hasn't been answered yet
    slider.value = 3;
    currentChoice.innerHTML = "3";
  }
  questionOnPage.innerHTML = questionsToAsk[currentQuestion].question;
  document.getElementById("suffix").innerText = questionsToAsk[currentQuestion].medium;
  hasChanged = false;
  updateStatusBar();
}

function sliderMoved() {
  hasChanged = true;
  document.getElementById("currentChoice").innerHTML = String(slider.value);

  let extraWords = document.getElementById("suffix");
  switch (slider.value) {
    case "1":
      extraWords.innerHTML = questionsToAsk[currentQuestion].low;
      break;

    case "3":
      extraWords.innerText = questionsToAsk[currentQuestion].medium;
      break;

    case "5":
      extraWords.innerText = questionsToAsk[currentQuestion].high;
      break;

    default:
      extraWords.innerText = "";
      break;
  }
}

function updateStatusBar() {
  let statusBar = document.querySelector(".statusRowTop");
  statusBar.style.width = (currentQuestion+1) + "0" + "%";
}

$('#submitButton').on('click',function(){
  console.log("submit pressed!")
  if(currentQuestion===9){
    questionsToAsk[currentQuestion].score=parseInt(slider.value);    
  }

  //make array of scores from objects. 
  let scoresToSend = []
  for(let i=0;i<questionsToAsk.length;i++){
     scoresToSend.push(questionsToAsk[i].score)
  }
  userAnswers.scores=scoresToSend;

  // POST to server
  $.post('/api/friends', userAnswers)
    .then(function(data) {
      // console.log(data);
      //open materialize modal

      $('#matchName').html(data.name);
      $('#matchPhoto').attr('src',data.photo);
      $('#matchOccupation').html(data.occupation);
      $('#matchAge').html(data.age);

  });
})

function calculateResults(){
  let demo1 = {
    name: "",
    occupation:"",
    age:"",
    photo: "",
    scores: [1,2,3,4,5,4,3,2,1,3]
  };

  let existing = {
    name: "",
    occupation:"",
    age:"",
    photo: "",
    scores: [4,2,5,2,1,2,4,2,1,2]
  };

  let differences=[];
  let differenceScore=0;
  
  for(let i=0;i<existing.scores.length;i++){
    let result = Math.abs(existing.scores[i]-demo1.scores[i]);
    if(result!=0){
      differences.push(result);
      differenceScore+=result;
    }
  }
  console.log(differences);
  console.log(differenceScore);
}