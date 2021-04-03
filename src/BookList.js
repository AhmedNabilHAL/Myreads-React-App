import React from 'react'
import PropTypes from 'prop-types';
import Book from './Book';

function BookList(props){

    return(
        <ol className="books-grid">
            {props.books.map(book => {
                return <li key={book.id}><Book {...book} updateShelf={props.updateShelf} /></li>
            })}
        </ol>
    );
}

BookList.propTypes = {
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
}

export default BookList;