//모듈 사용은 require 사용
const os = require('os');
console.log(`호스트 이름은 ${os.hostname}입니다`)
console.log(`freemem: ${os.freemem}`)
console.log(`totalmem : ${os.totalmem}`)
console.log(`type : ${os.type}`)