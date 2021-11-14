import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  useMutation,
} from '@apollo/client';
import { useUser } from '@auth0/nextjs-auth0';
import { useSelector, useDispatch } from 'react-redux';
import { updateContent } from '../../features/mainSlice';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

const GET_MESSAGES = gql`
  query {
    messages {
      id
      user
      content
    }
  }
`;

const POST_MESSAGE = gql`
  mutation ($user: String!, $content: String!) {
    postMessage(user: $user, content: $content)
  }
`;

const Messages = ({ user }) => {
  const { data } = useQuery(GET_MESSAGES, {
    pollInterval: 500,
  });
  if (!data) {
    return null;
  }

  return (
    <div>
      {data.messages.map(({ id, user: messageUser, content }) => (
        <div
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

const Message = () => {
  const { user } = useUser();
  const { content } = useSelector((state) => state.main);
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
        defaultValue={content}
        type="text"
        onChange={(e) => dispatch(updateContent(e.target.value))}
      />
      <button onClick={() => sendMessage()}>Send</button>
    </div>
  );
};

export default function Chat() {
  return (
    <ApolloProvider client={client}>
      <Message />
    </ApolloProvider>
  );
}
