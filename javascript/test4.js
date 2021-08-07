//1. for(i , 최종값; 증감값)

//2.for-in (배열, 객체 모두 사용 가능)
let user=['kim', 'lee', 'park']
for(let i in user){//i는 index
    console.log(i, user[i]) //0, kim 이런 식으로 출력
}

const obj = {    //객체 : key-value로 이루어짐
    name : 'kang',
    age : 30
}
//출력
for(let i in obj){ //객체일 때 i는 key가 들어감
    console.log(i, obj[i])
}


//3. for-of(배열, 객체 모두 사용 가능)
// const user2 = ['kim2', 'lee2', 'park2']
// for (let value of user2){//i(value)가 값이 됨
//     console.log(value);
// }
// const str = 'hi javascript'
// for (let value of str){
//     console.log(value);
// }


//4. forEach() : 배열의 함수(객체는 사용할 수 없음)
let user3 = ['kim3', 'lee3', 'park3'];
//배열이름.forEach(콜백함수)
user3.forEach(function(val, index){
    //순서가 값이 먼저, 그다음 인덱스/ 값만 가져오고 싶으면 val만 적기
    console.log(val, index); 
})