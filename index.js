#!/usr/bin/nodejs

// -------------- load packages -------------- //
// INITIALIZATION STUFF

var express = require('express')
var app = express();
var hbs = require('hbs');
var path = require('path');
var fs = require('fs');
// tell express that the view engine is hbs
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
// serve files from the static directory (https://expressjs.com/en/starter/static-files.html)
// the following line is a directive to serve all files in all subfolders 
app.use(express.static('static'))
console.log('class object app created');
hbs.registerPartial('navigation', fs.readFileSync(__dirname + '/views/partials/navigation.hbs'));
hbs.registerPartials(__dirname + '/views/partials');
// -------------- express 'get' handlers -------------- //
// These 'getters' are what fetch your pages

app.get('/', sendIndex);
app.get('/fish', sendIndex);
app.get('/labs', sendLab);

app.get('/foo', function(req, res){
    console.log('foo page accessed!');
    res.send('requested foo');
});

app.get('/not_a_search', function(req, res){
    var theQuery = req.query.q;
    res.send('query parameter:' + theQuery);
});

app.get('/dog', function(req, res){
    console.log('cat page accessed!');
    res.render('dog');
});

app.get('/cat', function(req, res){
    console.log('dog page accessed!');
    res.render('cat');
});

app.get('/pet', function(req, res){
    var petType = req.query.type;
    if(petType != 'dog' && petType != 'cat'){
        console.log('pet type is neither dog nor cat');
        petType = 'undefined'
    }
    console.log('pet page accessed!');
    res.render(petType);
});


function sendIndex(req, res){
    console.log('default landing page accessed!');
    res.render('index');
}

function sendLab(req, res){
    console.log('lab page accessed!');
    res.render('labs');
}

app.get('/:number', sendNumbers)

function sendNumbers(req, res){
    console.log('number facts page accessed!');
    let number = req.params.number;
    let num_facts = req.query.num_facts;
    let facts = [];
    if(number == '1'){
        facts.push('1 is NOT  a prime number');   
        facts.push('1 is the first natural number');    
        facts.push('0! = 1');
    }
    else if(number == '2'){
        facts.push('2 is the smallest taxicab number');
        facts.push('2 is the smallest prime number');    
        facts.push('2 is the only even prime number');    
    }
    else if(number == '3'){
        facts.push('Octopi have 3 hearts');
        facts.push('Any number whose digits sum to a multiple of 3 is divisible by 3');    
        facts.push('3 is the number of primary colors');    
    }
    else if(number == '4'){
        facts.push('Every shape in Tetris is composed of 4 blocks');    
        facts.push('There are 4 bits in a nibble');
        facts.push('The area of a 4 x 4 square is equal to its perimeter');    
    }
    else if(number == '5'){
        facts.push('5 is the only prime number ending in 5');    
        facts.push('A perfect radio signal is indicated by the term 5x5');    
        facts.push('5 is the only prime number that is the sum of two consecutive primes');
    }
    else if(number == '6'){
        facts.push('6 is the smallest positive integer that is neither a square number nor a prime number');    
        facts.push('6 equals the sum of its proper divisors');    
        facts.push('Insects have 6 legs');
    }
    else if(number == '7'){
        facts.push('7 is the first number with multiple syllables');    
        facts.push('7 is the smallest natural number that cannot be represented as the sum of the squares of three integers');    
        facts.push('No perfect square ends in a 7');
    }
    else if(number == '8'){
        facts.push('8 is the first number that is neither prime nor semiprime');    
        facts.push('A byte is a grouping of 8 bits');    
        facts.push('The digit 8 appears the same upside down');
    }
    else if(number == '9'){
        facts.push('Octopi have 9 brains');    
        facts.push('There are 9 Muses in Greek mythology');    
        facts.push('A group of 9 is called an ennead');
    }
    else if(number == '10'){
        facts.push('10 is the number of n queens problem solutions for n = 5'); 
        facts.push('10 factorial seconds is exactly equal to 6 weeks');
        facts.push('10 is the sum of the first three prime numbers');    
    }
    
    if(num_facts == '2'){
        facts = facts.slice(0,2);    
    }
    else if (num_facts == '3'){
        facts = facts.slice(0,3);    
    }
    else{
        facts = facts.slice(0,1);
    }
    if(req.query.format == 'json'){
        res.json({
            number:number, 
            facts:facts  
        })
    }
    else{
        res.render('numbers', {
        number:number, 
        facts:facts
    });    
    }
}

// -------------- listener -------------- //
// // The listener is what keeps node 'alive.' 

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
});