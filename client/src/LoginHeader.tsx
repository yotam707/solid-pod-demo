import { createSignal, type Component } from 'solid-js';
import { Button, Box, TextField } from '@suid/material';
import { login, ISessionInfo } from '@inrupt/solid-client-authn-browser';

const LoginHeader: Component<{ sessionInfo?: ISessionInfo }> = ({
  sessionInfo,
}) => {
  const [inputValue, setInputValue] = createSignal('http://localhost:3000');
  const loginCallback = () => {
    if (inputValue()) {
      login({
        oidcIssuer: inputValue(),
        redirectUrl: window.location.href,
        clientName: 'Solid Demo',
      });
    } else {
      alert('Please provide an issuer.');
    }
  };

  if (sessionInfo?.isLoggedIn) {
    return <p>Logged in as {sessionInfo.webId}</p>;
  } else {
    return (
      <>
        <Box
          component='form'
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
            textAlign: 'center',
          }}
          noValidate
          autocomplete='off'
        >
          <TextField
            id='outlined-basic'
            label='Enter your Solid OIDC Issuer'
            variant='outlined'
            defaultValue={'http://localhost:3000'}
            onChange={e => setInputValue(e.target.value)}
            fullWidth
          />
        </Box>
        <Box>
          <Button variant='contained' onClick={loginCallback}>
            Log into a Solid Pod
          </Button>
        </Box>
      </>
    );
  }
};

export default LoginHeader;
