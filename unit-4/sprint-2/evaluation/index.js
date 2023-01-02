const express = require("express");
const fs= require("fs");
const validator= require("./middleware/validator");
const app =express();
app.use(express.json());

app.post("/students/addstudent",(req,res)=>{
 
    const data= fs.readFileSync("./db.json","utf-8");
    const parsedata= JSON.parse(data);
    parsedata.students.push(req.body);
    fs.writeFileSync("./db.json",JSON.stringify(parsedata));
    res.send(parsedata);

});

app.post("/teachers/addteacher",(req,res)=>{
 
    const data= fs.readFileSync("./db.json","utf-8");
    const parsedata= JSON.parse(data);
    parsedata.teachers.push(req.body);
    fs.writeFileSync("./db.json",JSON.stringify(parsedata));
    res.send(parsedata);

});

app.get("/students",(req,res)=>{
const data= fs.readFileSync("./db.json","utf-8");
const parsedata= JSON.parse(data);
res.send(parsedata.students);
});

app.get("/students/:rollNo",(req,res)=>{
    const data= fs.readFileSync("./db.json","utf-8");
    const parsedata= JSON.parse(data);
    const roll = req.params.rollNo;
    console.log(roll)
   const filterdata= parsedata.students.filter((elem)=>{
        return elem.roll_no==roll;
    })
    res.send(filterdata);
    });

    app.get("/teachers",(req,res)=>{
        const data= fs.readFileSync("./db.json","utf-8");
        const parsedata= JSON.parse(data);
        res.send(parsedata.teachers);
        });

        app.get("/teachers/:empID",(req,res)=>{
            const data= fs.readFileSync("./db.json","utf-8");
            const parsedata= JSON.parse(data);
            const roll = req.params.empID;
            console.log(roll)
           const filterdata= parsedata.teachers.filter((elem)=>{
                return elem.emp_id==roll;
            })
            res.send(filterdata);
            });


            app.use(validator);

            app.patch("/students/:rollNo",(req,res)=>{
                const data= fs.readFileSync("./db.json","utf-8");
                const parsedata= JSON.parse(data);
                const roll = req.params.rollNo;
                const detail= req.body;
               const filterdata= parsedata.students.filter((elem)=>{
                    if(roll==elem.roll_no){
                        elem.name=detail.name;
                        elem.location=detail.location;
                        elem.course=detail.course;
                    }
                    return elem
                });
                parsedata.students=filterdata;
                fs.writeFileSync("./db.json",JSON.stringify(parsedata));
                
                res.send(filterdata);
                });


                app.delete("/students/:rollNo",(req,res)=>{
                    const data= fs.readFileSync("./db.json","utf-8");
                    const parsedata= JSON.parse(data);
                    const roll = req.params.rollNo;

                    let filterdata=parsedata.students.filter((item)=>{
                        return item.roll_no != roll
                    })
                    parsedata.students=filterdata;
                    
                    fs.writeFileSync("./db.json",JSON.stringify(parsedata));
                
                    res.send(filterdata);
                })

            

app.listen(3500,()=>{
    console.log("server running on 3500");
})