import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import BookList from './components/booklist';
import AddBook from './components/addbook';

//apollo client
const client = new ApolloClient({
  uri: "https://webdevbootcamp-infamousgodhand.c9users.io:8081/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
          <div id="main">
              <h1>Ninja Book Reading List</h1>
              <BookList/>
              <AddBook/>
          </div>
        </ApolloProvider>
    );
  }
}

export default App;
