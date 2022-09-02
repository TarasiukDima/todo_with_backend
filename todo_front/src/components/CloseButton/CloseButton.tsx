import React, { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { TSimpleFunction } from '../../types';

interface ICloseButtonProps {
  size?: 'small' | 'large' | 'medium';
  closeCb: TSimpleFunction;
}
const CloseButton: FC<ICloseButtonProps> = ({ closeCb, size = 'small'}) => {
  return (
    <IconButton
      size={size}
      aria-label="Close"
      onClick={closeCb}
      color="inherit"
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );
};

export default CloseButton;
