import { useEffect, useState } from "react";
import { ChatListMsgProps } from "./ChatListMsg.types";

import './ChatListMsg.css';
import MessageUsesCase from "../../../usescase/message_usescase";
import { MessageModel } from "../../../models/MessageModel";

function ChatListMsg(props: ChatListMsgProps) {
    const [listMsg, setListMsg] = useState<MessageModel[]>([]);
    
    const initMessages = async () => {
        console.log("props.currentSala");
        console.dir(props.currentSala);

        if (props.currentSala != null){
            const resultMsg = await new MessageUsesCase().getMessageList(props.currentSala!.id);
            console.log("resultMsg");
            console.dir(resultMsg);

            setListMsg(resultMsg);
        }           
    }

    useEffect(() => {
        initMessages();      

    }, []);
   
    return (
        <div className="chat_list_msg">
            {
                listMsg.map((msg, i) => {
                    return (
                        <div className={msg.userId == props.currentUser ? "chat_local_msg" : "chat_remote_msg"}>
                            {msg.body}
                        </div>
                    );
                })}

<div>{props.currentSala?.name}</div>
        </div>
    );
}

export default ChatListMsg;
