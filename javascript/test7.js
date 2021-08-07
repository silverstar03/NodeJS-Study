// function add(a, b){
//     return a + b;
// }
// console.log(add(3,5));


//익명 함수
const add = function(a,b){
    return a + b;
}
console.log(add(3, 5));

//n부터 m가지 더한 합 출력
const sum = function(n, m){
    let total = 0
    for(let i = n; i<=m; i++){
        total += i;
    }
    return total;
}
console.log(sum(1,10));

//n을 넘겨서 짝수인지 홀수인지 판단하여 출력
const oddToeven = function(n) {
    return n % 2 == 0 ? '짝수' : '홀수'
}
console.log(oddToeven(7));

//person객체를 만들고 name:kim, age:30, add: x,y 더한 값 리턴(함수)
const person = {
    name : 'kim', 
    age : 30,
    add : function(x,y){
        return x + y;
    }
}
person.add(3,5);

//person2객체 만들고 list:객체 삽입(kim,30/ lee,28/ park,35)
                    //show: 함수(console.log(hi hello))
const person2 = {
    users : [{name: 'kim', age:30}, {name:'lee', age:28},{name:'park', age:35}],
    show : function(){
        console.log('hi hello')
    }
}
person2.show();
person2['show']();

