import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

export const notifyUser = (to: string, subject: string, text: string) => {
  return transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, text })
}
