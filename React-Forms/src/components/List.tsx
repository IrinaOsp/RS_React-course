import { ISliceState } from '../types/types';
import '../styles/List.css';

export default function List({ list }: { list: ISliceState[] }) {
  console.log(list);
  const reversedList = [...list].reverse();
  return (
    <div className="list">
      {list.length > 0 &&
        reversedList.map((item) => (
          <ul key={item.userName + Math.random()}>
            <li>Name: {item.userName}</li>
            <li>Age: {item.age}</li>
            <li>Email: {item.email}</li>
            <li>Password: {item.password}</li>
            <li>Gender: {item.gender}</li>
            <li>Accept T&C: {item.acceptanceTC ? 'Yes' : 'No'}</li>
            <li>
              Picture:{' '}
              {typeof item.picture === 'string' ? (
                <img src={item.picture} alt="Uploaded" className="item-img" />
              ) : (
                'no'
              )}
            </li>
            <li>Country: {item.country}</li>
          </ul>
        ))}
    </div>
  );
}
