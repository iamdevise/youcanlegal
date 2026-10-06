import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

// Themed dropdown that replaces the native white <select> inside the
// application form (navy/blue panel, white text, blue highlight).
export default function ThemedSelect({ id, value, onChange, options, placeholder = 'Select' }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef(null);

  const selected = options.find((o) => o.value === value) || null;

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const idx = Math.max(0, options.findIndex((o) => o.value === value));
    setActive(idx);
    return undefined;
  }, [open, options, value]);

  const commit = (option) => {
    if (!option) return;
    onChange(option.value);
    setOpen(false);
  };

  const onKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      setOpen(false);
      return;
    }
    if (!open) {
      if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        // Keep the form's Enter handler from moving to the next step as well.
        event.stopPropagation();
        setOpen(true);
      }
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((i) => Math.min(i + 1, options.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      commit(options[active]);
    } else if (event.key === 'Tab') {
      setOpen(false);
    }
  };

  return (
    <div className={`combo combo--select${open ? ' combo--open' : ''}`} ref={rootRef}>
      <button
        type="button"
        id={id}
        className="combo-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
      >
        <span className={`combo-value${selected ? '' : ' combo-placeholder'}`}>{selected ? selected.label : placeholder}</span>
        <ChevronDown size={17} className="combo-chev" aria-hidden="true" />
      </button>
      {open && (
        <ul className="combo-panel combo-panel--list" role="listbox">
          {options.map((o, i) => (
            <li
              key={o.value}
              role="option"
              aria-selected={o.value === value}
              className={`combo-option combo-option--plain${i === active ? ' is-active' : ''}${o.value === value ? ' is-selected' : ''}`}
              onMouseEnter={() => setActive(i)}
              onClick={() => commit(o)}
            >
              <span className="combo-option-name">{o.label}</span>
              {o.value === value && <Check size={16} aria-hidden="true" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
