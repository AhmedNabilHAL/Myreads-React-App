import React from 'react'
import PropTypes from 'prop-types';

function Book(props){
    function updateShelf(event){
        props.updateShelf({...props}, event.target.value);
    }
    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, 
                    backgroundImage: `url(${(props.imageLinks !== undefined && props.imageLinks.smallThumbnail)})` }}></div>
                <div className="book-shelf-changer">
                    <select value={props.shelf} onChange={updateShelf}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{props.title}</div>
            <div className="book-authors">{(props.authors !== undefined && props.authors.toString())}</div>
        </div>
    );
}

Book.propTypes = {
    imageLinks: PropTypes.object,
    shelf: PropTypes.string,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array,
    id: PropTypes.string.isRequired,
    updateShelf: PropTypes.func.isRequired
}

export default Book;