import authService from '../auth/auth.service';
import { GetAllUsersQuery, GetAnalystUserQuery } from './user.dto';
import userService from './user.service';
import { defineQuery } from '@/utils/defineQuery';

export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (query?: GetAllUsersQuery) => defineQuery([...userKeys.lists(), query], () => userService.getAll(query)),
  profiles: () => [...userKeys.all, 'profile'] as const,
  profile: () => defineQuery([...userKeys.profiles()], authService.getCurrentUser),
  reports: () => [...userKeys.all, 'report'] as const,
  report: (query: GetAnalystUserQuery) =>
    defineQuery([...userKeys.reports(), query], () => userService.getAnalyst(query)),
};
