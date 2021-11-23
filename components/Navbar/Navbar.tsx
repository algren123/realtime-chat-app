import {
  NavContainer,
  NavLogo,
  NavItems,
  Button,
  MenuIcon,
  Menu,
  MenuItem,
} from './Navbar.styles';
import { useUser } from '@auth0/nextjs-auth0';
import { useState } from 'react';
import Link from 'next/link';
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
  const { user, error } = useUser();
  const [click, setClick] = useState(false);

  if (error) return <div>{error.message}</div>;

  return (
    <NavContainer>
      <Link href="/" passHref>
        <NavLogo>Chattyio</NavLogo>
      </Link>
      <MenuIcon onClick={() => setClick(!click)}>
        {click ? <BiX /> : <BiMenu />}
      </MenuIcon>
      <Menu onClick={() => setClick(!click)} click={click}>
        {user ? (
          <>
            <MenuItem>
              <Link href="/profile" passHref>
                <Button>Profile</Button>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="/api/auth/logout" passHref>
                <Button>Logout</Button>
              </Link>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem>
              <Link href="/api/auth/login" passHref>
                <Button>Sign in</Button>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="/api/auth/login" passHref>
                <Button>Sign up</Button>
              </Link>
            </MenuItem>
          </>
        )}
      </Menu>
      <NavItems>
        {user ? (
          <>
            <Link href="/profile" passHref>
              <Button theme={theme.signIn}>
                <a>Profile</a>
              </Button>
            </Link>
            <Link href="/api/auth/logout" passHref>
              <Button theme={theme.signIn}>
                <a>Logout</a>
              </Button>
            </Link>
          </>
        ) : (
          <div>
            <Link href="/api/auth/login" passHref>
              <Button>
                <a>Sign In</a>
              </Button>
            </Link>
            <Link href="/api/auth/login" passHref>
              <Button>
                <a>Sign Up</a>
              </Button>
            </Link>
          </div>
        )}
      </NavItems>
    </NavContainer>
  );
}
