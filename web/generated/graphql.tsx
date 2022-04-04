import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Chat = {
  __typename?: 'Chat';
  createdAt: Scalars['DateTime'];
  createdBy: User;
  createdById: Scalars['Float'];
  groupAvatarUrl?: Maybe<Scalars['String']>;
  groupName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  members: Array<User>;
  messages?: Maybe<Array<Message>>;
  updatedAt: Scalars['DateTime'];
};


export type ChatMessagesArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type Contact = {
  __typename?: 'Contact';
  contact: User;
  user: User;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Image = {
  __typename?: 'Image';
  key: Scalars['String'];
  presignedUrl: Scalars['String'];
};

export type LoginInput = {
  emailOrUsername: Scalars['String'];
  password: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  chat: Chat;
  chatId: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  imageUrl?: Maybe<Scalars['String']>;
  text: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addToContacts: Contact;
  createChat: Chat;
  editProfile: User;
  exitChat: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  removeFromContacts: Scalars['Boolean'];
  sendMessage: Message;
};


export type MutationAddToContactsArgs = {
  contactId: Scalars['Int'];
};


export type MutationCreateChatArgs = {
  groupAvatarUrl?: Maybe<Scalars['String']>;
  groupName?: Maybe<Scalars['String']>;
  userIds: Array<Scalars['Int']>;
};


export type MutationEditProfileArgs = {
  about?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  profilePictureUrl?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};


export type MutationExitChatArgs = {
  chatId: Scalars['Int'];
};


export type MutationLoginArgs = {
  options: LoginInput;
};


export type MutationRegisterArgs = {
  options: RegisterInput;
};


export type MutationRemoveFromContactsArgs = {
  contactId: Scalars['Int'];
};


export type MutationSendMessageArgs = {
  chatId: Scalars['Int'];
  imageUrl?: Maybe<Scalars['String']>;
  text: Scalars['String'];
};

export type PaginatedMessages = {
  __typename?: 'PaginatedMessages';
  hasMore: Scalars['Boolean'];
  messages: Array<Message>;
};

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  hasMore: Scalars['Boolean'];
  users: Array<User>;
};

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<User>;
  getChat: Chat;
  getChats: Array<Chat>;
  getContacts: Array<User>;
  getMessages?: Maybe<PaginatedMessages>;
  getPresignedUrl: Image;
  searchUsers: PaginatedUsers;
  users: Array<User>;
};


export type QueryGetChatArgs = {
  chatId: Scalars['Int'];
};


export type QueryGetMessagesArgs = {
  chatId: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QuerySearchUsersArgs = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
  searchTerm: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  profilePictureUrl?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: Message;
};

export type User = {
  __typename?: 'User';
  about?: Maybe<Scalars['String']>;
  chats?: Maybe<Array<Chat>>;
  contacts?: Maybe<Array<User>>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  messages?: Maybe<Array<Message>>;
  profilePictureUrl?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  ok: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type ChatFragmentFragment = { __typename?: 'Chat', id: string, groupAvatarUrl?: string | null | undefined, groupName?: string | null | undefined, updatedAt: any, members: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, profilePictureUrl?: string | null | undefined }>, messages?: Array<{ __typename?: 'Message', id: string, text: string, createdAt: any, user: { __typename?: 'User', id: string } }> | null | undefined };

export type MessageFragmentFragment = { __typename?: 'Message', id: string, text: string, imageUrl?: string | null | undefined, chatId: number, createdAt: any, user: { __typename?: 'User', id: string, firstName: string, lastName: string } };

export type AddToContactsMutationVariables = Exact<{
  contactId: Scalars['Int'];
}>;


export type AddToContactsMutation = { __typename?: 'Mutation', addToContacts: { __typename?: 'Contact', contact: { __typename?: 'User', id: string, firstName: string, lastName: string, about?: string | null | undefined, profilePictureUrl?: string | null | undefined } } };

export type CreateChatMutationVariables = Exact<{
  userIds: Array<Scalars['Int']> | Scalars['Int'];
  groupName?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
  groupAvatarUrl?: Maybe<Scalars['String']>;
}>;


export type CreateChatMutation = { __typename?: 'Mutation', createChat: { __typename?: 'Chat', id: string, groupAvatarUrl?: string | null | undefined, groupName?: string | null | undefined, updatedAt: any, members: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, profilePictureUrl?: string | null | undefined }>, messages?: Array<{ __typename?: 'Message', id: string, text: string, createdAt: any, user: { __typename?: 'User', id: string } }> | null | undefined } };

