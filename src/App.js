import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import BookSearch from './BookSearch'
import { Route, Link } from 'react-router-dom'

class BooksApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      books: [],
      shelfs: ["currentlyReading", "wantToRead", "read"]
    }
    this.updateShelf = this.updateShelf.bind(this);
  }

  updateShelf(book, shelf){
    BooksAPI.update(book, shelf).then(data => {
      this.setState(prevState => {
        const idx = prevState.books.findIndex(prevStateBook => prevStateBook.id === book.id);
        if (idx === -1) { 
          book.shelf = shelf;
          return { books: prevState.books.concat(book) };
        }
        prevState.books[idx].shelf = shelf;
        return { books: prevState.books }
      })
    }).catch(error => console.log(error));
  }

  componentDidMount(){
    BooksAPI.getAll().then(fetchedBooks => 
      this.setState({
        books: fetchedBooks
      })).catch(error => console.log(error));
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() =>
          (
            <BookSearch books={this.state.books} updateShelf={this.updateShelf}/>
          )
        }/>
        <Route exact path='/' render={() =>
          (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {this.state.shelfs.map(shelf =>
                    <BookShelf shelfTitle={shelf} 
                      shelfBooks={this.state.books.filter(book => book.shelf === shelf)}
                       updateShelf={this.updateShelf} key={shelf}/>)}
                </div>
              </div>
              <div className="open-search">
                <div className="open-search"><Link to='/search'><button>Add a book</button></Link></div>
              </div>
            </div>
          )
        }/>
      </div>
    )
  }
}

export default BooksApp
