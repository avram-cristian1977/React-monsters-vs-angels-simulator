import forrestImg from '../assets/forrest.jpg'
import classes from './Homepage.module.css'
import Footer from '../components/Footer'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'

const Homepage = () => {
    const history = useHistory()
    const localId = useSelector(state => state.localId)
    const isAuth = useSelector(state => state.token)

    return <>
        <div className={classes.container}>
            <div className={classes.poemWrapper}>
                <br /><br />
                <p>A monster, your tongue against my breast,</p>
                <p>And I completely undressed,</p>
                <p>I watched your face transform,</p>
                <p>Like a caterpillar taking its new form.</p>
                <br />
                <p>You, a monster, a demon, and a coward,</p>
                <p>Faced a broken soul who had not yet flowered.</p>
                <p>You took your hands and forced my flower to bloom,</p>
                <p>Though it did not unfold with pleasure, but with fear of ending in a tomb.</p>
                <br />
                <p>And like a painter facing an empty canvas,</p>
                <p>You traced me from head to toe as I lay nearly dead on the mattress.</p>
                <p>You carved your name onto my body and robbed me of my innocence.</p>
                <p>A monster, you obliterated my purity, leaving bruises as evidence.</p>
                <br />
                <br />
                <p>A monster, you watered my flowers with the filthiest juice,</p>
                <p>Not with God’s purest waters, but your own waters of abuse.</p>
                <p>I weeped and screamed and in that moment begged for a God to exist,</p>
                <p>I even prayed, but found no angels to untie my wrists.</p>
                <br />
                <p>If you really loved me, then you would look past your lust,</p>
                <p>But you never did and chose to break me with each and every </p>
                <p>Rocking back and forth I was controlled by you, a monstrous puppeteer,</p>
                <p>Your danced down my legs as I watched you cold and with fear.</p>
                <br /><br /><br /><br />
                <Footer />
            </div>
        </div>
        <header className={classes.pHeader}>
            <div title="Please, login!" className={classes.area} onClick={() => {
                if (isAuth) {
                    history.replace(`/profile/${localId}`)
                }
            }}>Enter your nightmare</div>
        </header>
    </>
}

export default Homepage;