export type EditProfileMutationVariables = Exact<{
  profilePictureUrl?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  username: Scalars['String'];
  about?: Maybe<Scalars['String']>;
}>;


export type EditProfileMutation = { __typename?: 'Mutation', editProfile: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string, about?: string | null | undefined, profilePictureUrl?: string | null | undefined } };

export type LoginMutationVariables = Exact<{
  options: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', ok: boolean, user?: { __typename?: 'User', id: string, email: string, username: string, updatedAt: any, createdAt: any } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', ok: boolean, user?: { __typename?: 'User', id: string, email: string, username: string, updatedAt: any, createdAt: any } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type RemoveFromContactsMutationVariables = Exact<{
  contactId: Scalars['Int'];
}>;


export type RemoveFromContactsMutation = { __typename?: 'Mutation', removeFromContacts: boolean };

export type SendMessageMutationVariables = Exact<{
  chatId: Scalars['Int'];
  text: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'Message', id: string, text: string, imageUrl?: string | null | undefined, chatId: number, createdAt: any, user: { __typename?: 'User', id: string, firstName: string, lastName: string } } };

export type GetChatQueryVariables = Exact<{
  chatId: Scalars['Int'];
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type GetChatQuery = { __typename?: 'Query', getChat: { __typename?: 'Chat', id: string, groupAvatarUrl?: string | null | undefined, groupName?: string | null | undefined, updatedAt: any, members: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, profilePictureUrl?: string | null | undefined }>, messages?: Array<{ __typename?: 'Message', id: string, text: string, createdAt: any, user: { __typename?: 'User', id: string } }> | null | undefined } };

export type GetChatsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type GetChatsQuery = { __typename?: 'Query', getChats: Array<{ __typename?: 'Chat', id: string, groupAvatarUrl?: string | null | undefined, groupName?: string | null | undefined, updatedAt: any, members: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, profilePictureUrl?: string | null | undefined }>, messages?: Array<{ __typename?: 'Message', id: string, text: string, createdAt: any, user: { __typename?: 'User', id: string } }> | null | undefined }> };

export type GetContactsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetContactsQuery = { __typename?: 'Query', getContacts: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, about?: string | null | undefined, profilePictureUrl?: string | null | undefined }> };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: string, username: string, firstName: string, lastName: string, about?: string | null | undefined, profilePictureUrl?: string | null | undefined } | null | undefined };

export type GetMessagesQueryVariables = Exact<{
  chatId: Scalars['Int'];
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type GetMessagesQuery = { __typename?: 'Query', getMessages?: { __typename?: 'PaginatedMessages', hasMore: boolean, messages: Array<{ __typename?: 'Message', id: string, text: string, imageUrl?: string | null | undefined, chatId: number, createdAt: any, user: { __typename?: 'User', id: string, firstName: string, lastName: string } }> } | null | undefined };

export type GetPresignedUrlQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPresignedUrlQuery = { __typename?: 'Query', getPresignedUrl: { __typename?: 'Image', presignedUrl: string, key: string } };

export type SearchUsersQueryVariables = Exact<{
  searchTerm: Scalars['String'];
  limit: Scalars['Int'];
  page: Scalars['Int'];
}>;


export type SearchUsersQuery = { __typename?: 'Query', searchUsers: { __typename?: 'PaginatedUsers', hasMore: boolean, users: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, username: string, profilePictureUrl?: string | null | undefined }> } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, email: string, username: string, updatedAt: any, createdAt: any }> };

export type NewMessageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewMessageSubscription = { __typename?: 'Subscription', newMessage: { __typename?: 'Message', id: string, text: string, imageUrl?: string | null | undefined, chatId: number, createdAt: any, user: { __typename?: 'User', id: string, firstName: string, lastName: string } } };

export const ChatFragmentFragmentDoc = gql`
    fragment ChatFragment on Chat {
  id
  groupAvatarUrl
  groupName
  updatedAt
  members {
    id
    firstName
    lastName
    profilePictureUrl
  }
  messages(limit: $limit, cursor: $cursor) {
    id
    text
    createdAt
    user {
      id
    }
  }
}
    `;
