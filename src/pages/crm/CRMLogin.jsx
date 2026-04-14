// CRM Dedicated Login Page
import {
    AlertCircle,
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Eye,
    EyeOff,
    Lock,
    Mail,
    Shield,
    User
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminLogin, employeeLogin, isAuthenticated, saveAuthData } from '../../services/api';

const CRMLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (isAuthenticated()) {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            if (user && user.role) {
                navigate('/crm');
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        }
    }, [navigate]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
        setApiError('');
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) newErrors.email = 'Invalid email format';
        if (!formData.password) newErrors.password = 'Password is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setApiError('');

        try {
            const response = await adminLogin({
                email: formData.email.toLowerCase().trim(),
                password: formData.password,
            });

            if (response.success) {
                saveAuthData(response.data.token, response.data.user);
                navigate("/crm");
            }

        } catch (error) {
            setApiError(error.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen relative overflow-hidden bg-slate-50 flex items-center justify-center p-4">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-emerald-50"></div>

            {/* Decorative Color Strip */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[300px] bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500 rotate-[-5deg] blur-3xl opacity-20 animate-pulse"></div>

            <div className="relative w-full max-w-5xl bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white overflow-hidden flex flex-col md:flex-row min-h-[600px]">

                {/* Left Side - Branding */}
                <div className="md:w-1/2 p-12 bg-emerald-600 relative overflow-hidden text-white flex flex-col justify-between">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-700"></div>
                    <div className="absolute inset-0 opacity-20 vnt-noise"></div>

                    <div className="relative z-10">
                        <Link to="/login" className="inline-flex items-center text-emerald-200 hover:text-white transition-colors text-xs font-bold mb-8 group">
                            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" /> Back to VNT Workspace
                        </Link>
                        <h1 className="text-4xl font-[900] tracking-tight mb-2">VNT<span className="text-emerald-200">Sales.</span></h1>
                        <p className="text-emerald-100 font-medium text-sm">Specialized CRM for growth</p>
                    </div>

                    <div className="relative z-10 space-y-6">
                        <div className="glass-layer bg-white/10 border-white/20 p-6 backdrop-blur-md rounded-2xl">
                            <h3 className="text-lg font-bold mb-2">CRM Features</h3>
                            <ul className="space-y-3 text-sm text-emerald-50">
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-300" /> Lead Management
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-300" /> Sales Pipeline
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-300" /> Customer Insights
                                </li>
                            </ul>
                        </div>
                        <p className="text-xs text-emerald-300">Dedicated CRM Access.</p>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white/50">
                    <div className="mb-8">
                        <h2 className="text-3xl font-[900] text-slate-800 tracking-tight mb-2">VNT Sales Login</h2>
                        <p className="text-slate-500">Access your specialized sales dashboard</p>
                    </div>

                    <div className="h-6"></div>

                    {apiError && (
                        <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                            <p className="text-sm font-medium text-rose-600">{apiError}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 ${errors.email ? 'border-rose-200 bg-rose-50' : 'border-transparent focus:border-emerald-500 focus:bg-white'} rounded-xl text-sm font-bold text-slate-700 outline-none transition-all placeholder:text-slate-400`}
                                    placeholder="crm@company.com"
                                />
                            </div>
                            {errors.email && <p className="text-rose-500 text-xs font-bold mt-1.5 ml-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full pl-12 pr-12 py-3.5 bg-slate-50 border-2 ${errors.password ? 'border-rose-200 bg-rose-50' : 'border-transparent focus:border-emerald-500 focus:bg-white'} rounded-xl text-sm font-bold text-slate-700 outline-none transition-all placeholder:text-slate-400`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-rose-500 text-xs font-bold mt-1.5 ml-1">{errors.password}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white rounded-xl font-bold text-sm shadow-xl shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>Enter Portal <ArrowRight className="w-4 h-4" /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center flex flex-col gap-2">
                        <p className="text-xs text-slate-400">Restricted access. Contact your administrator for credentials.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CRMLogin;
