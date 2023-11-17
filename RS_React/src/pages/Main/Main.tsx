import { Outlet } from 'react-router-dom';
import Wrapper from '../../components/Wrapper/Wrapper';
import './Main.css';

export default function Main() {
  return (
    <main className="main">
      <Wrapper />
      <Outlet />
    </main>
  );
}
