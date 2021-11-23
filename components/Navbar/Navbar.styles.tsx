import styled from 'styled-components';

export const NavContainer = styled.nav`
  background: linear-gradient(20deg, hsl(320, 60%, 65%), hsl(15, 60%, 65%));
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16rem;
  position: sticky;
  z-index: 5;
  top: 0;
  @media (max-width: 1000px) {
    padding: 0 2rem;
  }
`;

export const NavLogo = styled.div`
  justify-content: left;
  font-size: 1.25rem;
  font-weight: bold;
  cursor: pointer;
`;

export const NavItems = styled.div`
  display: block;

  @media (max-width: 1000px) {
    display: none;
  }
`;

export const Button = styled.button`
  background-color: transparent;
  color: white;
  font-size: 1em;
  font-weight: bold;
  margin: 1em;
  padding: 0.7em 1.5em;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease-out;

  @media (max-width: 1000px) {
    background: linear-gradient(20deg, hsl(320, 60%, 65%), hsl(15, 60%, 65%));
  }

  :hover {
    background-color: black;
    color: white;
  }
`;

export const MenuIcon = styled.div`
  display: none;

  @media (max-width: 1000px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-40%, 27.5%);
    font-size: 2rem;
    cursor: pointer;
  }
`;

export const Menu = styled.div<{ click?: boolean }>`
  display: flex;
  align-items: center;
  text-align: center;

  @media only screen and (max-width: 1000px) {
    display: flex;
    position: absolute;
    z-index: 5;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 4rem);
    top: 64px;
    left: ${({ click }: any) => (click ? '0%' : '-120%')};
    background-color: #f3f5f7;
    transition: all 0.5s ease;
  }
`;

export const MenuItem = styled.div`
  display: none;

  @media (max-width: 1000px) {
    display: flex;
    justify-content: center;
  }
`;
