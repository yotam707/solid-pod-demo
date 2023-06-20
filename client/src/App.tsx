import { createSignal, type Component, createEffect } from 'solid-js';
import {
  handleIncomingRedirect,
  ISessionInfo,
} from '@inrupt/solid-client-authn-browser';

import styles from './App.module.css';
import LoginHeader from './LoginHeader';
import ProfilePanel from './ProfilePanel';

const App: Component = () => {
  const [sessionInfo, setSessionInfo] = createSignal<ISessionInfo | undefined>(
    undefined,
  );

  createEffect(() => {
    handleIncomingRedirect().then(sessionInfo => {
      debugger;
      setSessionInfo(sessionInfo);
    });
  });

  return (
    <div class={styles.App}>
      <h1>Solid Demo</h1>
      <LoginHeader sessionInfo={sessionInfo()} />
      {sessionInfo()?.isLoggedIn && (
        <ProfilePanel webId={sessionInfo()?.webId} />
      )}
    </div>
  );
};

export default App;
