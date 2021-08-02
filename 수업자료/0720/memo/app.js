const express=require('express');
const app=express();
const fs = require('fs');
app.use(express.static(__dirname + "/public"));

app.set('views', './memo/views');
app.set('view engine', 'pug')

app.locals.pretty = true;

app.use(express.urlencoded({extended: true}));

app.listen(3300, ()=>{
    console.log('Running express server at localhost....')
})

app.get("/", (req,res)=>{
    res.send("memo로 접속하세요~")
})

app.get("/memo",(req,res)=>{
    res.render("memo_form")
})

app.post("/memo", (req,res)=>{
    let _name = req.body.name;
    let _date = req.body.date;
    let _content = req.body.content;
    fs.appendFile('./nodejs/memo/content.txt', `작성자: ${_name}, 작성일시: ${_date}, 내용: ${_content} `, function (err) {
        if (err) throw err;
    });
    res.send('메모가 저장되었습니다.');
})


