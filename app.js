var express=require('express')
var bodyParser=require("body-parser");
var cors=require('cors');

const app=express();
app.use(cors());

app.use(express.json())
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use('/',require('./routers/index'))

app.listen(8080);
console.log('Listening on 3000')
