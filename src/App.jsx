import './App.css';
import {
  Switch, 
  Route,
  Redirect
} from 'react-router-dom';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RobotList from './views/RobotList/RobotList';
import RobotDetail from './views/RobotDetail/RobotDetail';
import { useRUARobotContext } from './context/RUARobotProvider';

export default function App() {
  const {
    setLoading,
    setRobots
  } = useRUARobotContext();
  const history = useHistory();

  useEffect(() => { 
    async function getRobots(){
      setLoading(true);

      const robots = await fetch('https://randomuser.me/api/?results=10&noinfo');
      const { results } = await robots.json();

      setRobots(results);
      // console.log(results);
      setLoading(false);
      history.push('/robots');
    }

    getRobots();
  }, [])

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
