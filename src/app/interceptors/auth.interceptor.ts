import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';

/*
What is an Interceptor?
1. intercepts HTTP requests and responses, allowing you to modify them before they are sent or received.
2. this is equivalent to axios.interceptors.request.use() usage in Axios (on frontend).
3. this is equivalent to a middleware in Express.js (on backend).
*/

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // Add authentication token to each request
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');

    // If a token is available, add it to the request
    if (token) {
      // clones the new request with the token added to the headers
      const clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      // passes the modified request to the next handler
      return next.handle(clonedReq);
    }

    // If no token is available, pass the original request to the next handler
    return next.handle(req);
  }
}
