import api from "../api/api";
import { MessageModel } from "../models/MessageModel";

class MessageUsesCase{
    constructor() {
    }

    /**
     * Get Message list by Conversation received by params
     * @param salaId 
     * @returns 
     */
    public async getMessageList(salaId: string): Promise<MessageModel[]> {
        const result = await api.messageList({cid: salaId});
       
        var list: MessageModel[] = [];
        result.map((item: any, i: number) => {
            const msg = {userId: item.from, body: item.body, id: item._id, salaId: item.cid, params: null, date: item.created_at};
            list[i] = msg;
        });
        return new Promise<MessageModel[]>(
            (resolve) => {
                resolve(list);
            }
        );
    }

    /**
     * Send message to Chat server 
     * @param data 
     * @returns 
     */
    public async sendMessage(data: MessageModel): Promise<boolean>{
        var result:boolean = false;

        const mid = data.userId + Date.now();
        var request = {mid: mid, text: data.body, chatId: data.salaId };
        
        var res = await api.messageCreate(request);

        console.log("sendMessage");
        console.dir(res);

        return new Promise<boolean>(
            (resolve) => {
                resolve(result);
            }
        );
    }
}

export default MessageUsesCase;