import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { X } from 'lucide-react';
import ApplyForm from './ApplyForm';

// Every "Apply Now" button on the site opens this one modal, which reuses the
// single ApplyForm component. If a country page opens it, that country's
// program is pre-selected in the `program` field.

const ApplyModalContext = createContext({ openApply: () => {}, closeApply: () => {}, isOpen: false });

export function useApplyModal() {
  return useContext(ApplyModalContext);
}

function ApplyModal({ program, onClose }) {
  const overlayRef = useRef(null);
  const cardRef = useRef(null);

  // Lock background scroll while open.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  // Move focus into the dialog on open.
  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;
    const first = node.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    (first || node).focus({ preventScroll: true });
  }, []);

  const onKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
      return;
    }
    if (event.key !== 'Tab') return;
    // Trap focus inside the dialog.
    const node = cardRef.current;
    if (!node) return;
    const focusables = Array.from(
      node.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    ).filter((el) => !el.disabled && el.offsetParent !== null);
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      className="modal-overlay apply-modal-overlay"
      ref={overlayRef}
      role="presentation"
      onKeyDown={onKeyDown}
      onMouseDown={(event) => {
        if (event.target === overlayRef.current) onClose();
      }}
    >
      <div
        className="apply-modal-card"
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-label="Application form"
        tabIndex={-1}
      >
        <button type="button" className="apply-modal-close" aria-label="Close application form" onClick={onClose}>
          <X size={20} />
        </button>
        <ApplyForm program={program} variant="modal" />
      </div>
    </div>
  );
}

export function ApplyModalProvider({ children }) {
  const [state, setState] = useState({ open: false, program: 'Work in the EU' });

  const openApply = useCallback((program) => {
    setState({ open: true, program: program || 'Work in the EU' });
  }, []);

  const closeApply = useCallback(() => {
    setState((s) => ({ ...s, open: false }));
  }, []);

  const value = useMemo(() => ({ openApply, closeApply, isOpen: state.open }), [openApply, closeApply, state.open]);

  return (
    <ApplyModalContext.Provider value={value}>
      {children}
      {state.open && <ApplyModal program={state.program} onClose={closeApply} />}
    </ApplyModalContext.Provider>
  );
}
