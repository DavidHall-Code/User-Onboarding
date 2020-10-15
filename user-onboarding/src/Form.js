import React, {useState, useEffect} from 'react'

import * as yup from 'yup'
import axios from 'axios'
import './App.css'

//Required Name, Email, Password, Terms

const formSchema = yup.object().shape({
    name: yup
    .string()
    .min(2, "That's not your name... Your name must be more than one chracter!")
    .required("Your name is required"),

    email: yup
    .string()
    .email("Must be a valid email address")
    .required("Must include an email address"),

    password: yup
    .string()
    .min(4, "Password must be at least four charaters!")
    .required("A Password is required!"),

    terms: yup
    .boolean()
    .oneOf([true], "You must agree to the Terms and Conditions")
})

const Form = (props) => {
    const [formState, setFormState] = useState ({
        name: "",
        email: "",
        password: "",
        terms: "",
    });

    const [error, setError] = useState ({
        name: "",
        email: "",
        password: "",
        terms: "",
    });

    const [user, setUser] = useState([]);

    //Disable the "SUBMIT" button
    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        formSchema.isValid(formState)
        .then(valid => {
            setButtonDisabled(!valid)
        })
    },[formState])


    //Post to API: https://reqres.in/api/users
    const handleSubmit = event => {
        event.preventDefault();

        axios
            .post("https://reqres.in/api/users", formState)
            .then(res => {
                setUser([...user, res.data]);
                console.log("Complete", user)

                setFormState({
                    name: "",
                    email: "",
                    password: "",
                    terms: "",
                }); 
             })

             .catch(err => console.log(err.responce))
        }

    const validateChange = event => {
        yup
        .reach(formSchema, event.target.name)
        .validate(event.target.value)
        .then(() => {
            setError({
                ...error,
                [event.target.name]: ""
            });
        })

        // .catch(err => {
        //     setError({
        //         ...error,
        //         [event.target.name]: err.error[0]
        //     });
        // });
    };

    const onInputChange = event => {
        event.persist();
        const newFormData = {
            ...formState,
            [event.target.name]:
                event.target.type === "checkbox" ? event.target.checked
                    : event.target.value

        }

        validateChange(event);
        setFormState(newFormData)
    };

    console.log(error)

    return(
        <div className= 'parallax'>
        <div className= 'whole-container'>
        <form className= 'team-form' onSubmit = {handleSubmit}>
            <div className= 'inputs-container'>
            
            <div className= 'head'>
                <h2>User-Onboarding</h2>
                <h3>Welcome to the team, Please enter your information!</h3>
            </div>

        <label>
            <input className= "user-input"
            name = 'name'
            type = 'text'
            value = {formState.name}
            onChange = {onInputChange}
            placeholder = "Enter your name"
            />
        </label>

        <label>
            <input className= "email-input"
            name = 'email'
            type = 'text'
            value = {formState.email}
            onChange = {onInputChange}
            placeholder = "Enter your email"
            />
        </label>

        <label>
            <input className= "pass-input"
            name = 'password'
            type = 'text'
            value = {formState.password}
            onChange = {onInputChange}
            placeholder = "Enter your password"
            />
        </label>

        <label>
            <div className= 'terms'>Terms and Conditions:
                <input
                name = 'terms'
                type = 'checkbox'
                value = {formState.terms}
                onChange = {onInputChange}
                />
            </div>
        </label>

        <button className= 'submit' disabled= {buttonDisabled}>SUBMIT</button>

        </div>
        <div className= 'error'>
            {error.name}
            {error.email}
            {error.password}
        </div>
    </form>
    </div>
    <div className= 'newData'>
        <h2>Please Wait......</h2>
        <h3>I have returned the BackEnd data below:</h3>
        <div className= 'returnedArray'>
            <pre>{JSON.stringify (user, null, 2)}</pre>
        </div>
    </div>

</div>
    )}
    
    
    // ("Password must be at least four charaters!")
    //.required("A Password is required!"), */}



export default Form