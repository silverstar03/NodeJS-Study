const express = require('express');
const app = express();

app.use((req,res,next)=>{
    //req: 요청객체, res: 응답객체, next: 다음 미들웨어 호출
    console.log('첫번째 미들웨어');
    req.user='kim';
    next();
})

app.use((req,res)=>{
    console.log('두번째 미들웨어');
    // res.send(`서버에서 응답한 결과: ${req.user}`)
    const person={name:'kim', age:35}; 
    const person2=JSON.stringify(person); //JSON 형식을 문자열로 바꿈
    res.send(person2);

    //문자열을 JSON 형식: JSON.parse()
})

app.listen(3300,()=>{
    console.log("Running express server at 127.0.0.1....")
})