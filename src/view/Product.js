import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Button,Navbar, Nav, ListGroup,Form, FormControl, Collapse, Row} from 'react-bootstrap';
import styled from 'styled-components';
import {CometChat} from "@cometchat-pro/chat"
import { useHistory } from 'react-router'
import product3 from '../assets/img/product3.jpg'

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
.add-to-cart{
    width:300px;
    border-radius:100px;
}

`

export const Product = ({match}) => {
    const [products, setProducts] = React.useState([])
    const [messages,setMessages] = React.useState([{name:"",sender:""},{}])
    const [message,setMessage]= React.useState('')
    const [active,setActive] = React.useState(false)
    const [open, setOpen] = React.useState(false);

    const history = useHistory()


const getProduct = React.useCallback(async ()=>{
        
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
        },[match.params.id])

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
        setActive(!active)
    }
}

React.useEffect(()=>{
    getProduct()
},[getProduct])
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
                        <Col md={8}>
                        <img src={product3} className="product-img" alt="product1"/>
                        </Col>

                        <Col md={4}>
                            
                            <div className="rating">
                            <span>{products.user}</span>
							<div className="stars">
                            <span className="review-no">460 sales  </span>
								<span className="fa fa-star checked"></span>
								<span className="fa fa-star checked"></span>
								<span className="fa fa-star checked"></span>
								<span className="fa fa-star"></span>
								<span className="fa fa-star"></span>
							</div>
							
						</div>

                        <p className="product-title mt-2">{products.name}</p>
						
						<h4>USD <span>{products.price}</span></h4>
                        <h5 onClick={() => setOpen(!open)} className="mt-4 mb-3">Description
                        <i className={ open===false ? "fa fa-angle-down rotate-icon" : "fa fa-angle-down" } />
                        </h5>
                        <Collapse in={open}>
                        <div id="example-collapse-text">
                        <p> {products.description}</p>
                        </div>
                        </Collapse>
						<div className="action">
							<Button className="add-to-cart btn btn-dark" type="button" >Add to cart</Button>
						</div>
                        <h5 onClick={chat} className="mt-4 mb-3">Message { localStorage.getItem('user') !== products.user ? products.user: "Users"}
                        <i className={ active===false ? "fa fa-angle-down " : "fa fa-angle-up" } />
                        </h5>
                        <Collapse in={active}>
                        <div id="example-collapse-text mb-5">
                        <div className="">
                            {messages.map((message,i)=>(
                                <div className="" key={i}>
                                <p><span><b>{message.sender ? message.sender.name:message.name}:</b></span>{message.text}</p>
                                </div>
                            ))}
                            </div>
                            
                            <div className="msg">
                                <form onSubmit={sendMessage}>   
                                <input type="text" placeholder="Say something" value={message} onChange={(e)=> setMessage(e.target.value)} />
                                <button type="submit"> <i className="fa fa-send"></i>  </button>
                                </form>
                        </div>
                        </div>
                        </Collapse>
                        </Col>
                        </Row>
                    </Container>
        </Styles>
    )
}