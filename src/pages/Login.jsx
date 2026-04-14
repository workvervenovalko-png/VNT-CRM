// Modern Login Page
import {
  AlertCircle,
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
    <div className="min-h-screen relative overflow-hidden bg-white flex items-center justify-center p-4">
      {/* Premium Mesh Background */}
      <div className="mesh-gradient opacity-60"></div>
      
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative w-full max-w-5xl bg-white/40 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_32px_128px_-32px_rgba(31,38,135,0.25)] border border-white/60 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        <div className="vnt-noise-overlay opacity-[0.03]"></div>

        {/* Left Side - Branding */}
        <div className="md:w-1/2 p-12 bg-indigo-600 relative overflow-hidden text-white flex flex-col justify-between">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-indigo-600 to-purple-800"></div>
          <div className="vnt-noise-overlay opacity-20"></div>

          {/* Decorative Elements */}
          <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl"></div>

          <div className="relative z-10 animate-in fade-in slide-in-from-top-4 duration-700">
            <h1 className="text-4xl font-[900] tracking-tighter mb-2">VNT<span className="text-indigo-200">Workspace.</span></h1>
            <p className="text-indigo-100 font-bold uppercase tracking-[0.2em] text-[10px] opacity-80">Centralizing Enterprise Flow</p>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="glass-morphic bg-white/10 border-white/20 p-8 rounded-[2rem] shadow-2xl">
              <h3 className="text-lg font-black mb-4 tracking-tight">Why Workspace?</h3>
              <ul className="space-y-4 text-sm text-indigo-50/90 font-medium">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                  </div>
                   Integrated Performance Hub
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                  </div>
                  Secure Geo-Layered Identity
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                  </div>
                  Real-time Data Sync Architecture
                </li>
              </ul>
            </div>
            <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest leading-relaxed">
              © 2026 Verve Nova Tech.<br />Automated & Specialized Enterprise Systems.
            </p>
          </div>
        </div>


        {/* Right Side - Form */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white/50">
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-[900] text-slate-800 tracking-tight mb-2">Welcome Back</h2>
              <p className="text-slate-500">Please sign in to your account</p>
            </div>
            <Link
              to="/crm/login"
              className="px-6 py-3 bg-white border-2 border-indigo-600 text-indigo-600 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-lg shadow-indigo-600/10 flex items-center gap-2 whitespace-nowrap"
            >
              VNT Sales <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="h-4"></div>

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
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 ${errors.email ? 'border-rose-200 bg-rose-50' : 'border-transparent focus:border-indigo-500 focus:bg-white'} rounded-xl text-sm font-bold text-slate-700 outline-none transition-all placeholder:text-slate-400`}
                  placeholder="name@company.com"
                />
              </div>
              {errors.email && <p className="text-rose-500 text-xs font-bold mt-1.5 ml-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-12 py-3.5 bg-slate-50 border-2 ${errors.password ? 'border-rose-200 bg-rose-50' : 'border-transparent focus:border-indigo-500 focus:bg-white'} rounded-xl text-sm font-bold text-slate-700 outline-none transition-all placeholder:text-slate-400`}
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

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                <span className="ml-2 text-xs font-bold text-slate-500 group-hover:text-slate-700 transition-colors">Remember me</span>
              </label>
              <button type="button" className="text-xs font-black text-indigo-600 hover:text-indigo-700 uppercase tracking-wide">
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white rounded-xl font-bold text-sm shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          {/* Registration link removed as per system policy */}
        </div>
      </div>
    </div>
  );
};

export default Login;