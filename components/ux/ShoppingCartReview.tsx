
import React from 'react';
import { Trash2, Plus, Minus, CreditCard, ShieldCheck, ArrowRight } from 'lucide-react';

const ShoppingCartReview: React.FC = () => {
  const items = [
    { id: 1, name: 'Premium Wireless Headphones', price: 299, qty: 1, color: 'Midnight Black' },
    { id: 2, name: 'Eco-Leather Carry Case', price: 45, qty: 2, color: 'Saddle Brown' }
  ];

  return (
    <div className="w-full max-w-xl bg-white text-slate-900 border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.08)] flex flex-col font-sans">
      {/* Header */}
      <div className="px-10 py-8 border-b border-slate-50 bg-white flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black text-slate-950 tracking-tighter">Your Bag</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">3 Items selected</p>
        </div>
        <div className="flex items-center space-x-2 text-indigo-600">
          <ShieldCheck size={16} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Verified Secure</span>
        </div>
      </div>

      {/* Item List */}
      <div className="flex-grow p-8 space-y-6 max-h-[450px] overflow-y-auto custom-scrollbar">
        {items.map((item) => (
          <div key={item.id} className="group flex items-center space-x-6">
            <div className="w-24 h-32 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden relative border border-slate-100 transition-transform group-hover:scale-[1.02] duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-200/20 to-transparent" />
              <div className="w-12 h-12 border-2 border-slate-200 rounded-lg opacity-40" />
            </div>
            
            <div className="flex-grow min-w-0">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-base font-black text-slate-900 truncate pr-4 tracking-tight">{item.name}</h4>
                <button className="text-slate-300 hover:text-rose-500 transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
              <p className="text-xs text-slate-500 font-medium mb-4">{item.color}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center bg-white border border-slate-200 rounded-full px-2 py-1">
                  <button className="p-1.5 hover:text-indigo-600 text-slate-400 transition-colors"><Minus size={14} /></button>
                  <span className="px-4 text-xs font-black text-slate-900">{item.qty}</span>
                  <button className="p-1.5 hover:text-indigo-600 text-slate-400 transition-colors"><Plus size={14} /></button>
                </div>
                <span className="text-lg font-black text-slate-950">${item.price * item.qty}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="p-10 bg-slate-50/50 border-t border-slate-100">
        <div className="space-y-4 mb-8">
          <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
            <span>Subtotal</span>
            <span className="text-slate-900">$389.00</span>
          </div>
          <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
            <span>Shipping</span>
            <span className="text-indigo-600 tracking-tighter">Complimentary</span>
          </div>
          <div className="pt-5 border-t border-slate-200 flex justify-between items-center">
            <span className="text-lg font-black text-slate-950 tracking-tight">Total</span>
            <span className="text-3xl font-black text-slate-950 tracking-tighter">$389.00</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <button className="w-full bg-slate-950 text-white font-black py-5 rounded-2xl flex items-center justify-center space-x-3 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-[0.98]">
            <CreditCard size={20} />
            <span className="uppercase tracking-[0.2em] text-[11px]">Proceed to Checkout</span>
          </button>
          <button className="w-full bg-white text-slate-500 font-bold py-4 rounded-2xl flex items-center justify-center space-x-2 border border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-all text-[10px] uppercase tracking-[0.2em]">
            <span>Continue Shopping</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartReview;
