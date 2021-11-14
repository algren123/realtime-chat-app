import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../components/Navbar/Navbar';
import styled from 'styled-components';
import { useUser } from '@auth0/nextjs-auth0';
import Chat from '../components/Chat/Chat.tsx';

const Container = styled.div`
  text-align: center;
`;

const Headline = styled.h1`
  font-size: 5rem;
  text-align: center;
  color: #f7ece1;
`;

const Highlight = styled.span`
  background: linear-gradient(20deg, hsl(320, 60%, 65%), hsl(15, 60%, 65%));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Button = styled.button`
  background: linear-gradient(20deg, hsl(320, 60%, 65%), hsl(15, 60%, 65%));
  font-size: 3rem;
  font-weight: bold;
  margin: 1em;
  padding: 0.7em 1.5em;
  border-radius: 20px;
  cursor: pointer;
  border: none;
  color: white;
  transition: all 0.2s ease-out;
  font-family: Poppins;

  :hover {
    background: linear-gradient(20deg, hsl(15, 60%, 65%), hsl(320, 60%, 65%));
  }
`;

const Home: NextPage = () => {
  // User Info from authorization
  const { user, error, isLoading } = useUser();

  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Head>

      <main>
        <Container>
          <Navbar />
          {isLoading ? (
            <Image
              src="/loading.svg"
              alt="Loading Spinner"
              height="300"
              width="300"
            />
          ) : user ? (
            <div>
              <Headline>
                Hey<Highlight>&nbsp;{user.given_name || user.name}</Highlight>!
              </Headline>
              <Chat />
            </div>
          ) : (
            <div>
              <Headline>Sign in and start chatting!</Headline>
              <a href="/api/auth/login">
                <Button>Sign In</Button>
              </a>
              <a href="/api/auth/login">
                <Button>Sign Up</Button>
              </a>
            </div>
          )}
        </Container>
      </main>
    </div>
  );
};

export default Home;
