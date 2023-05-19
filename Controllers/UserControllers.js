import  express from "express";
import UserModel from "../Models/userModel.js";
import bcrypt from 'bcrypt';

//get a user
export const getUser = async(req,res)=>{
    const id = req.params.id;
        try{
        const user = await UserModel.findById(id);
        if(user){
            const {password,...othersdetails}=user._doc
            res.status(200).json(othersdetails);
        }
        else{
            res.status(404).json('User does not exist');
        }
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

//update user
export const updateUser=async(req,res)=>{
    const id = req.params.id
    const {currentUserId,currentUserAdminStatus,password}=req.body

    if(id===currentUserId || currentUserAdminStatus){
    try{
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(password,salt);
        const user = await UserModel.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json(user);
    }
    catch(error){
        res.status(500).json(error);
    }
    }
    else{
        res.status(403).json('Acces Denied! You cannot update the profie');
    }

}

//delete user
export const deleteUser = async(req,res)=>{
    const id = req.params.id
    const { currentUserId,currentUserAdminStatus}=req.body;
    if(currentUserId === id || currentUserAdminStatus){
        try{
            await UserModel.findByIdAndDelete(id)
            res.status(200).json("User delete successfully")
        }catch(error){
            res.status(500).json(error);
        }
    }
    else{
        res.status(403).json('User Profie does not Exist');
    }
}
//follow a user
export const followerUser = async(req,res)=>{
    const id = req.params.id;
    const {currentUserId} = req.body;
    if(currentUserId===id){
        res.status(403).json("Action forbidden");
    }
    else {
        try{
         const followerUser = UserModel.findById(id);
         const followingUser = UserModel.findById(currentUserId);
         if(!followerUser.followers.includes(currentUserId)){
            await followerUser.updateOne({$push : {followers:currentUserId}})
            await followingUser.updateOne({$push : {following: id}})
            res.status(200).json('User followed!');

         }
         else{
            res.status(403).json('You are already following this person');
         }
        }
        catch(error){
            res.status(500).json(error);
        }
    }
}

//unfollow a user
export const unfollowUser = async(req,res)=>{
    const id = req.params.id;
    const {currentUserId} = req.body;
    if(currentUserId===id){
        res.status(403).json("Action forbidden");
    }
    else {
        try{
         const followerUser = UserModel.findById(id);
         const followingUser = UserModel.findById(currentUserId);
         if(followerUser.followers.includes(currentUserId)){
            await followerUser.updateOne({$pull : {followers:currentUserId}})
            await followingUser.updateOne({$pull : {following: id}})
            res.status(200).json('User unfollowed!');

         }
         else{
            res.status(403).json('You are not following this person');
         }
        }
        catch(error){
            res.status(500).json(error);
        }
    }
}