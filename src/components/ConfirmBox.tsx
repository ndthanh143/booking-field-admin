import { ErrorOutline } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Modal, Typography } from '@mui/material';
import { motion } from 'framer-motion';

export interface ConfirmBoxProps {
  title: string;
  subTitle?: string;
  isOpen: boolean;
  loading?: boolean;
  onClose: () => void;
  onAccept: () => void;
}
export const ConfirmBox = ({ title, subTitle, isOpen, loading, onClose, onAccept }: ConfirmBoxProps) => {
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
        <Box textAlign='center' padding={2}>
          <ErrorOutline fontSize='large' sx={{ color: 'primary.main' }} />
        </Box>
        <Typography textAlign='center' variant='h5' fontWeight={500}>
          {title}
        </Typography>
        <Typography textAlign='center' variant='body2' marginY={1}>
          {subTitle}
        </Typography>
        <Box display='flex' justifyContent='center' gap={4} padding={4}>
          <LoadingButton loading={loading} variant='contained' onClick={onAccept}>
            Đồng ý
          </LoadingButton>
          <Button variant='text' onClick={onClose}>
            Quay lại
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
