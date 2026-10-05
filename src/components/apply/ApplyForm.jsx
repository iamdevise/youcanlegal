import { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../common/SectionHeading';
import CountryCombobox from './CountryCombobox';
import ThemedSelect from './ThemedSelect';

// The one and only application form. Used inline on the Work in the EU /
// country pages (variant "section") and inside the Apply Now modal
// (variant "modal"). Both share the same fields, validation and styling.
//
// Submissions go to the Vercel serverless function /api/apply, which validates
// server-side, stores the row in Supabase `applications` and emails the admin.

const APPLICANT_OPTIONS = [
  { value: 'myself', label: "I'm looking for a job for myself" },
  { value: 'agency', label: 'I represent an agency and have clients' },
];

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

export default function ApplyForm({ program = 'Work in the EU', variant = 'section', onSuccess }) {
  const [form, setForm] = useState(INITIAL);
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const set = (key) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setForm((f) => ({ ...f, [key]: value }));
  };

  const validate = () => {
    if (!form.citizenship) return 'Please select your citizenship.';
    if (!form.livesInPassportCountry) return 'Please answer whether you live in the country that issued your passport.';
    if (form.livesInPassportCountry === 'no' && !form.residenceCountry) return 'Please select the country you live in.';
    if (!form.fullName.trim()) return 'Please enter your full name.';
    if (!form.age) return 'Please enter your age.';
    if (Number(form.age) < 16 || Number(form.age) > 70) return 'Applicants must be between 16 and 70 years old.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim())) return 'Please enter a valid email address.';
    if (!form.whatsapp.trim()) return 'Please enter your WhatsApp number.';
    if (!form.applicantType) return 'Please tell us if you are applying for yourself or as an agency.';
    if (!form.consentFees || !form.consentService || !form.consentContact) return 'Please confirm all three required consents to continue.';
    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const error = validate();
    if (error) {
      setStatus({ state: 'error', message: error });
      return;
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
      if (!response.ok || data.ok === false) {
        throw new Error(data.error || 'SUBMIT_FAILED');
      }
      setStatus({ state: 'success', message: '' });
      setForm(INITIAL);
      if (onSuccess) onSuccess();
    } catch (err) {
      // The form state is never cleared on failure, so nothing the applicant
      // typed is lost.
      setStatus({
        state: 'error',
        message:
          'We could not submit your application right now. Please check your connection and try again — your details are still filled in.',
      });
    }
  };

  const formCard = (
    <form className="apply-form apply-card" onSubmit={handleSubmit} noValidate>
      <p className="form-head">Fill out the form to get a free consultation</p>
      <p className="form-note">Your email address will not be published. Required fields are marked *</p>

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

      {status.state === 'error' && (
        <div className="form-alert error" role="alert">
          {status.message}
        </div>
      )}

      {status.state === 'success' ? (
        <div className="form-alert success" role="status">
          <strong>Thank you, we will contact you on WhatsApp/email.</strong>
          <p style={{ marginTop: 8 }}>
            Your application has been received. Our team will reach out to schedule your free consultation.
          </p>
        </div>
      ) : (
        <>
          <div className="form-field">
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

          <div className="form-field">
            <label>
              Do you live in the country that issued your passport? <span className="req">*</span>
            </label>
            <div className="form-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <label className="radio-row">
                <input type="radio" name="lives" value="yes" checked={form.livesInPassportCountry === 'yes'} onChange={set('livesInPassportCountry')} />
                <span>Yes, I live there</span>
              </label>
              <label className="radio-row">
                <input type="radio" name="lives" value="no" checked={form.livesInPassportCountry === 'no'} onChange={set('livesInPassportCountry')} />
                <span>No, I live in another country</span>
              </label>
            </div>
          </div>

          {form.livesInPassportCountry === 'no' && (
            <div className="form-field">
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

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="af-name">
                Your Full Name <span className="req">*</span>
              </label>
              <input id="af-name" type="text" value={form.fullName} onChange={set('fullName')} autoComplete="name" required />
            </div>
            <div className="form-field">
              <label htmlFor="af-age">
                How old are you? <span className="req">*</span>
              </label>
              <input id="af-age" type="number" min="16" max="70" inputMode="numeric" value={form.age} onChange={set('age')} required />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="af-email">
              Your Email <span className="req">*</span>
            </label>
            <input id="af-email" type="email" value={form.email} onChange={set('email')} autoComplete="email" required />
          </div>

          <div className="form-field">
            <label htmlFor="af-whatsapp">
              Your WhatsApp number <span className="req">*</span>
            </label>
            <div className="phone-row">
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
                autoComplete="tel"
                inputMode="tel"
                required
              />
            </div>
          </div>

          <div className="form-field">
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

          <div className="check-field">
            <input id="af-c1" type="checkbox" checked={form.consentFees} onChange={set('consentFees')} />
            <label htmlFor="af-c1">
              I confirm that I understand there may be official government or administrative fees related to the application process.
            </label>
          </div>
          <div className="check-field">
            <input id="af-c2" type="checkbox" checked={form.consentService} onChange={set('consentService')} />
            <label htmlFor="af-c2">
              I understand that the company provides paid guidance and support, including employment documents and a work permit. Visa sponsorship is not
              included, and the final visa decision is made by the relevant immigration authorities.
            </label>
          </div>
          <div className="check-field">
            <input id="af-c3" type="checkbox" checked={form.consentContact} onChange={set('consentContact')} />
            <label htmlFor="af-c3">
              I agree to be contacted by email or WhatsApp regarding my request and consent to the processing of my personal data according to the{' '}
              <Link to="/privacy-policy/" className="form-privacy-link">
                Privacy Policy
              </Link>
              .
            </label>
          </div>

          <button type="submit" className="btn btn-primary form-submit" disabled={status.state === 'loading'}>
            {status.state === 'loading' ? 'Sending…' : 'Apply Now'}
          </button>
          <p className="form-footnote">No sponsorship provided · All programs are paid</p>
        </>
      )}
    </form>
  );

  if (variant === 'modal') return formCard;

  return (
    <section className="apply-band" id="formform" data-component="application-form">
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
          {formCard}
        </div>
      </div>
    </section>
  );
}
