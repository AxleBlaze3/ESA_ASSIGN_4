const mongoose = require('mongoose');
const express=require('express')
const router = express.Router();
require('dotenv').config({path:'../../'})
const redis = require('redis');
const NodeCache = require('node-cache')
const cachee = new NodeCache({ checkperiod: 31 })

const smsS=mongoose.model('smsS')

router.post('/inbound/sms',async(req,res)=>{
    var from=req.body.from
    var to=req.body.to
    var text=req.body.text
    if(typeof from==="undefined"){
        return res.status(406).json({
            message:"Invalid Inbound",
            error:"from found to be undefined"
        })
    }
    if(typeof text==="undefined"){
        return res.status(406).json({
            message:"Invalid Inbound",
            error:"text found to be undefined"
        })
    }

    if(typeof to==="undefined"){
        return res.status(406).json({
            message:"Invalid Inbound",
            error:"to found to be undefined"
        })
    }
    if(!Number.isInteger(from)||!Number.isInteger(to)||typeof text!=="string"){
        return res.status(400).json({
            message:"Invalid Inbound",
            error:"Params typing invalid"
        })
    }
    if(from.toString().length<6||from.toString().length>16){
        return res.status(400).json({
            message:"Invalid Inbound",
            error:"from found to be invalid"
        })
    }
    if(text.length<1||text.length>120){
        return res.status(400).json({
            message:"Invalid Inbound",
            error:"text found to be invalid"
        })
    }
    if(to.toString().length<6||to.toString().length>16){
        return res.status(400).json({
            message:"Invalid Inbound",
            error:"to found to be invalid"
        })
    }
    if(text.includes("STOP")){
        let r = Math.random().toString(36).substring(7);

        let pair={from:from,to:to}
        cachee.set(r, pair,3600*4)
        //console.log(cachee.get(from))
        return res.status(200).json({
            message: "4hr block active",
            error: "None"
        });

    }

    const newSms=new smsS({
        from:from,
        text:text,
        to:to
    })
    try{
        await newSms.save()
    }catch(err){
        return res.status(500).json({
            message:"Save Failed",
            error:"DB err"
        })
    }
    
    return res.status(200).json({
        
        message:"Inbound Success",
        error:"None"
    })


})
exports.inbound=router
exports.stopCache=cachee


