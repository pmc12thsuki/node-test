'use strict';

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();

const port = process.env.PORT || 3000 ;

hbs.registerPartials(__dirname + '/views/partials/') ;

//register function which can be use in html
hbs.registerHelper('getCurrentYear',() => {return new Date().getFullYear()});

app.set('view engine', hbs)

app.use((req, res, next)=>{
    const now = new Date().toString();
    const log = `${now}: ${req.method}, from: ${req.url}`

    fs.appendFile('server.log', log+'\n' , err=>{
        if(err){
            console.log(err)
        }
    })
    
    next();
});

// app.use((req, res, next)=>{
//     res.render('maintenance.hbs');
// })

// add middleware
app.use(express.static(__dirname +'/public')); // take absoultly path


app.get('/',(req, res)=>{
    res.render('home.hbs',{
        pageTitle: 'Home Page',
    })
});

app.get('/project',(req, res)=>{
    res.render('project.hbs',{
        pageTitle: 'Project Page',
        url:'https://github.com/pmc12thsuki/node-test',
        test:'test'
    })
});

app.get('/about', (req, res)=>{
    res.render('about.hbs',{
        pageTitle: 'About Page',
    });
})

app.listen(port, ()=>{
    console.log(`server is up in prot ${port}`);
});