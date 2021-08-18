import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Jumbotron,Carousel} from 'react-bootstrap';
import './BestBooks.css';
import axios from 'axios'

class MyFavoriteBooks extends React.Component {
  constructor(){
    super();
    this.state={
      book:[],
    }
  }
  componentDidMount =  () => {  
    if(this.props.auth0.isAuthenticated) {
       
      this.props.auth0.getIdTokenClaims()
      .then(result => {
        const jwt = result.__raw;
        const config = {
          headers: {"Authorization" : `Bearer ${jwt}`},
          method: 'get',
          baseURL: 'http://localhost:3020',
          url: '/test'
        }
        axios(config)
          .then(axiosResults => console.log(axiosResults.data))
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
    }

    let bookURL =`http://localhost:3020/book?email=mnnnnn305@gmail.com`;
    axios.get(bookURL).then(res=>{
      console.log(res.data);
      this.setState({
        book:res.data[0].listBooks
      })
    })
  }    
  render() {
    return(
      <>
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
      </Jumbotron>
      <Carousel>
                    {
                        this.state.book.map((book, index) => {
                            return (
                                <Carousel.Item key={index} >
                                    <img
                                        className="d-block w-100"
                                        src="https://images.unsplash.com/photo-1581299327801-faeb40ea459e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Ymx1ZSUyMHRleHR1cmV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
                                        alt="First slide"
                                    />
                                    <Carousel.Caption>
                                        <h1 style={{color:"#fff"}}>{book.name}</h1>
                                        <p style={{color:"#fff"}}>{book.description}</p>
                                        <p style={{color:"#fff"}}>{book.status}</p>
                                    </Carousel.Caption>
                                    
                                </Carousel.Item>
                            )
                        })
                    }
                </Carousel>
      </>
    )
  }
}

export default MyFavoriteBooks;
