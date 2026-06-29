
import React from 'react';

const LoginForm: React.FC = () => {
  return (
    <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-8 md:p-12 shadow-[0_40px_100px_rgba(0,0,0,0.5)] text-left flex flex-col">
      <div className="mb-10 text-center md:text-left">
        <h3 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">Welcome back</h3>
        <p className="text-sm md:text-base text-slate-400 font-medium">Please enter your workspace credentials</p>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-2 px-1">Email Address</label>
          <input 
            type="email" 
            placeholder="name@company.com" 
            disabled
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-sm md:text-base text-slate-300 placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all"
          />
        </div>
        
        <div>
          <label className="block text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-2 px-1">Password</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            disabled
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-sm md:text-base text-slate-300 placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all"
          />
        </div>

        <div className="flex items-center justify-between py-1 px-1">
          <div className="flex items-center cursor-pointer group">
            <div className="w-5 h-5 rounded-md border-2 border-slate-800 bg-slate-950 flex items-center justify-center group-hover:border-blue-500 transition-colors">
               <div className="w-2 h-2 bg-blue-500 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="ml-3 text-xs md:text-sm text-slate-400 font-medium group-hover:text-slate-300 transition-colors">Keep me logged in</span>
          </div>
          <button className="text-xs md:text-sm text-blue-500 font-bold hover:text-blue-400 transition-colors">Forgot password?</button>
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 md:py-5 rounded-2xl transition-all text-sm md:text-base shadow-2xl shadow-blue-900/40 uppercase tracking-widest active:scale-[0.98]">
          Sign in to Dashboard
        </button>

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest"><span className="bg-slate-900 px-4 text-slate-600">Or continue with</span></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <button className="flex items-center justify-center space-x-2 py-3 rounded-2xl border border-slate-800 hover:bg-slate-800 transition-colors text-xs font-bold text-slate-300">
              <span className="w-4 h-4 bg-white/10 rounded-full" />
              <span>Google</span>
           </button>
           <button className="flex items-center justify-center space-x-2 py-3 rounded-2xl border border-slate-800 hover:bg-slate-800 transition-colors text-xs font-bold text-slate-300">
              <span className="w-4 h-4 bg-white/10 rounded-full" />
              <span>Github</span>
           </button>
        </div>

        <div className="text-center pt-6">
          <span className="text-xs md:text-sm text-slate-500 font-medium">Don't have an account? </span>
          <button className="text-xs md:text-sm text-blue-500 font-bold hover:text-blue-400 transition-colors">Start free trial</button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
