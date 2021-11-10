
const express = require('express');
const router = express();
const User = require('../models/userSchema');

router.get('/',(req,res)=>{
    res.statusCode=200;
    res.send("home page");
});

router.get('/read',async(req,res)=>{
    try {
        const users=await User.find({});
        return res.status(201).json({users});
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: 'Something went wrong!' + error });
    }
});

router.get('/read/:id',async(req,res)=>{
    const username=req.params.id;
    try {
        const user=await User.findOne({username});
        if(!user){
            return res.status(401).json({ error: "User with this username do not exist." });
        }
        return res.status(201).json({user});
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: 'Something went wrong!' + error });
    }
});

router.post('/add',async(req,res)=>{
    const {name,username,password}=req.body;
    try{
        let user=await User.findOne({username});
        if(user){
            return res.status(401).json({ error: "User with this username already exist." });
        }
        user = await User.create({ name,username,password });
        res.status(201).json({user});
    }catch(error){
        console.log(error);
        return res.status(400).json({ error: 'Something went wrong!' + error });
    }
});

router.put('/update/:id',async(req,res)=>{
    if(req.body.password){
        return res.status(401).json({ error: "Cannot update password." });
    }
    const username= req.params.id;
    const update=req.body;
    try {
        let user =await User.findOne({username:update.username});
        if(user){
            return res.status(401).json({ error: "User with this username already exist.",user });
        }
        user=await User.findOneAndUpdate({username},update,{new:true});
        res.status(201).json({msg:`${username} has been updated`,user});
    }catch (error) {
        console.log(error);
        return res.status(400).json({ error: 'Something went wrong!' + error });
    }
});

router.delete('/delete',async(req,res)=>{
    try {
        const users=await User.remove({});
        res.status(201).json({msg:"All user has been deleted",users});
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: 'Something went wrong!' + error });
    }

});

router.delete('/delete/:id',async(req,res)=>{
    const username=req.params.id;
    try {
        const user=await User.findOneAndRemove({username});
        res.status(201).json({msg:"user has been deleted",user});
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: 'Something went wrong!' + error });
    }

});

module.exports = router;