export const MessageFragmentFragmentDoc = gql`
    fragment MessageFragment on Message {
  id
  text
  imageUrl
  chatId
  createdAt
  user {
    id
    firstName
    lastName
  }
}
    `;
export const AddToContactsDocument = gql`
    mutation AddToContacts($contactId: Int!) {
  addToContacts(contactId: $contactId) {
    contact {
      id
      firstName
      lastName
      about
      profilePictureUrl
    }
  }
}
    `;
export type AddToContactsMutationFn = Apollo.MutationFunction<AddToContactsMutation, AddToContactsMutationVariables>;

/**
 * __useAddToContactsMutation__
 *
 * To run a mutation, you first call `useAddToContactsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToContactsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToContactsMutation, { data, loading, error }] = useAddToContactsMutation({
 *   variables: {
 *      contactId: // value for 'contactId'
 *   },
 * });
 */
export function useAddToContactsMutation(baseOptions?: Apollo.MutationHookOptions<AddToContactsMutation, AddToContactsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddToContactsMutation, AddToContactsMutationVariables>(AddToContactsDocument, options);
      }
export type AddToContactsMutationHookResult = ReturnType<typeof useAddToContactsMutation>;
export type AddToContactsMutationResult = Apollo.MutationResult<AddToContactsMutation>;
export type AddToContactsMutationOptions = Apollo.BaseMutationOptions<AddToContactsMutation, AddToContactsMutationVariables>;
export const CreateChatDocument = gql`
    mutation CreateChat($userIds: [Int!]!, $groupName: String, $limit: Int!, $cursor: String, $groupAvatarUrl: String) {
  createChat(
    userIds: $userIds
    groupName: $groupName
    groupAvatarUrl: $groupAvatarUrl
  ) {
    ...ChatFragment
  }
}
    ${ChatFragmentFragmentDoc}`;
export type CreateChatMutationFn = Apollo.MutationFunction<CreateChatMutation, CreateChatMutationVariables>;

/**
 * __useCreateChatMutation__
 *
 * To run a mutation, you first call `useCreateChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChatMutation, { data, loading, error }] = useCreateChatMutation({
 *   variables: {
 *      userIds: // value for 'userIds'
 *      groupName: // value for 'groupName'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      groupAvatarUrl: // value for 'groupAvatarUrl'
 *   },
 * });
 */
export function useCreateChatMutation(baseOptions?: Apollo.MutationHookOptions<CreateChatMutation, CreateChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChatMutation, CreateChatMutationVariables>(CreateChatDocument, options);
      }
export type CreateChatMutationHookResult = ReturnType<typeof useCreateChatMutation>;
export type CreateChatMutationResult = Apollo.MutationResult<CreateChatMutation>;
export type CreateChatMutationOptions = Apollo.BaseMutationOptions<CreateChatMutation, CreateChatMutationVariables>;
export const EditProfileDocument = gql`
    mutation EditProfile($profilePictureUrl: String, $firstName: String!, $lastName: String!, $username: String!, $about: String) {
  editProfile(
    profilePictureUrl: $profilePictureUrl
    firstName: $firstName
    lastName: $lastName
    username: $username
    about: $about
  ) {
    id
    firstName
    lastName
    username
    about
    profilePictureUrl
  }
}
    `;
export type EditProfileMutationFn = Apollo.MutationFunction<EditProfileMutation, EditProfileMutationVariables>;

/**
 * __useEditProfileMutation__
 *
 * To run a mutation, you first call `useEditProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editProfileMutation, { data, loading, error }] = useEditProfileMutation({
 *   variables: {
 *      profilePictureUrl: // value for 'profilePictureUrl'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      username: // value for 'username'
 *      about: // value for 'about'
 *   },
 * });
 */
export function useEditProfileMutation(baseOptions?: Apollo.MutationHookOptions<EditProfileMutation, EditProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditProfileMutation, EditProfileMutationVariables>(EditProfileDocument, options);
      }
