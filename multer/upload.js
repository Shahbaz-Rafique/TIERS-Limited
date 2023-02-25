const {db}=require('../database/db')
const multer=require('multer');
var nodemailer = require('nodemailer');
const {google}=require('googleapis');
const fs=require('fs')

var transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: 'info@tierslimited.com',
      pass: '4kcQzPLpuQqN'
    }
  });


var storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads/")
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
})

const Google_API_Folder_ID='1GMwyE-IzJL6XO0b326JMpmE8vduW_QrQ';
async function uploadFile(filename,name,email,phone,cnic,starting,city,esalary){
    try{
        const auth=new google.auth.GoogleAuth({
            keyFile:'./googlekey.json',
            scopes:['https://www.googleapis.com/auth/drive']
        })
        const driveServices=google.drive({
            version:'v3',
            auth
        })
        const fileMetaData={
            'name':'uploads/'+filename,
            'parents':[Google_API_Folder_ID]
        }
        const media={
            mimeType:'/pdf',
            body:fs.createReadStream('uploads/'+filename)
        }

        const response= await driveServices.files.create({
            resource:fileMetaData,
            media:media,
            field:'id'
        })
        var pdflink='https://drive.google.com/uc?export=view&id='+response.data.id;
        var data={
            "name":name,
            "email":email,
            "phone":phone,
            "cnic":cnic,
            "starting":starting,
            "city":city,
            "esalary":esalary,
            "resumelink":pdflink, 
        } 
        db.collection('jobrequests').insertOne(data,(err,collection)=>{
            if(err){
                throw err;
            }
            console.log('Record Insered');  
            var mailOptions = {
                from: 'TIERS Limited<info@tierslimited.com>',
                to: email,
                subject: name+" your Request to dream job has been recieved",
                attachments:[
                    {
                        filename:filename,
                        path:'uploads/'+filename,
                    }
                ],
                html:`
                <!DOCTYPE html>
                <html>

                <head>
                    <title></title>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <link rel="apple-touch-icon" href="/images/apple-touch-icon.png">
                    <!-- Font Awesome -->
                    <link
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
                    rel="stylesheet"
                    />
                    <!-- Google Fonts -->
                    <link
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    rel="stylesheet"
                    />
                    <!-- MDB -->
                    <link
                    href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.1.0/mdb.min.css"
                    rel="stylesheet"
                    />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <style type="text/css">
                        @media screen {
                            @font-face {
                                font-family: 'Lato';
                                font-style: normal;
                                font-weight: 400;
                                src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                            }

                            @font-face {
                                font-family: 'Lato';
                                font-style: normal;
                                font-weight: 700;
                                src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                            }

                            @font-face {
                                font-family: 'Lato';
                                font-style: italic;
                                font-weight: 400;
                                src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                            }

                            @font-face {
                                font-family: 'Lato';
                                font-style: italic;
                                font-weight: 700;
                                src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                            }
                        }

                        /* CLIENT-SPECIFIC STYLES */
                        body,
                        table,
                        td,
                        a {
                            -webkit-text-size-adjust: 100%;
                            -ms-text-size-adjust: 100%;
                        }

                        table,
                        td {
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                        }

                        img {
                            -ms-interpolation-mode: bicubic;
                        }

                        /* RESET STYLES */
                        img {
                            border: 0;
                            height: auto;
                            line-height: 100%;
                            outline: none;
                            text-decoration: none;
                        }

                        table {
                            border-collapse: collapse !important;
                        }

                        body {
                            height: 100% !important;
                            margin: 0 !important;
                            padding: 0 !important;
                            width: 100% !important;
                        }

                        /* iOS BLUE LINKS */
                        a[x-apple-data-detectors] {
                            color: #357fff !important;
                            text-decoration: none !important;
                            font-size: inherit !important;
                            font-family: inherit !important;
                            font-weight: inherit !important;
                            line-height: inherit !important;
                        }

                        /* MOBILE STYLES */
                        @media screen and (max-width:600px) {
                            h1 {
                                font-size: 32px !important;
                                line-height: 32px !important;
                            }
                        }

                        /* ANDROID CENTER FIX */
                        div[style*="margin: 16px 0;"] {
                            margin: 0 !important;
                        }
                        
                    </style>
                </head>

                <body style="background-color: #357fff; margin: 0 !important; padding: 0 !important;">
                    <!-- HIDDEN PREHEADER TEXT -->
                    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> 
                    </div>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <!-- LOGO -->
                        <tr>
                            <td bgcolor="#357fff" align="center">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                    <tr>
                                        <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#357fff" align="center" style="padding: 0px 10px 0px 10px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                    <tr>
                                        <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                            <h1 style="font-size: 48px; font-weight: 400; margin: 2;color: #357fff;">TIERS Limited</h1> <img src="https://wallpaperaccess.com/full/4391662.jpg" width="125" height="120" style="display: block; border: 0px;" />
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                    <tr>
                                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                            <p style="margin: 0;text-align:justify;">Dear ${name},</p>
                                            <p style="margin: 0;text-align:justify;">Thank you for reaching out to us. We appreciate your interest in our company. Your Application to join TIERS Limited is under process. You will be notify shortly.</p>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                            <p style="margin: 0;"><b>Your Application Copy</b><br></p>
                                            <p style="margin:0;">Name: ${name}</p>
                                            <p style="margin:0;">Email: ${email}</p>
                                            <p style="margin:0;">Contact: ${phone}</p>
                                            <p style="margin:0;">CNIC: ${cnic}</p>
                                            <p style="margin:0;">When you start this job? ${starting}</p>
                                            <p style="margin:0;">City: ${city}</p>
                                            <p style="margin:0;">Expected Salary: ${esalary}</p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                </body>
                </html>
                `
            };
            
            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
            });  
            var mailOptions1 = {
                from: `TIERS Limited JOBS <${email}>`,
                to: 'info@tierslimited.com',
                subject: name+" send a request for dream job",
                attachments:[
                    {
                        filename:filename,
                        path:'uploads/'+filename,
                    }
                ],
                text: 'name: '+name+'\nemail: '+email+'\n'+'Contact: '+phone+'\n'+'CNIC: '+cnic+'\nWhen you start this job? '+starting+'\nCity: '+city+'\nExpected Salary: '+esalary,
            }
            transporter.sendMail(mailOptions1, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
                });  
        });
        return 'https://drive.google.com/uc?export=view&id='+response.data.id;
    }catch(err){
        console.log('upload file error ',err)
    }
}


