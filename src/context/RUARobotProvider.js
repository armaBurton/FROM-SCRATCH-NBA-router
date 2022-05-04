import {
  createContext,
  useContext,
  useState
} from 'react';

const RUARobotContext = createContext();

export default function RUARobotProvider({ children }){
  const[loading, setLoading] = useState(true);
  const[robots, setRobots] = useState([]);
  const[gender, setGender] = useState('all');

  const ruaRobotState = {
    loading, setLoading,
    robots, setRobots,
    gender, setGender,
  };

  return (
    <RUARobotContext.Provider value={ruaRobotState}>
      {children}
    </RUARobotContext.Provider>
  );
}

export function useRUARobotContext(){
  return useContext(RUARobotContext);
}