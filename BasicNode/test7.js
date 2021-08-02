const http = require('http');
const server = http.createServer();
server.listen(3300, ()=>{
    console.log('Running Http Server at localhost.');
});

//1. 사용자 접속 이벤트 처리
server.on('connection', (socket)=>{
    console.log('사용자가 접속하였습니다.')
})
//2. 사용자 요청 이벤트 처리
server.on('request', (req, res)=>{
    console.log('사용자 요청이 들어왔습니다.');
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
    res.write("<html><head><body><title>")
    res.write("Hello Nodejs~!");
    res.write("</title></body></head></html");
    //res.write(`<html.><`)
    res.end(); //응답을 모두 보냄 사용자에게 응답 전송
})