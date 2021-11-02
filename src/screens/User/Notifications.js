import * as React from 'react';
import Alert from '@mui/material/Alert';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CheckIcon from '@mui/icons-material/Check';

export default function AlignItemsList() {
  return (
    <div>

    <Alert icon={<ArrowUpwardIcon fontSize="inherit" />} severity="error">Temperatura Alta 45°C</Alert>
    <Alert icon={<ArrowDownwardIcon fontSize="inherit" />} severity="info">Humedad Baja 15%</Alert>
    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">Luminosidad OK</Alert>
    </div>
  );
}