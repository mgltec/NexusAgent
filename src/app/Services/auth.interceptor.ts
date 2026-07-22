import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

/**
 * Attaches the JWT issued by the new WagerApi (ApiWager2026) to every
 * outgoing API request. The token is stored on login under `authToken`.
 *
 * Legacy fallback: if no JWT is present but a legacy agent session exists,
 * it re-creates the old `bearer <password>.<idAgent>` header so the app keeps
 * working against endpoints that have not been migrated yet.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Only decorate calls that target our API.
    if (!req.url.startsWith(environment.webAPI1)) {
      return next.handle(req);
    }

    const token = localStorage.getItem('authToken');
    let authHeader: string | null = null;

    if (token) {
      authHeader = `Bearer ${token}`;
    } else {
      // Backward-compatible header from the stored agent session.
      try {
        const raw = localStorage.getItem('agentInfo');
        if (raw) {
          const session = JSON.parse(raw);
          const master = session?.Master ?? session;
          if (master?.Jwt || master?.Token) {
            authHeader = `Bearer ${master.Jwt ?? master.Token}`;
          } else if (master?.Password != null && master?.IdAgent != null) {
            authHeader = `bearer ${master.Password}.${master.IdAgent}`;
          }
        }
      } catch {
        /* ignore malformed session */
      }
    }

    if (authHeader) {
      req = req.clone({ setHeaders: { Authorization: authHeader } });
    }

    return next.handle(req);
  }
}
