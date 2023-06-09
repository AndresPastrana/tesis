 const hasAccess = (role)=>{
   return async(req,resp,next)=>{
    const {authorization} = req.headers;
    const token = authorization.split("Bearer ");
    
    const auth_url = `${process.env.AUTH}?${token}&role=${role}`;
    
    const auth_server_response = await fetch(auth_url);
    const data = await auth_server_response.json();
    
    // 
    if (!data.success) {
         return resp.status(401).json({error: data.error})
    }

    next();
}
}
module.exports ={
     hasAccess
}