var mongoose=require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://DreamLightAdmin:Dreamlight123@ac-k8rregz-shard-00-00.e1d21o9.mongodb.net:27017,ac-k8rregz-shard-00-01.e1d21o9.mongodb.net:27017,ac-k8rregz-shard-00-02.e1d21o9.mongodb.net:27017/DreamLight?ssl=true&replicaSet=atlas-4sg2xh-shard-0&authSource=admin&retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
var db=mongoose.connection;
db.on('error',()=>console.log('error'))
db.once('open',()=>console.log('connected'))

module.exports={db}