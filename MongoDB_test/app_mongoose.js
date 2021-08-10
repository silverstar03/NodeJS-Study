const express = require('express');
const mongoose = require('mongoose');

//1. 접속주소와 db이름 세팅
mongoose.connect('mongodb://localhost:27017/data', {userNewUrlParser:true});


//2. db연결
const db = mongoose.connection;

//3. event 이용하여 접속
db.on('err', ()=>{
    console.log('connection failed');
})
db.once('open', ()=>{
    console.log('connected');
})

const app = express();
app.use(express.urlencoded({ extended: true}))

//4. 스키마 생성
const test = mongoose.Schema({
    name : String,
    age : Number
})

//5. 4번의 스키마를 토대로하여 실제 컬렉션 생성
const Test = mongoose.model('aa', test);
//test라는 스키마를 사용해서 aa라는 테이블을 만듦. aa를 Test가 가리키게 함
//몽고디비에 저장되는 컬렉션 이름은 항상 복수형임(aas)

app.get('/',(req, res)=>{
    res.send('hi')
})

//1) insert - 한 개의 데이터 저장 (new로 객체 생성해서 save()메서드 이용)
// const person = new Test({name:'kim', age:35});
// new Test({name: 'park', age:40}).save((err, data)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log('Saved!!!')
//     }
// })

//2) insertMany 사용
// Test.insertMany([
//     {name:'kang', age:15},
//     {name:'ko', age:70},
//     {name:'min', age:80}],
//     (err, result)=>{
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log("result:", result);
//         }
//     })

//3) 전체 데이터 가져오기
// Test.find({}, (err, result)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         result.forEach((ele)=>{ //forEach: 배열이 가지고 있는 함수
//             console.log(ele.name, ele.age);
//         })
//     }
// })

//4) 특정 데이터 가져오기
// Test.findOne({_id:'60fe37ea98e2e34c342978aa'}, (err, result)=>{
//     if(err){console.log(err);}
//     else{console.log(result);}
// })

//5) 값 수정하기  Test.updateOne({조건},{변경될 값}, (err)=>{})
// Test.updateOne({_id:'60fe37ea98e2e34c342978ab'},{name:'ho'}, (err)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log('updated!!!');
//     }
// })

//6) 특정 값 수정하기
//이름이 park인 애의 나이를 100, 이름을 park3로 변경시키기 $set이용
// Test.updateOne({name:'park'},{$set:{age:100, name:'park3'}}, (err, result)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("result: ", result);
//     }
// })


//7) 삭제 : deleteOne deleteMany
//Test.deleteOne({조건}, (err)) 
//이름이 park인 애 삭제
//age가 30 이하인 애 삭제
Test.deleteOne({name:'park3'},(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('deleted!!')
    }
})


app.listen(3000, ()=>{
    console.log('Express server running...')
})