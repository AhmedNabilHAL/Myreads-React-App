import React from 'react'
import PropTypes from 'prop-types';
import BookList from './BookList';

function BookShelf(props){

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.shelfTitle}</h2>
            <div className="bookshelf-books">
                <BookList books={props.shelfBooks} updateShelf={props.updateShelf} />
            </div>
        </div>
    );
}

BookShelf.propTypes = {
    shelfTitle: PropTypes.string.isRequired,
    shelfBooks: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
}

export default BookShelf;