const express = require("express");
 const recorder= express();
 recorder.use(express.json());
 const fs = require("fs");

 recorder.use((req,res,next)=>{
    if(req.method=="PATCH" && req.url=="/editbooks"){
         
             if(err){
                 res.send(err)
             }else{
                 console.log()
                 next()
             }
         })
    }else if(req.method=="DELETE" && req.url=="/deletebooks"){
        
            if(err){
                res.send(err)
            }else{
                next()
            }
        })
    }else{
        next()
    }
});


module.exports={
    recorder
}