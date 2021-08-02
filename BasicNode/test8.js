const http = require('http');
const server = http.createServer();
server.listen(3300, ()=>{
    console.log('Running Http Server at localhost.');
});
const fs = require("fs");
server.on('request', (req, res)=>{
    console.log('사용자 요청이 들어왔습니다.')
    fs.readFile("./lion1.png", (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.writeHead(200, {"Content-Type": "image/png"});
            res.write(result);
            res.end();
        }
    })
})
