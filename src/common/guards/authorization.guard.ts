import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../enums/user-role.enum';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    if (!user) {
      throw new ForbiddenException('Usuario no autenticado');
    }

    // Si es admin, tiene acceso total
    if (user.role === UserRole.ADMIN) {
      return true;
    }

    const handler = context.getHandler();
    const controller = context.getClass();

    // Verificar si la ruta es solo para admin
    const isAdminRoute = this.reflector.getAllAndOverride<boolean>('isAdminRoute', [
      handler,
      controller,
    ]);

    if (isAdminRoute) {
      throw new ForbiddenException('Acceso denegado - Solo administradores');
    }

    // Para rutas que requieren verificación de propiedad
    const requireOwnership = this.reflector.getAllAndOverride<boolean>('requireOwnership', [
      handler,
      controller,
    ]);

    if (requireOwnership) {
      const resourceId = request.params.id;
      const resource = request.resource; // Debe ser establecido en un middleware

      if (!resource) {
        return true; // Si no hay recurso para verificar (ej: en creación)
      }

      if (resource.userId !== user.id) {
        throw new ForbiddenException('Acceso denegado - No eres el propietario del recurso');
      }
    }

    return true;
  }
} 