import { useRUARobotContext } from '../../context/RUARobotProvider';
import style from './RobotList.css';
import RobotCard from '../RobotCard/RobotCard';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import robotFetch from '../../services/robotFetch';
import { func } from 'prop-types';

export default function RobotList() {
  const location = useLocation();

  // let searchGender = new URLSearchParams(location.search).get('gender');
  const history = useHistory();
  const storage = JSON.parse(localStorage.getItem('robots'));
  console.log(`|| storage >`, storage);
  const [searchGender, setSearchGender] = useState({});

  const { loading, setLoading, robots, setRobots, gender, setGender } =
    useRUARobotContext();

  const handleGenderChange = async (e) => {
    e.preventDefault();
    setGender(e.target.value);
    localStorage.setItem('gender', JSON.stringify({ gender: e.target.value }));

    const getRobots = await robotFetch(
      `https://randomuser.me/api/?results=10&noinfo&gender=${e.target.value}`
    );

    localStorage.setItem('robots', JSON.stringify(getRobots.results));
    history.push(`/robots/?gender=${gender}`);
  };

  useEffect(() => {
    const bit = JSON.parse(localStorage.getItem('gender'));
    console.log(`|| bit >`, bit);

    setSearchGender(bit?.gender);
  }, [gender]);

  async function resetRobots() {
    localStorage.clear();
    const getRobots = await robotFetch(
      `https://randomuser.me/api/?results=10&noinfo&gender=all`
    );
    const genderObj = { gender: 'all' };
    localStorage.setItem('gender', JSON.stringify(genderObj));
    localStorage.setItem('robots', JSON.stringify(getRobots.results));
    history.push('/');
  }

  return (
    <section className={style.meetMyRobots}>
      <div className={style.listHead}>
        <button onClick={resetRobots}>Reset</button>
        <label htmlFor="gender">ManDroid or FemBots</label>
        <select
          name="bots"
          id="gender"
          value={searchGender}
          onChange={handleGenderChange}
        >
          <option name="all" value="all">
            ALL
          </option>
          <option name="male" value="male">
            ManDroid
          </option>
          <option name="fembot" value="female">
            FemBot
          </option>
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
