import { logger } from "../../utils/helpers/logger/logger.js";
import sendMail from "../../utils/helpers/sendMail.js";
import { consumeMessagesFromQueue } from "../../utils/server/messageQueue.js";

consumeMessagesFromQueue(async (message) => {
    const { userId, email } = message;
    console.log('on consumer');

    //** Send notification email
    await sendMail(
        email,
        'Welcome to our platform',
        'Thank you for registering!'
    );

    logger.info(`Notification sent to user ${userId}`);
});
