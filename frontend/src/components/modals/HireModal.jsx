import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HIRE_IMAGE } from '../../config/assets';
import { profile } from '../../data/profile';
import { palette } from '../../config/palette';

const FIELDS = [
  { name: 'name', placeholder: 'Your name', tag: 'input' },
  { name: 'company', placeholder: 'Company', tag: 'input' },
  { name: 'details', placeholder: 'Role / offer details', tag: 'textarea' },
];

export default function HireModal({ onClose }) {
  const [form, setForm] = useState({ name: '', company: '', details: '' });
  const [status, setStatus] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Opportunity from ${form.company}`);
    const body = ['Hi Ayushman,', `I am ${form.name} from ${form.company}.`, form.details].map(encodeURIComponent).join('%0A%0A');
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus('Opening your mail app...');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex justify-center items-center bg-black/80 p-4 backdrop-blur-2xl overflow-y-auto">
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="w-full max-w-xl bg-black/60 backdrop-blur-3xl border border-white/20 p-8 relative spider-glitch rounded-2xl" style={{ boxShadow: `0 8px 32px rgba(255,230,0,0.2)` }}>
        <button onClick={onClose} className="absolute top-4 right-6 text-white/50 hover:text-white font-bold text-2xl transition-colors">×</button>
        <div className="flex flex-col items-center">
          <img src={HIRE_IMAGE} alt="" className="w-24 h-24 object-cover rounded-full border-2 border-hero-yellow mb-4 grayscale" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://i.imgflip.com/1g8my4.jpg'; }} />
          <h2 className="text-3xl md:text-4xl font-bold text-center uppercase tracking-tighter text-glitch" style={{ textShadow: `2px 2px 0 ${palette.yellow}` }}>Cure My Unemployment</h2>
          <p className="text-center text-zinc-400 mb-6 tracking-widest text-[8px] md:text-[10px] uppercase font-bold">Developer is highly motivated. Proceed with employment.</p>
          <form onSubmit={submit} className="flex flex-col gap-3 w-full max-w-sm">
            {FIELDS.map(({ tag: Tag, ...f }) => (
              <Tag key={f.name} required placeholder={f.placeholder.toUpperCase()} rows={Tag === 'textarea' ? 3 : undefined} onChange={(e) => setForm({ ...form, [f.name]: e.target.value })} className="bg-white/5 border border-white/10 rounded p-3 text-xs md:text-sm tracking-widest font-bold text-white focus:border-hero-yellow outline-none placeholder-zinc-400 resize-none transition-colors" />
            ))}
            <button type="submit" className="mt-2 bg-hero-yellow text-black rounded font-bold tracking-widest text-xs md:text-sm py-3 uppercase hover:bg-white transition-colors">SEND OFFER</button>
          </form>
          {status && <p className="mt-4 text-hero-cyan font-bold tracking-widest text-[10px] uppercase">{status}</p>}
        </div>
      </motion.div>
    </motion.div>
  );
}
