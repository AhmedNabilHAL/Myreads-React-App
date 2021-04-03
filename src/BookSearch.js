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
        this.updateShelf = this.updateShelf.bind(this);
    }

    handleChange(event){
        this.setState({ query: event.target.value });
        BooksAPI.search(event.target.value).then(books => {
            if(!books || books.error) return this.setState({ books: [] });;
            books = books.map(book =>{
                const propBook = this.props.books.find(propBook => book.id === propBook.id);
                if (propBook) return propBook;
                book['shelf'] = 'none';
                return book;
            })
            this.setState({ books: books })
        }).catch(error => {
            this.setState({ books: [] });
            console.log(error);
        });
    }

    updateShelf(book, shelf){
        this.props.updateShelf(book, shelf);
        this.setState(prevState => {
            const idx = prevState.books.findIndex(prevStateBook => prevStateBook.id === book.id);
            if (idx === -1) return { books: prevState.books }
            prevState.books[idx].shelf = shelf;
            return { books: prevState.books }
        })
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
                <BookList books={this.state.books} updateShelf={this.updateShelf} />
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