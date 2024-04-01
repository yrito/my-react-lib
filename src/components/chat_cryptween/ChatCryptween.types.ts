import { ButtonHTMLAttributes } from "react";
export interface ChatCryptweenProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    getCredentials():Promise<{username:string, pass:string}>;
}