export type EditProfileMutationHookResult = ReturnType<typeof useEditProfileMutation>;
export type EditProfileMutationResult = Apollo.MutationResult<EditProfileMutation>;
export type EditProfileMutationOptions = Apollo.BaseMutationOptions<EditProfileMutation, EditProfileMutationVariables>;
export const LoginDocument = gql`
    mutation Login($options: LoginInput!) {
  login(options: $options) {
    ok
    user {
      id
      email
      username
      updatedAt
      createdAt
    }
    errors {
      field
      message
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: RegisterInput!) {
  register(options: $options) {
    ok
    user {
      id
      email
      username
      updatedAt
      createdAt
    }
    errors {
      field
      message
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RemoveFromContactsDocument = gql`
    mutation RemoveFromContacts($contactId: Int!) {
  removeFromContacts(contactId: $contactId)
}
    `;
export type RemoveFromContactsMutationFn = Apollo.MutationFunction<RemoveFromContactsMutation, RemoveFromContactsMutationVariables>;

/**
 * __useRemoveFromContactsMutation__
 *
 * To run a mutation, you first call `useRemoveFromContactsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFromContactsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFromContactsMutation, { data, loading, error }] = useRemoveFromContactsMutation({
 *   variables: {
 *      contactId: // value for 'contactId'
 *   },
 * });
 */
export function useRemoveFromContactsMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFromContactsMutation, RemoveFromContactsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveFromContactsMutation, RemoveFromContactsMutationVariables>(RemoveFromContactsDocument, options);
      }
export type RemoveFromContactsMutationHookResult = ReturnType<typeof useRemoveFromContactsMutation>;
export type RemoveFromContactsMutationResult = Apollo.MutationResult<RemoveFromContactsMutation>;
export type RemoveFromContactsMutationOptions = Apollo.BaseMutationOptions<RemoveFromContactsMutation, RemoveFromContactsMutationVariables>;
export const SendMessageDocument = gql`
    mutation SendMessage($chatId: Int!, $text: String!, $imageUrl: String) {
  sendMessage(chatId: $chatId, text: $text, imageUrl: $imageUrl) {
    ...MessageFragment
  }
}
    ${MessageFragmentFragmentDoc}`;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      text: // value for 'text'
 *      imageUrl: // value for 'imageUrl'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const GetChatDocument = gql`
    query GetChat($chatId: Int!, $limit: Int!, $cursor: String) {
  getChat(chatId: $chatId) {
    ...ChatFragment
  }
}
    ${ChatFragmentFragmentDoc}`;

/**
 * __useGetChatQuery__
 *
 * To run a query within a React component, call `useGetChatQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetChatQuery(baseOptions: Apollo.QueryHookOptions<GetChatQuery, GetChatQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChatQuery, GetChatQueryVariables>(GetChatDocument, options);
      }
export function useGetChatLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChatQuery, GetChatQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChatQuery, GetChatQueryVariables>(GetChatDocument, options);
        }
export type GetChatQueryHookResult = ReturnType<typeof useGetChatQuery>;
export type GetChatLazyQueryHookResult = ReturnType<typeof useGetChatLazyQuery>;
export type GetChatQueryResult = Apollo.QueryResult<GetChatQuery, GetChatQueryVariables>;
export const GetChatsDocument = gql`
    query GetChats($limit: Int!, $cursor: String) {
  getChats {
    ...ChatFragment
  }
}
    ${ChatFragmentFragmentDoc}`;

