import type { ReactNode } from "react";
import  './FloatingActionsBar.css';

type FloatingActionsBarProps = {
    children: ReactNode;
};

export default function FloatingActionsBar({ children }: FloatingActionsBarProps) {
    return (
        <menu className='floating-actions-bar'>
            {children}
        </menu>
    );
}
