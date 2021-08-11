const express=require('express');
const mysql=require('mysql');
const format = require('date-format');
const moment=require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

const router = express.Router(); //router 객체 생성

//3. 목록보기
router.get('/',(req, res)=>{
    //emp 테이블에서 데이터를 모두 가져와야함. conn.query(쿼리문, [지정할 값], 콜백함수)
    conn.query(sql.list, (err, rows)=>{
        if(err){
            console.log(err)
        }else{
            // console.log(rows);
            res.render('list',{lists:rows});
        }
    })
})

//4. 데이터 추가
router.get('/new', (req, res)=>{
    res.render('new');
})

//날짜 포맷 지정
const date = moment().format('YYYY-MM-DD HH:mm:ss');

router.post('/new', (req, res)=>{
    //사용자가 입력한 값 가지고 오기
    const _name = req.body.name; //post방식이니까 body로 받아오기
    const _emp_number = req.body.emp_number;
    const _email = req.body.email;
    const _joinDate = date;
    // console.log(`${_name}, ${_emp_number}, ${_email}, ${_joinDate}`)
    conn.query(sql.insert,[_name, _emp_number, _email, _joinDate], (err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log('Inserted!!')
            res.redirect('/');
        }
    })
})

//5. 내용보기
router.get('/read/:id', (req, res)=>{
    const paramId = req.params.id;
    conn.query(sql.read, [paramId], (err, rows)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(rows);
            console.dir(rows);
            res.render('read', {title:'내용보기', rowsX:rows[0]})
        }
    })
})

//6. 수정하기 폼
router.get('/edit/:id', (req, res)=>{
    const paramId = req.params.id;
    conn.query(sql.read, [paramId], (err, rows)=>{
        res.render('edit_form',{title:'회원 수정 폼', rowsX:rows[0]})
    })
})

//7. 수정하기
router.post('/edit/:id', (req, res)=>{
    //사용자가 입력한 값 가져오기
    //conn.update쿼리 날리기
    const paramId = req.params.id;
    const _name = req.body.name;
    const _emp_number = req.body.emp_number;
    const _email = req.body.email;

    conn.query(sql.update, [_name, _emp_number, _email], (err)=>{
        if(err){
            console.log(err)
        }
        else{
            res.redirect('/');
        }
    })
})

//8. 삭제하기
router.post('/delete/:id', (req,res)=>{
    const parmaId = req.params.id;
    conn.query(sql.delete, [paramId], (err, row)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(row)
            res.redirect('/');
        }
    })
})

module.exports = router;