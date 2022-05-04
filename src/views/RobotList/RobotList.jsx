import { useRUARobotContext } from '../../context/RUARobotProvider';
import style from './RobotList.css';
import RobotCard from '../RobotCard/RobotCard';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import robotFetch from '../../services/robotFetch';


export default function RobotList(){
  const location = useLocation();
  const gender = new URLSearchParams(location.search).get('gender') ?? 'all';
  const history = useHistory();
  
  const {
    loading, setLoading,
    robots, setRobots
  } = useRUARobotContext();

  const handleGenderChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    history.push(`/robots/?gender=${e.target.value}`);
  };

  console.log(history);
  useEffect(() => { 
    async function getRobots(){
      setLoading(true);

      const genderParam = new URLSearchParams(location.search).get('gender');
      // console.log(genderParam);
      const url = genderParam === 'all' || !genderParam
        ? 'https://randomuser.me/api/?results=10&noinfo'
        : `https://randomuser.me/api/?results=10&noinfo&gender=${genderParam}`;

      const robots = await robotFetch(url);

      robots.results.length ? setRobots(robots.results) : history.push('/');
      setLoading(false);
    }

    getRobots();
  }, [location.search])

  return (
      <section className={style.meetMyRobots}>
          <div className={style.listHead}>
            <label htmlFor='gender'>RoboDude or FemBots</label>
            <select id="gender" value={gender} onChange={handleGenderChange}>
              <option value="all">ALL</option>
              <option value="male">Robodude</option>
              <option value="female">Fembot</option>
            </select>
          </div>
        <div className={style.cards}>
          {
            loading 
              ? <h1>Beep Beep Boop...Computing</h1> 
              : robots.map((robot, i) => <RobotCard key={`${robot}${i}`} robot={robot} />)
          }
        </div>
      </section>
  );
}