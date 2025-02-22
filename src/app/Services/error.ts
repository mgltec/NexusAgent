import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

const parseSearch = (): Map<string, string> => {
  const params = new URLSearchParams(document.location.search);
  const map = new Map<string, string>();
  params.forEach((value, key) => {
    map.set(key, value);
  });
  return map;
};

export const handleError = (error: HttpErrorResponse) => {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }

  const queryString = parseSearch();
  const isDebug = queryString.get('debug')?.toLowerCase() === 'true';

  if (isDebug) {
    window.alert(errorMessage);
  } else {
    console.log(errorMessage);
  }

  if (error.status === 401) {
    const currentLocation = window.location.href;
    const domainParts = currentLocation.split('/')[2].split('.');
    const domain = domainParts.slice(-2).join('.');
    const protocol = document.location.protocol;
    document.location.href = `${protocol}//${domain}`;
  }
  return throwError(errorMessage);
};
