let express = require('express');
let app = express();
let url = require('url');

let lessons = [
    { 'topic': 'math', 'location': 'London', 'price': 100 },
    { 'topic': 'math', 'location': 'Liverpool', 'price': 80 },
    { 'topic': 'math', 'location': 'Oxford', 'price': 90 },
    { 'topic': 'math', 'location': 'Bristol', 'price': 120 },   
];

let userInfo = {'email': 'user@email.com', 'password':'mypassword'};

function handleRequest(req, res){
    //Parse the URL
    let urlObj = url.parse(req.url, true);
    //Splits path into components
    let pathArray = urlObj.pathname.split("/");
    //End of path
    let pathEnd = pathArray[pathArray.length - 1];
    //If pathend is 'lessons' returns lessons array
    if (pathEnd === 'lessons') {
        res.json(lessons);
    //If pathend ends in user, returns user objects
    } else if (pathEnd === 'user') {
        res.json(userInfo);
    }

}

//Serving static files
app.use(express.static('static'))

app.get('/user', handleRequest);

app.get('/lessons', handleRequest);


app.listen(3000);

console.log("server running");