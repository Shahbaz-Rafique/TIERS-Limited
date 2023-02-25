const express = require("express");
const router = express.Router();
const multer = require("multer");

const { Job } = require("../models/web");
const { Blog } = require("../models/web");
const { storage } = require("../multer/upload");
const { uploadFile } = require("../multer/upload");
const { uploadApply } = require("../multer/upload");
const { quote } = require("../multer/upload");
const { contactdetails } = require("../multer/upload");
const { db } = require("../database/db");

var upload = multer({ storage: storage });
var multipleupload = upload.fields([{ name: "Profile" }, { name: "resume" }]);
var Education=[]

router.get("/api/showcarrers", async (req, res) => {
  Job.find({}, function (err, data) {
    if (err) {
      console.log(err);
    } else {
        res.send(data)
    }
  });
});

router.get("/api/showcarrers/:id", function (req, res) {
  Job.find({ _id: req.params.id }, function (err, data) {
    if (err) {
      console.log(err);
    } else {
        res.send(data)
    }
  });
});

router.get('/jobdetails/job-application/:id',function(req,res){
    Job.find({_id:req.params.id},function(err,jobname){
        if(err){
            console.log(err)
        }
        else{
            res.send(data)
        }
    })
})

router.get("/api/showblogs", async (req, res) => {
  Blog.find({}, function (err, data) {
    if (err) {
      console.log(err);
    } else {
        res.send(data)
    }
  });
});

router.get("/api/showblogs/:id", function (req, res) {
  Blog.findById({ _id: req.params.id }, function (err, data) {
    if (err) {
      console.log(err);
    } else {
        res.send(data)
    }
  });
});

router.post("/contact", (req, res) => {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var phoneNumber = req.body.phoneNumber;
  var comment = req.body.comment;
  var data = {
    "firstname": firstName,
    "lastname": lastName,
    "emails": email,
    "phonenumber": phoneNumber,
    "comments": comment,
  };
  contactdetails(data,email);
  return res.redirect('http://tierslimited.com/contact.html');
});

router.post("/dreamjob", upload.single("resume"), (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var phone = req.body.phone;
  var cnic = req.body.cnic;
  var starting = req.body.starting;
  var city = req.body.city;
  var fileinfo = req.file.filename;
  var esalary = req.body.esalary;
  uploadFile(fileinfo, name, email, phone, cnic, starting, city, esalary).then(
    (data) => {
      console.log(data);
    }
  );
  Job.find({}, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
        res.redirect('http://tierslimited.com/jobs.html')
    }
  });
});

router.post('/api/education',function(req,res){
    Education=[]
    Education=req.body.edu
    console.log("Edu",req.body.edu)
})

router.post('/submitApplication',multipleupload,function(req,res){
    var jobtitle=req.body.jobtitle;
    var Fname=req.body.Fname;
    var Lname=req.body.Lname;
    var email=req.body.email;
    var address=req.body.address;
    var contact=req.body.contact;

    var Title=req.body.Title;
    var Company=req.body.Company;
    var olocation=req.body.olocation;
    var ESdate=req.body.ESdate;
    var Eedate=req.body.Eedate;

    var Linkedin=req.body.Linkedin;
    var Twitter=req.body.Twitter;
    var Facebook=req.body.Facebook;
    var Website=req.body.Website;

    var message=req.body.message;
    var peronal=[]
    var experience=[]
    var accounts=[]

    peronal.push({Fname,Lname,email,address,contact,jobtitle})
    experience.push({Title,Company,olocation,ESdate,Eedate})
    accounts.push({Linkedin,Twitter,Facebook,Website})

    uploadApply(req.files.Profile[0].filename,req.files.resume[0].filename,peronal,experience,accounts,message,Education)
    Job.find({},function(err,docs){
        if(err){
            console.log(err)
        }
        else{
            res.redirect('http://tierslimited.com/jobs.html')
        }
    })
})

router.post('/getaquote',function(req,res){
    var FN=req.body.fname;
    var LN=req.body.lname;
    var EID=req.body.email;
    var Contact=req.body.contact;
    var CN=req.body.cname;
    var bugdet=req.body.budget;
    var service=req.body.service;
    var detail=req.body.desc;

    var data={
        "Firstname":FN,
        "Lastname":LN,
        "email":EID,
        "contact":Contact,
        "companyName":CN,
        "bugdet":bugdet,
        "service":service,
        "detail":detail,
        "status":"Sending",
    } 
    quote(data);
    return res.redirect('http://tierslimited.com/quote.html')
});


module.exports = router;
