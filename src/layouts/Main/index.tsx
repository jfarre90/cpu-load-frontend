import { Container } from '@mui/material';
import React, { FC } from 'react';
import { MainLayoutProps } from './types';

const MainLayout: FC<MainLayoutProps> = ({ children }) => <Container maxWidth='xl'>{children}</Container>;

export default MainLayout;
