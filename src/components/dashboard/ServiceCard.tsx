import React from "react";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    status: "READY" | "ONLINE" | "LOCKED" | "STABLE" | "OFFLINE";
    onClick?: () => void;
    href?: string;
    disabled?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
    title,
    description,
    icon: Icon,
    status,
    onClick,
    href,
    disabled = false,
}) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "READY":
            case "ONLINE":
            case "STABLE":
                return "text-green-500 border-green-500/50 bg-green-500/10";
            case "LOCKED":
            case "OFFLINE":
                return "text-gray-500 border-gray-500/50 bg-gray-500/10";
            case "WARNING":
                return "text-yellow-500 border-yellow-500/50 bg-yellow-500/10";
            default:
                return "text-neon-purple border-neon-purple/50 bg-neon-purple/10";
        }
    };

    const statusStyle = getStatusColor(status);

    const CardContent = (
        <div
            className={`
        group relative p-6 h-full
        bg-gray-900/50 backdrop-blur-sm border border-neon-purple/30
        transition-all duration-300 ease-out
        ${disabled ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:border-neon-purple"}
        flex flex-col gap-4
      `}
        >
            <div className="flex justify-between items-start">
                <div className="p-3 rounded-lg bg-black/50 border border-gray-800 text-neon-purple group-hover:text-white transition-colors">
                    <Icon size={24} />
                </div>
                <span className={`text-[10px] uppercase font-mono px-2 py-1 rounded border ${statusStyle}`}>
                    {status}
                </span>
            </div>

            <div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-purple transition-colors">{title}</h3>
                <p className="text-sm text-gray-400 group-hover:text-gray-300">{description}</p>
            </div>

            {/* Decorative Lines */}
            <div className="absolute bottom-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-2 right-2 w-full h-[1px] bg-neon-purple"></div>
                <div className="absolute bottom-2 right-2 h-full w-[1px] bg-neon-purple"></div>
            </div>
        </div>
    );

    if (href && !disabled) {
        return (
            <a href={href} onClick={onClick} className="block h-full">
                {CardContent}
            </a>
        );
    }

    return (
        <div onClick={!disabled ? onClick : undefined} className="h-full">
            {CardContent}
        </div>
    );
};
