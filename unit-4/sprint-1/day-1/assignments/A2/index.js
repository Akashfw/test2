const fs= require("fs");

const val= process.argv.slice(2)

let x= val[0];

if(x=="read"){
    fs.readFile(`./${val[1]}`,{encoding:"utf-8"},(err,data)=>{
        if(err){
            console.log(err)
        }else{
            console.log(data)
        }
    })
}

if(x=="append"){
    fs.appendFile(`./${val[2]}`,`\n${val[1]}`,(err)=>{
        if(err){
            console.log("cannot append")
        }else{
            console.log("appended data")
        }
    })
};

if(x=="delete"){
    fs.rm(`./${val[1]}`,(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log("file deleted")
        }
    })
};

if(x=="create"){
    fs.writeFile(`./${val[1]}`,"this is my file",(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log("file has created")
        }
    })
}

if(x=="rename"){
    fs.rename(`./${val[1]}`,`./${val[2]}`,(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log("name changed")
        }
    })
}

