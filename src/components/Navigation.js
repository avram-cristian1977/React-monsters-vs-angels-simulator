import { NavLink } from 'react-router-dom'
import classes from './Navigation.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'


const Navigation = (props) => {

    const token = useSelector(state => state.token)
    const localId = useSelector(state => state.localId)
    const dispatch = useDispatch()
    const history = useHistory()

    const logoutHandler = () => {
        dispatch({ type: "logout" })
        localStorage.removeItem("name")
        history.replace("/home")
    }
    console.log("props.name", props.name);
    return <>
        <header className={classes.mainNav} >
            <nav >
                <NavLink
                    title="Forrest entrance"
                    activeClassName={classes.selected} to="/home">Homepage</NavLink>
                <NavLink title="Support Team"
                    activeClassName={classes.selected} to="/support">Support</NavLink>
                {token &&
                    <>
                        <NavLink title="Forge opponents and fight" activeClassName={classes.selected}
                            to={`/profile/${localId}`}>Profile your fighters</NavLink>
                        <NavLink title="Your monsters and angels" activeClassName={classes.selected}
                            to="/inventory">Inventory</NavLink>
                    </>
                }

            </nav>
            <div className={classes.actions}>
                {!token && <>

                    <NavLink activeClassName={classes.selected} to="/signup">Sign up</NavLink>
                    <NavLink activeClassName={classes.selected} to="/signin">Sign in</NavLink>
                </>
                }
                {token && <>
                    {props.name && <span className={classes.welcomeTxt}>come, {props.name}</span>}

                    <button title="Leave the forrest?" className={classes.logoutBtn}
                        onClick={logoutHandler}>
                        Logout
                    </button>
                </>}
            </div>
        </header>
    </>
}

export default Navigation;