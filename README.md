# ESA_ASSIGN_4
SMS-API



## Using the api i.e. deployed on heroku
### Inbound Api

url: <https://esa-sms.herokuapp.com/inbound/sms>  <br />
type: post <br />
params (req.body): from:Number , Text:String , to:Number (all are required)

### Outbound Api

url: <https://esa-sms.herokuapp.com/outbound/sms>  <br />
type: post  <br />
params (req.body): from:Number , Text:String , to:Number (all are required)


## Steps to setup the Sms-API using the Repo
Go to the folder you want to setup the project in
### Clone the repo and run
```bash
git clone https://github.com/AxleBlaze3/ESA_ASSIGN_4.git
```
Then go into the project dir
```bash
npm install
npm start
```
The application should be running on localhost:3000
Once setup and running the apis can be called using an application like postman


