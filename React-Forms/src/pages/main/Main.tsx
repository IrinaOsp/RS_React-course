import { NavLink, Outlet } from 'react-router-dom';
import './Main.css';

export default function Main() {
  return (
    <>
      <header className="header">
        <NavLink to={'/uncontrolled'}>Form created using uncontrolled components approach</NavLink>
        <NavLink to={'/react-hook-form'}>Form created with the help of the React Hook Form</NavLink>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </>
  );
}
