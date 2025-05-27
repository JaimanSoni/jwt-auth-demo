import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

export const sendResetEmail = async (email: string, token: string) => {
  const resetURL = `${
    process.env.NODE_ENV === "development"
      ? process.env.LOCAL_CLIENT_URL
      : process.env.HOSTED_CLIENT_URL
  }/reset-password/${token}`;
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Password Reset",
    html: `<p>Reset your password here: <a href="${resetURL}">${resetURL}</a></p>`,
  });
};
