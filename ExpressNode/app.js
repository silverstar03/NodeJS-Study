const express=require('express');
const app=express();

// app.use(express.static('public'));
//static이라는 미들웨어를 사용해 public를 /로 지정하는 애

// app.use('public', express.static('public'));
//localhost:3300/public이 /가 된다

app.use(express.static(__dirname + "/public"));
console.log('__dirname: ', __dirname);

app.listen(3300, ()=>{
    console.log('Running express server at localhost....')
})