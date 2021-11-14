import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useSubscription,
  gql,
  useMutation,
  HttpLink,
} from '@apollo/client';
import { UserProfile, useUser } from '@auth0/nextjs-auth0';
import { useSelector, useDispatch } from 'react-redux';
import { updateContent } from '../../features/mainSlice';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';

// Workaround to make subscriptions work on Next.JS - headache
const wsLink: any =
  typeof window !== 'undefined'
    ? new WebSocketLink({
        uri: `ws://localhost:4000/`,
        options: {
          reconnect: true,
        },
      })
    : null;

const httplink: any = new HttpLink({
  uri: 'http://localhost:4000/',
  credentials: 'same-origin',
});

const link: any =
  typeof window !== 'undefined'
    ? split(
        ({ query }) => {
          const { kind, operation }: any = getMainDefinition(query);
          return kind === 'OperationDefinition' && operation === 'subscription';
        },
        wsLink,
        httplink
      )
    : httplink;

const client = new ApolloClient({
  link,
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

// Subscribe to the messages from GraphQL API
const GET_MESSAGES = gql`
  subscription {
    messages {
      id
      user
      content
    }
  }
`;

// Send message to the GraphQL API
const POST_MESSAGE = gql`
  mutation ($user: String!, $content: String!) {
    postMessage(user: $user, content: $content)
  }
`;

// Render available messages
const Messages = ({ user }: UserProfile) => {
  const { data } = useSubscription(GET_MESSAGES);
  if (!data) {
    return (
      <div>
        <h1>No messages yet</h1>
      </div>
    );
  }

  return (
    <div>
      {data.messages.map(({ id, user: messageUser, content }: any) => (
        <div
          key={id}
          style={{
            display: 'flex',
            justifyContent: user === messageUser ? 'flex-end' : 'flex-start',
            paddingBottom: '1em',
          }}
        >
          <div
            style={{
              background: user === messageUser ? '#58bf56' : '#e5e6ea',
              color: user === messageUser ? 'white' : 'black',
              borderRadius: '1em',
              padding: '1em',
            }}
          >
            {content}
          </div>
        </div>
      ))}
    </div>
  );
};

// Main UI
const Message = () => {
  const { user }: any = useUser();
  const { content }: any = useSelector((state: any) => state.main);
  const dispatch = useDispatch();

  const [postMessage] = useMutation(POST_MESSAGE);
  const sendMessage = () => {
    console.log(content.length);
    if (content.length > 0) {
      postMessage({
        variables: {
          user: user.email,
          content,
        },
      });
    }
    dispatch(updateContent(''));
  };

  return (
    <div>
      <Messages user={user.email} />
      <input
        value={content}
        type="text"
        onChange={(e) => dispatch(updateContent(e.target.value))}
      />
      <button onClick={() => sendMessage()}>Send</button>
    </div>
  );
};

// Exporting it this way to pass in the client provider
export default function Chat() {
  return (
    <ApolloProvider client={client}>
      <Message />
    </ApolloProvider>
  );
}
