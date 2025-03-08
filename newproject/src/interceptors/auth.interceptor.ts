import {
  globalInterceptor,
  Interceptor,
  InvocationContext,
  InvocationResult,
  Provider,
  ValueOrPromise,
} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import {verify} from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';

const authConfigPath = path.join(__dirname, '../../auth.json');

if (!fs.existsSync(authConfigPath)) {
  throw new Error(`Auth file not found at path: ${authConfigPath}`);
}

const authRules = JSON.parse(fs.readFileSync(authConfigPath, 'utf-8'));

@globalInterceptor('auth')
export class AuthInterceptor implements Provider<Interceptor> {
  value() {
    return this.intercept.bind(this);
  }

  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<InvocationResult>,
  ): Promise<InvocationResult> {
    try {
      const request = invocationCtx.getSync<{
        headers: { [key: string]: string };
        method: string;
        url: string;
      }>('rest.http.request');

      const method = request.method.toUpperCase();
      const route = request.url.split('?')[0]; // Remove query params

      // Exclude authentication for login and signup
      const excludedRoutes = ['/users/login', '/users'];
      if (excludedRoutes.includes(route)) {
        return next();
      }

      // Check if the route exists in `auth.json`
      const routePermissions = authRules[route];
      if (!routePermissions) {
        return next(); // If no rule exists, allow access
      }

      const methodPermissions = routePermissions[method];
      if (!methodPermissions) {
        return next(); // If method is not defined, allow access
      }

      // If authentication is NOT required, allow access
      if (!methodPermissions.authenticate) {
        return next();
      }

      // Verify JWT Token
      const authHeader = request.headers.authorization;
      if (!authHeader) {
        throw new HttpErrors.Unauthorized('Authorization token is missing');
      }

      const token = authHeader.replace('Bearer ', '');
      const secretKey = process.env.JWT_SECRET || 'my-secret-key';

      let decodedToken: any;
      try {
        decodedToken = verify(token, secretKey);
      } catch (error) {
        throw new HttpErrors.Unauthorized('Invalid or expired token');
      }

      // Extract User Role from Token
      const userRole = decodedToken.role;
      if (!userRole) {
        throw new HttpErrors.Forbidden('User role not found in token');
      }

      // Check if User Role is Authorized
      if (!methodPermissions.roles.includes(userRole)) {
        throw new HttpErrors.Forbidden('You do not have permission to perform this action');
      }

      // Bind Role to Context
      invocationCtx.bind('currentUserRole').to(userRole);

      return next();
    } catch (err) {
      throw err;
    }
  }
}
