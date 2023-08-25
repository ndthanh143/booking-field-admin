import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Divider, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { RoleEnum } from '@/common/enums/role.enum';
import { UpdateUserData, UpdateUserPayload, User } from '@/services/user/user.dto';

export interface UpdateUserProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
  data: User;
  onSubmit: (data: UpdateUserPayload) => void;
}

const schema = object({
  firstName: string().required('This field is required!'),
  lastName: string().required('This field is required!'),
  email: string().required('This field is required!').email('This field have to be email type!'),
  phone: string().required('This field is required!'),
  role: string().required('This field is required!'),
});

export const UpdateUserBox = ({ isOpen, isLoading, onClose, data, onSubmit }: UpdateUserProps) => {
  const { register, handleSubmit, setValue } = useForm<UpdateUserData>({ resolver: yupResolver(schema) });
  useEffect(() => {
    setValue('email', data.email);
    setValue('phone', data.phone);
    setValue('firstName', data.firstName);
    setValue('lastName', data.lastName);
    setValue('role', data.role);
  }, [data, setValue]);

  const onSubmitHandler = (updateData: UpdateUserData) => onSubmit({ id: data._id, data: updateData });

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby='parent-modal-title'
      aria-describedby='parent-modal-description'
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Box
        paddingX={4}
        minWidth={400}
        bgcolor='primary.contrastText'
        borderRadius={4}
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.3,
        }}
      >
        <Typography variant='h5' textAlign='center' fontWeight={700} paddingY={2}>
          Update user info
        </Typography>
        <Divider />
        <Box component='form' noValidate onSubmit={handleSubmit(onSubmitHandler)}>
          <Box paddingY={2}>
            <Typography variant='body2' fontStyle='italic'>
              Email:
            </Typography>
            <TextField {...register('email')} fullWidth type='email' disabled={isLoading} />
          </Box>

          <Box paddingY={2}>
            <Typography variant='body2' fontStyle='italic'>
              FirstName
            </Typography>
            <TextField {...register('firstName')} fullWidth type='email' disabled={isLoading} />
          </Box>

          <Box paddingY={2}>
            <Typography variant='body2' fontStyle='italic'>
              LastName
            </Typography>
            <TextField {...register('lastName')} fullWidth type='email' disabled={isLoading} />
          </Box>
          <Box paddingY={2}>
            <Typography variant='body2' fontStyle='italic'>
              Role
            </Typography>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label='Age'
              fullWidth
              defaultValue={data.role}
              disabled={isLoading}
              {...register('role')}
            >
              {Object.values(RoleEnum).map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </Box>
          <Box display='flex' justifyContent='center' gap={4} padding={4}>
            <LoadingButton loading={isLoading} variant='contained' type='submit'>
              Save
            </LoadingButton>
            <Button variant='text' onClick={onClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
