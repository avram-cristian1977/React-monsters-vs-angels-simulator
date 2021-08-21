import { useState } from "react";
import classes from "./Arena.module.css"
import devilangel from '../assets/devilAngel.png'
import { useHistory } from "react-router";


const Arena = ({ fightingMonster, fightingAngel, deleteMonsterFromInventory, deleteAngelFromInventory }) => {


    const [isFightStarted, setIsFightStarted] = useState(false)
    const [winner, setWinner] = useState(null)
    const [looser, setLooser] = useState(null)
    const [battleEvolution, setBattleEvolution] = useState([])
    const [newFight, setNewFight] = useState(false)
    const [isReseting, setIsReseting] = useState(false)
    const [startMsg, setStartMsg] = useState("")

    const history = useHistory()

    const monsterVSangel = (fightingMonster, fightingAngel) => {
        if (!fightingMonster || !fightingAngel) {
            setStartMsg("You need to choose two opponents for a fight!")
            return
        }
        console.log({ fightingMonster });
        const battleDestinyNumber = (Math.random() * 10).toFixed(2)
        setIsReseting(false)
        setNewFight(true)
        let round = 1
        let battleEvo = []

        while (fightingMonster.defense > 0 && fightingAngel.defense > 0) {
            let angelSpeedBonus = 0
            let monsterSpeedBonus = 0
            let angelluck = 0
            let monsterluck = 0
            let angelDefenseBonus = 0
            let monsterDefenseBonus = 0
            let angelAttackBonus = 0
            let monsterAttackBonus = 0
            const monsterNumber = (Math.random() * 10).toFixed(2)
            const angelNumber = (Math.random() * 10).toFixed(2)
            if (Math.abs(battleDestinyNumber - monsterNumber > battleDestinyNumber - angelNumber)) {
                angelluck = Math.abs(battleDestinyNumber - angelNumber)
            } else {
                monsterluck = Math.abs(battleDestinyNumber - monsterNumber)
            }
            if (fightingMonster.superpower === "lightning") {
                fightingMonster.defense = parseInt(fightingMonster.defense) + 3
            }
            if (fightingAngel.superpower === "lightning") {
                fightingAngel.defense = parseInt(fightingAngel.defense) + 2
            }

            if (fightingMonster.superpower === "flight") {
                fightingMonster.speed = parseInt(fightingMonster.speed) + 0.3
            }
            if (fightingAngel.superpower === "flight") {
                fightingAngel.speed = parseInt(fightingAngel.speed) + 0.2
            }
            //////////////////////////////
            if (fightingMonster.superpower === "invisibility") {
                fightingMonster.attack = parseInt(fightingMonster.attack * 1.2)
                fightingMonster.defense = parseInt(fightingMonster.defense * 1.15)
            }
            if (fightingAngel.superpower === "invisibility") {
                fightingAngel.attack = parseInt(fightingAngel.attack * 1.3)
                fightingAngel.defense = parseInt(fightingAngel.defense * 1.18)
            }

            battleEvo.push({
                round: round,
                monsterDefense: fightingMonster.defense,
                angelDefense: fightingAngel.defense
            })
            setBattleEvolution(battleEvo)
            fightingMonster.defense -= (fightingAngel.attack * fightingAngel.speed + angelluck).toFixed()
            fightingMonster.defense += monsterDefenseBonus
            if (fightingMonster.defense <= 0) {
                fightingMonster.defense = 0
                setWinner(fightingAngel.name)
                setLooser(fightingMonster)
                deleteMonsterFromInventory(fightingMonster.remote_id)
                return
            }
            fightingAngel.defense -= (fightingMonster.attack * fightingMonster.speed + monsterluck).toFixed()
            fightingAngel.defense += angelDefenseBonus
            if (fightingAngel.defense <= 0) {
                fightingAngel.defense = 0
                setWinner(fightingMonster.name)
                setLooser(fightingAngel)
                deleteAngelFromInventory(fightingAngel.remote_id)
                return
            }
            round++
        }

        setIsFightStarted(true)
    }
    const resetFight = () => {
        setBattleEvolution([])
        setIsReseting(true)
        history.replace('/')

    }

    const battleNews = () => {
        return battleEvolution.map(battle =>
            <div key={battle.round}>
                <span>Round</span>
                <span className={classes.arenaDynamicData}>{battle.round}:</span>
                <span>monster defense is</span>
                <span className={classes.arenaDynamicData} >{battle.monsterDefense}</span>
                <span>and angel defense is</span>
                <span className={classes.arenaDynamicData}>{battle.angelDefense}</span>
            </div>)
    }
    console.log("looser", { looser });

    return <div className={classes.arenaWrapper}>
        <div className={classes.arena}>
            <h3 className={classes.arenaTitle}>Arena</h3>
            <div className={classes.fightersWrapper}>
                <div className={classes.monsterWrapper}>
                    {fightingMonster && <div>
                        <div>Name : {fightingMonster.name}</div>
                        <div>Age : {fightingMonster.age}</div>
                        <div>Attack : {fightingMonster.attack}</div>
                        <div>Defense : {fightingMonster.defense}</div>
                        <div>Speed : {fightingMonster.speed}</div>
                        <div>Superpower : {fightingMonster.superpower}</div>
                    </div>}

                    {!fightingMonster && <div>
                        <div>Name : </div>
                        <div>Age : </div>
                        <div>Attack : </div>
                        <div>Defense : </div>
                        <div>Speed : </div>
                        <div>Superpower : </div>
                    </div>}

                </div>

                <div className={classes.imgWrapper}>
                    <img src={devilangel} width="150" height="150" />
                </div>

                <div className={classes.angelWrapper}>
                    {!fightingAngel &&
                        <div>
                            <div>Name : </div>
                            <div>Age : </div>
                            <div>Attack : </div>
                            <div>Defense : </div>
                            <div>Speed : </div>
                            <div>Superpower : </div>
                        </div>}

                    {fightingAngel &&
                        <div>
                            <div>Name : {fightingAngel.name}</div>
                            <div>Age : {fightingAngel.age}</div>
                            <div>Attack : {fightingAngel.attack}</div>
                            <div>Defense : {fightingAngel.defense}</div>
                            <div>Speed : {fightingAngel.speed}</div>
                            <div>Superpower : {fightingAngel.superpower}</div>
                        </div>}

                </div>



            </div>
            {!isFightStarted && <div className={classes.vs}>
                <p>{startMsg}</p>
                <button onClick={() => monsterVSangel(fightingMonster, fightingAngel)}>Fight!</button>
            </div>}
            <div className={classes.battleProgress}>
                {

                    battleNews()
                }
            </div>
            {!isReseting && winner && <>
                <h2 className={classes.winnerMsg}>{winner} wins!</h2>
                <h2 className={classes.looserMsg}>{looser.name} left the game for eternity!</h2>
            </>}

            {!isReseting && newFight && <button type="submit" onClick={() => resetFight()} className={classes.newFightMsg}>
                click here for a new fight!</button>}
        </div>
    </div>
}

export default Arena;