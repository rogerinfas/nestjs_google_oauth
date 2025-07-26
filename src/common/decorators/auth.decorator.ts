import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '../guards/authorization.guard';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

export const AdminRoute = () => applyDecorators(
  SetMetadata('isAdminRoute', true),
  UseGuards(JwtAuthGuard, AuthorizationGuard),
);

export const RequireOwnership = () => applyDecorators(
  SetMetadata('requireOwnership', true),
  UseGuards(JwtAuthGuard, AuthorizationGuard),
);

export const Auth = () => applyDecorators(
  UseGuards(JwtAuthGuard, AuthorizationGuard),
); 