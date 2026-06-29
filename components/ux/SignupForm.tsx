
import React from 'react';

const SignupForm: React.FC = () => {
  return (
    <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-8 md:p-14 shadow-[0_40px_100px_rgba(0,0,0,0.5)] text-left">
      <div className="mb-10 text-center md:text-left">
        <h3 className="text-2xl md:text-4xl font-black text-white mb-2 tracking-tighter">Create your account</h3>
        <p className="text-sm md:text-lg text-slate-400 font-medium">Join 10k+ designers building the future</p>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">First Name</label>
            <input 
              type="text" 
              placeholder="John" 
              disabled
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-sm md:text-base text-slate-300 placeholder-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600/50 transition-all"
            />
          </div>
          <div>
            <label className="block text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">Last Name</label>
            <input 
              type="text" 
              placeholder="Doe" 
              disabled
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-sm md:text-base text-slate-300 placeholder-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600/50 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">Work Email</label>
          <input 
            type="email" 
            placeholder="name@company.com" 
            disabled
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-sm md:text-base text-slate-300 placeholder-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600/50 transition-all"
          />
        </div>
        
        <div>
          <label className="block text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">Choose Password</label>
          <input 
            type="password" 
            placeholder="Minimum 8 characters" 
            disabled
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-sm md:text-base text-slate-300 placeholder-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600/50 transition-all"
          />
          <div className="mt-2 flex space-x-1 px-1">
             {[1,2,3,4].map(i => <div key={i} className="h-1 flex-1 rounded-full bg-slate-800"></div>)}
          </div>
        </div>

        <div className="flex items-start py-2 px-1">
          <input type="checkbox" className="mt-1 w-4 h-4 rounded border-slate-800 bg-slate-950 accent-indigo-600" disabled />
          <span className="ml-4 text-[11px] md:text-xs text-slate-500 leading-relaxed font-medium">
            By creating an account, you agree to our <button className="text-indigo-400 font-bold hover:underline">Terms of Service</button> and <button className="text-indigo-400 font-bold hover:underline">Privacy Policy</button>.
          </span>
        </div>

        <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 md:py-6 rounded-2xl transition-all text-sm md:text-lg shadow-2xl shadow-indigo-900/40 mt-4 uppercase tracking-[0.2em]">
          Start Building Now
        </button>

        <div className="text-center pt-8 border-t border-slate-800 mt-6">
          <span className="text-xs md:text-sm text-slate-500 font-medium tracking-wide">Already have a pro account? </span>
          <button className="text-xs md:text-sm text-indigo-500 font-black hover:text-indigo-400 transition-colors uppercase tracking-widest">Sign in</button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
