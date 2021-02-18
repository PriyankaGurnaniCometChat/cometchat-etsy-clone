import React from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import PropTypes from "prop-types";
import { CometChat } from "@cometchat-pro/chat";

import { SharedMediaManager } from "./controller";

import * as enums from "../../../util/enums.js";

import { theme } from "../../../resources/theme";
import Translator from "../../../resources/localization/translator";

import {
    sectionStyle,
    sectionHeaderStyle,
    sectionContentStyle,
    mediaBtnStyle,
    buttonStyle,
    mediaItemStyle,
    itemStyle,

} from "./style";

import fileIcon from "./resources/file.png";

class CometChatSharedMediaView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            messagetype: "image",
            messageList: []
        }

        this.messageContainer = React.createRef();
    }

    componentDidMount() {

        this.SharedMediaManager = new SharedMediaManager(this.props.item, this.props.type, this.state.messagetype);
        this.getMessages(true);
        this.SharedMediaManager.attachListeners(this.messageUpdated);
    }

    componentDidUpdate(prevProps, prevState) {

        if(prevState.messagetype !== this.state.messagetype) {

            this.SharedMediaManager = null;
            this.SharedMediaManager = new SharedMediaManager(this.props.item, this.props.type, this.state.messagetype);
            this.getMessages(true);
            this.SharedMediaManager.attachListeners(this.messageUpdated);
        }
    }

    //callback for listener functions
    messageUpdated = (key, message) => {

        switch(key) {

            case enums.MESSAGE_DELETED:
              this.messageDeleted(message);
              break;
            case enums.MEDIA_MESSAGE_RECEIVED:
              this.messageReceived(message);
              break;
            default:
              break;
        }
    }

    messageDeleted = (deletedMessage) => {
  
        const messageType = deletedMessage.data.type;
        if (this.props.type === 'group' 
        && deletedMessage.getReceiverType() === 'group'
        && deletedMessage.getReceiver().guid === this.props.item.guid
        && messageType === this.state.messagetype) {

            const messageList = [...this.state.messageList];
            const filteredMessages = messageList.filter(message => message.id !== deletedMessage.id);
            this.setState({ messageList: filteredMessages, scrollToBottom: false });
        }
    }
    
    //message is received or composed & sent
    messageReceived = (message) => {

        const messageType = message.data.type;
        if (this.props.type === 'group' 
        && message.getReceiverType() === 'group'
        && message.getReceiver().guid === this.props.item.guid
        && messageType === this.state.messagetype) {

            let messages = [...this.state.messageList];
            messages = messages.concat(message);
            this.setState({ messageList: messages, scrollToBottom: true });
        }
    }

    getMessages = (scrollToBottom = false) => {
        
        CometChat.getLoggedinUser().then((user) => {
          
          this.loggedInUser = user;
          
          this.SharedMediaManager.fetchPreviousMessages().then((messages) => {
    
            const messageList = [...messages, ...this.state.messageList];
            this.setState({ messageList: messageList });

            if(scrollToBottom) {
                this.scrollToBottom();
            }
    
        }).catch((error) => {
            //TODO Handle the erros in contact list.
            console.error("[SharedMediaView] getMessages fetchPrevious error", error);
          });
    
        }).catch((error) => {
            console.log("[SharedMediaView] getMessages getLoggedinUser error", error);
        });
    
    }

    scrollToBottom = () => {
      
        if (this.messageContainer) {
            this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
        }
    }

    handleScroll = (e) => {

        const top = Math.round(e.currentTarget.scrollTop) === 0;
        if (top && this.state.messageList.length) {
            this.getMessages();
        }
    }

    mediaClickHandler = (type) => {
        this.setState({messagetype: type, messageList: []});
    }

    render() {

        const template = (message, key) => {

            if(this.state.messagetype === "image" && message.data.url) {

                return (
                    <div id={message.id} key={key} css={itemStyle(this.state, this.props, fileIcon)} className="item item__image">
                        <img src={message.data.url} alt={Translator.translate("SHARED_MEDIA", this.props.lang)} />
                    </div>
                );

            } else if (this.state.messagetype === "video" && message.data.url) {

                return (
                    <div id={message.id} key={key} css={itemStyle(this.state, this.props, fileIcon)} className="item item__video">
                        <video src={message.data.url} />
                    </div>
                );

            } else if (this.state.messagetype === "file" && message.data.attachments) {

                return (
                    <div id={message.id} key={key} css={itemStyle(this.state, this.props, fileIcon)} className="item item__file">
                    <a href={message.data.attachments[0].url} 
                    target="_blank" 
                    rel="noopener noreferrer">{message.data.attachments[0].name}</a>
                    </div>
                );
            }
        }

        const messages = [...this.state.messageList];
        const messageList = messages.map((message, key) => {
            return (template(message, key));
        });

        return (
            <div css={sectionStyle(this.props)} className="section section__sharedmedia">
                <h6 css={sectionHeaderStyle(this.props)} className="section__header">{Translator.translate("SHARED_MEDIA", this.props.lang)}</h6>
                <div css={sectionContentStyle(this.props)} data-id="sharedmedia" className="section__content">
                    <div css={mediaBtnStyle()} className="media__button">
                        <span css={buttonStyle(this.state, "image")} onClick={() => this.mediaClickHandler("image")}>{Translator.translate("PHOTOS", this.props.lang)}</span>
                        <span css={buttonStyle(this.state, "video")} onClick={() => this.mediaClickHandler("video")}>{Translator.translate("VIDEOS", this.props.lang)}</span>
                        <span css={buttonStyle(this.state, "file")} onClick={() => this.mediaClickHandler("file")}>{Translator.translate("DOCS", this.props.lang)}</span>
                    </div>
                    <div css={mediaItemStyle()} className="media_items" 
                    ref={el => this.messageContainer = el}
                    onScroll={this.handleScroll}>{(messageList.length) ? messageList : Translator.translate("NO_RECORDS_FOUND", this.props.lang)}
                    </div>
                </div>
            </div>
        );
    }

    componentWillUnmount() {
      this.SharedMediaManager.removeListeners();
      this.SharedMediaManager = null;
    }
}

// Specifies the default values for props:
CometChatSharedMediaView.defaultProps = {
    lang: Translator.getDefaultLanguage(),
    theme: theme
};

CometChatSharedMediaView.propTypes = {
    lang: PropTypes.string,
    theme: PropTypes.object
}

export default CometChatSharedMediaView;