async function uploadApply(filename,filename1,personal,experience,accounts,message,Education){
    try{
        const auth=new google.auth.GoogleAuth({
            keyFile:'./googlekey.json',
            scopes:['https://www.googleapis.com/auth/drive']
        })
        const driveServices=google.drive({
            version:'v3',
            auth
        })
        const fileMetaData={
            'name':'uploads/'+filename,
            'parents':[Google_API_Folder_ID]
        }
        const fileMetaData1={
            'name':'uploads/'+filename1,
            'parents':[Google_API_Folder_ID]
        }
        const media={
            mimeType:'/pdf,/image/jpg,image/png,image/jpeg',
            body:fs.createReadStream('uploads/'+filename)
        }
        const media1={
            mimeType:'/pdf,/image/jpg,image/png,image/jpeg',
            body:fs.createReadStream('uploads/'+filename1)
        }

        const response= await driveServices.files.create({
            resource:fileMetaData,
            media:media,
            field:'id'
        })

        const response1= await driveServices.files.create({
            resource:fileMetaData1,
            media:media1,
            field:'id'
        })
        var link='https://drive.google.com/uc?export=view&id='+response.data.id;
        var link1='https://drive.google.com/uc?export=view&id='+response1.data.id;
        if(experience[0].Eedate==null){
            experience[0].Eedate="Present";
        }
        console.log(Education)
        var data={
            "JobTitle":personal[0].jobtitle,
            "Firstname":personal[0].Fname,
            "Lastname":personal[0].Lname,
            "email":personal[0].email,
            "address":personal[0].address,
            "contact":personal[0].contact,
            "imagelink":link,
            "Education":Education,
            "ExperienceTitle":experience[0].Title,
            "Company":experience[0].Company,
            "olocation":experience[0].olocation,
            "ESdate":experience[0].ESdate,
            "Eedate":experience[0].Eedate,
            "Linkedin":accounts[0].Linkedin,
            "Facebook":accounts[0].Facebook,
            "Twitter":accounts[0].Twitter,
            "Website":accounts[0].Website,
            "Resumelink":link1,
            "Message":message,
        } 
        db.collection('jobapplications').insertOne(data,(err,collection)=>{
            if(err){
                throw err;
            }
            console.log('Record Insered');        
        });
        var mailOptions = {
            from: 'TIERS Limited<info@tierslimited.com>',
            to: personal[0].email,
            subject: personal[0].Fname+" your Application for "+personal[0].jobtitle+" has been recieved",
            attachments:[
                {
                    filename:filename,
                    path:'uploads/'+filename1,
                }
            ],
            html:`
            <!DOCTYPE html>
            <html>

            <head>
                <title></title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="apple-touch-icon" href="/images/apple-touch-icon.png">
                <!-- Font Awesome -->
                <link
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
                rel="stylesheet"
                />
                <!-- Google Fonts -->
                <link
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                rel="stylesheet"
                />
                <!-- MDB -->
                <link
                href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.1.0/mdb.min.css"
                rel="stylesheet"
                />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <style type="text/css">
                    @media screen {
                        @font-face {
                            font-family: 'Lato';
                            font-style: normal;
                            font-weight: 400;
                            src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                        }

                        @font-face {
                            font-family: 'Lato';
                            font-style: normal;
                            font-weight: 700;
                            src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                        }

                        @font-face {
                            font-family: 'Lato';
                            font-style: italic;
                            font-weight: 400;
                            src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                        }

                        @font-face {
                            font-family: 'Lato';
                            font-style: italic;
                            font-weight: 700;
                            src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                        }
                    }

                    /* CLIENT-SPECIFIC STYLES */
                    body,
                    table,
                    td,
                    a {
                        -webkit-text-size-adjust: 100%;
                        -ms-text-size-adjust: 100%;
                    }

                    table,
                    td {
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                    }

                    img {
                        -ms-interpolation-mode: bicubic;
                    }

                    /* RESET STYLES */
                    img {
                        border: 0;
                        height: auto;
                        line-height: 100%;
                        outline: none;
                        text-decoration: none;
                    }

                    table {
                        border-collapse: collapse !important;
                    }

                    body {
                        height: 100% !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        width: 100% !important;
                    }

                    /* iOS BLUE LINKS */
                    a[x-apple-data-detectors] {
                        color: #357fff !important;
                        text-decoration: none !important;
                        font-size: inherit !important;
                        font-family: inherit !important;
                        font-weight: inherit !important;
                        line-height: inherit !important;
                    }

                    /* MOBILE STYLES */
                    @media screen and (max-width:600px) {
                        h1 {
                            font-size: 32px !important;
                            line-height: 32px !important;
                        }
                    }

                    /* ANDROID CENTER FIX */
                    div[style*="margin: 16px 0;"] {
                        margin: 0 !important;
                    }
                    
                </style>
            </head>

            <body style="background-color: #357fff; margin: 0 !important; padding: 0 !important;">
                <!-- HIDDEN PREHEADER TEXT -->
                <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> 
                </div>
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <!-- LOGO -->
                    <tr>
                        <td bgcolor="#357fff" align="center">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                <tr>
                                    <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#357fff" align="center" style="padding: 0px 10px 0px 10px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                <tr>
                                    <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                        <h1 style="font-size: 48px; font-weight: 400; margin: 2;color: #357fff;">TIERS Limited</h1> <img src="https://wallpaperaccess.com/full/4391662.jpg" width="125" height="120" style="display: block; border: 0px;" />
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                <tr>
                                    <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                        <p style="margin: 0;text-align:justify;">Dear ${personal[0].Fname},</p>
                                        <p style="margin: 0;text-align:justify;">Thank you for reaching out to us. We appreciate your interest in our company. Your Application to join TIERS Limited is under process. You will be notify shortly.</p>
                                    </td>
                                </tr>

                                <tr>
                                    <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                        <p style="margin: 0;"><b>Your Application Copy (Except Education)</b><br></p>
                                        <p style="margin:0;"><b>Personal Information</b></p>
                                        <p style="margin:0;">Job Title: ${personal[0].jobtitle} </p>
                                        <p style="margin:0;">Name: ${personal[0].Fname} ${personal[0].Lname}</p>
                                        <p style="margin:0;">Email: ${personal[0].email}</p>
                                        <p style="margin:0;">Contact: ${personal[0].contact}</p>
                                        <p style="margin:0;">Address: ${personal[0].address}</p>
                                        <p style="margin:0;"><b>Work Experience</b></p>
                                        <p style="margin:0;">Title: ${experience[0].Title} </p>
                                        <p style="margin:0;">Company: ${experience[0].Company} </p>
                                        <p style="margin:0;">Office Location: ${experience[0].olocation} </p>
                                        <p style="margin:0;">Start date: ${experience[0].ESdate} </p>
                                        <p style="margin:0;">End Date: ${experience[0].Eedate} </p>
                                        <p style="margin:0;"><b>On the Web</b></p>
                                        <p style="margin:0;">Linked In: ${accounts[0].Linkedin} </p>
                                        <p style="margin:0;">Twitter: ${accounts[0].Twitter} </p>
                                        <p style="margin:0;">Facebook: ${accounts[0].Facebook} </p>
                                        <p style="margin:0;">Website: ${accounts[0].Website} </p>
                                        <p style="margin:0;"><b>Message to Hiring Company</b></p>
                                        <p style="margin:0;"> ${message} </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
            </body>
            </html>
            `
        };
        
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        });  

        var mailOptions1 = {
            from: `TIERS Job Application <${personal[0].email}>`,
            to: 'info@tierslimited.com',
            subject: personal[0].Fname  +' Apply for '+personal[0].jobtitle,
            attachments:[
                {
                    filename:filename,
                    path:'uploads/'+filename1,
                }
            ],
            html:`
            <!DOCTYPE html>
            <html>

            <head>
                <title></title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="apple-touch-icon" href="/images/apple-touch-icon.png">
                <!-- Font Awesome -->
                <link
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
                rel="stylesheet"
                />
                <!-- Google Fonts -->
                <link
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                rel="stylesheet"
                />
                <!-- MDB -->
                <link
                href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.1.0/mdb.min.css"
                rel="stylesheet"
                />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <style type="text/css">
                    @media screen {
                        @font-face {
                            font-family: 'Lato';
                            font-style: normal;
                            font-weight: 400;
                            src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                        }

                        @font-face {
                            font-family: 'Lato';
                            font-style: normal;
                            font-weight: 700;
                            src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                        }

                        @font-face {
                            font-family: 'Lato';
                            font-style: italic;
                            font-weight: 400;
                            src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                        }

                        @font-face {
                            font-family: 'Lato';
                            font-style: italic;
                            font-weight: 700;
                            src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                        }
                    }

                    /* CLIENT-SPECIFIC STYLES */
                    body,
                    table,
                    td,
                    a {
                        -webkit-text-size-adjust: 100%;
                        -ms-text-size-adjust: 100%;
                    }

                    table,
                    td {
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                    }

                    img {
                        -ms-interpolation-mode: bicubic;
                    }

                    /* RESET STYLES */
                    img {
                        border: 0;
                        height: auto;
                        line-height: 100%;
                        outline: none;
                        text-decoration: none;
                    }

                    table {
                        border-collapse: collapse !important;
                    }

                    body {
                        height: 100% !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        width: 100% !important;
                    }

                    /* iOS BLUE LINKS */
                    a[x-apple-data-detectors] {
                        color: #357fff !important;
                        text-decoration: none !important;
                        font-size: inherit !important;
                        font-family: inherit !important;
                        font-weight: inherit !important;
                        line-height: inherit !important;
                    }

                    /* MOBILE STYLES */
                    @media screen and (max-width:600px) {
                        h1 {
                            font-size: 32px !important;
                            line-height: 32px !important;
                        }
                    }

                    /* ANDROID CENTER FIX */
                    div[style*="margin: 16px 0;"] {
                        margin: 0 !important;
                    }
                    
                </style>
            </head>

            <body style="background-color: #357fff; margin: 0 !important; padding: 0 !important;">
                <!-- HIDDEN PREHEADER TEXT -->
                <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> 
                </div>
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <!-- LOGO -->
                    <tr>
                        <td bgcolor="#357fff" align="center">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                <tr>
                                    <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#357fff" align="center" style="padding: 0px 10px 0px 10px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                <tr>
                                    <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                        <h1 style="font-size: 48px; font-weight: 400; margin: 2;color: #357fff;">TIERS Limited</h1> <img src="https://wallpaperaccess.com/full/4391662.jpg" width="125" height="120" style="display: block; border: 0px;" />
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                <tr>
                                    <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                        <p style="margin: 0;text-align:justify;">Dear ${personal[0].Fname},</p>
                                        <p style="margin: 0;text-align:justify;">Thank you for reaching out to us. We appreciate your interest in our company. Your Application to join TIERS Limited is under process. You will be notify shortly.</p>
                                    </td>
                                </tr>

                                <tr>
                                    <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                        <p style="margin: 0;"><b>Application Copy (Except Education)</b><br></p>
                                        <p style="margin:0;"><b>Personal Information</b></p>
                                        <p style="margin:0;">Job Title: ${personal[0].jobtitle} </p>
                                        <p style="margin:0;">Name: ${personal[0].Fname} ${personal[0].Lname}</p>
                                        <p style="margin:0;">Email: ${personal[0].email}</p>
                                        <p style="margin:0;">Contact: ${personal[0].contact}</p>
                                        <p style="margin:0;">Address: ${personal[0].address}</p>
                                        <p style="margin:0;"><b>Work Experience</b></p>
                                        <p style="margin:0;">Title: ${experience[0].Title} </p>
                                        <p style="margin:0;">Company: ${experience[0].Company} </p>
                                        <p style="margin:0;">Office Location: ${experience[0].olocation} </p>
                                        <p style="margin:0;">Start date: ${experience[0].ESdate} </p>
                                        <p style="margin:0;">End Date: ${experience[0].Eedate} </p>
                                        <p style="margin:0;"><b>On the Web</b></p>
                                        <p style="margin:0;">Linked In: ${accounts[0].Linkedin} </p>
                                        <p style="margin:0;">Twitter: ${accounts[0].Twitter} </p>
                                        <p style="margin:0;">Facebook: ${accounts[0].Facebook} </p>
                                        <p style="margin:0;">Website: ${accounts[0].Website} </p>
                                        <p style="margin:0;"><b>Message to Hiring Company</b></p>
                                        <p style="margin:0;"> ${message} </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
            </body>
            </html>
            `
        };

        transporter.sendMail(mailOptions1, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          }); 
        
    }
    catch(err){
        console.log('upload file error ',err)
    }
}

