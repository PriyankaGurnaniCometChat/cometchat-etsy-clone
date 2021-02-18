import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Button,Navbar, Nav, ListGroup,Form, FormControl, Card, Row} from 'react-bootstrap';
import styled from 'styled-components';
import productImg from '../assets/img/Juice.jpg'
import {CometChat} from "@cometchat-pro/chat"
import { useHistory } from 'react-router'

const Styles = styled.div `

.list-group-item{
    border: none;
    padding: .1rem 1rem;
}

.search-bar{
    width: 990px;
    border-radius: 20px;
    background: #EFEFEF;
} 

`

export const Product = ({match}) => {
    const [products, setProducts] = React.useState([])
    const [messages,setMessages] = React.useState([])
    const [message,setMessage]= React.useState('')
    const [active,setActive] = React.useState(false)
    const history = useHistory()


const getProduct = async ()=>{
        
        const response = await fetch(`http://localhost:5000/products/product/${match.params.id}`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'same-origin', 
            headers: {
              'Content-Type': 'application/json'
            },
          });
          const datas = await response.json()
          setProducts(datas); 
    }

    CometChat.addMessageListener(
        "UNIQUE_LISTENER_ID",
        new CometChat.MessageListener({
          onTextMessageReceived: textMessage => {
            console.log("Text message received successfully", textMessage);
            const data = {
                'name':textMessage.sender.name,
                'text':textMessage.text
            }
            setMessages(messages.concat(data))
          }
        })
      );


const sendMessage = (e)=>{
        e.preventDefault()
    
    var receiverID = products.user;
    var messageText = message;
    var receiverType = CometChat.RECEIVER_TYPE.USER;
    
    var textMessage = new CometChat.TextMessage(
      receiverID,
      messageText,
      receiverType
    );
    
    CometChat.sendMessage(textMessage).then(
      message => {
        console.log("Message sent successfully:", message);
        setMessage('')
        const data = {
            'name':message.sender.name,
            'text':message.text
        }
        setMessages(messages.concat(data))
    })
    }

const logout = () => {
        CometChat.logout().then(() => {
        localStorage.removeItem("user")
          window.location.href = '/';
        });
      }

const chat = () =>{
    if(localStorage.getItem('user') == products.user){
        history.push('/chat')
    }else{
        console.log("dfa");
        setActive(true)
    }
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

                
                    <Container className="mt-5">
                        <Row>
                        <Col md={6}>
                        <Card.Img variant="top" src={productImg} />
                        </Col>

                        <Col md={6}>
                        <h3 className="product-title">{products.name}</h3>
						<div className="rating">
							<div className="stars">
								<span className="fa fa-star checked"></span>
								<span className="fa fa-star checked"></span>
								<span className="fa fa-star checked"></span>
								<span className="fa fa-star"></span>
								<span className="fa fa-star"></span>
							</div>
							<span className="review-no">460 reviews</span>
						</div>
						<p> {products.description}</p>
						<h4>Current price: <span>{products.price}</span></h4>
						
						<div className="action">
							<Button className="add-to-cart btn btn-default" type="button">Add to cart</Button>
                            <Button onClick={chat} className="add-to-cart btn btn-default" type="button">Chat</Button>

							
						</div>
                        </Col>
                        </Row>

                    </Container>
{active == true ? 
                    <Container>
                        <Row>
                            <Col md={6}>
                            <div className="">
                   {messages.map((message,i)=>(
                    <div className="" key={i}>
                    <p><span><b>{message.sender ? message.sender.name:message.name}:</b></span> {message.text}</p>
                    </div>
                   ))}
                   </div>
                   
                <div className="msg">
                    <form onSubmit={sendMessage}>   
                    <input type="text" placeholder="Say something" value={message} onChange={(e)=> setMessage(e.target.value)} />
                    <button type="submit"> <i className="fa fa-send"></i>  </button>
                    </form>
                   </div>
                            </Col>
                        </Row>
                    </Container>
               : null}
        </Styles>
    )
}