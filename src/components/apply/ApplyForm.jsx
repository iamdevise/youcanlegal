import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import CountryCombobox from './CountryCombobox';
import ThemedSelect from './ThemedSelect';

// The one and only application form, shared by the Apply popup (variant
// "modal") and the inline form on the Work in the EU / country pages (variant
// "section"). Same fields, same validation, same styles.
//
// It is a 3-step wizard so that the popup fits a phone screen (360x640) without
// vertical scrolling:
//   1 About you · 2 Contact · 3 Confirm
// Each step is validated before moving on. Submissions go to the Vercel
// function /api/apply, which re-validates server-side, stores the row in
// Supabase `applications` and emails the admin.

const APPLICANT_OPTIONS = [
  { value: 'myself', label: "I'm looking for a job for myself" },
  { value: 'agency', label: 'I represent an agency and have clients' },
];

const STEP_TITLES = ['About you', 'Contact', 'Confirm'];

const INITIAL = {
  citizenship: '',
  livesInPassportCountry: '',
  residenceCountry: '',
  fullName: '',
  age: '',
  email: '',
  whatsapp: '',
  phoneCode: '+254',
  applicantType: '',
  consentFees: false,
  consentService: false,
  consentContact: false,
};

export default function ApplyForm({ program = 'Work in the EU', variant = 'section', onSuccess, onCancel }) {
  const [form, setForm] = useState(INITIAL);
  const [honeypot, setHoneypot] = useState('');
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const bodyRef = useRef(null);
  const isModal = variant === 'modal';

  const set = (key) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setForm((f) => ({ ...f, [key]: value }));
  };

  // Clear a stale error as soon as the applicant starts fixing it.
  useEffect(() => {
    if (status.state === 'error') setStatus({ state: 'idle', message: '' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  // Never let the on-screen keyboard hide the field being typed in: centre the
  // focused control once the keyboard animation has finished (~250ms).
  useEffect(() => {
    const node = bodyRef.current;
    if (!node) return undefined;
    const onFocusIn = (event) => {
      const el = event.target;
      if (!el.matches || !el.matches('input, select, textarea, .combo-trigger')) return;
      window.setTimeout(() => {
        if (typeof el.scrollIntoView === 'function') el.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }, 250);
    };
    node.addEventListener('focusin', onFocusIn);
    return () => node.removeEventListener('focusin', onFocusIn);
  }, []);

  // New step: scroll the body back to the top and move focus to the step itself,
  // so a keyboard user is not left on the Next button. The body is focused rather
  // than the first field, which would pop the keyboard open before the applicant
  // has read the new step.
  useEffect(() => {
    const node = bodyRef.current;
    if (!node) return;
    node.scrollTop = 0;
    node.focus({ preventScroll: true });
  }, [step]);

  const stepError = useMemo(() => {
    return (which) => {
      if (which === 1) {
        if (!form.citizenship) return 'Please select your citizenship.';
        if (!form.livesInPassportCountry) return 'Please choose Yes or No.';
        if (form.livesInPassportCountry === 'no' && !form.residenceCountry) return 'Please select the country you live in.';
        if (!form.fullName.trim()) return 'Please enter your full name.';
        return null;
      }
      if (which === 2) {
        if (!form.age) return 'Please enter your age.';
        if (Number(form.age) < 16 || Number(form.age) > 70) return 'Applicants must be between 16 and 70 years old.';
        if (!form.applicantType) return 'Please choose who you are applying for.';
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim())) return 'Please enter a valid email address.';
        if (!form.whatsapp.trim()) return 'Please enter your WhatsApp number.';
        return null;
      }
      if (!form.consentFees || !form.consentService || !form.consentContact) return 'Please tick all three boxes to continue.';
      return null;
    };
  }, [form]);

  const goNext = () => {
    const error = stepError(step);
    if (error) {
      setStatus({ state: 'error', message: error });
      return;
    }
    setStatus({ state: 'idle', message: '' });
    setStep((s) => Math.min(3, s + 1));
  };

  const goBack = () => {
    setStatus({ state: 'idle', message: '' });
    setStep((s) => Math.max(1, s - 1));
  };

  // Enter moves to the next field, and from the last field to the next step.
  // Never runs for the country dropdowns — they handle Enter themselves and stop
  // the event before it reaches here.
  const onFormKeyDown = (event) => {
    if (event.key !== 'Enter') return;
    const el = event.target;
    if (!el.matches || !el.matches('input') || el.type === 'checkbox' || el.type === 'submit') return;
    if (el.closest('.combo')) return;
    event.preventDefault();
    const body = bodyRef.current;
    const focusables = body
      ? Array.from(body.querySelectorAll('input:not([type="checkbox"]), .combo-trigger')).filter(
          (n) => !n.disabled && n.offsetParent !== null
        )
      : [];
    const index = focusables.indexOf(el);
    if (index >= 0 && index < focusables.length - 1) {
      focusables[index + 1].focus();
      return;
    }
    if (step < 3) goNext();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    for (const which of [1, 2, 3]) {
      const error = stepError(which);
      if (error) {
        setStatus({ state: 'error', message: error });
        setStep(which);
        return;
      }
    }
    setStatus({ state: 'loading', message: '' });

    const payload = {
      program,
      citizenship: form.citizenship,
      lives_in_passport_country: form.livesInPassportCountry === 'yes',
      residence_country: form.livesInPassportCountry === 'yes' ? form.citizenship : form.residenceCountry,
      full_name: form.fullName.trim(),
      age: Number(form.age),
      email: form.email.trim(),
      whatsapp: `${form.phoneCode} ${form.whatsapp.trim()}`.trim(),
      applicant_type: form.applicantType,
      consents: { fees: form.consentFees, service: form.consentService, contact: form.consentContact },
      company_website: honeypot, // honeypot — must stay empty
    };

    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.ok === false) throw new Error(data.error || 'SUBMIT_FAILED');
      setStatus({ state: 'success', message: '' });
      setForm(INITIAL);
      setStep(1);
      if (onSuccess) onSuccess();
    } catch (err) {
      // The form state is never cleared on failure, so nothing typed is lost.
      setStatus({
        state: 'error',
        message:
          'We could not submit your application right now. Please check your connection and try again — your details are still filled in.',
      });
    }
  };

  const progress = status.state === 'success' ? 100 : Math.round(((step - 1) / 3) * 100);

  /* ---------------------------------------------------------------- step 1 */
  const stepAbout = (
    <>
      <div className="af-field">
        <label htmlFor="af-citizenship">
          Citizenship (country of your passport) <span className="req">*</span>
        </label>
        <CountryCombobox
          id="af-citizenship"
          mode="country"
          value={form.citizenship}
          onChange={(v) => setForm((f) => ({ ...f, citizenship: v }))}
          ariaLabel="Citizenship country"
        />
      </div>

      <div className="af-field">
        <label>
          Do you live in the country that issued your passport? <span className="req">*</span>
        </label>
        <div className="af-toggle" role="group" aria-label="Do you live in the country that issued your passport?">
          {[
            { v: 'yes', t: 'Yes' },
            { v: 'no', t: 'No' },
          ].map((o) => (
            <button
              key={o.v}
              type="button"
              className={`af-toggle-btn${form.livesInPassportCountry === o.v ? ' is-active' : ''}`}
              aria-pressed={form.livesInPassportCountry === o.v}
              onClick={() => setForm((f) => ({ ...f, livesInPassportCountry: o.v, ...(o.v === 'yes' ? { residenceCountry: '' } : null) }))}
            >
              {o.t}
            </button>
          ))}
        </div>
      </div>

      {form.livesInPassportCountry === 'no' && (
        <div className="af-field">
          <label htmlFor="af-residence">
            Which country do you live in? <span className="req">*</span>
          </label>
          <CountryCombobox
            id="af-residence"
            mode="country"
            value={form.residenceCountry}
            onChange={(v) => setForm((f) => ({ ...f, residenceCountry: v }))}
            ariaLabel="Country of residence"
          />
        </div>
      )}

      <div className="af-field">
        <label htmlFor="af-name">
          Your Full Name <span className="req">*</span>
        </label>
        <input
          id="af-name"
          type="text"
          value={form.fullName}
          onChange={set('fullName')}
          autoComplete="name"
          enterKeyHint="next"
          required
        />
      </div>
    </>
  );

  /* ---------------------------------------------------------------- step 2 */
  const stepContact = (
    <>
      <div className="af-grid-2">
        <div className="af-field">
          <label htmlFor="af-age">
            How old are you? <span className="req">*</span>
          </label>
          <input
            id="af-age"
            type="number"
            min="16"
            max="70"
            inputMode="numeric"
            enterKeyHint="next"
            value={form.age}
            onChange={set('age')}
            required
          />
        </div>
        <div className="af-field">
          <label htmlFor="af-type">
            I am <span className="req">*</span>
          </label>
          <ThemedSelect
            id="af-type"
            value={form.applicantType}
            onChange={(v) => setForm((f) => ({ ...f, applicantType: v }))}
            options={APPLICANT_OPTIONS}
            placeholder="Select"
          />
        </div>
      </div>

      <div className="af-field">
        <label htmlFor="af-email">
          Your Email <span className="req">*</span>
        </label>
        <input
          id="af-email"
          type="email"
          value={form.email}
          onChange={set('email')}
          inputMode="email"
          autoComplete="email"
          enterKeyHint="next"
          required
        />
      </div>

      <div className="af-field">
        <label htmlFor="af-whatsapp">
          Your WhatsApp number <span className="req">*</span>
        </label>
        <div className="af-phone-row">
          <CountryCombobox
            id="af-phonecode"
            mode="dial"
            compact
            value={form.phoneCode}
            onChange={(v) => setForm((f) => ({ ...f, phoneCode: v }))}
            ariaLabel="WhatsApp country code"
          />
          <input
            id="af-whatsapp"
            type="tel"
            placeholder="7XX XXX XXX"
            value={form.whatsapp}
            onChange={set('whatsapp')}
            autoComplete="tel-national"
            inputMode="tel"
            enterKeyHint="done"
            required
          />
        </div>
      </div>
    </>
  );

  /* ---------------------------------------------------------------- step 3 */
  const stepConfirm = (
    <>
      <div className="af-consent">
        <input id="af-c1" type="checkbox" checked={form.consentFees} onChange={set('consentFees')} />
        <label htmlFor="af-c1">
          I confirm that I understand there may be official government or administrative fees related to the application process.
        </label>
      </div>
      <div className="af-consent">
        <input id="af-c2" type="checkbox" checked={form.consentService} onChange={set('consentService')} />
        <label htmlFor="af-c2">
          I understand that the company provides paid guidance and support, including employment documents and a work permit. Visa sponsorship is not
          included, and the final visa decision is made by the relevant immigration authorities.
        </label>
      </div>
      <div className="af-consent">
        <input id="af-c3" type="checkbox" checked={form.consentContact} onChange={set('consentContact')} />
        <label htmlFor="af-c3">
          I agree to be contacted by email or WhatsApp regarding my request and consent to the processing of my personal data according to the{' '}
          <Link to="/privacy-policy/" className="af-privacy-link">
            Privacy Policy
          </Link>
          .
        </label>
      </div>
      <p className="af-footnote">No sponsorship provided · All programs are paid</p>
    </>
  );

  const steps = [stepAbout, stepContact, stepConfirm];

  /* ------------------------------------------------------------ submit bar */
  const submitButton = (
    <button type="submit" className="btn-apply" disabled={status.state === 'loading'}>
      {status.state === 'loading' ? (
        <>
          <Loader2 size={20} className="af-spin" aria-hidden="true" />
          Sending…
        </>
      ) : (
        <>
          Apply Now
          <ArrowRight size={20} aria-hidden="true" />
        </>
      )}
    </button>
  );

  const formBody = (
    <form
      className={`apply-form${isModal ? ' apply-form--modal' : ''}`}
      onSubmit={handleSubmit}
      onKeyDown={onFormKeyDown}
      noValidate
      data-component="application-form"
    >
      <input
        type="text"
        name="company_website"
        className="hp-field"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
      />

      {status.state === 'success' ? (
        <div className="af-success" ref={bodyRef} role="status">
          <span className="af-success-icon" aria-hidden="true">
            <Check size={30} strokeWidth={3} />
          </span>
          <strong>Thank you, we will contact you on WhatsApp/email.</strong>
          <p>Your application has been received. Our team will reach out to schedule your free consultation.</p>
          {onCancel && (
            <button type="button" className="btn-af-secondary" onClick={onCancel}>
              Close
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="af-head">
            <p className="af-title">{isModal ? 'Free consultation' : 'Fill out the form to get a free consultation'}</p>
            <div className="af-progress">
              <span className="af-progress-label">
                Step {step} of 3 · {STEP_TITLES[step - 1]}
              </span>
              <span className="af-progress-track" aria-hidden="true">
                <span className="af-progress-fill" style={{ width: `${Math.max(progress, 6)}%` }} />
              </span>
            </div>
          </div>

          <div
            className="af-body"
            ref={bodyRef}
            tabIndex={-1}
            role="group"
            aria-label={`Step ${step} of 3: ${STEP_TITLES[step - 1]}`}
          >
            {status.state === 'error' && (
              <div className="af-alert" role="alert">
                {status.message}
              </div>
            )}
            {steps[step - 1]}
          </div>

          <div className="af-foot">
            {step === 3 ? (
              <>
                <button type="button" className="btn-af-secondary" onClick={goBack}>
                  Back
                </button>
                {submitButton}
              </>
            ) : (
              <>
                {step > 1 && (
                  <button type="button" className="btn-af-secondary" onClick={goBack}>
                    Back
                  </button>
                )}
                <button type="button" className="btn-apply" onClick={goNext}>
                  Next
                  <ArrowRight size={20} aria-hidden="true" />
                </button>
              </>
            )}
          </div>
        </>
      )}
    </form>
  );

  if (isModal) return formBody;

  /* ------------------------------------------------------------ inline form */
  return (
    <section className="apply-band" id="formform" data-component="application-form-section">
      <div className="container">
        <div className="apply-grid">
          <div className="apply-info">
            <SectionHeading eyebrow="Get an official job offer" title="and work permit directly from verified employers." centered={false} />
            <p>We help you prepare all documents for a visa application and guide you step by step until you start your job in Europe.</p>
            <ul>
              <li>Legal work permit</li>
              <li>Accommodation provided</li>
              <li>Full visa guidance</li>
            </ul>
          </div>
          <div className="apply-card">{formBody}</div>
        </div>
      </div>
    </section>
  );
}
