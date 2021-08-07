//user배열에 3개의 객체 들어간다.
const users=[{name:'kim', age:30}, {name:'lee', age:25}, {name:'park', age:27}]
console.log("길이", users.length);
console.dir(users);

//2. name:kang, age:35를 맨 뒤에 추가하고 배열의 길이 출력
users.push({name:'kang', age:35})
console.log("push후 길이", users.length);

//3. 맨 뒤의 데이터 빼내고 배열의 길이 출력
users.pop();
console.log("pop후 길이", users.length);

//4. 맨 앞에 name:ko, age:40 추가하고 배열의 길이 출력
users.unshift({name:'ko', age:15})
console.log("unshift후 길이", users.length);
console.dir(users);

//5. 2번째 데이터 삭제
delete users[1];
console.dir(users);
users.forEach(function(val){
    console.log(val);
})