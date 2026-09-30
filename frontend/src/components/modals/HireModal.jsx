// HIRE ME popup: a small form that opens the visitor's mail app with a pre-filled message.
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HIRE_IMAGE } from '../../config/assets';
import { profile } from '../../data/profile';
import { palette } from '../../config/palette';

// Form fields are generated from this list
const FIELDS = [
  { name: 'name', placeholder: 'Your name', tag: 'input' },
  { name: 'company', placeholder: 'Company', tag: 'input' },
  { name: 'details', placeholder: 'Role / offer details', tag: 'textarea' },
];
const FALLBACK_IMAGE = 'https://i.imgflip.com/1g8my4.jpg'; // used when hire-me-meme.jpg is missing

export default function HireModal({ onClose }) {
  const [form, setForm] = useState({ name: '', company: '', details: '' });
  const [status, setStatus] = useState('');

  // Build a mailto: link from the form and open it
  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Opportunity from ${form.company}`);
    const body = ['Hi Ayushman,', `I am ${form.name} from ${form.company}.`, form.details].map(encodeURIComponent).join('%0A%0A');
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus('Opening your mail app...');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex justify-center items-center bg-black/80 p-4 backdrop-blur-md overflow-y-auto">
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-2xl bg-black/70 backdrop-blur-xl border border-zinc-800 p-8 md:p-12 relative spider-glitch" style={{ boxShadow: `8px 8px 0 ${palette.yellow}` }}>
        <button onClick={onClose} className="absolute top-6 right-8 text-zinc-500 hover:text-white font-bold text-3xl transition-colors">×</button>
        
        <div className="flex flex-col items-center">
          <img src={HIRE_IMAGE} alt="" className="w-32 h-32 object-cover rounded-full border-4 border-hero-yellow mb-6 grayscale"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMAGE; }} />
          <h2 className="text-4xl md:text-5xl font-bold text-center uppercase tracking-tighter text-glitch" style={{ textShadow: `3px 3px 0 ${palette.yellow}` }}>Cure My Unemployment</h2>
          <p className="text-center text-zinc-500 mb-8 tracking-widest text-[10px] uppercase font-bold">Developer is highly motivated. Proceed with employment.</p>
          
          <form onSubmit={submit} className="flex flex-col gap-4 w-full max-w-md">
            {FIELDS.map(({ tag: Tag, ...f }) => (
              <Tag key={f.name} required placeholder={f.placeholder.toUpperCase()} rows={Tag === 'textarea' ? 3 : undefined}
                onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                className="bg-black/50 border border-zinc-800 p-4 text-sm tracking-widest font-bold text-white focus:border-hero-yellow outline-none placeholder-zinc-700 resize-none transition-colors" />
            ))}
            <button type="submit" className="mt-4 bg-hero-yellow text-black font-bold tracking-widest text-sm py-4 uppercase hover:bg-white transition-colors">SEND OFFER</button>
          </form>
          {status && <p className="mt-6 text-hero-cyan font-bold tracking-widest text-xs uppercase">{status}</p>}
        </div>
      </motion.div>
    </motion.div>
  );
}
