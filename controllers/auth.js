let obj =  {
    signup: (req,res,next)=>{
        console.log('From submitted',req.body);
        return res.status(200).json({
            success:true,
            response: 'From submitted'
        });
    }
}
module.exports = obj;