import type { ButtonHTMLAttributes } from 'react';


export interface ButtonHeaderProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    variant: 'back' | 'close'
}