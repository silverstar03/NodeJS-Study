//콜백함수를 5번 호출하기
let callTimes=(callback)=>{
    for(var i = 0; i < 5; i++){
        callback();
    }
}

let testB=()=>{
    console.log('testB()함수입니다.');
}
// callTimes(함수);
//callTimes(testB);

//매개변수 안에 바로 함수 넣기
callTimes(()=>{
    console.log('testB()함수입니다.');
})

let add=(a,b,cb)=>{
    d = a + b;
    cb(d);
}

add(10,20,(result)=>{
    console.log(result);
})

fs.readFile("data.txt", function(err,result){
    console.log(result);
})
//data.txt파일을 다 읽은 뒤 에러가 나면 err에 넣고,
//아니면 result에 넣어라.

fs.writeFile("test.txt", "콜백함수",(err)=>{
    if(err){
        console.log(err);
    }
    console.log('saved!');
})
