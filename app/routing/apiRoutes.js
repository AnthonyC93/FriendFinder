var express = require('express');
var path = require('path');
var router = express.Router();
var friendList = require('./../data/friends').friendList;

// A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
router.get("/friends",function(req,res){
    return res.json(friendList);
    // return res.json(friendList);
});

// A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
router.post("/friends",function(req,res){
   let newUser = req.body;
   
   res.json(calculateResults(newUser));
   friendList.push(newUser);
});

function calculateResults(newUser){

    let matchedUser=friendList[0];
    let differenceScore=0;
    
    for(let i=0;i<friendList.length;i++){
        console.log("checking friendList user: "+friendList[i].name);
        console.log(friendList[i].scores);
        differenceScore=0;

        for(let z=0;z<friendList[i].scores.length;z++){
            let result = Math.abs(friendList[i].scores[z]-newUser.scores[z]);

            if(result!=0){
                differenceScore+=result;
            }
        }

        if(i===0){
            lowestScore=differenceScore;
        }
        
        if(differenceScore < lowestScore){
            lowestScore=differenceScore;
            matchedUser=friendList[i];
        }
        console.log("difference score: "+differenceScore);
    }
    return matchedUser;
}

module.exports=router;