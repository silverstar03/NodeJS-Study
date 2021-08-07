//1. 객체 기본 생성
// const user = {
//     kim : 10,
//     lee : 7,
//     park : 25
// }
// console.log(user.kim); //10

//2. new 연산자 이용한 생성
const user = new Object();
// const user={}; 같은 의미/ 객체를 생성하겠다고 선언.
//객체이름.키 = 값, 객체이름[키]=값; 둘 다 가능
user.kim = 10;
user.lee = 25;
user['park'] = 9;

//3. 프로토타입 이용한 생성

function Person(name, age){ //프로토타입 : 함수(자바의 생성자함수와 비슷)
    this.name = name;
    this.age = age;
}
Person.prototype.walk=function(){
    console.log("걷는다.");
}

let person1 = new Person("kim", 30);
let person2 = new Person('lee', 20);
console.log(person1.name);
console.log(person2.name);
person1.walk();


const score = {
    kor : 100,
    eng : 80,
    math : 90,
    sum1 : function sum1(kor, eng, math){
        let total = kor + eng + math
        console.log('총점 : ', total)
    }
}


const score2 = new Object();
score2.kor = 100;
score2.eng = 80;
score2.math = 90;
score2.sum2 = function sum2(kor, eng, math){
    let total = kor + eng + math;
    console.log('총점 : ', total)
}

function score3(kor, eng, math){
    this.kor = kor;
    this.eng = eng;
    this.math = math;
}
score3.prototype.sum3=function(kor, eng, math){
    let total = kor + eng + math;
    console.log('총점 :', total)
}

let s1 = new score3(100, 80, 90);