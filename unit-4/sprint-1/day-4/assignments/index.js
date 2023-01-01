const http = require("http");
const fs= require("fs");
// const path=require("path");

// const dirpath= path.join(__dirname,"files");




const server=http.createServer((request,response)=>{
if(request.url==="/"){
//     fs.readdir(dirpath,(err,file)=>{
//         if(err){
//             console.log(err)
//         }else{
//             file.forEach((item)=>{
//             response.end(item)
//        })}
//    })
response.setHeader("Content-type","text/html")
response.end(`<li><a href="http://localhost:4500/data"> /Data</a></li>
          <li><a href="http://localhost:4500/public"> /public</a></li>
          `)

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
    const dirents = fs.readdirSync("./public", { withFileTypes: true });
    response.setHeader("Content-type","text/html");
    response.end(`<li><a href="http://localhost:4500/other"> /src</a></li>`)
}else if(request.url === "/other"){

    fs.readFile("./public/src.json",(err,data)=>{
      response.end(data)
    });

  }else{
      response.end("Invalid end point")
  }
})
server.listen(4500,()=>{
console.log("Listening on the port 4500")
})
