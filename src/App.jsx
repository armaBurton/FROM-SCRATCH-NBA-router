import style from './App.css';
import {
  Switch, 
  Route,
  Redirect
} from 'react-router-dom';

import RobotList from './views/RobotList/RobotList';
import RobotDetail from './views/RobotDetail/RobotDetail';

export default function App() {

  return (
    <>
      <header>
        <img src='../notARobot.gif' alt="not a robot gif" />
      </header>

      <Switch>
        <Route path='/robots/:id'>
          <RobotDetail />
        </Route>
        <Route path='/robots'>
          <RobotList />
        </Route>
        <Route path='/'>
          <Redirect to='/robots' />
        </Route>
      </Switch>
    </>
  )

}
