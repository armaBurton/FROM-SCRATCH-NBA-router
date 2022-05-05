import { useRUARobotContext } from '../../context/RUARobotProvider';
import style from './RobotList.css';
import RobotCard from '../RobotCard/RobotCard';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import robotFetch from '../../services/robotFetch';

export default function RobotList(){
  const location = useLocation();
  const searchGender = new URLSearchParams(location.search).get('gender') || 'all';
  console.log(searchGender);
  const history = useHistory();
  
  const {
    loading, setLoading,
    robots, setRobots,
    gender, setGender,
  } = useRUARobotContext();

  const handleGenderChange = (e) => {
    e.preventDefault();
    setGender(e.target.value);
    setRobots([]);
    history.push(`/robots/?gender=${e.target.value}`);
  };

  useEffect(() => {
    async function getRobots() {
      setLoading(true);      

      const url = searchGender === 'all'
        ? 'https://randomuser.me/api/?results=10&noinfo'
        : `https://randomuser.me/api/?results=10&noinfo&gender=${searchGender}`;

      let results = '';

      !robots.length
        ? {results} = await robotFetch(url)
        : results = robots;

      setLoading(false);
      setRobots(results);
    }

    getRobots();
  }, [gender])

  return (
      <section className={style.meetMyRobots}>
          <div className={style.listHead}>
            <label htmlFor='gender'>ManDroid or FemBots</label>
            <select id="gender" value={gender} onChange={handleGenderChange}>
              <option value="all">ALL</option>
              <option value="male">ManDroid</option>
              <option value="female">FemBot</option>
            </select>
          </div>
        <div className={style.cards}>
          {
            loading 
              ? <h1>Beep Beep Boop...Computing</h1> 
            : robots.map((robot, i) => <RobotCard key={`${robot}${i}`} robot={robot} i={i}  />)
          }
        </div>
      </section>
  );
}