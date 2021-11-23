import styled from 'styled-components';

export const Container = styled.div`
  margin: 2rem 30rem;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  background-color: #f1f1f1;
  padding: 2rem 1rem;
  justify-content: space-between;
  height: 35rem;

  @media screen and (max-width: 880px) {
    margin: 1em;
  }
`;

export const MessageInput = styled.input`
  padding: 1em;
  margin-right: 0.5em;
  border: none;
  border-radius: 12px;
  outline: none;
  font-size: 13px;
  font-family: Poppins;
  background-color: pink;
  width: 100%;
`;

export const SendButton = styled.button`
  padding: 0.5em 1em;
  border: none;
  border-radius: 12px;
  font-weight: bold;
  font-size: 18px;
  font-family: Poppins;
  color: white;
  margin-top: auto;
  background: linear-gradient(20deg, hsl(320, 60%, 65%), hsl(15, 60%, 65%));
`;

export const MessageContainer = styled.div`
  overflow-x: scroll;
  overflow-y: auto;
  padding: 1em;
  cursor: default;

  @media screen and (max-width: 880px) {
    padding: 0.5em;
  }
`;

export const MessageBubble = styled.div<{
  user: any;
  messageUser: any;
}>`
  display: flex;
  justify-content: ${({ user, messageUser }) =>
    user === messageUser ? 'flex-end' : 'flex-start'};
  text-align: ${({ user, messageUser }) =>
    user === messageUser ? 'right' : 'left'};
  padding-bottom: 1em;
`;

export const MessageContent = styled.div<{ user: any; messageUser: any }>`
  background: ${({ user, messageUser }) =>
    user === messageUser ? '#58bf56' : '#e5e6ea'};
  color: ${({ user, messageUser }) =>
    user === messageUser ? 'white' : 'black'};
  border-radius: 1em;
  padding: 0.5em 0.75em;
  word-break: break-word;
  text-align: center;
`;

export const MessageName = styled.p`
  color: #4e4e4e;
  margin: 0;
`;

export const UserPicture = styled.img`
  border-radius: 100%;
  width: 1.2em;
  height: 1.2em;
  margin: 0 4px;
`;

export const NameContainer = styled.div<{ user: any; messageUser: any }>`
  display: flex;
  align-items: center;
  justify-content: ${({ user, messageUser }) =>
    user === messageUser ? 'flex-end' : 'flex-start'};
  margin: 4px 0;
`;

export const HoverTooltip = styled.div<{ user: any; messageUser: any }>`
  position: absolute;
  color: black;
  background-color: #dfdfdf;
  padding: 0.5em;
  border-radius: 20px;
  top: -10px;
  left: ${({ user, messageUser }) => (user === messageUser ? '-120px' : '0px')};
  width: 200px;
  text-align: center;
  justify-content: flex-start;
`;

export const TrashIcon = styled.div`
  color: black;
  position: absolute;
  top: 60px;
  right: -5px;
  font-size: 1.5em;

  :hover {
    color: red;
  }
`;
