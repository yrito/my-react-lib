import api from "../api/api";

import { SalaModel } from "../models/SalaModel";

class SalaUsesCase {

    constructor() {
    }

    /**
     * getSalaList
     */
    public async getSalaList(): Promise<SalaModel[]> {
        const result = await api.conversationList({});
       
        var list: SalaModel[] = [];
        result.map((item: any, i: number) => {
            const sala = { name: item.name, id: item._id, members: [] };
            list[i] = sala;
        });
        return new Promise<SalaModel[]>(
            (resolve) => {
                resolve(list);
            }
        );
    }

    /**
     * getSalaByIdList
     */
    public async getSalaById(salaId: string): Promise<SalaModel | null> {
        const result = await api.conversationList({});
       
        var salaResult: SalaModel | null = null;

        result.map((item: any, i: number) => {
            if (item._id === salaId){
                salaResult = { name: item.name, id: item._id, members: [] };
            }
        });

        return new Promise<SalaModel | null>(
            (resolve) => {
                resolve(salaResult);
            }
        );
    }

    /**
     * createSala
     */
    public async createSala(sala: SalaModel): Promise<SalaModel | null> {
        var result: SalaModel | null = null;
        
        const data = {
            name: sala.name,
            type: "g",
            participants: [sala.members[0].id]
        };
      
        try {
            const resultCreate = await api.conversationCreate(data);          
        }
        catch (e) {
            console.log("SalaUsesCase eRROR");
            console.dir(e);
        }

        return new Promise<SalaModel | null>((resolve) => {
            resolve(result);
        });
    }


    /**
     * removeSala
     */
    public async removeSala(sala: SalaModel) {

    }

}

export default SalaUsesCase;