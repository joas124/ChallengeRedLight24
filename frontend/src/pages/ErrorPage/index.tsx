import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

export default function ErrorPage( {errorMsg}: {errorMsg?: string|null}) {
  const error = useRouteError();

  let errorMessage: string;
  if (errorMsg) {
    errorMessage = errorMsg;
  } else{
    if (isRouteErrorResponse(error)) {
      errorMessage = error.data.message || error.statusText;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    } else {
      errorMessage = '404 - Page not found';
    }
  }

  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <div className="error">{errorMessage}</div>
    </div>
  );
}
