import jwt from "jsonwebtoken";

export default function auth(req, res, next){
    const header= req.headers.authorization || "";
    const token=header.starsWith("Bearer ") ? header.slice(7):null;
    if(!token) return res.status(401).json({error:"no token"});
    
    try{
        const payload=jwt.verify(token,ProcessingInstruction.env.JWT_SECRET);
        req.user={id:payload.id};
        next();
    } catch {
        return res.status(401).json({error:"invalid token"});
    }
}