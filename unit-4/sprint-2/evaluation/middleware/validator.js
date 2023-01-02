let validator= (req,res,next)=>{
    const details= req.body;
    let patsedata= JSON.parse(details);
    let pass= patsedata.password;
    let name= patsedata.name;
    if(pass==7877 && name=="admin"){
        res.send("admin login")
    }
}

module.exports=validator;