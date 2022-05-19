import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RobotList from './views/RobotList/RobotList';
import RobotDetail from './views/RobotDetail/RobotDetail';
import { useRUARobotContext } from './context/RUARobotProvider';

export default function App() {
  const { setLoading, setRobots } = useRUARobotContext();
  const history = useHistory();
  const storage = JSON.parse(localStorage.getItem('robots'));
  const gender = JSON.parse(localStorage.getItem('gender'));

  console.log(`|| gender >`, gender);

  useEffect(() => {
    async function getRobots() {
      setLoading(true);

      if (!storage) {
        const robots = await fetch(
          'https://randomuser.me/api/?results=10&noinfo'
        );
        const { results } = await robots.json();
        localStorage.setItem('robots', JSON.stringify(results));
        const genderObj = { gender: 'all' };
        localStorage.setItem('gender', JSON.stringify(genderObj));

        setRobots(results);
        setLoading(false);
        history.push(`/robots?gender=${gender}`);
      } else {
        setRobots(storage);
        setLoading(false);
        history.push(`/robots?gender=${gender}`);
      }
    }

    getRobots();
  }, []);

  return (
    <>
      <header>
        <img src="../notARobot.gif" alt="not a robot gif" />
      </header>

      <Switch>
        <Route path="/robots/:id">
          <RobotDetail />
        </Route>
        <Route path="/robots">
          <RobotList />
        </Route>
        <Route path="/">
          <Redirect to="/robots" />
        </Route>
      </Switch>
    </>
  );
}
