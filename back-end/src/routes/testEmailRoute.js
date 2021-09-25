import { sendEmail } from "../util/sendEmail";

export const testEmailRoute = {
    path: '/api/test-email',
    method: 'post',
    handler: async (req, res) => {
        try {
            await sendEmail({
                to: 'nikolaivalvasilev@gmail.com',
                from: 'tigara2000@abv.bg',
                subject: 'Does this work?',
                text: 'If you are reading this... yes!'
            });
            res.sendStatus(200);
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }
}