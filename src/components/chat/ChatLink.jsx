import { useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import { WhatsAppIcon } from '../common/icons';
import { CHAT_TYPE_LABELS, pickContact, useChatContacts } from '../../lib/chatContacts';

// An inline "chat with us on WhatsApp / Telegram" link.
//
// It resolves to one of the active contacts of that type using the same rule as
// the floating button (random per visitor, then fixed for the session), so every
// chat link on the site follows the admin's list and nobody is bounced between
// agents. Renders nothing when that type has no active contact.

const TYPE_ICON = {
  whatsapp: <WhatsAppIcon size={18} />,
  telegram: <Send size={18} />,
};

export default function ChatLink({ type, children, className, showIcon = true, onNavigate }) {
  const contacts = useChatContacts();
  const [href, setHref] = useState('');

  useEffect(() => {
    const contact = pickContact(contacts, type);
    setHref(contact ? contact.value : '');
  }, [contacts, type]);

  if (!href) return null;

  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={children ? undefined : `Chat with us on ${CHAT_TYPE_LABELS[type]}`}
      onClick={onNavigate}
    >
      {showIcon && TYPE_ICON[type]}
      {children}
    </a>
  );
}
