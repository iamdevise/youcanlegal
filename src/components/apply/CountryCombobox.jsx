import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { COUNTRIES, countryBaseName } from '../../data/countries';

// Searchable country combobox (custom — never a native <select>).
//
// mode="country"  value is the stored label, e.g. "India (भारत)"
// mode="dial"     value is the dial code, e.g. "+254"
//
// Types to filter by country name, and in dial mode also by code ("+254").
// Flags are locally bundled SVGs under /assets/flags/ (no hotlinked images).

const strip = (s) =>
  String(s)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

function optionsFor(mode) {
  return COUNTRIES.map(([label, dial, iso]) => ({
    value: mode === 'dial' ? dial : label,
    label,
    dial,
    iso,
    name: countryBaseName(label),
    search: strip(`${label} ${countryBaseName(label)} ${dial} ${dial.replace('+', '')} ${iso}`),
  }));
}

export default function CountryCombobox({
  id,
  mode = 'country',
  value,
  onChange,
  placeholder = 'Select country',
  ariaLabel,
  compact = false,
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);

  const rootRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const labelId = useId();

  const all = useMemo(() => optionsFor(mode), [mode]);

  const filtered = useMemo(() => {
    const q = strip(query).trim();
    if (!q) return all;
    const compactQuery = q.replace(/[^\d+]/g, '');
    return all.filter((o) => {
      if (o.search.includes(q)) return true;
      // "+254" / "254" should find Kenya in the phone picker
      if (compactQuery.length > 1 && o.dial.replace('+', '').startsWith(compactQuery.replace('+', ''))) return true;
      return false;
    });
  }, [all, query]);

  const selected = useMemo(() => all.find((o) => o.value === value) || null, [all, value]);

  // Reset the highlight whenever the result set changes.
  useEffect(() => {
    setActive(0);
  }, [query, open]);

  // Close on outside click.
  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  // On open: focus the search field and keep it visible above the mobile keyboard.
  useEffect(() => {
    if (!open) return undefined;
    const t = setTimeout(() => {
      const el = inputRef.current;
      if (!el) return;
      el.focus({ preventScroll: true });
      if (typeof el.scrollIntoView === 'function') el.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }, 60);
    return () => clearTimeout(t);
  }, [open]);

  // Keep the highlighted option inside the scroll viewport.
  useEffect(() => {
    if (!open || !listRef.current) return;
    const node = listRef.current.querySelector(`[data-index="${active}"]`);
    if (node && typeof node.scrollIntoView === 'function') node.scrollIntoView({ block: 'nearest' });
  }, [active, open]);

  const commit = (option) => {
    if (!option) return;
    onChange(option.value);
    setOpen(false);
    setQuery('');
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
        // Stop here: the form's Enter handler would otherwise move to the next step.
        event.stopPropagation();
        setOpen(true);
      }
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((i) => Math.min(i + 1, filtered.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (event.key === 'Home') {
      event.preventDefault();
      setActive(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      setActive(Math.max(0, filtered.length - 1));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      // Selecting a country must not advance the step as well.
      event.stopPropagation();
      commit(filtered[active]);
    } else if (event.key === 'Tab') {
      setOpen(false);
    }
  };

  const triggerText = selected
    ? mode === 'dial'
      ? `${selected.name} ${selected.dial}`
      : selected.name
    : placeholder;

  return (
    <div className={`combo${compact ? ' combo--compact' : ''}${open ? ' combo--open' : ''}`} ref={rootRef}>
      <button
        type="button"
        id={id}
        className="combo-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={ariaLabel ? `${labelId} ${id}` : undefined}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
      >
        {selected ? (
          <img className="combo-flag" src={`/assets/flags/${selected.iso}.svg`} alt="" width="24" height="18" />
        ) : (
          <span className="combo-flag combo-flag--empty" aria-hidden="true" />
        )}
        <span className={`combo-value${selected ? '' : ' combo-placeholder'}`}>{triggerText}</span>
        <ChevronDown size={17} className="combo-chev" aria-hidden="true" />
      </button>
      {ariaLabel ? (
        <span id={labelId} className="sr-only">
          {ariaLabel}
        </span>
      ) : null}

      {open && (
        <div className="combo-panel" role="presentation">
          <div className="combo-search">
            <Search size={16} aria-hidden="true" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={mode === 'dial' ? 'Search country or +code' : 'Search country'}
              aria-label={mode === 'dial' ? 'Search country or dial code' : 'Search country'}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              inputMode={mode === 'dial' ? 'search' : 'text'}
            />
          </div>
          <ul className="combo-list" role="listbox" ref={listRef} aria-label={ariaLabel || 'Countries'}>
            {filtered.length === 0 && <li className="combo-empty">No country found</li>}
            {filtered.map((o, i) => (
              <li
                key={o.iso + o.dial + o.label}
                data-index={i}
                role="option"
                aria-selected={o.value === value}
                className={`combo-option${i === active ? ' is-active' : ''}${o.value === value ? ' is-selected' : ''}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => commit(o)}
              >
                <img className="combo-flag" src={`/assets/flags/${o.iso}.svg`} alt="" width="24" height="18" loading="lazy" />
                <span className="combo-option-name">{o.name}</span>
                <span className="combo-option-dial">{o.dial}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
