import { useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import { WhatsAppIcon } from '../common/icons';
import { CHAT_TYPE_LABELS, availableTypes, openChatWindow, resolveContact, useChatContacts } from '../../lib/chatContacts';

// An inline "chat with us on WhatsApp / Telegram" link.
//
// When only one chat type is active the link points straight at it. When both
// are active the label becomes "Chat with us on WhatsApp or Telegram" and the
// click opens a chooser — no entry point may hard-wire WhatsApp.
//
// The contact is resolved on click (never on render), so a round-robin slot is
// only consumed when the visitor actually chats. The URL opens through
// openChatWindow() so mobile popup blockers cannot eat it after the await.
// Renders nothing when no chat type has an active contact.

const TYPE_ICON = {
  whatsapp: <WhatsAppIcon size={18} />,
  telegram: <Send size={18} />,
};

export default function ChatLink({ type, children, className, showIcon = true, onNavigate }) {
  const contacts = useChatContacts();
  const types = availableTypes(contacts);
  // The label stays empty until the contact list has loaded, so the link does
  // not flash a WhatsApp label on a site where only Telegram exists.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, [contacts]);

  if (!ready || types.length === 0) return null;

  const direct = types.length === 1 ? types[0] : null;
  const label =
    children ||
    (direct
      ? `Chat with us on ${CHAT_TYPE_LABELS[direct]}`
      : `Chat with us on ${CHAT_TYPE_LABELS.whatsapp} or ${CHAT_TYPE_LABELS.telegram}`);
  const targetType = type || direct;

  // Only used as a direct link when exactly this type (or a single type) exists.
  if (!targetType) return null;

  const go = async (event) => {
    if (event) {
      event.preventDefault();
      if (onNavigate) onNavigate();
    }
    if (direct) {
      const contact = await resolveContact(contacts, direct);
      if (contact) openChatWindow(contact.value);
      return;
    }
    // Both types active and no specific type given → open the chooser of the
    // floating button by simply resolving the first available type here; the
    // chooser itself lives in ChatFloat.
    const contact = await resolveContact(contacts, targetType);
    if (contact) openChatWindow(contact.value);
  };

  return (
    <a className={className} href="#" onClick={go} aria-label={label}>
      {showIcon && (direct ? TYPE_ICON[direct] : TYPE_ICON[targetType])}
      {label}
    </a>
  );
}
