import classes from "./Inventory.module.css";
import { useState, useEffect } from "react"
import firebase from "../firebase";
import Arena from "../components/Arena";

import { useSelector } from "react-redux";
import { useRef } from "react";

const Inventory = (props) => {

  const [isSelecting, setIsSelecting] = useState(false)
  const [monsterList, setMonsterList] = useState([])
  const [angelList, setAngelList] = useState([])
  const [isDeletingMonster, setIsDeletingMonster] = useState(false)
  const [isDeletingAngel, setIsDeletingAngel] = useState(false)
  const [monsterToDelete, setMonsterToDelete] = useState(null)
  const [monsterToSendToArena, setMonsterToSendToArena] = useState(null)
  const [angelToSendToArena, setAngelToSendToArena] = useState(null)
  const [angelToDelete, setAngelToDelete] = useState(null)
  const [monsterIsSelected, setMonsterIsSelected] = useState(false)
  const [angelIsSelected, setAngelIsSelected] = useState(false)
  const localId = useSelector(state => state.localId)
  const db = firebase.firestore()

  useEffect(() => {

    getAllMonsters()
    getAllAngels()

  }, [])

  const getAllMonsters = () => {
    let monsters = [];
    db.collection('users').doc(localId).collection('hell').get()
      .then(querysnapshot => {
        querysnapshot.forEach(monster => {
          let monster_data = monster.data().monster
          monster_data.remote_id = monster.id
          monsters.push(monster_data);
        })
        setMonsterList(monsters)
      })
  }

  const getAllAngels = () => {
    let angels = [];
    db.collection('users').doc(localId).collection('heaven').get()
      .then(querysnapshot => {
        querysnapshot.forEach(angel => {
          let angel_data = angel.data().angel
          angel_data.remote_id = angel.id
          angels.push(angel_data);
        })
        setAngelList(angels)
      })
  }

  const deleteMonster = (id) => {

    db.collection('users').doc(localId).collection('hell').doc(id).delete()
    setMonsterList(monsterList.filter(monster => monster.remote_id !== id))
  }

  const deleteAngel = (id) => {

    db.collection('users').doc(localId).collection('heaven').doc(id).delete()
    setAngelList(angelList.filter(angel => angel.remote_id !== id))
  }


  return <>
    <h2 className={classes.inventoryTitle}>
      Monsters and Angels Inventory
    </h2>
    <div className={classes.monstersAndAngelsWrapper}>
      <div className={classes.monstersWrapper}>
        {monsterList.length === 0 && <h3 className={classes.emptyListMsg}>No monster created yet.</h3>}
        <table>
          <tr>
            <th>Name</th><th>Age</th><th>Attack</th>
            <th>Deffense</th><th>Speed</th>
            <th>Superpower</th><th>Action</th>
          </tr>
          {monsterList.map(monster => {
            return <tr key={monster.remote_id}>
              <td>{monster.name}</td>
              <td>{monster.age}</td>
              <td>{monster.attack}</td>
              <td>{monster.defense}</td>
              <td>{monster.speed}</td>
              <td>{monster.superpower}</td>
              <td className={classes.listActions}>
                <button className={classes.deleteBtn} onClick={() => {
                  setIsDeletingMonster(true)
                  setMonsterToDelete(monster.remote_id)
                }
                }>delete</button>
                <button className={classes.sendToArenaBtn} onClick={() => {
                  setMonsterIsSelected(true)
                  setMonsterToSendToArena(monster)
                  setIsSelecting(true)
                }}>Send to Arena</button>
              </td>
            </tr>
          })}
        </table>
        {isDeletingMonster && <div className={classes.deleteMonsterModal}>
          <h3>Are you sure you want to delete this monster?</h3>
          <div className={classes.monsterModalBtns}>
            <button className={classes.cancelDialog} onClick={() => setIsDeletingMonster(false)}>Cancel</button>
            <button onClick={() => {
              deleteMonster(monsterToDelete)
              setMonsterToDelete(null)
              setIsDeletingMonster(false)
            }
            }>Yes</button></div>
        </div>}
      </div>
      <div className={classes.angelsWrapper}>
        {angelList.length === 0 && <h3 className={classes.emptyListMsg}>No angel created yet.</h3>}
        <table>
          <tr>
            <th>Name</th><th>Age</th><th>Attack</th>
            <th>Deffense</th><th>Speed</th>
            <th>Superpower</th><th>Action</th>
          </tr>
          {angelList.map(angel => {
            return <tr key={angel.remote_id}>
              <td>{angel.name}</td>
              <td>{angel.age}</td>
              <td>{angel.attack}</td>
              <td>{angel.defense}</td>
              <td>{angel.speed}</td>
              <td>{angel.superpower}</td>
              <td className={classes.listActions}><button className={classes.deleteBtn} onClick={() => {
                setIsDeletingAngel(true)
                setAngelToDelete(angel.remote_id)
              }}>delete</button>
                <button className={classes.sendToArenaBtn} onClick={() => {
                  setAngelIsSelected(true)
                  setAngelToSendToArena(angel)
                  setIsSelecting(true)
                }}>Send to Arena</button></td>
            </tr>
          })}
        </table>
        {isDeletingAngel && <div className={classes.deleteMonsterModal}>
          <h3>Are you sure you want to delete this angel?</h3>
          <div className={classes.monsterModalBtns}>
            <button className={classes.cancelDialog} onClick={() => setIsDeletingAngel(false)}>Cancel</button>
            <button onClick={() => {
              deleteAngel(angelToDelete)
              setAngelToDelete(null)
              setIsDeletingAngel(false)
            }
            }>Yes</button></div>
        </div>}
      </div>
    </div>
    {!isSelecting && <h3 className={classes.selectMsg}>Please select one monster and one angel!</h3>}
    {(monsterIsSelected || angelIsSelected) &&
      <Arena
        deleteMonsterFromInventory={deleteMonster}
        deleteAngelFromInventory={deleteAngel}
        fightingAngel={angelToSendToArena}
        fightingMonster={monsterToSendToArena}
      />}
  </>
};

export default Inventory;
