import classes from './Profile.module.css'
import MonsterForm from '../components/MonsterForm'
import AngelForm from '../components/AngelForm'
import { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { useSelector } from 'react-redux'
import Arena from '../components/Arena'


const Profile = (props) => {

    const db = firebase.firestore()
    const localId = useSelector(state => state.localId)

    const [namemare, setNamemare] = useState("")
    const [fightingMonster, setFightingMonster] = useState("")
    const [fightingAngel, setFightingAngel] = useState("")

    useEffect(() => {
        getNameHandler()
     }, [])
     
const getMonsterHandler = (monster) =>{
    setFightingMonster(monster)
}

const getAngelHandler = (angel) => {
    setFightingAngel(angel)
}


    const getNameHandler = () => {
        db.collection('users').doc(localId).get().then((doc) => {
          
            setNamemare(doc.data().namemare)
        })
    }
    props.onSaveName(namemare)

    return <>
        <h2 className={classes.red}>Hellcome,  {namemare} !</h2>
        <div className={classes.angelsAndMonstersForms}>
            <MonsterForm onPrepareMonster={getMonsterHandler}/>
            <AngelForm onPrepareAngel={getAngelHandler} />
        </div>
        {/* <Arena fightingMonster={fightingMonster} fightingAngel={fightingAngel} /> */}
    </>
}

export default Profile;