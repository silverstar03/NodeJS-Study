const express=require('express');
var session = require('express-session')
var FileStore = require('session-file-store')(session);
 const app=express();
var fileStoreOptions = {};
 
app.use(session({
    store: new FileStore(fileStoreOptions),
    secret: 'test',
    saveUninitialized: false,
    resave:false
}));

const user={
    user_id:'kim',
    user_password:'1111'
}
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/login',(req, res)=>{
    res.render('login');
})
app.get('/welcome',(req, res)=>{
    //로그인이 되어 있다는 것==== req.session.nickname에 값이 있다.
     // res.send(req.session)
    if(req.session.nickName) {//로그인되어 있는 사용자라면 로그아웃 정보까지
        res.send(`hello ${req.session.nickName}
        <a href="/logout">Logout</a>`)
        
        
    }else {//로그인에 실패 또는 로그인되어있지 않은 사용자
      res.send(`welcome        <a href="/login">LogIn</a>`)
    }
  
})
app.post('/login',(req, res)=>{
  
    var uname=req.body.user_id;
    var pwd=req.body.user_password;

    if(uname==user.user_id && pwd==user.user_password) {
       // res.send('hi');
       req.session.nickName='mike';
       //sessionid의 nickNam이란 이름으로 mike를 저장한다.
       console.log('1')
      res.redirect('/welcome');
    }
    else {
        res.send('로그인이 맞지 않습니다 <a href="/login">Login</a>')
    }


})

app.get('/logout',(req, res)=>{
    delete req.session.nickName;
    res.redirect('/welcome')
})
app.listen(3000,()=>{
    console.log('Express server running....')
})