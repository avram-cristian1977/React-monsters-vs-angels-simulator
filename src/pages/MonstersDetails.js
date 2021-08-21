import { useState, useEffect } from "react";
import { useParams } from "react-router";
import firebase from "firebase";


const MonstersDetails = (props) => {
    
    const params = useParams()
    
    useEffect(()=>{
        getMonsterDetails()
    },[])

   const [name, setName] =  useState()
   const [age, setAge] =  useState()
   const [superpower, setSuperpower] =  useState()

    

    const getMonsterDetails = () => {
        const dbMonstersRef = firebase.database().ref('/monsters').child(params.id)
        dbMonstersRef.on("value", response => {
            const result = response.val()
            setName(result.name)
            setAge(result.age)
            setSuperpower(result.superpower)
        })
        }

return <>
    <h2>{name}</h2>
    <h2>{age}</h2>
    <h2>{superpower}</h2>
    <h2>{params.id}</h2>
    </>
}
 
export default MonstersDetails;