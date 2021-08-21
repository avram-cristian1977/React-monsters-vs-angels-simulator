import classes from './Signup.module.css'

import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {useState } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'



const Signin = () => {

    const [enteredEmail, setEnteredEmail] = useState("")
    const [enteredPassword, setEnteredPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

   

const history = useHistory()


const loginHandler = (ev) => {
    ev.preventDefault()

    if (!enteredEmail ||
        !enteredPassword){
        setErrorMessage("All fields are required.")
        return
    }

    if (!enteredEmail.includes("@")) {
        setErrorMessage("Invalid e-mail address format.")
        return
    }
    const key = "AIzaSyCvAzMeYyYO2IpyiuotujuARpl0QvxriWI"
    setIsLoading(true)
    fetch( `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`, 
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
                
                let errorMessage = "Authentiction failed"
                throw new Error(errorMessage)
            })
        }
    }).then(data => {
        setIsLoading(false)
        const myToken = data.idToken
        const myLocalId = data.localId
      
        dispatch({type:"login", payload:myToken, localId: myLocalId})
        
        history.replace(`/profile/${myLocalId}`)
       
        }).catch(err => {
            alert(err.message)
        }
        )}


    return <>
    <div className={classes.signUpbg}>
    <div className={classes.formWrapper}>
    <div className={classes.spinnerWrapper}>
               {isLoading &&  <LoadingSpinner/>}

                </div>
        <h2 className={classes.welcomeTxtsignUp}>Who the Hell are you?!</h2>
                <form onSubmit={loginHandler}>
                    <div className={classes.credentials}>
                        <label>Email</label>
                        <input type="email" onChange={(ev)=>setEnteredEmail(ev.target.value)} />
                    </div>
                    <div className={classes.credentials}>
                        <label>Password</label>
                        <input type="password" onChange={(ev)=>setEnteredPassword(ev.target.value)}/>
                    </div>
                    <button className={classes.signUpBtn}>Login</button>
                    <div className={classes.errorWrapper}>
                    {errorMessage ? <p className={classes.errorMessage}>{errorMessage}</p> : ""}
                    </div>
                </form>
    </div>
    </div>
    
    </>
}
 
export default Signin;