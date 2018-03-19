import React from 'react';
import {AsyncStorage} from 'react-native';
// apploProvider
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';

//my import
import Routes from './routes';
import {TOKEN_KEY }from './Components/MyConstants'
import {IP_ADRESS} from 'react-native-dotenv'

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const uploadLink = createUploadLink({ uri: `http://${IP_ADRESS}:4000` });

const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache(),
});


// my import
export default () => {
	return (
	<ApolloProvider client={client}>
	  <Routes/>
	</ApolloProvider>
	);
}
