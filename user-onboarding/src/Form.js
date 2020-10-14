import React, {} from 'react'
import * as yup from 'yup'
import axios from 'axios'
import './App.css'

//Required Name, Email, Password, Terms

const formSchema = yup.object().shape({
    name: yup
    .string()
    .min(2, "That's not your name... Your name must be more than one chracter!")
    .required("Your nmae is required")

    email: yup
    .string()
    .email("Must be a valid email address")
    .required("Must include an email address")

    password: yup
    .string()
    .min(4, "Password must be at least four charaters!")
    .required("A Password is required!")

    terms: yup
    .boolean()
    .oneOf([true], "You must agree to the Terms and Conditions")
})
