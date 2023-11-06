import { useState } from 'react';

export default function ThrowErrorButton() {
  const [throwError, setThrowError] = useState(false);

  const handleError = (): void => {
    setThrowError(true);
  };

  if (throwError) throw Error('ErrorBoundary should catch this error');

  return (
    <button type="button" onClick={handleError}>
      Throw Error
    </button>
  );
}
