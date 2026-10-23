import React, { useState } from 'react';
import { ArrowRight, Check, Lock } from 'lucide-react';
import { useOrders } from '../context/OrdersContext';

export const Footer: React.FC<{ onNavigateToCategory: (cat: string) => void }> = ({ onNavigateToCategory }) => {
  const { setIsOwnerModalOpen } = useOrders();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const scrollTo = (id: string, cat?: string) => {
    if (cat) onNavigateToCategory(cat);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#191919] text-[#FAF9F5] pt-16 pb-12 border-t border-black">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* Top Tier: Wordmark & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-neutral-800">
          
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/simple_logo_white.png"
                alt="SIMPLE"
                className="h-9 w-auto object-contain brightness-110"
              />
            </div>
            <p className="text-sm text-neutral-400 font-light max-w-md leading-relaxed">
              Considered garments and architectural objects conceived for lifetime wear.
              Engineered with unadulterated natural fibers, transparent provenance, and circular care.
            </p>
          </div>

          <div className="lg:col-span-6 space-y-3">
            <div className="text-xs uppercase font-mono tracking-widest text-neutral-400">
              The Atelier Gazette
            </div>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Receive private previews of limited edition fiber releases and mill documentation.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-neutral-900 border border-neutral-700 text-xs text-neutral-300 font-mono">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>You have been added to the private registry.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                <input
                  type="email"
                  required
                  placeholder="atelier@client.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-neutral-900 border border-neutral-700 text-xs font-mono text-white placeholder:text-neutral-500 focus:outline-none focus:border-white"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-white text-neutral-900 text-xs uppercase tracking-wider font-medium hover:bg-neutral-200 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Middle Tier: 4-Column Directory */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs font-light text-neutral-400">
          <div className="space-y-3">
            <p className="font-mono text-white uppercase text-[11px] tracking-wider">Loungewear</p>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollTo('catalog', 'hoodies')} className="hover:text-white transition-colors cursor-pointer">
                  Heavyweight Boxy Hoodies
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('catalog', 'crewnecks')} className="hover:text-white transition-colors cursor-pointer">
                  Star Orbit Crewnecks
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('catalog', 'sweatpants')} className="hover:text-white transition-colors cursor-pointer">
                  Wide-Leg Loopback Sweatpants
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('catalog', 'hoodies')} className="hover:text-white transition-colors cursor-pointer">
                  Dual-Zip French Terry Hoodies
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('catalog', 'sweatpants')} className="hover:text-white transition-colors cursor-pointer">
                  Raw-Hem Relaxed Sweatpants
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="font-mono text-white uppercase text-[11px] tracking-wider">Quality &amp; Care</p>
            <ul className="space-y-2">
              <li className="hover:text-white transition-colors">
                100% Premium Heavy Cotton Fleece
              </li>
              <li className="hover:text-white transition-colors">
                Reinforced Double-Stitched Seams
              </li>
              <li className="hover:text-white transition-colors">
                Pre-Shrunk Dimensional Retention
              </li>
              <li className="hover:text-white transition-colors">
                Cold Wash &amp; Line Dry Preservation
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="font-mono text-white uppercase text-[11px] tracking-wider">Client Care</p>
            <ul className="space-y-2">
              <li className="hover:text-white transition-colors cursor-pointer">
                Complimentary Worldwide Dispatch
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                14-Day Care &amp; Exchange
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Custom Hemming &amp; Tailoring
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Garment Care Index
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="font-mono text-white uppercase text-[11px] tracking-wider">Atelier Locations</p>
            <ul className="space-y-2 font-mono text-[11px]">
              <li>Cairo: Zamalek, Brazil St</li>
              <li>Tokyo: Minami-Aoyama 5-Chome</li>
              <li>New York: 74 Grand Street</li>
              <li className="pt-2 text-neutral-500">Concierge: contact@simple-atelier.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom Tier: Quiet Copyright & Legal */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} SIMPLE ATELIER CORP. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-300 transition-colors cursor-pointer">Privacy Charter</span>
            <span className="hover:text-neutral-300 transition-colors cursor-pointer">Terms of Service</span>
            <button
              onClick={() => setIsOwnerModalOpen(true)}
              className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer text-neutral-400 hover:text-white"
            >
              <Lock className="w-3 h-3 text-neutral-400" />
              <span>Owner Portal</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
