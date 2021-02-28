import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Button,Navbar, Nav, ListGroup,Form, FormControl, Card, CardDeck, Row} from 'react-bootstrap';
import styled from 'styled-components';
import productImg from '../assets/img/Juice.jpg'
import product1 from '../assets/img/product1.jpg'
import product2 from '../assets/img/product2.jpg'
import product3 from '../assets/img/product3.jpg'
import product4 from '../assets/img/product4.jpg'

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
}
.top-card{
    height: 250px;
    width: 300px;
    background-color: rgb(221, 235, 227);

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
                    <div class="deck-color text-center mt-2">
                        <p className="mt-2">Find things you'll love. Support independent sellers. Only on Etsy.</p>
                        <h2>Everyday finds</h2>
                    <CardDeck>

                    <Card className="top-card ">
                    <img  src={productImg} className="img-border ml-5 mr-5 mt-5" alt="product1"/> 
                    <Card.Text>Juice</Card.Text>          
          
                    </Card>
                    
                    <Card className="top-card ">
                    <img  src={product1} className="img-border ml-5 mr-5 mt-5" alt="product2"/>
                    <Card.Text>Pillows</Card.Text>          
           
                    </Card>

                    <Card className="top-card ">
                    <img  src={product2} className="img-border ml-5 mr-5 mt-5" alt="product3"/> 
                    <Card.Text>Body Lotion</Card.Text>          
          
                    </Card>

                    <Card className="top-card ">
                    <img  src={product3} className="img-border ml-5 mr-5 mt-5" alt="product4"/>
                    <Card.Text>face mask</Card.Text>          
           
                    </Card>

                    <Card className="top-card ">
                    <img  src={product4} className="img-border ml-5 mr-5 mt-5" alt="product5"/> 
                    <Card.Text>Necklace</Card.Text>          
                    </Card>
                    
                    
                    </CardDeck>
                    </div>
                    <Container>            

                    <Row className="mt-4">
                        <h5> Suggested searches</h5> <span className="ml-2">Based on your recent activity</span>
                    </Row>
                    <Row>
                    <CardDeck>

<Card className="m-4">
<img  src={productImg} className="img-suggested" alt="product6"/> 
<Card.Text>Juice</Card.Text>          

</Card>

<Card className="m-4">
<img  src={product1} className="img-suggested" alt="product7"/>
<Card.Text>Pillows</Card.Text>          

</Card>

<Card>
<img  src={product2} className="img-suggested" alt="product8"/> 
<Card.Text>Body Lotion</Card.Text>          

</Card>

<Card className="m-4">
<img  src={product3} className="img-suggested" alt="product9"/>
<Card.Text>face mask</Card.Text>          

</Card>

<Card className="m-4">
<img  src={product4} className="img-suggested" alt="product10"/> 
<Card.Text>Necklace</Card.Text>          
</Card>

<Card className="m-4">
<img  src={product1} className="img-suggested" alt="product11"/> 
<Card.Text>Necklace</Card.Text>          
</Card>

<Card className="m-4">
<img  src={productImg} className="img-suggested" alt="product12"/> 
<Card.Text>Necklace</Card.Text>          
</Card>


</CardDeck>
                    </Row>
                    </Container>
                        
                      

                    <Container>
                    <h5>Recently Viewed & More</h5>

                        <Row>
                        {products.map((product,i)=>(
                            <Col md={3} key={i}>
                            <Link to={`/product/${product.id}`}>
                            <Card className="text-dark img-size">
                                <Card.Img variant="top" src={product3} />
                                <Card.Body>
                                <b> USD {product.price}</b>
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