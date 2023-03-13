const authorise= (role_array)=>{
    return (req,res,next)=>{
        const userRole= req.body.userRole;
        if(role_array.includes(userRole)){
            next()
        }else{
            res.send("not authorised")
        }
    }
}

module.exports={
    authorise
}