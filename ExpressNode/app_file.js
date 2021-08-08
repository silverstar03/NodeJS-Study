const express = require("express")
const multer = require("multer")

const app = express();
const upload = multer({dest:'./nodejs/Express/uploads/'})

app.use(express.static(__dirname + "/public"));
app.use('/img', express.static('./nodejs/Express/uploads'))

app.set('views', './nodejs/Express/views');
app.set('view engine', 'pug')

app.locals.pretty = true;

app.use(express.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    res.send("hi node");
})

app.get("/upload", (req,res)=>{
    res.render('upload_form');
})

app.post("/upload", upload.single('userfile'), (req,res)=>{
    //upload.single('userfile') : 한 개의 파일만 올릴 때 사용
    //upload로 post라우팅이 들어왔을 때 req객체에 file이란 속성을 자동으로 추가시켜 역할
    //req.file
    console.log(req.file)
    res.send("파일 업로드 성공")
})

app.listen(3300, ()=>{
    console.log('Running express server at localhost....')
})
