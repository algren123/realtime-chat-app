import React, { useEffect, useRef, useState } from 'react';
import {
  Container,
  MessageInput,
  SendButton,
  MessageContainer,
  MessageBubble,
  MessageContent,
  MessageName,
  UserPicture,
  NameContainer,
  HoverTooltip,
  TrashIcon,
  BubbleContainer,
} from './Chat.styles';
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
import { BsFillTrashFill } from 'react-icons/bs';

// Workaround to make subscriptions work on Next.JS - headache
const wsLink: any =
  typeof window !== 'undefined'
    ? new WebSocketLink({
        uri:
          process.env.NODE_ENV === 'development'
            ? `ws://localhost:4000/subscriptions`
            : 'wss://frozen-peak-50233.herokuapp.com/subscriptions',
        options: {
          reconnect: true,
        },
      })
    : null;

const httplink: any = new HttpLink({
  uri:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:4000/graphql'
      : 'https://frozen-peak-50233.herokuapp.com/graphql',
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
  uri:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:4000/graphql'
      : 'https://frozen-peak-50233.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

// Subscribe to the messages from GraphQL API
const GET_MESSAGES = gql`
  subscription {
    messages {
      id
      user
      content
      picture
      name
      date
      time
    }
  }
`;

// Send message to the GraphQL API
const POST_MESSAGE = gql`
  mutation (
    $user: String!
    $content: String!
    $picture: String!
    $name: String!
  ) {
    postMessage(user: $user, content: $content, picture: $picture, name: $name)
  }
`;

const DELETE_MESSAGE = gql`
  mutation ($id: ID!) {
    deleteMessage(id: $id)
  }
`;

// Renders the content and also adds the hover tooltip
const MessageText = ({ id, user, messageUser, content, date, time }: any) => {
  const [hovered, setHovered] = useState(false);

  const [deleteMessage] = useMutation(DELETE_MESSAGE);
  const handleDeleteMessage = (id: number) => {
    deleteMessage({
      variables: {
        id,
      },
    });
  };
  return (
    <>
      {hovered ? (
        <HoverTooltip user={user} messageUser={messageUser}>
          {date + ' at ' + time}
        </HoverTooltip>
      ) : (
        ''
      )}
      <MessageContent
        user={user}
        messageUser={messageUser}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {content}
      </MessageContent>
      {messageUser === user ? (
        <TrashIcon onClick={() => handleDeleteMessage(id)}>
          <BsFillTrashFill />
        </TrashIcon>
      ) : (
        ''
      )}
    </>
  );
};

// Render available messages
const Messages = ({ user }: UserProfile) => {
  // Fetches the messages from the GraphQL Api
  const { data } = useSubscription(GET_MESSAGES);

  // Created an empty dev at the bottom of the messages so it has a reference for where to scroll to the 'bottom'
  const messagesEndRef: any = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      block: 'center',
      behavior: 'smooth',
    });
  };

  // Whenever a message is sent, it will scroll to the bottom
  useEffect(() => {
    scrollToBottom();
  }, [data]);

  if (!data) {
    return (
      <div>
        <h1>No messages yet</h1>
      </div>
    );
  }

  return (
    <>
      <MessageContainer>
        {data.messages.map(
          ({
            id,
            user: messageUser,
            content,
            picture,
            name,
            date,
            time,
          }: any) => (
            <MessageBubble key={id} user={user} messageUser={messageUser}>
              <BubbleContainer>
                <NameContainer user={user} messageUser={messageUser}>
                  <MessageName>{name}</MessageName>
                  <UserPicture src={picture} />
                </NameContainer>
                <MessageText
                  id={id}
                  user={user}
                  messageUser={messageUser}
                  content={content}
                  date={date}
                  time={time}
                />
              </BubbleContainer>
            </MessageBubble>
          )
        )}
        <div ref={messagesEndRef}></div>
      </MessageContainer>
    </>
  );
};

// Main UI
const Message = () => {
  const { user }: any = useUser();
  const { content }: any = useSelector((state: any) => state.main);
  const dispatch = useDispatch();

  const [postMessage] = useMutation(POST_MESSAGE);
  const sendMessage = () => {
    if (content.length > 0) {
      postMessage({
        variables: {
          user: user.email,
          content,
          picture: user.picture,
          name: user.given_name || user.name,
        },
      });
      dispatch(updateContent(''));
    }
  };

  return (
    <Container>
      <Messages user={user.email} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <MessageInput
          value={content}
          type="text"
          onChange={(e: { target: { value: any } }) =>
            dispatch(updateContent(e.target.value))
          }
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
        />
        <SendButton onClick={() => sendMessage()}>Send</SendButton>
      </div>
    </Container>
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
