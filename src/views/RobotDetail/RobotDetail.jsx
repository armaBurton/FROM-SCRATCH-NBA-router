import { Link, useParams } from 'react-router-dom';
import { useRUARobotContext } from '../../context/RUARobotProvider';
import style from './RobotDetail.css';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

export default function RobotDetail() {
  const { id } = useParams();
  const { robots, gender, setGender } = useRUARobotContext();
  const history = useHistory();
  const session = JSON.parse(sessionStorage.getItem('detail'));
  let robot = {};

  console.log(`|| session >`, session);

  for (let r of robots) {
    r.login.uuid === id ? (robot = r) : () => {};
  }

  function handleClick() {
    sessionStorage.clear();
    console.log(`|| session >`, session);
    for (let r of robots) {
      r.login.uuid === id ? (robot = r) : () => {};
    }
    history.goBack();
    // history.push(`/robots/?gender=${session.gender}`);
  }

  return (
    <Link to="#" onClick={handleClick}>
      <section className={style.pictureFrame}>
        {session ? (
          <>
            <div className={`${style.names} ${style.padding}`}>
              {session.name.title}. {session.name.first} {session.name.last}
            </div>
            <p className={`${style.padding} ${style.street}`}>
              Street: {session.location.street.number}{' '}
              {session.location.street.name}
            </p>
          </>
        ) : (
          // history.push(`/robots`)
          <>
            {/* <div className={`${style.names} ${style.padding}`}>
              {robot.name.title}. {robot.name.first} {robot.name.last}
            </div>
            <p className={`${style.padding} ${style.street}`}>
              Street: {robot.location.street.number}{' '}
              {robot.location.street.name}
            </p> */}
          </>
        )}
      </section>
    </Link>
  );
}
