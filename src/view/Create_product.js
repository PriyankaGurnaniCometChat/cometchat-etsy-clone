import React from 'react'
import "../App.css"
import { Link } from 'react-router-dom';
import { Col, Container, Button, Form, Card, Row} from 'react-bootstrap';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom'

const Styles = styled.div `

.align-items-center{
    margin-top: 150px;
}

`

export const Create_Product = () => {
    const history = useHistory()
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [quantity, setQuantity] = React.useState('')
    const [price, setPrice] = React.useState('')


const createProduct = async (e)=>{
    e.preventDefault()
    const user = localStorage.getItem("user")

    const data ={
        name,description,quantity,price,user
    }
    const response = await fetch("http://localhost:5000/products/product", {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if(response){
      history.push('/')
    }

}
    return (
        <Styles>
           
            <Container>
                
                <Row className="justify-content-md-center align-items-center">
                    <Col md={7}>
                    <Card className="shadow" >
                <Card.Body>
                <Form onSubmit={createProduct}>
                <Form.Group as={Col}  controlId="name">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter event name" onChange={(e)=> setName(e.target.value)} />
        
                </Form.Group>

                <Form.Group as={Col}  controlId="title">
                    <Form.Label>Product Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter event title" onChange={(e)=> setDescription(e.target.value)} />
                </Form.Group>

                <Form.Group as={Col}  controlId="youtube">
                    <Form.Label>Product Quantity</Form.Label>
                    <Form.Control type="text" placeholder="Enter Product Quantity" onChange={(e)=> setQuantity(e.target.value)}/>
                </Form.Group>
                <Form.Group as={Col}  controlId="youtube">
                    <Form.Label>Product Price</Form.Label>
                    <Form.Control type="text" placeholder="Enter Product Price" onChange={(e)=> setPrice(e.target.value)}/>
                </Form.Group>

                <div className="text-center">
                    <Link to="/home">
                    <Button variant="danger" className="m-2">Cancel</Button>
                    </Link>

                    <Button variant="success" className="m-2" type='submit'>Create</Button>
                </div>

                </Form>
                </Card.Body>
                </Card>
                    </Col>
                </Row>
            </Container>

        </Styles>
    )
}
