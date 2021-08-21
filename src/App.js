
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Profile from './pages/Profile'
import Signup from './pages/Signup.js'
import Signin from './pages/Signin'
import Navigation from './components/Navigation'
import { useSelector } from 'react-redux'
import MonstersAndAngels from "./pages/Inventory"
import MonstersDetails from './pages/MonstersDetails'
import Support from './pages/Support'

import PageNotFound from './pages/PageNotFound'
import { useState } from 'react';
const App = () => {

  const token = useSelector(state => state.token)
  const [monsterList, setMonsterLinst] = useState([])
  const [name, setName] = useState()



  const getMonsterList = (list) => {
    setMonsterLinst(list)
  }

  const nameHandler = (n) => {

    setName(n)
  }


  console.log({ name });

  return (
    <>
      <Navigation name={name} />
      <Switch>
    
        <Route path="/" exact>
          {token && <Redirect to="/profile/:localId" />}
        </Route>
       
        <Route path="/" exact>
          {!token && <Homepage />}
        </Route>
        <Route path="/support" >
           <Support />
        </Route>
        <Route path="/home" >
          <Homepage />
        </Route>
        <Route path="/inventory" >
          <MonstersAndAngels onSaveMonstersList={getMonsterList} />
        </Route>
        {/* <Route path="/monster-details/:id" >
          <MonstersDetails monsterList={monsterList}/>
      </Route> */}
        {token &&
          <Route path="/profile/:localId" exact>
            <Profile onSaveName={nameHandler} />
          </Route>
        }
        <Route path="/signup">
          <Signup onSaveName={nameHandler} />
        </Route>
        <Route path="/signin">
          <Signin onSaveName={nameHandler} />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>

      </Switch>

    </>


  );
}

export default App;
