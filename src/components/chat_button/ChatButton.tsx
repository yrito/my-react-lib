import { ChatButtonProps } from "./ChatButton.types";

import './ChatButton.css';
import LoginUsesCase from "../../usescase/login_usescase";

function ChatButton(props: ChatButtonProps) {

  if (!props) {
    return null;
  }

  const verifyLogin = async () => {
    var error: String | null = null;

    const token = localStorage.getItem("sessionId");

    if (!(token && token !== "undefined")) {

      try {
        const { username, pass } = await props.getCredentials();
        const resultLogin = await new LoginUsesCase(username, pass).call();
        if (resultLogin != null) {
          error = resultLogin;
        }
        else {
          localStorage.setItem("sessionId", token!);
        }
      }
      catch (er: any) {
        localStorage.removeItem("sessionId");
        error = er;
      }
    }
    return error;
  }

  const openChat = async () => {
    const loggued = await verifyLogin();

    if (loggued != null) {  // show Error 
      window.alert("Error de Login en el chat: " + loggued);
    }
    else {  // show Chat Container    
      if (props.onOpenChat != null)
        props.onOpenChat();      
    }
  }

  return (
    <div id='chat_button' onClick={() => openChat()}>
      <span>{props.title}</span>
    </div>
  );
};

export default ChatButton;