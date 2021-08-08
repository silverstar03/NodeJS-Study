const express = require("express")
const fs = require("fs");

const app = express();
app.use(express.static(__dirname + "/public"));

app.set('views', './nodejs/language/views');
app.set('view engine', 'pug')

app.locals.pretty = true;

app.use(express.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    res.render("golang");
})

app.get("/lang", (req,res)=>{   
    fs.readdir('./nodejs/language/data/', (err,files)=>{
        if(err){console.log(err);}
        else{
            res.render("list",{lists:files})
        }       
    })
})

app.get("/lang/new", (req, res)=>{
    res.render("new")
})

app.post("/lang", (req, res)=>{
    let _title = req.body.title;
    let _description = req.body.description;
    fs.writeFile(`./nodejs/language/data/${_title}`, _description, (err)=>{
        if(err){console.log(err);}
        else console.log('success!');
    })
})

app.get('/lang/:id', (req,res)=>{
    const param = req.params.id; //param: java, node, c
    fs.readdir('./nodejs/language/data/', (err,files)=>{
        if(err){console.log(err);}
        else{
            fs.readFile(`./nodejs/language/data/${param}`, 'utf8', (err2,data)=>{
                if(err2){console.log(err2);}
                else{
                    res.render("view",{lists:files, title:param, description:data})
                }
            })
        }       
    }) 
})


app.listen(3300, ()=>{
    console.log('Running express server at localhost....')
})