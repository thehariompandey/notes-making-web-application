const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { isUtf8 } = require("buffer");

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.set('view engine','ejs' );
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(req, res){
    fs.readdir(`./files` ,function(err, files){
        res.render("index" , {files : files});
    })
    
});

app.get("files/:filename", function(req, res){
    fs.readFile(`.files/${req.params.filename}` , "utf-8" ,function(err, filedata) {
        console.log(filedata);
        })
    });
    


app.post("/create", function(req, res){
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details , function(err){
        res.redirect("/")
    } );
    
    
});

// app.get("/profile/:username", function(req ,res){
    // res.send(`welcome ${req.params.username}`);
// });



app.listen(3000 , function(){
    console.log("its running");
});

