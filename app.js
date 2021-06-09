require('./api/models/sms')
const mongoose=require('mongoose')
const express=require('express')
const {inbound}=require('./api/routes/inbound')
const outbound=require('./api/routes/outbound')
const app=express()
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(inbound)
app.use(outbound)


app.all('*', async  (req,res)=> {
    res.status(405).json({
        message : "Denied"
    })
})

const mongoUri='mongodb+srv://Blaze:thispassword1@cluster0.ilkvi.mongodb.net/ESADB?retryWrites=true&w=majority'

mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true 
})
mongoose.connection.on("connected",()=>{
    console.log("Connected to Mongo")
})
mongoose.connection.on('error',(err)=>{
    console.error("Error connecting to Mongo",err)
})
app.listen(process.env.PORT || port,(req,res)=>{
    console.log("listening:3000")
})

