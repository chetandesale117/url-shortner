const jwt=require('jsonwebtoken')
const secret="chetan$desale"

function setuser(user){
   return jwt.sign({
    _id:user._id,
    email:user.email,
   },secret)
}

function getuser(token){
    if(!token)return null;
    try{
        return jwt.verify(token,secret)
    }
    catch(error){
        return null;
    }
}

module.exports={
    setuser,
    getuser,
}