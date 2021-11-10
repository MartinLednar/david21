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
    from: 'David21 || Offical <highdavidbeatz@gmail.com>',
    to: options.to,
    subject: 'David21 || Offical - Song order update',
    html: data,
  };

  //3 Send email
  await transporter.sendMail(mailOptions);
};

exports.sendEmailOrder = async options => {
  //1 Create transporter
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
    service: 'gmail',
    auth: {
      user: 'martin.lednar03@gmail.com',
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const data = await ejs.renderFile(process.cwd() + '/views/mailOrder.ejs', {
    message: options.message,
  });

  //2 Define the email options
  // const mailOptions = {
  //   from: options.from,
  //   to: 'highdavidbeatz@gmail.com',
  //   subject: 'David21 || Offical - New song order',
  //   html: data,
  //   attachments: options.attachments,
  // };

  const mailOptions = {
    from: options.from,
    to: 'martin.lednar03@gmail.com',
    subject: 'David21 || Offical - New song order',
    html: data,
    attachments: options.attachments,
  };

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
  console.log(options);
  const mailOptions = {
    from: 'David21 || Offical <highdavidbeatz@gmail.com>',
    to: options.to,
    subject: 'David21 || Offical - Song order update',
    html: data,
    attachments: options.attachments,
  };

  //3 Send email
  await transporter.sendMail(mailOptions);
};
