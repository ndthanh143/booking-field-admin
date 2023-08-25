import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoginInput } from '@/services/auth/auth.dto';
import authService from '@/services/auth/auth.service';
import { userKeys } from '@/services/user/user.query';

export const useAuth = () => {
  const navigate = useNavigate();

  const userInstance = userKeys.profile();
  const { data: profile, isLoading, refetch } = useQuery(userInstance);

  const {
    mutate: loginMutation,
    isLoading: loginLoading,
    isError: loginError,
  } = useMutation({
    mutationFn: (payload: LoginInput) => authService.login(payload),
    onSuccess: () => {
      refetch();
      navigate('/');
      toast.success('Login successfully');
    },
  });

  async function login(payload: LoginInput) {
    loginMutation(payload);
  }

  function logout() {
    authService.logout();
    toast.success('Logout successfully');
    refetch();
  }

  return { profile, login, logout, isLoading, loginLoading, loginError, refetch };
};
