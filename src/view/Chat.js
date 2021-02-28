import React from "react"
import {CometChatConversationListScreen} from "../cometchat-pro-react-ui-kit"
import {CometChat} from "@cometchat-pro/chat"

export const Chat = ()=>{
    
React.useEffect(()=>{
    const refresh = async ()=> {
        await CometChat.getLoggedinUser()
       }
       refresh()
},[])
    return(
            <div> 
                <CometChatConversationListScreen/>
            </div>
    )
}