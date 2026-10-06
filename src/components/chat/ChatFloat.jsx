import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { WhatsAppIcon } from '../common/icons';
import { availableTypes, pickContact, useChatContacts, CHAT_TYPE_LABELS } from '../../lib/chatContacts';

// Floating chat button.
//
// It is deliberately a neutral chat bubble in the brand blue, because it can
// lead to either app. Tapping it opens a chooser ("Chat with us") listing only
// the types that actually have an active contact. If just one type exists the
// chooser is skipped and the visitor goes straight there. With no active
// contacts at all the button is not rendered.
//
// The contact itself is picked by pickContact(): random per visitor, then held
// in sessionStorage so one person keeps talking to the same agent.

const TYPE_ICON = {
  whatsapp: <WhatsAppIcon size={22} />,
  telegram: <Send size={22} />,
};

export default function ChatFloat() {
  const contacts = useChatContacts();
  const types = availableTypes(contacts);
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const sheetRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) setOpen(false);
    };
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    const first = sheetRef.current && sheetRef.current.querySelector('button');
    if (first) first.focus();
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (types.length === 0) return null;

  const go = (type) => {
    const contact = pickContact(contacts, type);
    setOpen(false);
    if (!contact) return;
    window.open(contact.value, '_blank', 'noopener,noreferrer');
  };

  // Only one type available — skip the chooser entirely.
  if (types.length === 1) {
    return (
      <div className="chat-float-wrap">
        <button
          type="button"
          className="chat-float"
          onClick={() => go(types[0])}
          aria-label={`Chat with us on ${CHAT_TYPE_LABELS[types[0]]}`}
        >
          <MessageCircle size={26} />
        </button>
      </div>
    );
  }

  return (
    <div className="chat-float-wrap" ref={rootRef}>
      {open && (
        <div className="chat-chooser" role="dialog" aria-label="Chat with us">
          <div className="chat-chooser-head" ref={sheetRef}>
            <strong>Chat with us</strong>
            <button type="button" className="chat-chooser-close" aria-label="Close" onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </div>
          <p className="chat-chooser-note">Pick the app you prefer — we answer on both.</p>
          <div className="chat-chooser-options">
            {types.map((type) => (
              <button key={type} type="button" className={`chat-option chat-option--${type}`} onClick={() => go(type)}>
                <span className="chat-option-icon">{TYPE_ICON[type]}</span>
                <span className="chat-option-text">
                  <strong>{CHAT_TYPE_LABELS[type]}</strong>
                  <span>Continue in the app</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        type="button"
        className="chat-float"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Chat with us"
      >
        <MessageCircle size={26} />
      </button>
    </div>
  );
}
