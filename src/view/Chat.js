import React from "react"
import {Container,Row} from "react-bootstrap"
import {CometChatUserListWithMessages} from "../cometchat-pro-react-ui-kit"
import {CometChat} from "@cometchat-pro/chat"

export const Chat = ()=>{
    
React.useEffect(()=>{
    const refresh = async ()=> {
        await CometChat.getLoggedinUser()
       }
       refresh()
},[])
    return(
        <Container>
            <Row> 
                <CometChatUserListWithMessages/>
            </Row>
        </Container>
    )
}