import nodemailer from "nodemailer";

// Function to send email
const sendMail = async ({ email, subject, message, isHtml = false }) => {
  // Create transporter object using Gmail service
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use lowercase "gmail"
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Define email options
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject,
    [isHtml ? "html" : "text"]: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    // console.log("Email sent successfully");
  } catch (error) {
    // console.error("Error sending email:", error);
    throw new Error("Could not send email");
  }
};

export default sendMail;
