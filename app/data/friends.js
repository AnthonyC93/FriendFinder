// form should save your application's data inside of app/data/friends.js as an array of objects. Each of these objects should roughly follow the format below.

// {
//     "name":"Ahmed",
//     "photo":"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
//     "scores":[
//         5,
//         1,
//         4,
//         4,
//         5,
//         1,
//         2,
//         5,
//         4,
//         1
//       ]
//   }

var friendList=[
    {
        name:"anthony",
        age:25,
        occupation:"software developer",
        photo:"photo.com",
        scores:[4,3,2,4,2,5,2,4,1,3]
    },
    {
        "name": "tony",
        "age": 34,
        "occupation": "IT",
        "photo": "photo.com",
        "scores": [
            2,
            5,
            2,
            2,
            5,
            1,
            1,
            1,
            4,
            3
        ]
    },
    {
        name:"samantha",
        age:23,
        occupation:"work",
        photo:"whoCares.jpg",
        scores:[1,2,3,4,5,4,3,2,1,2]
    }
];

module.exports={
    friendList:friendList
}