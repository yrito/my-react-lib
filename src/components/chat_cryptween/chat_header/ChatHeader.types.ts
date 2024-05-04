import { ButtonHTMLAttributes } from "react";
import { SalaModel } from "../../../models/SalaModel";
export interface ChatHeaderProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    onCloseChat(): Promise<void>;
    onSelectSala(sala: SalaModel | null): Promise<void>;
}