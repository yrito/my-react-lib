import { MemberModel } from "./MemberModel";

export interface SalaModel{
    id: string;
    name: string;
    members: MemberModel[];
}