import React from 'react';
import { Col, Container, Button, Form, Card, Row} from 'react-bootstrap';
import styled from 'styled-components';
import {AUTH_KEY} from '../constant/constant'
import  {CometChat} from '@cometchat-pro/chat'
import { useHistory } from 'react-router'

const Styles = styled.div `
.form-div{
    margin-top: 260px;
    position: absolute;
} 
`

export const Login = () => {
    const [username, setUsername] = React.useState('')
    const history = useHistory()



const formsubmit = async (e) =>{
    e.preventDefault()
  
    const UID = username
var user = new CometChat.User(UID);
 CometChat.createUser(user, AUTH_KEY).then(
    user => {
        console.log("user created", user);
        CometChat.login(UID,AUTH_KEY).then(
            data => {
                history.push('/home')
                localStorage.setItem("user",UID)
            },
            error => {
              console.log("Login failed with exception:", { error });    
            }
          );
    },error => {
        CometChat.login(UID,AUTH_KEY).then(
            data => {
                console.log(data)
                localStorage.setItem("user",UID)
              history.push('/')
            },
            error => {
              console.log("Login failed with exception:", { error });    
            }
            )
        }
          );
}

    return (
        <Styles>
           
            <Container fluid className="cover">
                
                <Container className="form-div">
                    <Row className="justify-content-md-center align-items-center">
                        <Col md={8}>
                        <Card className="shadow bg-white" >
                    <Card.Body>
                    <Form onSubmit={formsubmit}>
                    <Form.Group as={Col}  controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" onChange={(e)=> setUsername(e.target.value)}/>
            
                    </Form.Group>

                    <div className="text-center">
                        <Button type='submit' variant="success" size="lg">Login</Button>
                    </div>

                    </Form>
                    </Card.Body>
                    </Card>
                        </Col>
                    </Row>
                </Container>
            </Container>

        </Styles>
    )
}