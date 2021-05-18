const express = require("express");
const app = express();
const ejs = require('ejs');
const port = 5000;
const staticDir = __dirname + "\\static\\"; 
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');


app.use(express.static(staticDir));
app.use(express.urlencoded());
app.use(express.json());


app.set('views', './views')
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('./index',{name:"samira"});
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('contact');
});

app.post('/send', (req,res)=>{

  const output=  `
  <p>you have a new contact request </p>
  <h3> Contact Details</h3>
<ul>
  <li>Name:${req.body.name}</li>
  <li>Email:${req.body.email}</li>
  <li>Phone:${req.body.phone}</li>
  <li>Name:${req.body.name}</li>
</ul>
<h3>Message</h3>
<p>${req.body.message}</p>
`;
  

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'mail.traversymedia.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'samira@traversymedia.com', // generated ethereal user
        pass: 'Abdi12345'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Nodemailer Contact" <samira@traversymedia.com>', // sender address
      to: 'samira.jimale8@gmail.com', // list of receivers
      subject: 'Node Contact Request', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact', {samiira:'Email has been sent'});
  });
  });





app.listen(port, () => console.log(`Example app listening on port ${port}!`));
