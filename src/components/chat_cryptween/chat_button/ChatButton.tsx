import { ChatButtonProps } from "./ChatButton.types";

import './ChatButton.css';

function ChatButton(props: ChatButtonProps) {

  if (!props) {
    return null;
  }
 
  return (
    <div id='chat_button' onClick={props.onOpenChat}>
      <span>{props.title}</span>
    </div>
  );
};

export default ChatButton;