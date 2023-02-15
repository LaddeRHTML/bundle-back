import { EMAIL_REGEX } from '../regex/email';

const validateEmail = (email: string): boolean => {
    return EMAIL_REGEX.test(email);
};

export default validateEmail;
