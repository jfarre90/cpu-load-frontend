import { Box, Container, useTheme } from '@mui/material';
import React, { FC } from 'react';
import NavBar from '../../components/NavBar';
import { MainLayoutProps } from './types';

const MainLayout: FC<MainLayoutProps> = ({ children, pageTitle }) => {
  const theme = useTheme();

  return (
    <>
      <NavBar pageTitle={pageTitle} />
      <Box sx={{ ...theme.mixins.toolbar, marginBottom: '50px' }} />
      <Container maxWidth='xl'>{children}</Container>;
    </>
  );
};

export default MainLayout;
