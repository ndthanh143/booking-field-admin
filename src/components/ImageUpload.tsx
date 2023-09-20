import { CloudUpload } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { DetailedHTMLProps, InputHTMLAttributes, forwardRef, useEffect, useState } from 'react';

export interface ImageUploadProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  files: FileList | null;
  url?: string;
}
export const ImageUpload = forwardRef<HTMLInputElement, ImageUploadProps>(
  ({ files, url, ...props }: ImageUploadProps, ref) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>();

    useEffect(() => {
      if (files) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(files[0]);
      } else {
        setPreviewUrl(null);
      }

      if (url) {
        setPreviewUrl(url);
      }
    }, [files, url]);

    return (
      <Box
        component='label'
        htmlFor='file-upload'
        width='100%'
        height={200}
        display='flex'
        justifyContent='center'
        alignItems='center'
        border={1}
        borderColor='secondary.light'
        borderRadius={4}
        overflow='hidden'
        bgcolor='primary.contrastText'
        sx={{
          ':hover': {
            bgcolor: 'secondary.light',
          },
          cursor: 'pointer',
        }}
      >
        {previewUrl && (
          <Box
            width='100%'
            height='100%'
            position='relative'
            sx={{
              ':hover': {
                '.change-image': {
                  display: 'flex',
                },
              },
            }}
          >
            <Box component='img' src={previewUrl} width='100%' height='100%' />
            <Box
              position='absolute'
              sx={{ inset: 0 }}
              bgcolor='rgba(0, 0, 0, 0.6)'
              display='none'
              justifyContent='center'
              alignItems='center'
              className='change-image'
            >
              <CloudUpload sx={{ color: 'primary.contrastText' }} fontSize='large' />
            </Box>
          </Box>
        )}
        {!previewUrl && (
          <Box textAlign='center'>
            <CloudUpload />
            <Typography>Upload</Typography>
          </Box>
        )}
        <input ref={ref} hidden type='file' id='file-upload' accept='image/*' {...props} />
      </Box>
    );
  },
);
