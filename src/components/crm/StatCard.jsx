/**
 * Premium StatCard Component for CRM
 */
import React from 'react';
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';

const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    trend, 
    trendValue, 
    bgColor = 'bg-sales-primary',
    iconBgColor = 'bg-sales-primary/10',
    iconColor = 'text-sales-primary',
    subtitle,
    onClick
}) => {
    return (
        <div 
            className={`glossy-card p-6 relative group overflow-hidden border-white/40
                        ${onClick ? 'cursor-pointer active:scale-95' : ''}`}
            onClick={onClick}
        >
            <div className="vnt-noise-overlay opacity-[0.02]"></div>
            
            {/* Background Glow */}
            <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-700 ${bgColor}`}></div>

            <div className="flex items-start justify-between relative z-10">
                <div className="flex-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
                        {title}
                    </p>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-3xl font-[900] text-slate-800 tracking-tighter">
                            {typeof value === 'number' ? value.toLocaleString() : value}
                        </h3>
                        {trend && (
                            <div className={`flex items-center gap-0.5 text-[10px] font-black px-2 py-0.5 rounded-full
                                            ${trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                {trend === 'up' ? <ArrowUpRight size={10} strokeWidth={3} /> : <TrendingDown size={10} strokeWidth={3} />}
                                <span>{trendValue}</span>
                            </div>
                        )}
                    </div>
                    
                    {subtitle && (
                        <p className="text-[11px] font-bold text-slate-400 mt-2 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Icon Glass Container */}
                {Icon && (
                    <div className="relative">
                        <div className={`absolute inset-0 ${bgColor} opacity-20 blur-xl group-hover:opacity-40 transition-opacity`}></div>
                        <div className={`relative ${iconBgColor} p-4 rounded-2xl border border-white/60 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                            <Icon className={iconColor} size={22} strokeWidth={2.5} />
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Accent Line */}
            <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-sales-primary/20 to-transparent w-full opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
        </div>
    );
};

export default StatCard;