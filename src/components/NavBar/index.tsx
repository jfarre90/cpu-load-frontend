import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import { FC } from 'react';
import { NavBarProps } from './types';

export const NavBar: FC<NavBarProps> = ({ pageTitle }) => {
  return (
    <AppBar position='absolute'>
      <Container maxWidth='xl'>
        <Toolbar sx={{ padding: { md: 0 } }}>
          <Typography component='h1' variant='h6' color='inherit' noWrap>
            {pageTitle}
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
