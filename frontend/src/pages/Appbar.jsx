import { useAuth0 } from '@auth0/auth0-react';
import logo from "../assets/logo2.png";
import { useNavigate } from 'react-router-dom';
import Hero from './Hero.jsx';
import Home from './HomeOptions.jsx';

import { Toolbar, Typography, Box, AppBar, Button } from '@mui/material';

function Appbar() {
  const navigate = useNavigate();
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return (
      <>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed" sx={{ backgroundColor: '#F5F5F5' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 4 }}>
              <img src={logo} width={130} height={60} alt="logo" />

              <div style={{ display: 'flex', padding: 2 }}>
                <Box component="section" sx={{ backgroundColor: '#298282', p: 2.2, height: 6, marginTop: 0.7 }}>
                  {user.email}
                </Box>

                <Button
                  onClick={() => logout({ returnTo: window.location.origin })}
                  size="large"
                  variant="contained"
                  sx={{ backgroundColor: '#298282', marginLeft: 2 }}
                >
                  Logout
                </Button>
              </div>
            </div>
          </AppBar>
        </Box>
      </>
    );
  } else {
    return (
      <>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed" sx={{ backgroundColor: '#F5F5F5' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 5 }}>
              <img src={logo} width={130} height={60} alt="logo" />

              <Button
                onClick={() => loginWithRedirect()}
                size="large"
                variant="contained"
                sx={{ backgroundColor: '#298282', marginRight: 2 }}
              >
                Sign-in
              </Button>
            </div>
          </AppBar>
        </Box>

        <div style={{ textAlign: 'center', fontWeight: 900, marginBottom: 60 }}>
          <Typography sx={{ fontSize: '20px', fontWeight: 700 }}>
            Sign-up to enjoy our Services
          </Typography>
        </div>

      </>
    );
  }
}

export default Appbar;
