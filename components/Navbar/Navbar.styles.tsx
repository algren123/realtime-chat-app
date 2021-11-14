import styled from 'styled-components';

export const NavContainer = styled.div`
  background: linear-gradient(20deg, hsl(320, 60%, 65%), hsl(15, 60%, 65%));
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16rem;
`;

export const NavLogo = styled.div`
  justify-content: left;
  font-size: 1.25rem;
  font-weight: bold;
`;

export const NavItems = styled.div``;

export const Button = styled.button`
  background-color: transparent;
  color: black;
  font-size: 1em;
  font-weight: bold;
  margin: 1em;
  padding: 0.7em 1.5em;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease-out;

  :hover {
    background-color: black;
    color: white;
  }
`;