function quote(data){
    db.collection('quotes').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        else{
            console.log('Record Insered');
            var mailOptions = {
                from: `TIERS Limited <info@tierslimited.com>`,
                to: data.email,
                subject: data.Firstname +' Your request to get a Quote has been Recieved',
                html:`
                <!DOCTYPE html>
                <html>

                <head>
                    <title></title>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <link rel="apple-touch-icon" href="/images/apple-touch-icon.png">
                    <!-- Font Awesome -->
                    <link
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
                    rel="stylesheet"
                    />
                    <!-- Google Fonts -->
                    <link
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    rel="stylesheet"
                    />
                    <!-- MDB -->
                    <link
                    href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.1.0/mdb.min.css"
                    rel="stylesheet"
                    />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <style type="text/css">
                        @media screen {
                            @font-face {
                                font-family: 'Lato';
                                font-style: normal;
                                font-weight: 400;
                                src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                            }

                            @font-face {
                                font-family: 'Lato';
                                font-style: normal;
                                font-weight: 700;
                                src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                            }

                            @font-face {
                                font-family: 'Lato';
                                font-style: italic;
                                font-weight: 400;
                                src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                            }

                            @font-face {
                                font-family: 'Lato';
                                font-style: italic;
                                font-weight: 700;
                                src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                            }
                        }

                        /* CLIENT-SPECIFIC STYLES */
                        body,
                        table,
                        td,
                        a {
                            -webkit-text-size-adjust: 100%;
                            -ms-text-size-adjust: 100%;
                        }

                        table,
                        td {
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                        }

                        img {
                            -ms-interpolation-mode: bicubic;
                        }

                        /* RESET STYLES */
                        img {
                            border: 0;
                            height: auto;
                            line-height: 100%;
                            outline: none;
                            text-decoration: none;
                        }

                        table {
                            border-collapse: collapse !important;
                        }

                        body {
                            height: 100% !important;
                            margin: 0 !important;
                            padding: 0 !important;
                            width: 100% !important;
                        }

                        /* iOS BLUE LINKS */
                        a[x-apple-data-detectors] {
                            color: #357fff !important;
                            text-decoration: none !important;
                            font-size: inherit !important;
                            font-family: inherit !important;
                            font-weight: inherit !important;
                            line-height: inherit !important;
                        }

                        /* MOBILE STYLES */
                        @media screen and (max-width:600px) {
                            h1 {
                                font-size: 32px !important;
                                line-height: 32px !important;
                            }
                        }

                        /* ANDROID CENTER FIX */
                        div[style*="margin: 16px 0;"] {
                            margin: 0 !important;
                        }
                        
                    </style>
                </head>

                <body style="background-color: #357fff; margin: 0 !important; padding: 0 !important;">
                    <!-- HIDDEN PREHEADER TEXT -->
                    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> 
                    </div>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <!-- LOGO -->
                        <tr>
                            <td bgcolor="#357fff" align="center">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                    <tr>
                                        <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#357fff" align="center" style="padding: 0px 10px 0px 10px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                    <tr>
                                        <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                            <h1 style="font-size: 48px; font-weight: 400; margin: 2;color: #357fff;">TIERS Limited</h1> <img src="https://wallpaperaccess.com/full/4391662.jpg" width="125" height="120" style="display: block; border: 0px;" />
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                    <tr>
                                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                            <p style="margin: 0;text-align:justify;">Dear ${data.Firstname} ${data.Lastname},</p>
                                            <p style="margin: 0;text-align:justify;">Thank you for reaching out to us. We appreciate your interest in our company. Your Application to get a Qoute is under process. You will be notify shortly.</p>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                            <p style="margin: 0;"><b>Your Application Copy</b><br></p>
                                            <p style="margin:0;">Name: ${data.Firstname} ${data.Lastname}</p>
                                            <p style="margin:0;">Email: ${data.email}</p>
                                            <p style="margin:0;">Contact: ${data.contact}</p>
                                            <p style="margin:0;">Service Required: ${data.service}</p>
                                            <p style="margin:0;">Company Name: ${data.companyName}</p>
                                            <p style="margin:0;">Budget: ${data.bugdet}</p>
                                            <p style="margin:0;">Details: ${data.detail}</p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                </body>
                </html>
                `
            };
            
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
                });   
            
            var mailOptions1 = {
                from: `TIERS Quote Request <${data.email}>`,
                to: 'info@tierslimited.com',
                subject: data.Firstname +' send you a request to get a Quote',
                text: 'Name: '+data.Firstname+' '+data.Lastname + '\n'+ 'Email: '+data.email+'\n'+'PhoneNumber: '+data.contact+'\n'+'Company Name: '+data.companyName+'\nService Required: '+data.service+'\nBudget: '+data.bugdet+'\nDetails: '+data.detail,
            };

            transporter.sendMail(mailOptions1, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
                }); 
        }
    });
}

