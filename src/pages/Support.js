import classes from './Support.module.css'
import LoadingSpinner from '../components/LoadingSpinner'
import { useState } from 'react'
import emailjs from 'emailjs-com'

const Support = () => {

    const [isLoadingData, setIsLoadingData] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [messageSent, setMessageSent] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    const submitEmailHandler = (ev) => {
        setErrorMsg("")
        ev.preventDefault()
        if(!name || !email ||!message){
            setErrorMsg("All fields required.")
            return
        }
        setIsLoadingData(true)
        emailjs.sendForm(
            "service_w4z2933", "template_uvwmb25", ev.target, "user_wqLTfWBPG7HMvi09wZKcs"
        ).then(response => {
            setIsLoadingData(false)
setMessageSent("The message was successfully sent!")
            console.log(response)
        }).catch(err => console.log(err))
        setName("")
        setEmail("")
        setMessage("")
    }

    return <><div className={classes.formWrapper}>
        <form onSubmit={submitEmailHandler} className={classes.contactFormWrapper}>
            <div className={classes.contactNameWrapper}>
                <label>Your name : </label>
                <input type="text" name="name"
                    value={name}
                    onChange={(ev) => setName(ev.target.value)} />
            </div>
            <div className={classes.contactEmailWrapper}>
                <label >Your email : </label>
                <input type="email" name="user_email"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)} />
            </div>
            <textarea name="message" cols="50" rows="5"
                value={message}
                onChange={(ev) => setMessage(ev.target.value)}></textarea>
            <button className={classes.sendMessageBtn}>Send message</button>
            <h5 className={classes.messageSent}> {messageSent}</h5>
            <h5 className={classes.errorMsg} >{errorMsg}</h5>
            {isLoadingData && <div className={classes.spinnerWrapper}><LoadingSpinner /></div>}
        </form>
    </div>
</>
}

export default Support;