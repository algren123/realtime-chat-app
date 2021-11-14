import { NavContainer, NavLogo, NavItems, Button } from './Navbar.styles';
import { useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import { useState } from 'react';
import { BiX, BiMenu } from 'react-icons/bi';

const theme = {
  signIn: {
    background: '#F4A261',
  },
  signUp: {
    background: '#E76F51',
  },
};

export default function Navbar() {
  const { user, error, isLoading } = useUser();

  if (error) return <div>{error.message}</div>;

  return (
    <NavContainer>
      <NavLogo>Company</NavLogo>
      <NavItems>
        {user ? (
          <Button theme={theme.signIn}>
            <a href="/api/auth/logout">Logout</a>
          </Button>
        ) : (
          <div>
            <Button>
              <a href="/api/auth/login">Sign In</a>
            </Button>
            <Button>
              <a href="/api/auth/login">Sign Up</a>
            </Button>
          </div>
        )}
      </NavItems>
    </NavContainer>
  );
}
