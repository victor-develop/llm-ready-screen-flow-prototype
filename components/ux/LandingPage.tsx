
import React from 'react';
import { ShoppingBag, Search, User, Menu, Star, ArrowRight } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="w-full h-full bg-white text-slate-900 rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 font-sans flex flex-col">
      {/* Top Promo Bar */}
      <div className="bg-slate-950 text-white py-2 px-4 text-center shrink-0">
        <p className="text-[10px] md:text-xs font-bold tracking-[0.1em] uppercase truncate">
          Free Shipping over $150 • Limited Time
        </p>
      </div>

      <div className="flex-grow overflow-y-auto custom-scrollbar">
        {/* Navigation Header */}
        <header className="px-4 py-4 md:px-10 md:py-8 flex items-center justify-between border-b border-slate-50 sticky top-0 bg-white/95 backdrop-blur-md z-30">
          <div className="flex items-center space-x-3 md:space-x-6 shrink-0">
            <Menu size={20} className="text-slate-600 cursor-pointer hover:text-indigo-600 transition-colors" />
            <span className="font-black text-lg md:text-3xl tracking-tighter cursor-pointer">LUXE.</span>
            
            {/* Desktop only Nav - hidden strictly on mobile/tablet simulated views */}
            <nav className="hidden xl:flex items-center space-x-8 ml-10">
              {['New', 'Shop', 'Eco', 'Journal'].map(item => (
                <button key={item} className="text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-950 transition-colors">{item}</button>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center space-x-3 md:space-x-8">
            <div className="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-2 border border-slate-200">
              <Search size={14} className="text-slate-400 mr-2" />
              <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-xs w-24 lg:w-48 placeholder-slate-400" disabled />
            </div>
            <Search size={20} className="text-slate-600 md:hidden" />
            <div className="relative cursor-pointer group shrink-0">
              <ShoppingBag size={18} className="text-slate-600 group-hover:text-indigo-600 transition-colors" />
              <span className="absolute -top-1.5 -right-1.5 bg-indigo-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg shadow-indigo-200">2</span>
            </div>
            <User size={20} className="text-slate-600 cursor-pointer hover:text-indigo-600 transition-colors hidden sm:block" />
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative min-h-[360px] md:h-[450px] lg:h-[550px] bg-slate-100 flex items-center px-6 md:px-16 overflow-hidden py-12 md:py-0">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-gradient-to-l from-indigo-100/40 to-transparent"></div>
          
          <div className="relative z-10 w-full max-w-full md:max-w-xl lg:max-w-2xl">
            <span className="inline-block bg-indigo-600 text-white text-[10px] md:text-[11px] font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest shadow-lg shadow-indigo-200">
              Summer '25 Collection
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-none md:leading-[0.9] mb-6 tracking-tighter">
              ESSENTIALS <br />
              <span className="text-indigo-600">REDEFINED.</span>
            </h2>
            <p className="text-xs md:text-lg text-slate-500 mb-8 md:mb-10 leading-relaxed max-w-xs md:max-w-md">
              Elevate your daily essentials with our premium sustainable fabrics.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="bg-slate-950 text-white text-[10px] font-bold px-8 py-4 rounded-full flex items-center justify-center space-x-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
                <span>Shop Men</span>
                <ArrowRight size={14} />
              </button>
              <button className="bg-white border border-slate-200 text-slate-950 text-[10px] font-bold px-8 py-4 rounded-full flex items-center justify-center space-x-2 hover:bg-slate-50 transition-all shadow-md">
                <span>Shop Women</span>
              </button>
            </div>
          </div>
          
          {/* Abstract Mock Image Placeholder for Desktop */}
          <div className="hidden md:block absolute right-10 lg:right-20 top-1/2 -translate-y-1/2 w-64 lg:w-96 aspect-[3/4] bg-white rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden">
             <div className="w-full h-full bg-slate-50 flex items-center justify-center italic text-slate-300 font-bold uppercase tracking-widest text-lg">Featured Look</div>
          </div>
        </section>

        {/* Categories Grid - FORCED 1 COLUMN on Small, strictly controls column count */}
        <section className="p-6 md:p-16 max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8 md:mb-12">
            <div>
              <h3 className="font-black text-xl md:text-3xl tracking-tight mb-2">Shop Categories</h3>
              <p className="text-[10px] md:text-sm text-slate-400 font-medium uppercase tracking-widest">Selected for your lifestyle</p>
            </div>
            <button className="text-[10px] md:text-xs font-bold text-indigo-600 border-b-2 border-indigo-600 pb-1 hover:text-indigo-700 hover:border-indigo-700 transition-all shrink-0 ml-4">View All</button>
          </div>
          
          {/* Default to 1 column and ONLY upgrade on larger viewports */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { label: 'Minimal Core', color: 'bg-stone-100', desc: 'Everyday staples' },
              { label: 'Active Performance', color: 'bg-blue-50', desc: 'Built for movement' },
              { label: 'Curated Accessories', color: 'bg-rose-50', desc: 'The final touch' }
            ].map((cat, i) => (
              <div key={i} className={`${cat.color} rounded-[1.5rem] md:rounded-[2rem] p-8 md:p-12 flex flex-col items-start justify-end h-48 md:h-80 cursor-pointer hover:shadow-2xl transition-all group overflow-hidden relative w-full`}>
                <div className="absolute top-8 right-8 w-24 h-24 bg-white/40 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative z-10 w-full">
                  <span className="text-[10px] md:text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1 block">{cat.desc}</span>
                  <h4 className="text-xl md:text-2xl font-black text-slate-900 mb-4 truncate">{cat.label}</h4>
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:bg-slate-950 group-hover:text-white transition-all">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="px-6 md:px-16 pb-16 md:pb-24 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <h3 className="font-black text-xl md:text-3xl tracking-tight">Best Sellers</h3>
            <div className="flex space-x-2">
              <button className="p-2 border border-slate-200 rounded-full hover:bg-slate-50"><ArrowRight size={18} className="rotate-180" /></button>
              <button className="p-2 border border-slate-200 rounded-full hover:bg-slate-50"><ArrowRight size={18} /></button>
            </div>
          </div>

          <div className="flex gap-4 md:gap-8 overflow-x-auto md:grid md:grid-cols-4 pb-6 md:pb-0 scroll-smooth snap-x no-scrollbar">
            {[
              { name: 'Linen Work Shirt', price: '$89', rating: 4.8, tag: 'New' },
              { name: 'Driftwood Chinos', price: '$110', rating: 4.9, tag: 'Popular' },
              { name: 'Organic Tee', price: '$45', rating: 4.7, tag: '' },
              { name: 'Recycled Cap', price: '$55', rating: 4.6, tag: 'Sale' }
            ].map((prod, i) => (
              <div key={i} className="min-w-[200px] md:min-w-0 group snap-center cursor-pointer flex-shrink-0 md:flex-shrink">
                <div className="aspect-[4/5] bg-slate-50 rounded-2xl md:rounded-3xl mb-4 relative overflow-hidden border border-slate-100">
                  {prod.tag && (
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest z-10 shadow-sm border border-slate-100">
                      {prod.tag}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 translate-y-full md:group-hover:translate-y-0 transition-transform duration-300 z-10 hidden md:block">
                    <button className="w-full bg-white text-slate-950 text-xs font-bold py-3 rounded-xl shadow-xl flex items-center justify-center space-x-2">
                      <ShoppingBag size={14} />
                      <span>Quick Add</span>
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-1 mb-1">
                  <Star size={10} className="fill-amber-400 text-amber-400" />
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">{prod.rating}</span>
                </div>
                <h4 className="text-sm md:text-base font-bold text-slate-900 leading-tight mb-1 group-hover:text-indigo-600 transition-colors truncate">{prod.name}</h4>
                <p className="text-sm md:text-base font-black text-slate-950">{prod.price}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Newsletter Hook */}
        <footer className="bg-slate-950 text-white p-10 md:p-24 rounded-t-[3rem] md:rounded-t-[5rem]">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-5xl font-black mb-6 tracking-tighter">Join the Collective.</h3>
            <p className="text-slate-400 text-sm md:text-lg mb-10 max-w-xs md:max-w-lg mx-auto leading-relaxed">
              Early access to drops, journal updates, and exclusive events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-sm md:max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Email address" 
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                disabled 
              />
              <button className="bg-white text-slate-950 text-sm font-black px-8 py-4 rounded-2xl hover:bg-slate-100 transition-all shadow-xl">
                Join
              </button>
            </div>
            <p className="mt-8 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
              Unsubscribe anytime • Privacy priority
            </p>
          </div>
          
          <div className="mt-20 md:mt-32 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
             <span className="font-black text-2xl tracking-tighter">LUXE.</span>
             <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                <a href="#" className="hover:text-white transition-colors">Shipping</a>
                <a href="#" className="hover:text-white transition-colors">Returns</a>
                <a href="#" className="hover:text-white transition-colors">Contact</a>
                <a href="#" className="hover:text-white transition-colors">Legal</a>
             </div>
             <p className="text-[10px] text-slate-600 font-bold tracking-widest uppercase">© 2025 LUXE CO.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
