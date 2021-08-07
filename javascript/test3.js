var sum = 0
for(var i = 1; i <= 10; i++) {
    sum += i;
}
console.log("sum", sum); // 55
console.log("i", i); //11 var는 함수 scope이기 때문에 실행됨

function foo() {
    var sum1 = 0;
    for(var i1=1; i1<=10; i1++) {
        sum1 += i1;
    }
}
    // foo();
    // console.log("sum", sum1); //error
    // console.log("i", i1); //error 
    // //--> scope이 함수 단위이기 때문에 에러

let sum2 = 0; //let은 블록단위
for(let i2=1; i2<=10; i2++) {
    sum2 += i2;
}
console.log("sum2", sum2);
console.log(i2) // error let은 블록 단위 이기 때문에 에러


const j=10; //평생 10 상수임으로 값 바꿀 수 없음
console.jog(j);

//let은 똑같은 변수를 여러번 선언 못함
//var name = 'kim';
//var name = 10; -> 가능

//let name = 'lee';
//let name = 20; -> 불가능
//name = 20;으로 해줘야 함.

