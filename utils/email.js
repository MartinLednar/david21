const nodemailer = require('nodemailer');
const ejs = require('ejs');

exports.sendEmailInShop = async options => {
  //1 Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const data = await ejs.renderFile(
    process.cwd() + '/views/mailOrderFinished.ejs',
    {
      code: options.code,
    }
  );
  //2 Define the email options
  console.log(options);
  const mailOptions = {
    from: 'David21 | Offical <highdavidbeatz@gmail.com>',
    to: options.to,
    subject: 'Song order update',
    html: data,
  };

  //3 Send email
  await transporter.sendMail(mailOptions);
};

exports.sendEmailOrder = async options => {
  // 1 Create transporter
  // const transporter = nodemailer.createTransport({
  //   host: process.env.EMAIL_HOST,
  //   port: process.env.EMAIL_PORT,
  //   secure: false,
  //   auth: {
  //     user: process.env.EMAIL_USERNAME,
  //     pass: process.env.EMAIL_PASSWORD,
  //   },
  // });

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

  const data = await ejs.renderFile(process.cwd() + '/views/mailOrder.ejs', {
    message: options.message,
  });

  //2 Define the email options
  const mailOptions = {
    from: 'martin.lednar03@gmail.com',
    to: 'martinlednar1122@gmail.com',
    subject: 'New song order',
    html: data,
    attachments: options.attachments,
  };

  // const mailOptions = {
  //   from: options.from,
  //   to: 'David21 | Offical <highdavidbeatz@gmail.com>',
  //   subject: 'New song order',
  //   html: data,
  //   attachments: options.attachments,
  // };

  //3 Send email
  await transporter.sendMail(mailOptions);
};

exports.sendEmailBuy = async options => {
  //1 Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const data = await ejs.renderFile(
    process.cwd() + '/views/mailOrderFinished.ejs',
    {
      code: options.code,
    }
  );

  //2 Define the email options
  const mailOptions = {
    from: 'David21 | Offical <highdavidbeatz@gmail.com>',
    to: options.to,
    subject: 'Song order update',
    html: data,
    attachments: options.attachments,
  };

  //3 Send email
  await transporter.sendMail(mailOptions);
};

exports.sendEmailSuccess = async options => {
  //1 Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const data = await ejs.renderFile(process.cwd() + '/views/mailSuccess.ejs');

  //2 Define the email options
  const mailOptions = {
    from: 'David21 | Offical <highdavidbeatz@gmail.com>',
    to: options.to,
    subject: 'Purchase successful',
    html: data,
    attachments: options.attachments,
  };

  //3 Send email
  await transporter.sendMail(mailOptions);
};
