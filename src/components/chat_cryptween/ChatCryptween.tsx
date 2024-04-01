import { useState } from "react";
import { ChatCryptweenProps } from "./ChatCryptween.types";
import { ChatButton } from "../chat_button";

import "./ChatCryptween.css";
import imageSend from './images/icons-send-80.svg';

function ChatCryptween(props: ChatCryptweenProps) {
    const [isOpened, setIsOpened] = useState<Boolean>(false);
    const [currentMsg, setCurrentMsg] = useState<string>('');
    const [listMsg, setListMsg] = useState<{ msg: string, user: string}[]>([{msg: "Probando el chat", user: "pepe"},{msg: "Eu tambem vou testar", user: "yovany"},{msg: "Probando el chat", user: "pepe"},{msg: "Eu tambem vou testar", user: "jose"}]);

    const currentUser ="yovany";


    const openChat = () => {
        setIsOpened(true);
    }

    const closeChat = () => {
        setIsOpened(false);
    }

    const sendMsg = () => {
        console.log("currentMSG: " + currentMsg);
        const item = {msg: currentMsg, user: "yovany"};

        var list = listMsg;
        console.log("list before: " + list);
        list.push(item);
        setListMsg(list);
        console.log("list after: " + list);
        setCurrentMsg('');
    }

    const updateMsg = (value: string) => {
        setCurrentMsg(value);
    }

    return (
        isOpened ?
            <div className="chat_form">
                <div className="chat_header">
                    <span>Sala de Chat #1 (2)</span>
                    <span className="chat_close" onClick={closeChat}>X</span>
                </div>
                <div className="chat_list_msg">
                    {
                        listMsg.map((msg, i) => {
                        return (
                            <div className={msg.user == currentUser ? "chat_local_msg" : "chat_remote_msg"}>
                                {msg.msg}
                            </div>                            
                        );
                        })}
                    
                </div>
                <div className="chat_input_msg" >
                    <span>
                        <input type="text" value={currentMsg} onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateMsg(e.target.value)
              }/>
                    </span>
                    <span className="chat_input_msg_send" onClick={sendMsg}>
                        <img src={imageSend} alt=">>" />
                    </span>
                </div>
            </div>
            :
            <ChatButton title="CHAT" getCredentials={props.getCredentials} onOpenChat={openChat} />
    );
}

export default ChatCryptween;
