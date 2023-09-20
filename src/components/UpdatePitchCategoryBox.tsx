import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Divider, Modal, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useController, useForm } from 'react-hook-form';
import { mixed, object, string } from 'yup';
import { ImageUpload } from '.';
import {
  CreatePitchCategoryPayload,
  PitchCategory,
  UpdatePitchCategoryPayload,
} from '@/services/pitch_category/pitch-category.dto';

export interface UpdatePitchCategoryBoxProps {
  isOpen: boolean;
  onClose: () => void;
  data: PitchCategory;
  onSubmit: (data: UpdatePitchCategoryPayload) => void;
  isLoading: boolean;
}
const schema = object({
  name: string().required('This field is required!'),
  description: string().required('This field is required!'),
  thumbnail: mixed<FileList>().required('This field is required'),
});
export const UpdatePitchCategoryBox = ({ isOpen, onClose, isLoading, data, onSubmit }: UpdatePitchCategoryBoxProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreatePitchCategoryPayload>({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (updateData: CreatePitchCategoryPayload) => {
    onSubmit({ id: data.id, data: updateData });
  };

  const {
    field: { value: thumbnail },
  } = useController({ control, name: 'thumbnail' });

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
        width={500}
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
          Add more category
        </Typography>
        <Divider />
        <Box component='form' noValidate onSubmit={handleSubmit(onSubmitHandler)}>
          <Box paddingY={2}>
            <Typography variant='body2' fontStyle='italic'>
              Name
            </Typography>
            <TextField {...register('name')} defaultValue={data.name} fullWidth disabled={isLoading} />
            {errors.name && (
              <Typography variant='body2' color='error.main'>
                {errors.name.message}
              </Typography>
            )}
          </Box>

          <Box paddingY={2}>
            <Typography variant='body2' fontStyle='italic'>
              Description
            </Typography>
            <TextField {...register('description')} defaultValue={data.description} fullWidth disabled={isLoading} />
            {errors.description && (
              <Typography variant='body2' color='error.main'>
                {errors.description.message}
              </Typography>
            )}
          </Box>
          <Box paddingY={2}>
            <Typography variant='body2' fontStyle='italic'>
              Thumbnail
            </Typography>
            <ImageUpload files={thumbnail} url={data.thumbnail} {...register('thumbnail')} disabled={isLoading} />
            {errors.thumbnail && (
              <Typography variant='body2' color='error.main'>
                {errors.thumbnail.message}
              </Typography>
            )}
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
