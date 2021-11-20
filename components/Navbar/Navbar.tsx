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
        <NavLogo>Company</NavLogo>
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
              <Button>
                <a href="/api/auth/logout">Logout</a>
              </Button>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem>
              <Button>
                <a href="/api/auth/login">Sign In</a>
              </Button>{' '}
            </MenuItem>
            <MenuItem>
              <Button>
                <a href="/api/auth/login">Sign Up</a>
              </Button>
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
            <a href="/api/auth/logout">
              <Button theme={theme.signIn}>Logout</Button>
            </a>
          </>
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
