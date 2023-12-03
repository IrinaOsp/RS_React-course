import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import List from './List';
import '../styles/ListsContainer.css';

export default function FormsList() {
  const uncontrolledForms = useSelector(
    (state: RootState) => state.uncontrolledFormSlice.submittedForms
  );
  const controlledForms = useSelector(
    (state: RootState) => state.controlledFormSlice.submittedForms
  );
  return (
    <div className="list-container">
      {uncontrolledForms.length > 0 && <List list={uncontrolledForms} />}
      {controlledForms.length > 0 && <List list={controlledForms} />}
    </div>
  );
}
