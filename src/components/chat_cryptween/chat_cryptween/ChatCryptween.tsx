import { useRef, useState } from "react";
import { ChatCryptweenProps } from "./ChatCryptween.types";
import { ChatButton } from "../chat_button";

import "./ChatCryptween.css";
import ChatInputMsg from "../chat_input_msg/ChatInputMsg";
import ChatListMsg from "../chat_list_msg/ChatListMsg";
import ChatHeader from "../chat_header/ChatHeader";
import LoginUsesCase from "../../../usescase/login_usescase";
import { SalaModel } from "../../../models/SalaModel";
import { MemberModel } from "../../../models/MemberModel";
import MessageUsesCase from "../../../usescase/message_usescase";
import { MessageModel } from "../../../models/MessageModel";

function ChatCryptween(props: ChatCryptweenProps) {
    const [isOpened, setIsOpened] = useState<Boolean>(false);
    const [currentUser, setCurrentUser] = useState<string>("");
    
   // const [currentSala, setCurrentSala] = useState<SalaModel | null>(null);
    const [members, setMembers] = useState<MemberModel[]>([]);

    const [listMsg, setListMsg] = useState<MessageModel[]>([]);

    const currentSala = useRef <SalaModel | null>(null);

    const openChat = async () => {
        localStorage.clear();
        const loggued = await verifyLogin();

        if (loggued != null) {  // show Error 
            window.alert("Error de Login en el chat: " + loggued);
        }
        else {  // show Chat Container    
            //const sala = {id: "1111", name: "Sala1", members: []};
            const username = localStorage.getItem("username");
            if (username != null)
                setCurrentUser(username);

            currentSala.current = null;
           // setCurrentSala(null);
            setIsOpened(true);   
        }
    }

    const closeChat = async () => {
        setIsOpened(false);
        localStorage.clear();
    }

    const onSendMsg = async (msg: string) => {
        try{
            const usecase : MessageUsesCase = new MessageUsesCase();
            const msgModel: MessageModel = {id: "", body: msg, salaId: currentSala.current!.id, userId: localStorage.getItem("userId")!, date: "", params: null};
            console.log("sendMessage");
            console.dir(msgModel)
            const result = await usecase.sendMessage(msgModel);       
            console.log("sendMessage");
            console.dir(result);
            listMsg.push(msgModel);
        }
        catch(ex){
            console.dir(ex);
        }
        
    }

    const verifyLogin = async () => {
        var error: String | null = null;

        const token = localStorage.getItem("sessionId");
        console.log("ToKEN");
        console.dir(token);

        if (token == null || token == "null" || token === "undefined" || token === "") {

            try {
                const { username, pass } = await props.getCredentials();
                const resultLogin = await new LoginUsesCase(username, pass).call();
                console.dir(resultLogin);
                if (resultLogin != null) {
                    error = resultLogin;                   
                }                
            }
            catch (er: any) {
                localStorage.removeItem("sessionId");
                localStorage.removeItem("username");
                localStorage.removeItem("userId");
                error = er;
            }
        }
        else{
            window.alert("Ya existe un Token salvo: " + token);
        }
        return error;
    }

    // callbacks
    const onSelectSala = async (sala: SalaModel) => {
       // setCurrentSala(sala);
        currentSala.current = sala;
    }

    return (
        isOpened ?
            <div className="chat_form">
                <ChatHeader onCloseChat={closeChat} onSelectSala={onSelectSala} />                
                <ChatListMsg currentUser={currentUser} currentSala={currentSala.current} listMsg={listMsg}/>
                <ChatInputMsg onSendMsg={onSendMsg} />
            </div>
            :
            <ChatButton title="CHAT" onOpenChat={openChat} />
    );
}

export default ChatCryptween;
