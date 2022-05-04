import { Redirect } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import { useRUARobotContext } from '../../context/RUARobotProvider';
import style from './RobotDetail.css';
import { history } from '../RobotList/RobotList';

export default function RobotDetail(){
  const { id } = useParams();
  const {
    robots
  } = useRUARobotContext();

  console.log(id);

  !id ? <Redirect to='/' /> : () => {};
  if(id === null){ history.push('/robots')}
  // if(id === null) <Redirect from='*' to='/' />


  console.log(robots.length);
  
  robots.length === 0 ? <Redirect to='/' /> : () => {};

  return (
      <section className={style.pictureFrame}>
        <div className='style.name'></div>
      </section>
    );
}