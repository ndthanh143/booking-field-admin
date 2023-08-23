import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <Container maxWidth='xl'>
      <Outlet />
    </Container>
  );
};
