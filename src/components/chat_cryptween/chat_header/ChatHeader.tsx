import { ChatHeaderProps } from "./ChatHeader.types";
import './ChatHeader.css';
import { useEffect, useState } from "react";
import SalaUsesCase from "../../../usescase/sala_usescase";
import { SalaModel } from "../../../models/SalaModel";
import { MemberModel } from "../../../models/MemberModel";

function ChatHeader(props: ChatHeaderProps) {
    const [currentSala, setCurrentSala] = useState<SalaModel | null>(null);
    const [listSala, setListSala] = useState<SalaModel[]>([]);

    const usesCase = new SalaUsesCase();

    const resetCurrentSala = async () => {                
        setCurrentSala(null);
        props.onSelectSala(null);

    }

    const initSalas = async () => {      

        const list =  await usesCase.getSalaList();       
        setListSala(list);
                
        const userId = "6613d7df3a4823ed3d665abe";//localStorage.getItem("userId");
        const username = "yovany";//localStorage.getItem("username");
        const member: MemberModel = {name: username!, id: userId, photo: "", salaId: ""};
        
        if (list.length <= 0){
            try{
                await usesCase.createSala({
                    name: "aggregates",
                    id: "",
                    members: [member]
                });
        
                await usesCase.createSala({
                    name: "summaries",
                    id: "",
                    members: [member]
                });    
            }
            catch(err){
                console.log("SalaUsesCase ERRROR");
                console.dir(err);
            }
        }        
    }

    const updateSala = async (salaId: string) => {
        const sala = await usesCase.getSalaById(salaId);        
        setCurrentSala(sala);
        props.onSelectSala(sala);
    }

    useEffect(() => {     
        initSalas();
    }, []);

    return (

        <div className="chat_header">
            {currentSala != null 
            ? <span onClick={resetCurrentSala}> {currentSala.name} ({currentSala.members.length})</span> 
            : <span>
                <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                updateSala(e.target.value)}>
                    <option>Select Sala</option>
                 {  
                listSala.map((sala, i) => {
                    return (
                        <option value={sala.id}>{sala.name}</option>
                    );
                    })                    
                }
                </select>
            </span>
            }            
            <span className="chat_close" onClick={props.onCloseChat}>X</span>
        </div>
    );
}

export default ChatHeader;