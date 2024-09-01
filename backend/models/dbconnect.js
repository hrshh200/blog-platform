const mongoose=require('mongoose');

const url="mongodb://localhost:27017/blogstudio";

const connect=mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true});

connect.then((db)=>{
    console.log('Database is connected');
},(err)=>{
    console.log('we get the error from mongoose connection',err);
})