import { useRUARobotContext } from '../../context/RUARobotProvider';
import style from './RobotList.css';
import RobotCard from '../RobotCard/RobotCard';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import robotFetch from '../../services/robotFetch';
import { func } from 'prop-types';

export default function RobotList() {
  const location = useLocation();
  const searchGender = new URLSearchParams(location.search).get('gender');
  console.log(searchGender);
  const history = useHistory();
  const storage = JSON.parse(localStorage.getItem('robots'));
  console.log(`|| storage >`, storage);

  const { loading, setLoading, robots, setRobots, gender, setGender } =
    useRUARobotContext();

  // async function getNewRobots(e) {
  //   return await robotFetch(
  //     `https://randomuser.me/api/?results=10&noinfo&gender=${e.target.value}`
  //   );
  // }

  const handleGenderChange = async (e) => {
    e.preventDefault();
    setGender(e.target.value);

    const getRobots = await robotFetch(
      `https://randomuser.me/api/?results=10&noinfo&gender=${e.target.value}`
    );

    localStorage.setItem('robots', JSON.stringify(getRobots.results));
    history.push(`/robots/?gender=${e.target.value}`);
  };

  function resetRobots() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <section className={style.meetMyRobots}>
      <div className={style.listHead}>
        <button onClick={resetRobots}>Reset</button>
        <label htmlFor="gender">ManDroid or FemBots</label>
        <select id="gender" value={searchGender} onChange={handleGenderChange}>
          <option value="all">ALL</option>
          <option value="male">ManDroid</option>
          <option value="female">FemBot</option>
        </select>
      </div>
      <div className={style.cards}>
        {loading ? (
          <h1>Beep Beep Boop...Computing</h1>
        ) : (
          storage.map((robot, i) => (
            <RobotCard key={`${robot}${i}`} robot={robot} i={i} />
          ))
        )}
      </div>
    </section>
  );
}
