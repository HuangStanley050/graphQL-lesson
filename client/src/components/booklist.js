import React, { Component } from 'react';
import BookDetails from "./bookdetails";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";



class BookList extends Component {
    state = {
        selected: null
    }
    displayBooks = () => {
        let data = this.props.data;
        if (data.loading) {
            return <div>Loading Books...</div>;
        }
        else {
            return data.books.map(book => {
                return <li onClick={(e)=>{this.setState({selected:book.id})}} key={book.id}>{book.name}</li>;
            });
        }
    }
    render() {
        //console.log(this.props);
        return (
            <div>
            <ul id="book-list">
              {this.displayBooks()}
            </ul>
            <BookDetails bookId={this.state.selected}/>
        </div>
        );
    }
}

export default graphql(getBooksQuery)(BookList);
