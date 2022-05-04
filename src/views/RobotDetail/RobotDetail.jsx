import { Redirect } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import { useRUARobotContext } from '../../context/RUARobotProvider';
import style from './RobotDetail.css';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function RobotDetail(){
  const { id } = useParams();
  const {
    robots
  } = useRUARobotContext();
  const history = useHistory();
  let robot = {};
  console.log(robots);

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

  return (
    <Link to='/'>
      <section className={style.pictureFrame}>
        {
          robots.length === 0 
            ? <Redirect to='/' /> 
            : <>
                <div className={`${style.names} ${style.padding}`}>{robot.name.title}. {robot.name.first} {robot.name.last}</div>
                <p className={`${style.padding} ${style.street}`}>Street: {robot.location.street.number} {robot.location.street.name}</p>
              </>
        }
        
      </section>
    </Link>
  );
}