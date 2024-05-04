import { ButtonHTMLAttributes } from "react";
import { SalaModel } from "../../../models/SalaModel";
import { MessageModel } from "../../../models/MessageModel";
export interface ChatListMsgProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    currentUser: string;
    currentSala: SalaModel | null;
    listMsg: MessageModel[];
}
