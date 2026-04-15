import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Lock, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle,
  KeyRound,
  Send
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { initiateForgotPassword, verifyOTP, resetPassword } from '../services/api';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [passwords, setPasswords] = useState({ new: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Auto-focus OTP inputs
  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.nextSibling && element.value !== '') {
      element.nextSibling.focus();
    }
  };

  const handleInitiate = async (e) => {
    e.preventDefault();
    if (!email) return setError('Email is required');
    setLoading(true);
    setError('');
    try {
      await initiateForgotPassword(email.toLowerCase().trim());
      setStep(2);
      setSuccess('Security code dispatched successfully');
    } catch (err) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length < 6) return setError('Please enter 6-digit OTP');
    setLoading(true);
    setError('');
    try {
      await verifyOTP(email.toLowerCase().trim(), otpValue);
      setStep(3);
      setSuccess('Verification successful. Secure reset window open.');
    } catch (err) {
      setError(err.message || 'Invalid or expired OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) return setError('Passwords do not match');
    if (passwords.new.length < 8) return setError('Password must be at least 8 characters');
    
    setLoading(true);
    setError('');
    try {
      await resetPassword(email.toLowerCase().trim(), otp.join(''), passwords.new);
      setStep(4); // Success state
    } catch (err) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 flex items-center justify-center p-4 sm:p-8">
      {/* Premium Dynamic Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-indigo-600/30 rounded-full mix-blend-screen filter blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-purple-600/20 rounded-full mix-blend-screen filter blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="vnt-noise-overlay opacity-[0.04]"></div>

      <div className="relative w-full max-w-lg bg-slate-900/60 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_48px_128px_-32px_rgba(0,0,0,0.5)] border border-slate-700/50 overflow-hidden p-8 md:p-12 animate-in zoom-in-95 duration-700">
        <div className="vnt-noise-overlay opacity-[0.02]"></div>

        {/* Back Link */}
        {step < 4 && (
          <Link to="/login" className="inline-flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-widest hover:text-indigo-400 transition-colors mb-10 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Access Node Login
          </Link>
        )}

        <div className="relative z-10 text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-[2rem] shadow-2xl shadow-indigo-600/20 flex items-center justify-center mx-auto mb-8 relative group">
            <div className="absolute inset-0 bg-white opacity-20 blur-2xl group-hover:opacity-40 transition-opacity"></div>
            {step === 1 && <Mail className="w-10 h-10 text-white relative z-10" />}
            {step === 2 && <ShieldCheck className="w-10 h-10 text-white relative z-10" />}
            {step === 3 && <KeyRound className="w-10 h-10 text-white relative z-10" />}
            {step === 4 && <CheckCircle2 className="w-10 h-10 text-white relative z-10" />}
          </div>
          
          <h2 className="text-4xl font-[900] text-white tracking-tighter mb-3">
            {step === 1 && "Access Recovery"}
            {step === 2 && "Identity Verification"}
            {step === 3 && "Secure Core Reset"}
            {step === 4 && "Success!"}
          </h2>
          <p className="text-slate-400 font-medium">
            {step === 1 && "Enter your corporate creditials to receive a secure bypass code."}
            {step === 2 && `We have dispatched a 6-digit protocol to ${email}`}
            {step === 3 && "Initialize a new high-entropy access credential."}
            {step === 4 && "System access restored. Your identity has been re-authorized."}
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-rose-300">{error}</p>
          </div>
        )}

        {success && step !== 4 && (
          <div className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-emerald-300">{success}</p>
          </div>
        )}

        {step === 1 && (
          <form onSubmit={handleInitiate} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest pl-1">Corporate Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border-2 border-slate-700/50 focus:border-indigo-500/50 rounded-2xl text-white font-medium outline-none transition-all placeholder:text-slate-600 focus:bg-slate-900"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-2xl font-black text-sm tracking-wide shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>DISPATCH SECURITY CODE <Send className="w-4 h-4" /></>}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerify} className="space-y-10">
            <div className="flex justify-between gap-3">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleOtpChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                  className="w-full h-16 text-center text-2xl font-black bg-slate-900/50 border-2 border-slate-700/50 focus:border-indigo-500/50 rounded-2xl text-white outline-none transition-all"
                />
              ))}
            </div>
            <div className="space-y-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-black text-sm tracking-wide shadow-xl shadow-indigo-600/20 transition-all active:scale-[0.98]"
              >
                {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "AUTHORIZE CODE"}
              </button>
              <button 
                type="button" 
                onClick={handleInitiate}
                className="w-full text-xs font-black text-indigo-400 hover:text-indigo-300 uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
              >
                Request New Protocol
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleReset} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest pl-1">New Access Key</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwords.new}
                  onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                  className="w-full pl-12 pr-12 py-4 bg-slate-900/50 border-2 border-slate-700/50 focus:border-indigo-500/50 rounded-2xl text-white font-medium outline-none transition-all placeholder:text-slate-600"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest pl-1">Confirm Access Key</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                  className="w-full pl-12 pr-12 py-4 bg-slate-900/50 border-2 border-slate-700/50 focus:border-indigo-500/50 rounded-2xl text-white font-medium outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-black text-sm tracking-wide shadow-xl shadow-indigo-600/20 transition-all active:scale-[0.98]"
            >
              {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "OVERWRITE ACCESS CREDENTIALS"}
            </button>
          </form>
        )}

        {step === 4 && (
          <div className="text-center animate-in zoom-in-95 duration-500">
            <Link
              to="/login"
              className="inline-flex w-full py-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-2xl font-[900] text-[10px] tracking-[0.2em] shadow-xl shadow-indigo-600/25 transition-all items-center justify-center gap-2"
            >
              RETURN TO COMMAND NODE <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
