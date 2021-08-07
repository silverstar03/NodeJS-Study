console.log('A');

setTimeout(()=>{
    console.log('C');
    console.log('D');
},0)

console.log('B');
//A-C-D-B