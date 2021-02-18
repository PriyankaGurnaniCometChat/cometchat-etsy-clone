import React from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core"
import PropTypes from "prop-types";

import { CometChatMessageActions, CometChatThreadedMessageReplyCount, CometChatReadReceipt } from "../";
import { CometChatMessageReactions } from "../Extensions";

import { checkMessageForExtensionsData } from "../../../util/common";

import { theme } from "../../../resources/theme";

import {
  messageContainerStyle,
  messageWrapperStyle,
  messageAudioWrapperStyle,
  messageInfoWrapperStyle,
  messageReactionsWrapperStyle
} from "./style";

class CometChatSenderAudioMessageBubble extends React.Component {

  messageFrom = "sender";

  constructor(props) {

    super(props);

    const message = Object.assign({}, props.message, { messageFrom: this.messageFrom });
    this.state = {
      message: message,
      isHovering: false
    }
  }

  componentDidUpdate(prevProps) {

    const previousMessageStr = JSON.stringify(prevProps.message);
    const currentMessageStr = JSON.stringify(this.props.message);

    if (previousMessageStr !== currentMessageStr) {

      const message = Object.assign({}, this.props.message, { messageFrom: this.messageFrom });
      this.setState({ message: message })
    }
  }

  handleMouseHover = () => {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState = (state) => {

    return {
      isHovering: !state.isHovering,
    };
  }

  render() {

    let messageReactions = null;
    const reactionsData = checkMessageForExtensionsData(this.state.message, "reactions");
    if (reactionsData) {

      if (Object.keys(reactionsData).length) {
        messageReactions = (
          <div css={messageReactionsWrapperStyle()} className="message__reaction__wrapper">
            <CometChatMessageReactions  {...this.props} message={this.state.message} reaction={reactionsData} />
          </div>
        );
      }
    }

    let toolTipView = null;
    if (this.state.isHovering) {
      toolTipView = (<CometChatMessageActions {...this.props} message={this.state.message} />);
    }
    
    return (
      <div 
      css={messageContainerStyle()} 
      className="sender__message__container message__audio"
      onMouseEnter={this.handleMouseHover}
      onMouseLeave={this.handleMouseHover}>

        {toolTipView}
        <div css={messageWrapperStyle()} className="message__wrapper">
          <div css={messageAudioWrapperStyle(this.props)} className="message__audio__wrapper">
            <audio controls src={this.state.message.data.url}></audio>
          </div>
        </div>

        {messageReactions}

        <div css={messageInfoWrapperStyle()} className="message__info__wrapper">
          <CometChatThreadedMessageReplyCount {...this.props} message={this.state.message} />
          <CometChatReadReceipt {...this.props} message={this.state.message} />
        </div>
      </div>
    )
  }
}

// Specifies the default values for props:
CometChatSenderAudioMessageBubble.defaultProps = {
  theme: theme,
  message: {}
};

CometChatSenderAudioMessageBubble.propTypes = {
  theme: PropTypes.object,
  message: PropTypes.object
}

export default CometChatSenderAudioMessageBubble;