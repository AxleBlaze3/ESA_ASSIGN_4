# ESA_ASSIGN_4
SMS-API



## Using the api i.e. deployed on heroku
### Inbound Api
```bash
url: https://esa-sms.herokuapp.com/inbound/sms
type: post
params (req.body): from:Number , Text:String , to:Number (all are required)
```
### Outbound Api
```bash
url: https://esa-sms.herokuapp.com/outbound/sms
type: post
params (req.body): from:Number , Text:String , to:Number (all are required)
```

## Steps to setup the Sms-API using the Repo
1) Go to the folder you want to setup the project in
2)Clone the repo using ```bash git clone https://github.com/AxleBlaze3/ESA_ASSIGN_4.git```
3)Go into the project dir
4)```bash npm install ```
5)```bash npm start ```
6)The application should be running on localhost:3000
7)Once setup and running the apis can be called using an application like postman


