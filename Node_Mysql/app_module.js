const express=require('express');
const mysql=require('mysql');
const indexRouter = require('./routes/index');

const app=express();

//1. mysql 연동
const conn = mysql.createConnection({
    host:'localhost',
    user:'test',
    password:'1111',
    database:'testdb'
})
conn.connect();

//2. 쿼리를 객체로 생성(객체 : key-value)
const sql={
    list: 'select * from emp order by id desc',
    insert: 'insert into emp(name, emp_number, email, reg_date) values(?,?,?,?)' ,
    read: 'select * from emp where id=?',
    update: 'update emp set name=?, emp_number=?, email=? where id=? ',
    delete: 'delete from emp where id=?'
}

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))


app.set('view engine','ejs');
app.set('views','./views');

app.use('/', indexRouter);
//사용자가 /를 포함하여 /a, /b 등으로 접속했을 때 indexRouter를 실행하라는 뜻

app.listen(3000,()=>{
    console.log('Running express server at localhost..........')
})