function contactdetails(data,email){
    db.collection("contacts").insertOne(data, (err, collection) => {
        if (err) {
          throw err;
        }
        else{
            var mailOptions = {
                from: `TIERS Limited <info@tierslimited.com>`,
                to: email,
                subject: 'Thanks for Contacting Us!',
                html:`
                <!DOCTYPE html>
                <html>

                <head>
                    <title></title>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <link rel="apple-touch-icon" href="/images/apple-touch-icon.png">
                    <!-- Font Awesome -->
                    <link
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
                    rel="stylesheet"
                    />
                    <!-- Google Fonts -->
                    <link
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    rel="stylesheet"
                    />
                    <!-- MDB -->
                    <link
                    href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.1.0/mdb.min.css"
                    rel="stylesheet"
                    />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <style type="text/css">
                        @media screen {
                            @font-face {
                                font-family: 'Lato';
                                font-style: normal;
                                font-weight: 400;
                                src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                            }

                            @font-face {
                                font-family: 'Lato';
                                font-style: normal;
                                font-weight: 700;
                                src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                            }

                            @font-face {
                                font-family: 'Lato';
                                font-style: italic;
                                font-weight: 400;
                                src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                            }

                            @font-face {
                                font-family: 'Lato';
                                font-style: italic;
                                font-weight: 700;
                                src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                            }
                        }

                        /* CLIENT-SPECIFIC STYLES */
                        body,
                        table,
                        td,
                        a {
                            -webkit-text-size-adjust: 100%;
                            -ms-text-size-adjust: 100%;
                        }

                        table,
                        td {
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                        }

                        img {
                            -ms-interpolation-mode: bicubic;
                        }

                        /* RESET STYLES */
                        img {
                            border: 0;
                            height: auto;
                            line-height: 100%;
                            outline: none;
                            text-decoration: none;
                        }

                        table {
                            border-collapse: collapse !important;
                        }

                        body {
                            height: 100% !important;
                            margin: 0 !important;
                            padding: 0 !important;
                            width: 100% !important;
                        }

                        /* iOS BLUE LINKS */
                        a[x-apple-data-detectors] {
                            color: #357fff !important;
                            text-decoration: none !important;
                            font-size: inherit !important;
                            font-family: inherit !important;
                            font-weight: inherit !important;
                            line-height: inherit !important;
                        }

                        /* MOBILE STYLES */
                        @media screen and (max-width:600px) {
                            h1 {
                                font-size: 32px !important;
                                line-height: 32px !important;
                            }
                        }

                        /* ANDROID CENTER FIX */
                        div[style*="margin: 16px 0;"] {
                            margin: 0 !important;
                        }
                        
                    </style>
                </head>

                <body style="background-color: #357fff; margin: 0 !important; padding: 0 !important;">
                    <!-- HIDDEN PREHEADER TEXT -->
                    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> 
                    </div>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <!-- LOGO -->
                        <tr>
                            <td bgcolor="#357fff" align="center">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                    <tr>
                                        <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#357fff" align="center" style="padding: 0px 10px 0px 10px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                    <tr>
                                        <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                            <h1 style="font-size: 48px; font-weight: 400; margin: 2;color: #357fff;">TIERS Limited</h1> <img src="https://wallpaperaccess.com/full/4391662.jpg" width="125" height="120" style="display: block; border: 0px;" />
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                    <tr>
                                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                            <p style="margin: 0;text-align:justify;">Dear ${data.firstname},</p>
                                            <p style="margin: 0;text-align:justify;">Thank you for reaching out to us. We appreciate your interest in our company. Your inquiry is important to us and we're glad you contacted us. Thank you for your time and consideration. We will shortly reply to your message. Have a nice Day!</p>
                                            <p style="margin: 0;text-align:justify;">Regards,</p>
                                            <p style="margin: 0;text-align:justify;"><b>TIERS Limited</b></p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                </body>
                </html>
                `
            };
            
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
                });  

            var mailOptions1 = {
                from: `TIERS Contact<${data.emails}>`,
                to: 'info@tierslimited.com',
                subject: 'Thanks for Contacting us',
                text: 'Name: '+data.firstname+' '+data.lastname + '\n'+ 'Email: '+data.emails+'\n'+'PhoneNumber: '+data.phonenumber+'\n'+'Message: '+data.comments,
            };
            
            transporter.sendMail(mailOptions1, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
              console.log("Record Insered");
        }
      });
}


module.exports={storage,uploadFile,uploadApply,contactdetails,quote}