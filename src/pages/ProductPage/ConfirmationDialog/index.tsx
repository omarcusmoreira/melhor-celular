import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar'
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
    >
      <DialogTitle id="confirmation-dialog-title" className='bg-[#054A91] text-[20px] font-medium'>{title}</DialogTitle>
      <DialogContent className='mt-4'>
        <DialogContentText id="confirmation-dialog-description" className='text-[#1D1D1D]'>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <button onClick={onClose}
            className="flex items-center border-[1px] border-[#1D1D1D] font-bold text-sm px-4 py-2 rounded shadow bg-[#DAE3ED] text-[#1D1D1D] hover:bg-[#1D1D1D] hover:text-white"
        >
          {cancelText}
        </button>
        <button onClick={onConfirm} 
          className="flex items-center border-[1px] border-[#1D1D1D] font-bold text-sm px-4 py-2 rounded shadow bg-[#DAE3ED] text-[#1D1D1D] hover:bg-[#1D1D1D] hover:text-white"        
        autoFocus
        >
          {confirmText}
        </button>
      </DialogActions>
    </Dialog>
  );
};