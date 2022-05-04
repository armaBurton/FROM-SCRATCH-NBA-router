import { Redirect } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import { useRUARobotContext } from '../../context/RUARobotProvider';
import style from './RobotDetail.css';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function RobotDetail(){
  const { id } = useParams();
  const {
    robots,
    gender,
    setTargetValue
  } = useRUARobotContext();
  const history = useHistory();
  let robot = {};
  console.log(robots);

  setTargetValue(gender);

  for (let r of robots){
    console.log(r.login.uuid, id);
    r.login.uuid === id ? robot = r : () => {};
  }

  useEffect(() => {
    if(robot === {} ){
      console.log('Redirecting');
      history.push('/');
    }

  }, [robot])
  

  console.log(robot);
  console.log(gender);

  return (
    <Link to={`/robots`}>
      <section className={style.pictureFrame}>
        {
          robots.length === 0 
            ? history.push(`/robots`) 
            : <>
                <div className={`${style.names} ${style.padding}`}>{robot.name.title}. {robot.name.first} {robot.name.last}</div>
                <p className={`${style.padding} ${style.street}`}>Street: {robot.location.street.number} {robot.location.street.name}</p>
              </>
        }
        
      </section>
    </Link>
  );
}