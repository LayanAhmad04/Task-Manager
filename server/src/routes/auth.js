import {Router} from "express";
import bycrypt from "bycrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = Router();

router.post("/register", async(req,res) =>{
    try{
        const{username,email,password}=req.body;
        if(!(username&&email&&password)) return res.status(400).json({error:"missing fields"});

        const exists= await User.findOne({email});
        if(exists) return res.status(409).json({error:""});

        const passwordHash = await bycript.hash(password,10);
        const user = await User.create({username,email,passwordHash});
        res.status(201).json({id:user._id});
    } catch(e){
        res.status(500).json({error:e.message});
    }
});
 router.post("/login",async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user= await User.findOne({email});
        if(!user) return res.status(401).json({error:"Invalid credentials"});

        const ok = await bycrypt.compare(password,user.passwordHash);
        if (!ok) return res.status(401).json({error:"Invalid credentials"});

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn: "7d"});
        res.json({token});
    }catch(e){
        res.status(500).json({error:e.message});
    }
 });
 export default router;