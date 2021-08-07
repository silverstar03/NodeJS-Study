//arrow function(화살표 함수) 익명함수에 사용
//function이라는 키워드가 없어짐

// function add(x,y){
//     return x+y;
// }
//화살표 함수로 변경
let add =(x,y) => {
    return x + y;
}


// function sub(){
//     console.log('test');
// }
//화살표 함수로 변경
const sub =() => {
    console.log('test');
}

let a = 10;
let b = 20;
console.log('a='+a+'이고 b='+b+'입니다.');
console.log(`a=${a}이고 b=${b}입니다.`);

