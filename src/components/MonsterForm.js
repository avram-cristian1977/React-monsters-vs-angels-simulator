import classes from "../pages/Profile.module.css"
import firebase from "../firebase";
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from "react-router";


const db = firebase.firestore()
const firestore = firebase.firestore()
const MonsterForm = (props) => {

    const history = useHistory()

    const [enteredName, setEnteredName] = useState("")
    const [enteredAge, setEnteredAge] = useState(0)
    const [enteredAttack, setEnteredAttack] = useState(0)
    const [enteredDefense, setEnteredDefense] = useState(0)
    const [enteredSuperPower, setEnteredSuperPower] = useState("")
    const [prepredMonster, setPreparedMonster] = useState(null)
    const [enteredSpeed, setEnteredSpeed] = useState(0)
    const [errorValidation, setErrorValidation] = useState("")
    const [succesValidationMsg, setSuccesValidationMsg] = useState("")
    const localId = useSelector(state => state.localId)


    const monsterSubmitHandler = (ev) => {
        ev.preventDefault()
        if (!enteredName || !enteredAge || !enteredAttack || !enteredDefense || !enteredSuperPower) {
            setErrorValidation("All fields are required.")
            return
        }
        if (enteredAttack < 0 || enteredAttack > 10) {
            return
        }
        if (enteredDefense < 0 || enteredDefense > 100) {
            return
        }
        if (enteredSpeed < 0 || enteredSpeed > 4) {
            return
        }

        const monsterRef = db.collection('users').doc(localId).collection('hell').doc()

        const monster = {
            name: enteredName,
            age: enteredAge,
            attack: enteredAttack,
            defense: enteredDefense,
            speed: enteredSpeed,
            superpower: enteredSuperPower,
        }



        monsterRef.set({
            monster
        })

        setPreparedMonster(monster)
        setSuccesValidationMsg("Monster has been created.")
        setEnteredName("")
        setEnteredAge("")
        setEnteredAttack("")
        setEnteredDefense("")
        setEnteredSpeed("")
        setEnteredSuperPower("")
    }


    const goToInventory = (ev) => {
        ev.preventDefault()
        history.replace('/inventory')

    }

    console.log({ enteredName });
    return <div className={classes.monsterFormDiv}>
        <p className={classes.formError}>{errorValidation}</p>
        <h3 className={classes.boxTitle}>Create a monster</h3>
        <form className={classes.monsterForm}>
            <div>

                <label>Name:</label>
                <input value={enteredName} type="text" onChange={(ev) => setEnteredName(ev.target.value)} />
            </div>
            <div>

                <label>Age:</label>
                <input value={enteredAge} type="number" onChange={(ev) => setEnteredAge(ev.target.value)} />
            </div>
            <div>

                <label>Attack:</label>
                <input value={enteredAttack} type="number" onChange={(ev) => setEnteredAttack(ev.target.value)} min="1" max="10" />
            </div>
            <div>

                <label>Defense:</label>
                <input value={enteredDefense} type="number" onChange={(ev) => setEnteredDefense(ev.target.value)} min="1" max="10" />
            </div>
            <div>

                <label>Speed:</label>
                <input value={enteredSpeed} type="number" onChange={(ev) => setEnteredSpeed(ev.target.value)} min="1" max="3" />
            </div>
            <div>

                <label>Superpower:</label>
                <select value={enteredSuperPower} className={classes.select} onChange={(ev) => setEnteredSuperPower(ev.target.value)}>
                    <option value=""></option>
                    <option value="flight">flight</option>
                    <option value="invisibility">invisibility</option>
                    <option value="lightning">lightning</option>

                </select>
            </div>
            <p className={classes.formSuccess}>{succesValidationMsg}</p>
            <div>
                <button onClick={monsterSubmitHandler} className={classes.actionBtnSave} >Save to Hell</button>
                <button onClick={goToInventory} className={classes.actionBtnSend}>Check Inventory</button>
            </div>
        </form>
    </div>
}

export default MonsterForm;