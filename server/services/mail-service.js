const nodemailer = require('nodemailer');

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });
    }

    async startOrderMail(destination, customerEmail, orderId) {
        console.log(`Email sent to ${customerEmail}`);
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: customerEmail,
            subject: `Order started`,
            text: '',
            html:
                `
         <!DOCTYPE html>
         <html lang="en">
         <head>
             <meta charset="UTF-8">
             <meta name="viewport" content="width=device-width, initial-scale=1.0">
             <title>Order Started</title>
             <style>
                 body {
                     font-family: Arial, sans-serif;
                     background-color: #f4f4f4;
                     margin: 0;
                     padding: 0;
                 }
                 .container {
                     max-width: 600px;
                     margin: 20px auto;
                     background-color: #fff;
                     padding: 20px;
                     border-radius: 8px;
                     box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                 }
                 h1 {
                     color: #333;
                 }
                 p {
                     color: #666;
                 }
                 a {
                     display: inline-block;
                     margin-top: 20px;
                     padding: 10px 20px;
                     background-color: #007bff;
                     color: #fff;
                     text-decoration: none;
                     border-radius: 5px;
                 }
                 a:visited {
                    color: #fff;
                }
             </style>
         </head>
         <body>
             <div class="container">
                 <h1>Your Order Has Started</h1>
                 <p><strong>Destination:</strong> ${destination}</p>
                 <p><strong>Order ID:</strong> ${orderId}</p>
                 <a href="https://uudelivery.vercel.app/track/${orderId}" style="color: white">Track Your Order</a>
             </div>
         </body>
         </html>
         `
        });
    }

    async endOrderMail(customerEmail, orderId) {
        console.log(`Email sent to ${customerEmail}`);
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: customerEmail,
            subject: `Order ended`,
            text: '',
            html:
                `
              <!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Order Ended</title>
                  <style>
                      body {
                          font-family: Arial, sans-serif;
                          background-color: #f4f4f4;
                          margin: 0;
                          padding: 0;
                      }
                      .container {
                          max-width: 600px;
                          margin: 20px auto;
                          background-color: #fff;
                          padding: 20px;
                          border-radius: 8px;
                          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                      }
                      h1 {
                          color: #333;
                      }
                      p {
                          color: #666;
                      }
                      a {
                          display: inline-block;
                          margin-top: 20px;
                          padding: 10px 20px;
                          background-color: #007bff;
                          color: #fff;
                          text-decoration: none;
                          border-radius: 5px;
                      }
                      a:visited {
                        color: #fff;
                    }
                  </style>
              </head>
              <body>
                  <div class="container">
                      <h1>Your Order Has Ended</h1>
                      <p><strong>Order ID:</strong> ${orderId}</p>
                      <a href="https://uudelivery.vercel.app/track/${orderId}" style="color: white">Track Your Order</a>
                  </div>
              </body>
              </html>
              `
        });
    }

    async damagedOrderMail(customerEmail, orderId) {
        console.log(`Damaged order notification sent to manager: ${process.env.SMTP_MANAGER_EMAIL}`);
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: process.env.SMTP_MANAGER_EMAIL,
            subject: `Damaged Order Notification`,
            text: '',
            html:
                `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Damaged Order</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        color: #333;
                    }
                    p {
                        color: #666;
                    }
                    a {
                        display: inline-block;
                        margin-top: 20px;
                        padding: 10px 20px;
                        background-color: #007bff;
                        color: #fff;
                        text-decoration: none;
                        border-radius: 5px;
                    }
                    a:visited {
                      color: #fff;
                  }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Damaged Order Notification</h1>
                    <p><strong>Order ID:</strong> ${orderId}</p>
                    <p><strong>Customer Email:</strong> <a href="https://mail.google.com/mail/u/3/#inbox?compose=new" style="color: white">${customerEmail}</a></p>
                    <a href="https://uudelivery.vercel.app/track/${orderId}" style="color: white">View Order Details</a>
                </div>
            </body>
            </html>
            `
        });
    }
}

module.exports = new MailService();