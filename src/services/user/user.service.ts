import Cookies from 'js-cookie';
import { AuthResponse } from '../auth/auth.dto';
import {
  GetAllUsersQuery,
  GetAnalystUserQuery,
  GetAnalystUserResponse,
  SignInPayload,
  UpdateUserPayload,
  UpdateUserResponse,
  UsersResponse,
} from './user.dto';
import axiosInstance from '@/utils/axiosConfig';

const userService = {
  getAll: async (query?: GetAllUsersQuery) => {
    const { data } = await axiosInstance.get<UsersResponse>('/users', {
      params: {
        ...query,
      },
    });

    return data;
  },
  getAnalyst: async (query: GetAnalystUserQuery) => {
    const { data } = await axiosInstance.get<GetAnalystUserResponse>('/users/analyst', { params: { ...query } });

    return data.data;
  },
  register: async (payload: SignInPayload) => {
    const { data } = await axiosInstance.post<AuthResponse>('/auth/register', payload);

    Cookies.set('access_token', data.data.accessToken);
    Cookies.set('user', JSON.stringify(data.data.user));
  },
  update: async ({ id, data: payload }: UpdateUserPayload) => {
    const { data } = await axiosInstance.put<UpdateUserResponse>(`/users/${id}`, payload);

    return data;
  },
  delete: async (id: number) => {
    await axiosInstance.delete(`/users/${id}`);
  },
};

export default userService;
