import { useHistory, useLocation } from 'react-router-dom';
import { useRUARobotContext } from '../../context/RUARobotProvider';

export default async function RobotListUseEffect(){
  const{
    gender
  } = useRUARobotContext();
  const history = useHistory();
  const location = useLocation();



  console.log(gender);
  const searchGender = new URLSearchParams(location.search).get('gender');
  // history.push(`/robots/?gender=${searchGender}`);
  
  console.log(searchGender);

  return <></>;
}