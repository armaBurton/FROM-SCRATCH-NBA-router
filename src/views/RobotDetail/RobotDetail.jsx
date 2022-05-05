import { Link, useParams } from 'react-router-dom';
import { useRUARobotContext } from '../../context/RUARobotProvider';
import style from './RobotDetail.css';
import { useHistory } from 'react-router-dom';

export default function RobotDetail(){
  const { id } = useParams();
  const {
    robots,
    gender,
  } = useRUARobotContext();
  const history = useHistory();
  let robot = {};
  console.log(robots);

  for (let r of robots){
    console.log(r.login.uuid, id);
    r.login.uuid === id ? robot = r : () => {};
  }

  function handleClick(){
    history.push(`/robots/?gender=${gender}`)
  }

  return (
    <Link to='#' onClick={handleClick}>
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