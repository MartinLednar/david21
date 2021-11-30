const nodemailer = require('nodemailer');
const ejs = require('ejs');

//1 Create transporter
if (process.env.NODE_ENV) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: 'store.beatsby21@gmail.com',
      clientId: process.env.CLIENT_ID_PROD,
      clientSecret: process.env.CLIENT_SECRET_PROD,
      refreshToken: process.env.REFRESH_TOKEN_PROD,
      accessToken: process.env.ACCESS_TOKEN_PROD,
      expires: 1484314697598,
    },
  });
}

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user: 'martin.lednar03@gmail.com',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken: process.env.ACCESS_TOKEN,
    expires: 1484314697598,
  },
});
///////

exports.sendEmailInShop = async options => {
  const data = await ejs.renderFile(
    process.cwd() + '/views/mailOrderFinished.ejs',
    {
      code: options.code,
    }
  );
  //2 Define the email options
  console.log(options);
  const mailOptions = {
    from: process.env.NODE_ENV
      ? 'store.beatsby21@gmail.com'
      : 'martin.lednar03@gmail.com',
    to: options.to,
    subject: 'David21 | Offical - Song order update',
    html: data,
  };

  //3 Send email
  await transporter.sendMail(mailOptions);
};

exports.sendEmailOrder = async options => {
  const data = await ejs.renderFile(process.cwd() + '/views/mailOrder.ejs', {
    message: options.message,
  });

  //2 Define the email options
  const mailOptions = {
    from: process.env.NODE_ENV
      ? 'store.beatsby21@gmail.com'
      : 'martin.lednar03@gmail.com',
    to: options.to,
    subject: 'David21 | Offical - New song order',
    html: data,
    attachments: options.attachments,
  };

  //3 Send email
  await transporter.sendMail(mailOptions);
};

exports.sendEmailBuy = async options => {
  const data = await ejs.renderFile(
    process.cwd() + '/views/mailOrderFinished.ejs',
    {
      code: options.code,
    }
  );

  //2 Define the email options
  const mailOptions = {
    from: process.env.NODE_ENV
      ? 'store.beatsby21@gmail.com'
      : 'martin.lednar03@gmail.com',

    to: options.to,
    subject: 'David21 | Offical - Song order update',
    html: data,
    attachments: options.attachments,
  };

  //3 Send email
  await transporter.sendMail(mailOptions);
};

exports.sendEmailSuccess = async options => {
  const data = await ejs.renderFile(process.cwd() + '/views/mailSuccess.ejs');

  //2 Define the email options
  const mailOptions = {
    from: process.env.NODE_ENV
      ? 'store.beatsby21@gmail.com'
      : 'martin.lednar03@gmail.com',

    to: options.to,
    subject: 'David21 | Offical - Purchase successful',
    html: data,
    attachments: options.attachments,
  };

  //3 Send email
  await transporter.sendMail(mailOptions);
};
