import { Link } from 'react-router-dom';
import style from './RobotCard.css'

export default function RobotCard({ robot, i }){

  return (
    <Link to={`/robots/${robot.login.uuid}`} data-testid={i}>
      <section className={style.robotCard}>
        <div className={style.nameTag}>
          <img src={robot.picture.thumbnail} alt={`${robot.gender}`} />
          <div className={style.names}>{robot.name.first} {robot.name.last}</div>
        </div>
      </section>
    </Link>
  );
}

// DATA MODEL
// {
//   "gender": "female",
//   "name": {
//       "title": "Mrs",
//       "first": "Alma",
//       "last": "Pedersen"
//   },
//   "location": {
//       "street": {
//           "number": 685,
//           "name": "Aabenraavej"
//       },
//       "city": "København V",
//       "state": "Midtjylland",
//       "country": "Denmark",
//       "postcode": 48434,
//       "coordinates": {
//           "latitude": "-36.7765",
//           "longitude": "4.4359"
//       },
//       "timezone": {
//           "offset": "+9:00",
//           "description": "Tokyo, Seoul, Osaka, Sapporo, Yakutsk"
//       }
//   },
//   "email": "alma.pedersen@example.com",
//   "login": {
//       "uuid": "0b7d1075-6b47-41c8-862b-d7d393f3322a",
//       "username": "silversnake519",
//       "password": "bullfrog",
//       "salt": "SsEgXFFz",
//       "md5": "67cfd382474dcdbc271101d6d1722f09",
//       "sha1": "3eb881c49a07df63e9ab0346e2871e3a0c572aba",
//       "sha256": "7bdc00b7bf73ad0299bbe080d0c631cb11d83d36aa693895978e2fef9a90e127"
//   },
//   "dob": {
//       "date": "1989-12-02T16:10:20.704Z",
//       "age": 33
//   },
//   "registered": {
//       "date": "2006-05-22T11:10:09.359Z",
//       "age": 16
//   },
//   "phone": "29121166",
//   "cell": "85393645",
//   "id": {
//       "name": "CPR",
//       "value": "021289-8559"
//   },
//   "picture": {
//       "large": "https://randomuser.me/api/portraits/women/60.jpg",
//       "medium": "https://randomuser.me/api/portraits/med/women/60.jpg",
//       "thumbnail": "https://randomuser.me/api/portraits/thumb/women/60.jpg"
//   },
//   "nat": "DK"
// }