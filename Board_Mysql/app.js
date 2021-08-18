const express = require('express');
const multer = require('multer');
const mysql = require('mysql');
const session = require('express-session');
const methodOverride = require('method-override');

const format = require('date-format');
const moment=require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
const config = require('./db/db_conn');

const app = express();

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.use(express.static(__dirname + '/'));

app.use(express.urlencoded({extended:true}))

app.use(methodOverride('_method'))

app.set('view engine','ejs');
app.set('views','./views');
app.locals.pretty = true;

const date = moment().format('YYYY-MM-DD HH:mm:ss');

const conn = mysql.createConnection(config);
conn.connect();

const sql={
    list: 'select * from board order by id desc',
    insert: 'insert into board(name, title, content, regdate, modidate, passwd, file_name, file_path ) values(?,?,?,?,?,?,?,?)' ,
    read: 'select * from board where id=?',
    update: 'update board set title=?, content=?, modidate=? where id=? ',
    delete: 'delete from board where id=?',
    search: "select * from board where ? like ?",
    hit : 'update board set hit = ? where id = ?'
}

const user = {
    insert : 'insert into user(user_id, passwd, email, tel, reg_date) values(?, ?, ?, ?, ?)',
    read : 'select * from user where user_id = ?'
}

var storageA = multer.diskStorage({
    destination : function(req, file, cb) {
        if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
            cb(null, 'uploads/img')
        }else{
            cb(null, 'uploads/texts')
        }
    },
    filename : function(req, file, cb){
        cb(null, file.originalname);
    }
})

var upload = multer({ storage : storageA})

app.get('/', (req, res)=>{
    conn.query(sql.list, [], (err, rows)=>{
        if(err){
            console.log(err)
        }
        else{
            if(req.session.uid){
                res.render('list', {lists:rows, user: req.session.uid});
            }else{
                res.render('list', {lists:rows, user:null});
            }

        }
    })
})

app.get('/login', (req, res)=>{
    res.render('login_form');
})

app.post('/login', (req, res)=>{
    const _user_id = req.body.user_id;
    const _passwd = req.body.passwd;

    conn.query(user.read, [_user_id], (err, rows)=>{
        if(err){
            console.log(err);
        }
        else{
            if(rows[0].passwd == _passwd){
                req.session.uid = rows[0].user_id;
                req.session.save(() => {
                    res.send('<script>alert("로그인 되었습니다."); window.location="./" </script>')
                })
            }else{
                res.send('<script>alert("정보가 일치하지 않습니다."); window.location="./login" </script>')
            }
        }
    })
})

app.get('/join', (req, res)=>{
    res.render('join');
})

app.post('/join', (req, res) =>{
    const _user_id = req.body.user_id;
    const _passwd = req.body.passwd;
    const _email = req.body.email;
    const _tel = req.body.tel;
    const _reg_date = date;

    conn.query(user.insert, [_user_id, _passwd, _email, _tel, _reg_date], (err)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send('<script>alert("가입되었습니다."); window.location="../" </script>')
        }
    })
})

app.get('/logout', (req, res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send('<script>alert("로그아웃 되었습니다."); window.location="../" </script>')
        }
    })
})

app.get('/write', (req, res)=>{
    if(req.session.uid){
        res.render('write', {user_name: req.session.uid});
    }
    else{
        res.send("<script>alert('로그인을 해주세요'); window.location='../' </script>")
    }
    
})

app.post('/write', upload.single('userfile'), (req, res)=>{
    const _name = req.body.name;
    const _title = req.body.title;
    const _content = req.body.content;
    const _regdate = date;
    const _modidate = date;
    const _passwd = req.body.passwd;
    const _file_name = req.file.originalname;
    const _file_path = req.file.path;

    conn.query(sql.insert,[_name, _title, _content, _regdate, _modidate, _passwd, _file_name, _file_path], (err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log('inserted')
            res.redirect('./');
        }
    })
})

app.get('/read/:id', (req, res)=>{
    const paramId = req.params.id;
    conn.query(sql.read, [paramId], (err, rows)=>{
        if(err){
            console.log(err);
        }
        else{
            conn.query(sql.hit, [rows[0].hit + 1, paramId], (err)=>{
                if(err){
                    console.log(err);
                }
                else{
                    res.render('read', {rowsX:rows[0]})
                }
            })
        }
    })
})

app.get('/edit/:id', (req, res)=>{
    const paramId = req.params.id;
    conn.query(sql.read, [paramId], (err, rows)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render('edit', {rowsX: rows[0]});
        }
    })
})

app.put('/edit/:id', (req, res)=>{
    const paramId = req.params.id;
    const _title = req.body.title;
    const _content = req.body.content;
    const _modidate = date;
    const _passwd = req.body.passwd;

    conn.query(sql.read, [paramId], (err, rows) =>{
        if(err){
            console.log(err);
        }else{
            if(rows[0].passwd == _passwd){
                conn.query(sql.update, [_title, _content, _modidate, paramId], (err)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.send("<script>alert('수정되었습니다.'); window.location='../' </script>")
                    }
                })
            }else{
                res.send("<script>alert('비밀번호가 일치하지 않습니다.'); window.location='../' </script>")
            }
        }
    })
})

app.get('/delete/:id', (req, res)=>{
    const paramId = req.params.id;
    conn.query(sql.read, [paramId], (err, rows)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render('delete', {rowsX: rows[0]});
        }
    })
})

app.delete('/delete/:id', (req, res)=>{
    const paramId = req.params.id;
    const _passwd = req.body.passwd;

    conn.query(sql.read, [paramId], (err, rows)=>{
        if(err){
            console.log(err);
        }
        else{
            if(rows[0].passwd == _passwd){
                conn.query(sql.delete, [paramId], (err)=>{
                    if(err){
                        console.log(err);
                    } else{
                        res.send("<script>alert('삭제가 완료되었습니다.'); window.location='../' </script>")
                    }
                })
            }else{
                res.send("<script>alert('비밀번호가 일치하지 않습니다.'); window.location='../' </script>")
            }
        }
    })
})

app.post('/search', (req, res)=>{
    const _select = req.body.select;
    const _search = req.body.search;

    conn.query(sql.search, [_select, `%${_search}%`], (err, docs)=>{
        if(err){
            console.log(err); return;
        }
        else{
            console.log(docs)
            if(docs.length == 0){
                res.send("<script>alert('검색 결과가 없습니다.'); window.location='../' </script>")
            }else {
                res.render('search_result', {docs: docs})
            }
        }
    })
})

app.get('/download/uploads/img/:name', (req, res)=>{
    const filename = req.params.name;
    const file = __dirname + '/uploads/img/' + filename;
    console.log('file', file);
    res.download(file);
})

app.listen(3000,()=>{
    console.log('Running express server at localhost..........')
})