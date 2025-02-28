const { getuser } = require("../service/auth");

async function restrictToLogogedUserOnly(req,res,next){
    const userUid=req.cookies?.uid;

    if(!userUid) return res.redirect('/login')
    
         const user=getuser(userUid)
         if(!user)return res.redirect('/login')
        
req.user=user;
next();
}

async function checkAuth(req,res,next) {
    const userUid=req.cookies?.uid;
    const user=getuser(userUid)
req.user=user;
next();
}

module.exports={
    restrictToLogogedUserOnly,
    checkAuth,
}