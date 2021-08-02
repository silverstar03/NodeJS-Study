const fs = require("fs");

fs.readFile('./data.txt', 'utf8',(err, result)=>{
    if(err){
        console.log(err);
    }else{
        console.log(result);
    }
})