const mongoose=require('mongoose')

const Job=mongoose.model('jobs',{
    jobtitle:{
        type:String,
        required:true,
    },
    jobaddress:{
        type:String,
        required:true,
    },
    companydes:{
        type:String,
        required:true,
    },
    jobdes:{
        type:String,
        required:true,
    },
    requirments:{
        type:String,
        requried:true,
    },
    qual:{
        type:String,
        required:true,
    },
    Other:{
        type:String,
        required:true,
    }
})

const Blog=mongoose.model('blogs',{
    blogspic:{
        type:String,
        required:true,
    },
    blogtitle:{
        type:String,
        required:true,
    },
    blogswriter:{
        type:String,
        required:true,
    },
    blogdes:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    }
})

const Contact=mongoose.model('Contact',{
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    emails:{
        type:String,
        required:true,
    },
    phonenumber:{
        type:String,
        required:true,
    },
    comments:{
        type:String,
        required:true,
    }
})

module.exports={Job,Blog,Contact}