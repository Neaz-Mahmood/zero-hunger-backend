const { object, string, ref } = require('yup');

const isEmailLengthValid = email => {
    if (!email) return false;
    const part = email.split('@');
    const emailParts = part[0];
    return emailParts.length <= 64;
}

const customerRegisterSchema = object().shape({
    name: string()
        .min(3, 'Customer name must be at least 3 characters.')
        .max(50, 'Customer name must be at most 50 character long.')
        .required('Customer name is required.'),
    email: string()
        .email('This field should be a valid email address.')
        .max(100, 'Email must be at most 100 characters long.')
        .required('Email is required.')
        .test('is-valid-email-length', 'The part before @ of the email can be maximum 64 characters.',
            email => isEmailLengthValid(email)),
    password: string()
        .min(8, 'The password must be at least 8 characters long.')
        .max(50, 'The password must be at most 50 characters long.')
        .required('Password is required.'),
    confirm_password: string()
        .required('Confirm Password is required')
        .oneOf([ref('password'), null], 'Password and Confirm Password must be matched'),
    phone_number: string()
        .required('Phone number is required'),
    address: string()
        .required('Customer address is required'),
    pin_code: string()
        .required('Customer location pin code is required')
});

const customerUpdateSchema = object().shape({
    name: string()
        .min(3, 'Customername must be at least 3 characters.')
        .max(50, 'Customername must be at most 50 characters long.'),
    email: string()
        .email('This field should be a valid email address.')
        .max(100, 'Email must be at most 100 characters long.')
        .test('is-valid-email-length', 'The part before @ of the email can be maximum 64 characters.',
            email => isEmailLengthValid(email))
});

module.exports.customerRegisterSchema = customerRegisterSchema;
module.exports.customerUpdateSchema = customerUpdateSchema;