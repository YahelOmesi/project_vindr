import React from 'react';
import { Button as MuiButton } from '@mui/material';
import { ButtonProps } from '../../types/common';

export default function Button(prop: ButtonProps) {
  const { variant, size, title, disabled, sx, onClick } = prop;
  return (
    <MuiButton variant={variant} size={size} disabled={disabled} onClick={onClick} sx={sx}>
      {title}
    </MuiButton>
  );
}
