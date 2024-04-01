import { ButtonHTMLAttributes } from "react";
export interface ChatButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large';
  title: string;
  getCredentials():Promise<{username:string, pass:string}>;
  onOpenChat(): void;  
}