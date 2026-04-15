import React from 'react';
import { TrendingUp, TrendingDown, Sparkles } from 'lucide-react';

const KPICard = ({ title, value, icon: Icon, trend, trendType, color = 'bg-workspace-primary', iconBg = 'bg-indigo-50', iconColor = 'text-indigo-600' }) => {
    return (
        <div className="group relative bg-white/70 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-500 cursor-default">
            {/* Ambient Background Glow */}
            <div className={`absolute -right-10 -bottom-10 w-48 h-48 rounded-full blur-[80px] opacity-10 group-hover:opacity-40 transition-opacity duration-1000 ${color.replace('bg-', 'bg-').replace('-50', '-500')}`}></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/0 pointer-events-none"></div>

            <div className="flex items-center justify-between mb-8 relative z-10">
                <div className={`p-4 rounded-[1.25rem] ${iconBg} ${iconColor} transition-all duration-500 group-hover:scale-110 shadow-inner border border-white ring-4 ring-white/50 group-hover:ring-indigo-50/50`}>
                    <Icon className="w-[1.6rem] h-[1.6rem]" strokeWidth={2.5} />
                </div>
                {trend && (
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-sm
                        ${trendType === 'up'
                            ? 'text-emerald-700 bg-emerald-50 border-emerald-100/50'
                            : 'text-rose-700 bg-rose-50 border-rose-100/50'
                        }`}>
                        {trendType === 'up' ? <TrendingUp className="w-3.5 h-3.5" strokeWidth={3} /> : <TrendingDown className="w-3.5 h-3.5" strokeWidth={3} />}
                        {trend}
                    </div>
                )}
            </div>

            <div className="space-y-2 relative z-10">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none flex items-center gap-2">
                    {title}
                    <Sparkles className="w-3 h-3 text-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-5xl font-[900] text-slate-800 tracking-tighter group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-violet-500 transition-all duration-500 leading-none">{value}</h3>
            </div>

            {/* Glass Shine Effect on Hover */}
            <div className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-[1500ms] ease-in-out pointer-events-none"></div>
        </div>
    );
};

export default KPICard;
