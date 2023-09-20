import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import { RoleEnum } from '@/common/enums/role.enum';
import { useAuth } from '@/hooks';
import { LoginInput } from '@/services/auth/auth.dto';

const schema = object({
  username: string().required('Vui lòng điền tên đăng nhập'),
  password: string().required('Vui lòng điền mật khẩu').min(6),
});

export const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: yupResolver(schema),
  });

  const { profile, login, loginError } = useAuth();

  const onSubmitHandler = (payload: LoginInput) => {
    login(payload);
  };

  useEffect(() => {
    if (profile && profile?.role === RoleEnum.Admin) {
      navigate('/');
    }
  }, [profile, navigate]);

  return (
    <Box
      width='100%'
      height='100vh'
      display='flex'
      justifyContent='center'
      alignItems='center'
      sx={{ backgroundImage: 'url(/background-login.jpg)' }}
    >
      <Box
        component='form'
        onSubmit={handleSubmit(onSubmitHandler)}
        noValidate
        width={500}
        border={1}
        borderColor='secondary.light'
        padding={4}
        borderRadius={4}
        textAlign='center'
        bgcolor='#fff'
        boxShadow={10}
      >
        <Box display='flex' justifyContent='center' gap={1}>
          <Typography variant='h5' fontWeight={700} color='primary.main'>
            GO2PLAY
          </Typography>
          <Typography variant='h5' fontWeight={500}>
            Login
          </Typography>
        </Box>
        <Typography variant='body1' paddingY={3}>
          Enter your detail to login to Management
        </Typography>
        {loginError && (
          <Typography variant='body1' color='error.main'>
            Your account does not have sufficient access rights
          </Typography>
        )}
        <TextField placeholder='Enter username' required fullWidth sx={{ marginY: 1 }} {...register('username')} />
        {errors.username && (
          <Typography variant='body2' color='error' textAlign='left'>
            *{errors.username.message}
          </Typography>
        )}
        <TextField
          placeholder='Password'
          type='password'
          required
          fullWidth
          sx={{ marginY: 1 }}
          {...register('password')}
        />
        {errors.password && (
          <Typography variant='body2' color='error' textAlign='left'>
            *{errors.password.message}
          </Typography>
        )}
        <Typography
          textAlign='left'
          variant='body1'
          sx={{
            ':hover': {
              textDecoration: 1,
            },
            paddingY: 1,
          }}
        >
          Having trouble in login?
        </Typography>

        <Button variant='contained' sx={{ borderRadius: 4, fontSize: 16, paddingX: 10, marginY: 4 }} type='submit'>
          Login
        </Button>
      </Box>
    </Box>
  );
};
