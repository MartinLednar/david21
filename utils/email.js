const nodemailer = require('nodemailer');
const ejs = require('ejs');

//1 Create transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user: process.env.CLIENT_EMAIL_PROD || process.env.CLIENT_EMAIL,
    clientId: process.env.CLIENT_ID_PROD || process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET_PROD || process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN_PROD || process.env.REFRESH_TOKEN,
    accessToken: process.env.ACCESS_TOKEN_PROD || process.env.ACCESS_TOKEN,
    expires: 1484314697598,
  },
});

///////

exports.sendEmailInShop = async options => {
  try {
    const data = await ejs.renderFile(
      process.cwd() + '/views/mailOrderFinished.ejs',
      {
        code: options.code,
      }
    );
    //2 Define the email options
    const mailOptions = {
      from: process.env.CLIENT_EMAIL || process.env.CLIENT_EMAIL_PROD,
      to: options.to,
      subject: 'David21 | Offical - Song order update',
      html: data,
    };

    //3 Send email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

exports.sendEmailOrder = async options => {
  try {
    const data = await ejs.renderFile(process.cwd() + '/views/mailOrder.ejs', {
      message: options.message,
      client: options.from,
    });

    //2 Define the email options
    const mailOptions = {
      from: process.env.CLIENT_EMAIL || process.env.CLIENT_EMAIL_PROD,
      to: process.env.CLIENT_EMAIL || process.env.CLIENT_EMAIL_PROD,
      subject: 'David21 | Offical - New song order',
      html: data,
      attachments: options.attachments,
    };

    //3 Send email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

exports.sendEmailSuccess = async options => {
  try {
    const data = await ejs.renderFile(process.cwd() + '/views/mailSuccess.ejs');

    //2 Define the email options
    const mailOptions = {
      from: process.env.CLIENT_EMAIL || process.env.CLIENT_EMAIL_PROD,
      to: options.to,
      subject: 'David21 | Offical - Purchase successful',
      html: data,
      attachments: options.attachments,
    };

    //3 Send email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

exports.sendEmailSuccessAuthor = async options => {
  try {
    const data = await ejs.renderFile(
      process.cwd() + '/views/mailBoughtToDavid.ejs',
      { client: options.client, items: options.items }
    );

    //2 Define the email options
    const mailOptions = {
      from: process.env.CLIENT_EMAIL || process.env.CLIENT_EMAIL_PROD,
      to: process.env.CLIENT_EMAIL || process.env.CLIENT_EMAIL_PROD,
      subject: 'David21 | Offical - New purchase',
      html: data,
    };

    //3 Send email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};
