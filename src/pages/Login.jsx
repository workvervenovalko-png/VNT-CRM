// Modern Login Page - Premium Indigo Edition
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Shield,
  User,
  LayoutGrid,
  Zap,
  Globe,
  Database
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminLogin, employeeLogin, login, isAuthenticated, saveAuthData } from '../services/api';

const Login = () => {
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
        const role = user.role.toUpperCase();
        if (role === 'ADMIN') navigate('/admin');
        else if (role === 'HR') navigate('/hr');
        else if (role === 'EMPLOYEE') navigate('/employee/dashboard');
        else if (role === 'INTERN') navigate('/intern/dashboard');
        else if (role === 'MANAGER') navigate('/manager/dashboard');
        else if (role === 'SALES') navigate('/crm');
        else navigate('/login');
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
      const response = await login({
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
      });

      if (response.success) {
        saveAuthData(response.data.token, response.data.user);

        const role = response.data.user.role.toUpperCase();
        if (role === "ADMIN") navigate("/admin");
        else if (role === "HR") navigate("/hr");
        else if (role === "EMPLOYEE") navigate("/employee/dashboard");
        else if (role === "INTERN") navigate("/intern/dashboard");
        else if (role === "MANAGER") navigate("/manager/dashboard");
        else if (role === "SALES") navigate("/crm");
        else navigate("/login");
      }

    } catch (error) {
      setApiError(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 flex items-center justify-center p-4 sm:p-8 font-sans">
      {/* Dynamic Animated Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-indigo-600/30 rounded-full mix-blend-screen filter blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-purple-600/20 rounded-full mix-blend-screen filter blur-[120px] animate-pulse" style={{ animationDelay: '3s' }}></div>
      <div className="vnt-noise-overlay opacity-[0.04]"></div>

      {/* Main Container - Shared layout with Sales but distinct Identity */}
      <div className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 bg-slate-900/60 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_0_100px_rgba(79,70,229,0.15)] border border-slate-700/50 overflow-hidden min-h-[700px]">
        
        {/* Left Side - Immersive Workspace Branding */}
        <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-slate-900 to-slate-950 z-0"></div>
          
          <div className="relative z-10">
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                 <Shield className="w-3 h-3 animate-pulse" />
                 Enterprise Security Layer
              </div>
              <h1 className="text-6xl font-[900] tracking-tighter text-white mb-4">
                VNT<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-300">Workspace.</span>
              </h1>
              <p className="text-slate-400 font-medium text-lg max-w-md leading-relaxed">
                The unified digital ecosystem for modern enterprise management, productivity, and team synchronization.
              </p>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-4 mt-12">
            {[
              { icon: LayoutGrid, title: "Centralized HUB", desc: "Omni-channel resource management" },
              { icon: Database, title: "Encrypted Vault", desc: "High-security data processing" },
              { icon: Zap, title: "Velocity Engine", desc: "Optimized team workflow synchronization" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm transition-all hover:bg-slate-800/60 hover:-translate-y-1 group">
                <div className="w-12 h-12 rounded-xl bg-indigo-900/50 border border-indigo-700/50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{item.title}</h4>
                  <p className="text-slate-400 text-xs mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative z-10 pt-10">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] leading-relaxed">
              © 2026 Verve Nova Tech.<br />Centralized Enterprise Operating Protocol.
            </p>
          </div>
        </div>


        {/* Right Side - Authentication Form */}
        <div className="relative p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-slate-950/50">
          <div className="max-w-md w-full mx-auto">
            <div className="mb-10 text-center lg:text-left">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-[900] text-white tracking-tight mb-2">Workspace Access</h2>
                  <p className="text-slate-400 font-medium">Identify yourself to continue</p>
                </div>
                <Link
                  to="/crm/login"
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-[0_10px_30px_rgba(79,70,229,0.3)] flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  Sales Portal <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {apiError && (
              <div className="mb-8 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-start gap-3 backdrop-blur-md animate-in fade-in zoom-in-95">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-rose-300">{apiError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Corporate Email</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors duration-300" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-4 bg-slate-900/50 border-2 ${errors.email ? 'border-rose-500/50' : 'border-slate-700/50'} focus:border-indigo-500/50 rounded-2xl text-white font-medium outline-none transition-all placeholder:text-slate-600 focus:bg-slate-900 focus:shadow-[0_0_20px_rgba(79,70,229,0.15)]`}
                    placeholder="name@company.com"
                  />
                </div>
                {errors.email && <p className="text-rose-400 text-xs font-bold mt-1.5 ml-1">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center pl-1 pr-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Access Protocol</label>
                  <Link to="/forgot-password" disable={loading.toString()} className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors">Recover?</Link>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors duration-300" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-12 py-4 bg-slate-900/50 border-2 ${errors.password ? 'border-rose-500/50' : 'border-slate-700/50'} focus:border-indigo-500/50 rounded-2xl text-white font-medium outline-none transition-all placeholder:text-slate-600 focus:bg-slate-900 focus:shadow-[0_0_20px_rgba(79,70,229,0.15)]`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-indigo-400 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-rose-400 text-xs font-bold mt-1.5 ml-1">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between pl-1">
                <label className="flex items-center cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900" />
                  <span className="ml-2 text-xs font-bold text-slate-500 group-hover:text-slate-300 transition-colors">Trust this node</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full py-4 mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 active:scale-[0.98] text-white rounded-2xl font-black text-sm tracking-wide shadow-[0_0_40px_rgba(79,70,229,0.3)] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Shield className="w-5 h-5 opacity-80" />
                    AUTHORIZE ACCESS
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-12 text-center border-t border-slate-800/50 pt-8">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center justify-center gap-2">
                <Globe className="w-3 h-3" />
                VNT SECURE AUTHENTICATION GATEWAY
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;