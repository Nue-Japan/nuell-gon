import React from "react";

interface ActionButtonProps {
    label?: string;
    onClick?: () => void;
    className?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
    label = "System Check",
    onClick,
    className = "",
}) => {
    return (
        <button
            onClick={onClick}
            className={`
        group relative px-8 py-3 
        bg-transparent 
        border border-neon-purple 
        text-neon-purple font-mono tracking-widest uppercase
        transition-all duration-300 ease-out
        hover:bg-neon-purple/10 hover:shadow-[0_0_15px_#A855F7]
        active:scale-95
        ${className}
      `}
        >
            <span className="relative z-10 group-hover:animate-pulse">
                {label}
            </span>
            {/* Decorative corners could be added here if needed for more cyberpunk feel */}
        </button>
    );
};
