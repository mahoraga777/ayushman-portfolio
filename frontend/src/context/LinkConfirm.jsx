import React, { createContext, useCallback, useContext, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LinkConfirmModal from '../components/modals/LinkConfirmModal';

const LinkConfirmContext = createContext(() => {});
export const useLinkConfirm = () => useContext(LinkConfirmContext);

export function LinkConfirmProvider({ children }) {
  const [pending, setPending] = useState(null);
  const requestLink = useCallback((url, name) => {
    if (!url) return;
    if (url.startsWith('http')) setPending({ url, name }); 
    else window.location.href = url; 
  }, []);

  return (
    <LinkConfirmContext.Provider value={requestLink}>
      {children}
      <AnimatePresence>
        {pending && <LinkConfirmModal link={pending} onClose={() => setPending(null)} />}
      </AnimatePresence>
    </LinkConfirmContext.Provider>
  );
}
