import React from 'react';
import { useConnect } from '@connect2ic/react';

function UserInfo() {
  const { isConnected, principal } = useConnect();

  return (
    <div>
      {isConnected ? (
        <p>Principal ID: {principal?.toString()}</p>
      ) : (
        <p>Usuario no conectado</p>
      )}
    </div>
  );
}

export default UserInfo;
