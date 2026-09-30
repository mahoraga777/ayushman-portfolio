// Context that asks "open this link?" before leaving the portfolio.
// Usage: const requestLink = useLinkConfirm(); requestLink(url, name);
import React, { createContext, useCallback, useContext, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LinkConfirmModal from '../components/modals/LinkConfirmModal';

const LinkConfirmContext = createContext(() => {});
export const useLinkConfirm = () => useContext(LinkConfirmContext);

export function LinkConfirmProvider({ children }) {
  const [pending, setPending] = useState(null);
  const requestLink = useCallback((url, name) => {
    if (!url) return;
    // external links get a confirmation popup, mailto: links open directly
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
