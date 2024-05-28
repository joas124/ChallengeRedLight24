import { useRouteError } from 'react-router-dom';

interface RouteError {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  let errorMessage: string | undefined;

  if (typeof error === 'object' && error !== null) {
    if ('statusText' in error) {
      errorMessage = (error as RouteError).statusText;
    } else if ('message' in error) {
      errorMessage = (error as RouteError).message;
    }
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorMessage || 'Unknown error'}</i>
      </p>
    </div>
  );
}
