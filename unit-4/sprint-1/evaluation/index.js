const http = require("http");
const fs= require("fs");
const cowsay= require("cowsay");

const server=http.createServer((req,res)=>{
    if(req.url==="/"){
        res.setHeader("Content-type","text/html")
        res.end("<h1>WELCOME TO EMPLOYEE MANAGEMENT SYSTEM</h1>")
    }else if(req.url==="/writeinfile"){
        fs.writeFile("employee.txt","Employee names are as follows:",(err)=>{
            if(err){
                console.log(err)
            }else{
                res.setHeader("Content-type","text/html")
                res.end("<h1>Data has been written in the file</h1>")
            }
        })
    }else if(req.url==="/enternames"){
        let data=["Aman", "Albert", "Varun", "Rajat", "Nrupul"]
        fs.appendFile("employee.txt",`\n${data[0]}\n${data[1]}\n${data[2]}\n${data[3]}\n${data[4]}`,(err)=>{
                 if(err){
                     console.log(err)
                 }else{
                    res.setHeader("Content-type","text/html")
                    res.end("<h1>All the names added in the file</h1>")
                 }
        })
    }else if(req.url==="/alldetails"){
        fs.readFile("employee.txt",{encoding:"utf-8"},(err,data)=>{
            if(err){
                console.log(err)
            }else{
                res.end(cowsay.say({
                    text:data,
                    e:"^^",
                    T:"U"
                }));
            }
        })
    }else if(req.url==="/delete"){
        fs.rm("employee.txt",(err)=>{
            if(err){
                console.log(err)
            }else{
                res.setHeader("Content-type","text/html")
                res.end("<h1>File has been deleted</h1>")
            }
        })
    }else{
        console.log(err);
    }
});


server.listen(4500,()=>{
    console.log("server is running on 4500")
});