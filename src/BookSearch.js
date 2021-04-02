import React from 'react';
import PropTypes from 'prop-types';
import BookList from './BookList'
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom'

class BookSearch extends React.Component{
    constructor(props){
        super(props);
        this.state={
            query: '',
            books: []
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({ query: event.target.value });
        BooksAPI.search(event.target.value).then(books => {
            console.log(books);
            this.setState({ books: books })
        });
    }

    render(){
        return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to='/'>Close</Link>
                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author"
                     value={this.state.query} onChange={this.handleChange} />
                </div>
            </div>
            <div className="search-books-results">
                <BookList books={this.state.books.map(stateBook =>{
                    const propBook = this.props.books.find(propBook => stateBook.id === propBook.id);
                    if (propBook) return propBook;
                    return stateBook;
                })} updateShelf={this.props.updateShelf} />
            </div>
        </div>
        );
    }
}

BookSearch.propTypes = {
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
}

export default BookSearch;