//mailer.js
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var xoauth2gen;

xoauth2gen = xoauth2.createXOAuth2Generator({
    user: '{username}',
    clientId: '{Client ID}',
    clientSecret: '{Client Secret}',
    refreshToken: '{refresh-token}'
});

// HTTP AccessToken 얻기
xoauth2gen.getToken(function(err, token, accessToken){
    if(err){
        return console.log(err);
    } else {
        xoauth2gen.accessToken = accessToken;
    }
});

var mailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        xoauth2: xoauth2gen
    }
});

var mailOptions = {
    from: '"Fred Foo 👥" <foo@blurdybloop.com>', // sender address
    to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world 🐴', // plaintext body
    html: '<b>Hello world 🐴</b>' // html body
};

// send mail with defined transport object
mailer.sendMail(mailOptions, function(error, info){
    if(error){ console.log(error); }
    else { console.log(info); }
});