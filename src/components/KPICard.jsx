import React from 'react';
import { TrendingUp, TrendingDown, Sparkles } from 'lucide-react';

const KPICard = ({ title, value, icon: Icon, trend, trendType, color = 'bg-workspace-primary' }) => {
    return (
        <div className="group relative glossy-card p-8 border-white/40 overflow-hidden active:scale-[0.98]">
            {/* Ambient Background Glow */}
            <div className={`absolute -right-6 -bottom-6 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-1000 ${color}`}></div>
            <div className="vnt-noise-overlay opacity-[0.02]"></div>

            <div className="flex items-center justify-between mb-8 relative z-10">
                <div className={`p-4 rounded-2xl ${color} bg-opacity-10 text-indigo-600 transition-all duration-500 group-hover:scale-110 group-hover:bg-opacity-20 shadow-inner border border-white/50`}>
                    <Icon className="w-6 h-6" strokeWidth={2.5} />
                </div>
                {trend && (
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border
                        ${trendType === 'up'
                            ? 'text-emerald-600 bg-emerald-50 border-emerald-100'
                            : 'text-rose-600 bg-rose-50 border-rose-100'
                        }`}>
                        {trendType === 'up' ? <TrendingUp className="w-3.5 h-3.5" strokeWidth={3} /> : <TrendingDown className="w-3.5 h-3.5" strokeWidth={3} />}
                        {trend}
                    </div>
                )}
            </div>

            <div className="space-y-1 relative z-10">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none mb-3 flex items-center gap-2">
                    {title}
                    <Sparkles className="w-3 h-3 text-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-4xl font-[900] text-slate-800 tracking-tighter group-hover:text-workspace-primary transition-colors duration-500">{value}</h3>
            </div>

            {/* Glass Shine Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>
    );
};

export default KPICard;
