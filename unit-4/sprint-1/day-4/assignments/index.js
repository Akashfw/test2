const http = require("http");
const fs= require("fs");
const path=require("path");

const dirpath= path.join(__dirname,"files");




const server=http.createServer((request,response)=>{
if(request.url==="/"){
    fs.readdir(dirpath,(err,file)=>{
        if(err){
            console.log(err)
        }else{
            file.forEach((item)=>{
            response.end(item)
       })}
   })
        

} else if(request.url==="/data"){
    fs.readFile("./data.json",(err,data)=>{
        if(err){
        response.write("No data\n")
        response.end(err)
        } else {
        response.end(data)
        }
        })
} else if(request.url==="/public"){
response.end("Data....")
}
})
server.listen(4500,()=>{
console.log("Listening on the port 4500")
})
