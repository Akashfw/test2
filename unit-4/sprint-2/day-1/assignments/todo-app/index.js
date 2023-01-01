const express= require("express");
const fs= require("fs");

const app=express();
app.use(express.json())


app.get("/",(req,res)=>{
    const data= fs.readFileSync("./db.json","utf-8");
    const parsedata= JSON.parse(data);
    res.send(parsedata)
});

app.post("/",(req,res)=>{
    const data= fs.readFileSync("./db.json","utf-8");
    const parsedata= JSON.parse(data);
     parsedata.students.push(req.body);
     fs.writeFileSync("./db.json",JSON.stringify(parsedata))
    res.send(parsedata)
});

app.delete("/",(req,res)=>{
    const data= fs.readFileSync("./db.json","utf-8");
    const parsedata= JSON.parse(data);
    let maindata= parsedata.students.filter((item)=>{
        return item.name !== req.body.name;
     })
     parsedata.students=maindata;
     fs.writeFileSync("./db.json",JSON.stringify(parsedata))
    res.send(parsedata)
});

app.listen(3500,()=>{
    console.log("server running on 3500")
})