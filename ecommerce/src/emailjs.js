import emailjs from 'emailjs-com';

const EMAILJS_SERVICE_ID = process.env.VUE_APP_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.VUE_APP_EMAILJS_TEMPLATE_ID;
const EMAILJS_USER_ID = process.env.VUE_APP_EMAILJS_USER_ID;

export default function sendEmail(params) {
  return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params, EMAILJS_USER_ID);
}
