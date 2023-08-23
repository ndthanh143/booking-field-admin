import Cookies from 'js-cookie';
import { User } from '../user/user.dto';
import { LoginInput, AuthResponse } from './auth.dto';
import { RoleEnum } from '@/common/enums/role.enum';
import axiosInstance from '@/utils/axiosConfig';

export const postLogin = async (payload: LoginInput) => {
  const { data } = await axiosInstance.post<AuthResponse>('/auth/login', payload);

  if (data.data.user.role === RoleEnum.Admin) {
    Cookies.set('access_token', data.data.accessToken);
    Cookies.set('user', JSON.stringify(data.data.user));
    return data;
  } else {
    alert('Tài khoản đăng nhập không đủ quyền truy cập');
    throw new Error('Bạn phải đăng nhập với quyền quản trị viên');
  }
};

export const doLogout = () => {
  Cookies.remove('access_token');
  Cookies.remove('user');
};

export function getCurrentUser(): User | null {
  const user = Cookies.get('user');
  if (user) {
    const userData: User = JSON.parse(user);
    if (userData.role === RoleEnum.Admin) {
      return userData;
    } else {
      alert('Tài khoản đăng nhập không đủ quyền truy cập');
      throw new Error('Bạn phải đăng nhập với quyền quản trị viên');
    }
  }
  return null;
}
