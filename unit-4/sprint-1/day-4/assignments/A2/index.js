const http= require("http");
const fs=require("fs");

let createserver = http.createServer((req,res)=>{
    if(req.url==="/"){
        res.setHeader("Content-type","text/html");
        res.end(`<h1>This is Home Page</h1>`)
    }else if(req.url==="/textasync"){
        fs.readFile("./text.json",(err,data)=>{
            if(err){
                res.write("No data\n")
                res.end(err)
                } else {
                res.end(data)
                }
        });
    }else if(req.url==="/textsync"){
        let dataa=fs.readFileSync("text.json");
        res.end(dataa);
    }
})