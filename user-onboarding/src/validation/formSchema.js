import * as yup from 'yup'


export default yup.object().shape({
    username: yup
    .string()
    .required('Username is required')
    .min (2, 'Your name must be more than 1 charecter'),

    email: yup
    .string()
    .email('Must be a valid email address')
    .required('Email address is required'),

    password: yup
    .string()
    .required('A password is required ')
    .min(4, 'Must be atleast 4 characters'),

    terms: yup
    .boolean()
    .oneOf([true], 'You must agree to the Terms and Conditions')

})