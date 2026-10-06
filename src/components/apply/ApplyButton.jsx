import { ArrowRight } from 'lucide-react';

// The one high-visibility Apply button used everywhere: the two application
// forms, the end of every job offer and the sticky bar inside the job-offer
// popups. White on navy — a contrast ratio of about 15:1 against the gradient
// card and 4.6:1 against the brand blue — so it is always obvious.
export default function ApplyButton({ onClick, children = 'Apply Now', className = '', type = 'button' }) {
  return (
    <button type={type} className={`btn-apply${className ? ` ${className}` : ''}`} onClick={onClick}>
      {children}
      <ArrowRight size={20} aria-hidden="true" />
    </button>
  );
}
