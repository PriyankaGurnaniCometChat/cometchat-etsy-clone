import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Button,Navbar, Nav, ListGroup,Form, FormControl, Card, CardDeck, Row} from 'react-bootstrap';
import styled from 'styled-components';
import productImg from '../assets/img/Juice.jpg'
import {CometChat} from "@cometchat-pro/chat"

const Styles = styled.div `
.search-bar{
    width: 990px;
    border-radius: 20px;
    background: #EFEFEF;
} 
.list-group-item{
    border: none;
    padding: .1rem 1rem;
}

.card-deck .card{
    margin-right: 0;
    margin-left: 0;
    border: none;
}
.top-card{
    height: 250px;
    width: 300px;

}
.card{
    border: none;
}
.price-tag{
    background: white;
    border-radius: 30px;
    padding: 9px;
}
`

export const Home = () => {
    const [products, setProducts] = React.useState([])

    const getProduct = async ()=>{
        const response = await fetch("http://localhost:5000/products/products", {
            method: 'GET',
            mode: 'cors',
            credentials: 'same-origin', 
            headers: {
              'Content-Type': 'application/json'
            },
          });
          const data = await response.json()

          setProducts(data); 
    }

const logout = () => {
        CometChat.logout().then(() => {
            localStorage.removeItem("user")
          window.location.href = '/';
        });
      }
React.useEffect(()=>{
    getProduct()
},[])
    return (
        <Styles>
           
            
            <Navbar bg="white" expand="lg" className="p-4">
                <Navbar.Brand href="#home">Logo</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Form inline>
                    <FormControl type="text" placeholder="Search for anything" className="search-bar"/>
                   
                    </Form>
                    </Nav>
                    {localStorage.getItem('user') ? <small onClick={logout}>logout</small> :
                    <Link  to="/login" >
                    <Button variant="white" size="sm" className="m-3">Sign in</Button>
                    </Link>
                    }
                    {localStorage.getItem('user') ? <Link  to="/create-product" > <Button variant="success" size="sm" className="m-3">+product</Button> </Link> :null}

                    <span><i className="fa fa-shopping-cart"></i></span>
                </Navbar.Collapse>
                </Navbar>

                <ListGroup horizontal>
                <ListGroup.Item>Holiday Shop</ListGroup.Item>
                <ListGroup.Item>Wedding & party</ListGroup.Item>
                <ListGroup.Item>Art & Collectibles</ListGroup.Item>
                <ListGroup.Item>Home & Living</ListGroup.Item>
                <ListGroup.Item>Craft Supplies</ListGroup.Item>
                <ListGroup.Item>Clothing & Shoes</ListGroup.Item>
                <ListGroup.Item>Toys & Entertainment</ListGroup.Item>
                <ListGroup.Item>Gifts & Gifts Cards</ListGroup.Item>
                </ListGroup>

                
                    <CardDeck>
                    <Card className="top-card">
                        <Card.Body className='head-card'>
                        <Card.Title>
                        <span className="price-tag"> <small>67.00</small> </span>
                        </Card.Title>
                       
                        </Card.Body>
                       
                    </Card>
                    <Card className="top-card">
                        <Card.Body className='head-card'>
                        <Card.Title>
                        <span className="price-tag"> <small>67.00</small> </span>
                        </Card.Title>
                       
                        </Card.Body>
                       
                    </Card>
                    <Card className="top-card">
                        <Card.Body className='head-card'>
                        <Card.Title>
                        <span className="price-tag"> <small>67.00</small> </span>
                        </Card.Title>
                       
                        </Card.Body>
                       
                    </Card>
                    <Card className="top-card">
                        <Card.Body className='head-card'>
                        <Card.Title>
                        <span className="price-tag"> <small>67.00</small> </span>
                        </Card.Title>
                       
                        </Card.Body>
                       
                    </Card>
                    <Card className="top-card">
                        <Card.Body className='head-card'>
                        <Card.Title>
                        <span className="price-tag"> <small>67.00</small> </span>
                        </Card.Title>
                       
                        </Card.Body>
                       
                    </Card>
                    
                    
                    </CardDeck>

                   
                        
                        <Row className="justify-content-md-center align-items-center">
                       
                       <div className="intro-sec text-center">
                           <div className="m-3" ><small >EDITORS PICK</small></div>
                           <h4>Holiday decor</h4>
                           <small>Add a pinch of merry, a dash of cozy, and you/ve got a recipe for a festive home</small>
                       </div>

                        
                        </Row>
                        
                        
                

                    <Container>
                        <Row>
                        {products.map((product)=>(
                            <Col md={3}>
                            <Link to={`/product/${product.id}`}>
                            <Card className="text-dark">
                                <Card.Img variant="top" src={productImg} />
                                <Card.Body>
                                <Card.Text>
                                   {product.name}
                                </Card.Text>
                                <small>{product.user}</small>
                                <p>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>(75)
                                </p>
                                <small>{product.price}</small>
                                </Card.Body>
                                
                            </Card>
                            </Link>
                            </Col>
                        ))
                        }
                        </Row>
                    </Container>
                    
               
          

        </Styles>
    )
}