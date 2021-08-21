import classes from './Signup.module.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createUserDocument } from '../firebase'
import LoadingSpinner from '../components/LoadingSpinner'

const Singnup = () => {

    const [enteredEmail, setEnteredEmail] = useState("")
    const [enteredPassword, setEnteredPassword] = useState("")
    const [enteredConfirmedPassword, setEnteredConfirmedPassword] = useState("")
    const [enteredNamemare, setEnteredNamemare] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const dispatch = useDispatch()
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(false)

    const submitHandler = (ev) => {
        ev.preventDefault()
        if (!enteredEmail ||
            !enteredPassword ||
            !enteredConfirmedPassword ||
            !enteredNamemare) {
            setErrorMessage("All fields are required.")
            return
        }
        if (enteredPassword.trim().length < 6) {
            setErrorMessage("Password must be at least 6 digits long.")
            return
        }
        if (enteredPassword !== enteredConfirmedPassword) {
            setErrorMessage("The passwords don't match.")
            return
        }
        if (!enteredEmail.includes("@")) {
            setErrorMessage("Invalid e-mail address format.")
            return
        }

        const key = "AIzaSyCvAzMeYyYO2IpyiuotujuARpl0QvxriWI"

        const user = {
            namemare: enteredNamemare
        }
        setIsLoading(true)
        fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`,
            {
                method: "POST",
                headers: {
                    "Content-type": "application/JSON"
                },
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true
                })
            }
        ).then(res => {

            if (res.ok) {
                return res.json()
            } else {
                return res.json().then(data => {

                    let errorMessage = "Register failed"
                    throw new Error(errorMessage)
                })
            }
        }).then(data => {
            setIsLoading(false)

            createUserDocument(data, user)
            const myToken = data.idToken
            const myLocalId = data.localId
            dispatch({ type: "login", payload: myToken, localId: myLocalId })
            history.replace(`/profile/${myLocalId}`)
        }).catch(err => {
            setIsLoading(false)
            setErrorMessage(err.message);

        })


    }

    return <>
        <div className={classes.signUpbg}>
            <div className={classes.formWrapper}>
                <div className={classes.spinnerWrapper}>
                    {isLoading && <LoadingSpinner />}
                </div>
                <h2 className={classes.welcomeTxtsignUp}>We want your data...</h2>
                <form onSubmit={submitHandler}>
                    <div className={classes.credentials}>
                        <label>Email</label>
                        <input type="email" onChange={(ev) => setEnteredEmail(ev.target.value)} />
                    </div>
                    <div className={classes.credentials}>
                        <label>Password</label>
                        <input type="password" onChange={(ev) => setEnteredPassword(ev.target.value)} />
                    </div>
                    <div className={classes.credentials}>
                        <label>Confrm password</label>
                        <input type="password" onChange={(ev) => setEnteredConfirmedPassword(ev.target.value)} />
                    </div>
                    <div className={classes.credentials}>
                        <label>Namemare</label>
                        <input type="text" onChange={(ev) => setEnteredNamemare(ev.target.value)} />
                    </div>
                    <button className={classes.signUpBtn}>Sign up</button>
                    <div className={classes.errorWrapper}>
                        {errorMessage ? <p className={classes.errorMessage}>{errorMessage}</p> : ""}
                    </div>
                </form>
            </div>
        </div>
    </>
}

export default Singnup;