import config from "../server/config.js";
import transporter from "../server/transporter .js";
import { errorLogger } from "./logger/logger.js";

const sendMail = async (mailTo, subject, content) => {
    try {
        const response = await transporter.sendMail({
            from: config.GMAIL_ID,
            to: mailTo,
            subject: subject,
            text: content
        })

        return response;
    } catch (error) {
        console.log(error);
        errorLogger.error('Mail sender error', error);
        throw error;
    }
}

export default sendMail;