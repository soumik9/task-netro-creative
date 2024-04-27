import nodemailer from 'nodemailer'
import config from './config.js'

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: config.GMAIL_ID,
        pass: config.GMAIL_PASS
    }
})

export default transporter 