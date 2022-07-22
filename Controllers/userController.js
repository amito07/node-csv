import userModel from "../Models/userModel.js"
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import csvtojson from 'csvtojson';
import converter from 'json-2-csv';
import fs from 'fs-extra';
import path from "path";

dotenv.config();

export const userSignup = async(req,res)=>{
    const {email,name,password} = req.body;
    console.log(email,password)
    if(!email || !password){
        return res.send({error:"credentials is not correct"})
    }
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password,salt)
    console.log(email,hashpassword)
    const userInfo = {
        email,
        name,
        password:hashpassword
    }
    try {
        const createdUser = await userModel.create(userInfo)
        if(!createdUser){
            return res.json({message:'Server Error'})
        }else{
            return res.json({message:'User Signup Successfully',data:createdUser})
        }
        
    } catch (error) {
        console.log(error)
    }

}

export const userLogin = async(req,res)=>{
    const {email,password} = req.body;
    if(email.length === 0 || password.length === 0){
        return res.json({message:'Incomplete Credentials'})
    } 

    const existUser = await userModel.findOne({where:{email}})
    if(!existUser){
        return res.json({message:'User not found in our system'})
    }else{
        const validPassword = await bcrypt.compare(password,existUser.password)
        if(validPassword){
            const userInfo = {
                username:existUser.name,
                useremail: existUser.email, 
            }
            const token = jwt.sign(userInfo,process.env.SECRET)
            return res.json({message:'User Login Successfully',token})
        }else{
            return res.json({message:'Invalid Credentials'})
        }
    }


}

export const createBulkUser = async(req,res)=>{
    const file = req.file;
    const path = `./${file.destination}/${file.filename}`

    const data = path
    csvtojson()
    .fromFile(data)
    .then((jsonObj)=>{
        const usersCreate = userModel.bulkCreate(jsonObj,{fields:Object.keys(jsonObj[0])})
        if(usersCreate.length < 1){
            const error = new Error("Database Error")
            error.statusCode = 500;
            return res.json({message:error})
        }else{
            return res.json({message:'Users Created Successfully', data:jsonObj})
        }
    })
    .catch((err)=>{
        console.log(err)
    })


}

export const exportToCsvUser = async(req,res)=>{
    try {
        const userJsonData = await userModel.findAll({raw:true})
        
        converter.json2csv(userJsonData,(err,csv)=>{
            if(err){
                throw err;
            }else{
                fs.outputFile('CsvFolder/users.csv', csv, err => {
                    if(err) {
                      console.log(err);
                    } else {
                      console.log('The file was saved!');
                    }
                  })
            }

        })
        res.send(userJsonData)

        
    } catch (error) {
        console.log(error)
    }
}