/**
 * __useGetChatsQuery__
 *
 * To run a query within a React component, call `useGetChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetChatsQuery(baseOptions: Apollo.QueryHookOptions<GetChatsQuery, GetChatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChatsQuery, GetChatsQueryVariables>(GetChatsDocument, options);
      }
export function useGetChatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChatsQuery, GetChatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChatsQuery, GetChatsQueryVariables>(GetChatsDocument, options);
        }
export type GetChatsQueryHookResult = ReturnType<typeof useGetChatsQuery>;
export type GetChatsLazyQueryHookResult = ReturnType<typeof useGetChatsLazyQuery>;
export type GetChatsQueryResult = Apollo.QueryResult<GetChatsQuery, GetChatsQueryVariables>;
export const GetContactsDocument = gql`
    query GetContacts {
  getContacts {
    id
    firstName
    lastName
    about
    profilePictureUrl
  }
}
    `;

/**
 * __useGetContactsQuery__
 *
 * To run a query within a React component, call `useGetContactsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContactsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContactsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetContactsQuery(baseOptions?: Apollo.QueryHookOptions<GetContactsQuery, GetContactsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContactsQuery, GetContactsQueryVariables>(GetContactsDocument, options);
      }
export function useGetContactsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContactsQuery, GetContactsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContactsQuery, GetContactsQueryVariables>(GetContactsDocument, options);
        }
export type GetContactsQueryHookResult = ReturnType<typeof useGetContactsQuery>;
export type GetContactsLazyQueryHookResult = ReturnType<typeof useGetContactsLazyQuery>;
export type GetContactsQueryResult = Apollo.QueryResult<GetContactsQuery, GetContactsQueryVariables>;
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  currentUser {
    id
    username
    firstName
    lastName
    about
    profilePictureUrl
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetMessagesDocument = gql`
    query GetMessages($chatId: Int!, $limit: Int!, $cursor: String) {
  getMessages(chatId: $chatId, limit: $limit, cursor: $cursor) {
    hasMore
    messages {
      ...MessageFragment
    }
  }
}
    ${MessageFragmentFragmentDoc}`;

/**
 * __useGetMessagesQuery__
 *
 * To run a query within a React component, call `useGetMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetMessagesQuery(baseOptions: Apollo.QueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options);
      }
export function useGetMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options);
        }
export type GetMessagesQueryHookResult = ReturnType<typeof useGetMessagesQuery>;
export type GetMessagesLazyQueryHookResult = ReturnType<typeof useGetMessagesLazyQuery>;
export type GetMessagesQueryResult = Apollo.QueryResult<GetMessagesQuery, GetMessagesQueryVariables>;
export const GetPresignedUrlDocument = gql`
    query GetPresignedUrl {
  getPresignedUrl {
    presignedUrl
    key
  }
}
    `;

/**
 * __useGetPresignedUrlQuery__
 *
 * To run a query within a React component, call `useGetPresignedUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPresignedUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPresignedUrlQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPresignedUrlQuery(baseOptions?: Apollo.QueryHookOptions<GetPresignedUrlQuery, GetPresignedUrlQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPresignedUrlQuery, GetPresignedUrlQueryVariables>(GetPresignedUrlDocument, options);
      }
export function useGetPresignedUrlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPresignedUrlQuery, GetPresignedUrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPresignedUrlQuery, GetPresignedUrlQueryVariables>(GetPresignedUrlDocument, options);
        }
export type GetPresignedUrlQueryHookResult = ReturnType<typeof useGetPresignedUrlQuery>;
export type GetPresignedUrlLazyQueryHookResult = ReturnType<typeof useGetPresignedUrlLazyQuery>;
export type GetPresignedUrlQueryResult = Apollo.QueryResult<GetPresignedUrlQuery, GetPresignedUrlQueryVariables>;
export const SearchUsersDocument = gql`
    query SearchUsers($searchTerm: String!, $limit: Int!, $page: Int!) {
  searchUsers(searchTerm: $searchTerm, limit: $limit, page: $page) {
    hasMore
    users {
      id
      firstName
      lastName
      username
      profilePictureUrl
    }
  }
}
    `;

/**
 * __useSearchUsersQuery__
 *
 * To run a query within a React component, call `useSearchUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUsersQuery({
 *   variables: {
 *      searchTerm: // value for 'searchTerm'
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useSearchUsersQuery(baseOptions: Apollo.QueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, options);
      }
export function useSearchUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, options);
        }
export type SearchUsersQueryHookResult = ReturnType<typeof useSearchUsersQuery>;
export type SearchUsersLazyQueryHookResult = ReturnType<typeof useSearchUsersLazyQuery>;
export type SearchUsersQueryResult = Apollo.QueryResult<SearchUsersQuery, SearchUsersQueryVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  users {
    id
    email
    username
    updatedAt
    createdAt
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const NewMessageDocument = gql`
    subscription NewMessage {
  newMessage {
    ...MessageFragment
  }
}
    ${MessageFragmentFragmentDoc}`;

/**
 * __useNewMessageSubscription__
 *
 * To run a query within a React component, call `useNewMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMessageSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewMessageSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewMessageSubscription, NewMessageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewMessageSubscription, NewMessageSubscriptionVariables>(NewMessageDocument, options);
      }
export type NewMessageSubscriptionHookResult = ReturnType<typeof useNewMessageSubscription>;
export type NewMessageSubscriptionResult = Apollo.SubscriptionResult<NewMessageSubscription>;