const express=require('express');
const app=express();

app.use(express.static(__dirname + "/public"));

//나는 view를 사용하겠다. 사용하는 템플릿엔진은 view 폴더에 저장할거다.
app.set('views', './nodejs/Express/views');
//나는 pug를 사용하겠다.
app.set('view engine', 'pug')

app.locals.pretty = true;

//응답할 때 객체 안에 객체를 넣을 수 있도록 하겠다.
app.use(express.urlencoded({extended: true}));

app.get("/", (req,res)=>{
    res.send("hi pug~")
})

app.get("/template", (req,res)=>{
    //template으로 접속했을 때(https://localhost:3300/template), temp라는 pug 파일이 열리게 할거야
    res.render("temp");
})

app.get("/login",(req,res)=>{
    res.render("login_form")
})

app.post("/login", (req,res)=>{
    let _userid = req.body.userid;
    let _userpass = req.body.passwd;
    res.send(`아이디: ${_userid}, 비밀번호: ${_userpass}`)
})

app.get.apply("/temp", (req, res)=>{
    let _id = req.query.name;
    let _pass = req.query.password;
    res.send(`이름은 ${_id}이고 비밀번호는 ${_pass}`)
})

app.listen(3300, ()=>{
    console.log('Running express server at localhost....')
})