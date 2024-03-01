import * as yup from 'yup';

const registrationSchema = yup.object().shape({
    first_name: yup.string().min(3, ({ min }) => `Name must be at least ${min} characters`).required("First name is required"),
    last_name: yup.string().min(3, ({ min }) => `Name must be at least ${min} characters`).required("Last name is required"),
    email: yup.string().email("Please enter a valid email address").required("Email address is required"),
    mobile: yup.string().matches(/^[0-9]*$/, 'Enter a valid phone number').length(11, "Mobile number must be 11 digits").required("Mobile number is required"),
    gender: yup.object().required("Gender is required"),
    password: yup.string().min(8, ({ min }) => `Password must be at least ${min} characters`).required("Password is required"),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords do not match').required("Confirm password is required")
});

const loginSchema = yup.object().shape({
    email: yup.string().email("Please enter a valid email address").required("Email address is required"),
    password: yup.string().min(8, ({ min }) => `Password must be at least ${min} characters`).required("Password is required"),
});

const verifyEmailSchema = yup.object().shape({
    email: yup.string().email("Please enter a valid email address").required("Email address is required"),
});

const verifyCodeSchema = yup.object().shape({
    code: yup.string().matches(/^[0-9]*$/, 'Code is digit only').length(6, "Code must be 6 digits").required("Code is required"),
});

const verifyPasswordSchema = yup.object().shape({
    password: yup.string().min(8, ({ min }) => `Password must be at least ${min} characters`).required("Password is required"),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords do not match').required("Confirm password is required")
});

const amountSchema = yup.object().shape({
    amount: yup.string().matches(/^[0-9]*$/, 'Amount is digit only').required("Amount is required"),
});

const addressSchema = yup.object().shape({
    firstname: yup.string().min(3, ({ min }) => `Name must be at least ${min} characters`).required("First name is required"),
    lastname: yup.string().min(3, ({ min }) => `Name must be at least ${min} characters`).required("Last name is required"),
    mobile1: yup.string().matches(/^[0-9]*$/, 'Enter a valid phone number').length(11, "Mobile number must be 11 digits").required("Mobile number is required"),
    address: yup.string().required("Address is required"),
});

export {
    registrationSchema, 
    loginSchema, 
    verifyEmailSchema, 
    verifyCodeSchema, 
    verifyPasswordSchema, 
    amountSchema,
    addressSchema
}