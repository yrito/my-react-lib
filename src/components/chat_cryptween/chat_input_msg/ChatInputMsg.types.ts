import { ButtonHTMLAttributes } from "react";
export interface ChatInputMsgProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    onSendMsg(msg: string):Promise<void>;
}