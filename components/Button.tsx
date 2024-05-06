import React from 'react';
import { Icon as MaterialIcon } from '@mui/material';
import { IconType } from 'react-icons';

interface ButtonProps {
    label: string;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    custom?: string;
    icon?: IconType; // Assuming you want to use an icon from react-icons
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
                                           label,
                                           disabled,
                                           outline,
                                           small,
                                           custom,
                                           icon,
                                           onClick,
                                       }) => {
    // Determine the background and text color based on the outline prop
    const bgColor = outline? "bg-white" : "bg-slate-700";
    const textColor = outline? "text-slate-700" : "text-white";

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition w-full border-slate-700 flex items-center justify-center gap-2 
            ${bgColor}
            ${textColor}
            ${small? "py-1 px-2 border-[1px]" : "py-3 px-4 border-2"}
            ${custom? custom : ''}
            `}

        >
            {icon && React.createElement(icon, { size: 24 })}
            {label}
        </button>
    );
};

export default Button;
