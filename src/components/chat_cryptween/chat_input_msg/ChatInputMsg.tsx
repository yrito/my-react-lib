import { useState } from "react";
import imageSend from './images/icons-send-80.svg';
import { ChatInputMsgProps } from "./ChatInputMsg.types";

import './ChatInputMsg.css';

function ChatInputMsg(props: ChatInputMsgProps) {
    const [currentMsg, setCurrentMsg] = useState<string>('');
   
    const sendMsg = async () => {
        if (currentMsg === "")
            return;
                             
        if (props.onSendMsg != null)
            props.onSendMsg(currentMsg);     
        
        setCurrentMsg('');
    }

    const handeOnKeyDown = (e:  React.KeyboardEvent<HTMLInputElement >) => {             
        if (
          e.key === "Enter"
           //&& ((!isMobile && !e.shiftKey) || (isMobile && e.shiftKey))
        ) {
            sendMsg();
        }        
      };

    return (
        <div className="chat_input_msg" >
            <span>
                <input type="text" placeholder="<<Input Message>>" value={currentMsg} onKeyDown={handeOnKeyDown} onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCurrentMsg(e.target.value)} />
            </span>
            <span className="chat_input_msg_send" onClick={sendMsg}>
                <img src={imageSend} alt=">>" />
            </span>
        </div>
    );
}

export default ChatInputMsg;