import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './Loading.module.css';

export const LoadingScreen: React.FC = () => {
  return (
    <div className={styles.loading}>
      <CircularProgress />
    </div>
  );
};
