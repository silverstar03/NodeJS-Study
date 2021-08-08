const express = require("express")
const app = express();
app.use(express.static(__dirname + "/public"));

app.set('views', './nodejs/Express/views');
app.set('view engine', 'pug')

app.locals.pretty = true;

app.use(express.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    res.send("hi node");
})

app.listen(3300, ()=>{
    console.log('Running express server at localhost....')
})