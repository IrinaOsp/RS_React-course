import { ReactNode } from 'react';

export default function ErrorMessage(): ReactNode {
  const handleClick = () => {
    window.location.reload();
  };

  return (
    <>
      <p>Error occured</p>
      <button onClick={handleClick}>Go back to search</button>
    </>
  );
}
