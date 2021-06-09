const mongoose = require('mongoose');
const express=require('express')
const router = express.Router();
require('dotenv').config({path:'../../'})
const redis = require('redis');
const {stopCache}=require('./inbound')
const smsS=mongoose.model('smsS')
const NodeCache = require('node-cache')
//const freqCache = new NodeCache()

router.post('/outbound/sms',async(req,res)=>{
    var from=req.body.from
    var to=req.body.to
    var text=req.body.text
    if(typeof from==="undefined"){
        return res.status(406).json({
            message:"Invalid Outbound",
            error:"from found to be undefined"
        })
    }
    if(typeof text==="undefined"){
        return res.status(406).json({
            message:"Invalid Outbound",
            error:"text found to be undefined"
        })
    }

    if(typeof to==="undefined"){
        return res.status(406).json({
            message:"Invalid Outbound",
            error:"to found to be undefined"
        })
    }
    if(!Number.isInteger(from)||!Number.isInteger(to)||typeof text!=="string"){
        return res.status(400).json({
            message:"Invalid Outbound",
            error:"Params typing invalid"
        })
    }
    if(from.toString().length<6||from.toString().length>16){
        return res.status(400).json({
            message:"Invalid Outbound",
            error:"from found to be invalid"
        })
    }
    if(text.length<1||text.length>120){
        return res.status(400).json({
            message:"Invalid Outbound",
            error:"text found to be invalid"
        })
    }
    if(to.toString().length<6||to.toString().length>16){
        return res.status(400).json({
            message:"Invalid Outbound",
            error:"to found to be invalid"
        })
    }
    let keyL=stopCache.keys()
    for(var i=0;i<keyL.length;i++){
        var obj=stopCache.get(keyL[i])
        //console.log(obj)
        if(obj.hasOwnProperty('from')){
            if(obj.hasOwnProperty('to')){
                if(obj.from==from && obj.to==to){
       

                    return res.status(403).json({
                        message: `sms from ${from} to ${to} is blocked due to a STOP request`,
                        error: "Blocked"
                    });
            
                }
            
            }
        }
    }

    

    if(!stopCache.has(from)){
        
        //console.log(typeof from)
        
        
        stopCache.set(from,0,3600)
        //console.log(stopCache.getTtl(from))
        //console.log(new Date().getTime())
    }else{
       
        var temp=stopCache.get(from)
        temp+=1
        let ttl=stopCache.getTtl(from)
        let tim=new Date().getTime()
        stopCache.set(from,temp,(ttl-tim)/1000)
        
        
        if(stopCache.get(from)>=50){
            //console.log(stopCache.getTtl(from))
            return res.status(500).json({
                message:"",
                error:`limit reached for from ${from}`
            })

        }
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
    
    //console.log(stopCache.get(stopCache.keys()[0]))
    //console.log(stopCache.keys())
    return res.status(200).json({
        message:"Outbound Success",
        error:"None"
    })


})
module.exports=router

