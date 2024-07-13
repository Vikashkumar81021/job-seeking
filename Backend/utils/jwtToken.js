
export const sendToken=(user,res,statusCode,message)=>{
  const token=user.generateAccessToken()
  const options={
   expires:new Date(
    Date.now()+process.env.COOKIE_EXPIRE *24*60*60*1000
   ),
   httpOnly:true
  };
  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    message,
    token,
    user
});
}