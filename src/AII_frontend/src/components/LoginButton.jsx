import React from 'react';
import { useConnect } from '@connect2ic/react';

function LoginButton() {
  const { isConnected, connect, disconnect } = useConnect();

  return (
    <div>
      {isConnected ? (
        <button onClick={disconnect}>Desconectar</button>
      ) : (
        <button onClick={connect}>Conectar</button>
      )}
    </div>
  );
}

export default LoginButton;
