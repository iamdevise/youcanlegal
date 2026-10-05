import { useState } from 'react';
import { Link } from 'react-router-dom';
import { COUNTRIES } from '../../data/countries';
import SectionHeading from '../common/SectionHeading';
import { supabase } from '../../lib/supabase';

// Application form — mirrors the original site's consultation form.
// Submit target: Supabase "applications" table (public insert via RLS, private read).
export default function ApplyForm({ program = 'Work in the EU' }) {
  const [form, setForm] = useState({
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
  });
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const set = (k) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [k]: value }));
  };

  const validate = () => {
    if (!form.citizenship) return 'Please select your citizenship.';
    if (!form.livesInPassportCountry) return 'Please answer whether you live in the country that issued your passport.';
    if (form.livesInPassportCountry === 'no' && !form.residenceCountry) return 'Please select the country you live in.';
    if (!form.fullName.trim()) return 'Please enter your full name.';
    if (!form.age || Number(form.age) <= 0) return 'Please enter your age.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return 'Please enter a valid email address.';
    if (!form.whatsapp.trim()) return 'Please enter your WhatsApp number.';
    if (!form.applicantType) return 'Please tell us if you are applying for yourself or as an agency.';
    if (!form.consentFees || !form.consentService || !form.consentContact) return 'Please confirm all three required consents to continue.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      whatsapp: `${form.phoneCode} ${form.whatsapp.trim()}`,
      applicant_type: form.applicantType,
    };

    try {
      if (!supabase) throw new Error('MISSING_ENV');
      const { error: dbError } = await supabase.from('applications').insert(payload);
      if (dbError) throw dbError;
      setStatus({ state: 'success', message: '' });
    } catch (err) {
      // Surface an actionable error; the form state itself was never cleared, so input is preserved.
      setStatus({
        state: 'error',
        message: 'We could not submit your application right now. Please check your connection and try again — your details are still filled in.',
      });
    }
  };

  const inputId = (k) => `af-${k}`;

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

          <form className="apply-form" onSubmit={handleSubmit} noValidate>
            <p className="form-head" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--color-ink-heading)', marginBottom: 6 }}>
              Fill out the form to get a free consultation
            </p>
            <p className="form-note">Your email address will not be published. Required fields are marked *</p>

            {status.state === 'error' && <div className="form-alert error" role="alert">{status.message}</div>}

            {status.state === 'success' ? (
              <div className="form-alert success" role="status">
                <strong>Thank you! Your application has been sent.</strong>
                <p style={{ marginTop: 8 }}>
                  Our team will contact you by email or WhatsApp to schedule your free consultation.
                  If you have questions in the meantime, write to hello@youcan.legal.
                </p>
              </div>
            ) : (
              <>
                <div className="form-field">
                  <label htmlFor={inputId('citizenship')}>Citizenship (country of your passport) <span className="req">*</span></label>
                  <select id={inputId('citizenship')} value={form.citizenship} onChange={set('citizenship')} required>
                    <option value="">Select country</option>
                    {COUNTRIES.map(([label]) => <option key={label} value={label}>{label}</option>)}
                  </select>
                </div>

                <div className="form-field">
                  <label>Do you live in the country that issued your passport? <span className="req">*</span></label>
                  <div className="form-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
                    <label style={{ display: 'flex', gap: 10, alignItems: 'center', fontWeight: 400, minHeight: 48 }}>
                      <input type="radio" name="lives" value="yes" checked={form.livesInPassportCountry === 'yes'} onChange={set('livesInPassportCountry')} /> Yes, I live there
                    </label>
                    <label style={{ display: 'flex', gap: 10, alignItems: 'center', fontWeight: 400, minHeight: 48 }}>
                      <input type="radio" name="lives" value="no" checked={form.livesInPassportCountry === 'no'} onChange={set('livesInPassportCountry')} /> No, I live in another country
                    </label>
                  </div>
                </div>

                {form.livesInPassportCountry === 'no' && (
                  <div className="form-field">
                    <label htmlFor={inputId('residence')}>Which country do you live in? <span className="req">*</span></label>
                    <select id={inputId('residence')} value={form.residenceCountry} onChange={set('residenceCountry')}>
                      <option value="">Select country</option>
                      {COUNTRIES.map(([label]) => <option key={label} value={label}>{label}</option>)}
                    </select>
                  </div>
                )}

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor={inputId('name')}>Your Full Name <span className="req">*</span></label>
                    <input id={inputId('name')} type="text" value={form.fullName} onChange={set('fullName')} autoComplete="name" required />
                  </div>
                  <div className="form-field">
                    <label htmlFor={inputId('age')}>How old are you? <span className="req">*</span></label>
                    <input id={inputId('age')} type="number" min="16" max="70" value={form.age} onChange={set('age')} required />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor={inputId('email')}>Your Email <span className="req">*</span></label>
                  <input id={inputId('email')} type="email" value={form.email} onChange={set('email')} autoComplete="email" required />
                </div>

                <div className="form-field">
                  <label htmlFor={inputId('whatsapp')}>Your WhatsApp number <span className="req">*</span></label>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <select aria-label="Country code" value={form.phoneCode} onChange={set('phoneCode')} style={{ width: 130, flexShrink: 0 }}>
                      {COUNTRIES.map(([label, code]) => {
                        const idx = label.indexOf(' (');
                        const clean = idx > 0 ? label.slice(0, idx) : label;
                        return <option key={label} value={code}>{clean} {code}</option>;
                      })}
                    </select>
                    <input id={inputId('whatsapp')} type="tel" placeholder="7XX XXX XXX" value={form.whatsapp} onChange={set('whatsapp')} autoComplete="tel" required style={{ flex: 1 }} />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor={inputId('type')}>I am <span className="req">*</span></label>
                  <select id={inputId('type')} value={form.applicantType} onChange={set('applicantType')} required>
                    <option value="">Select</option>
                    <option value="myself">I'm looking for a job for myself</option>
                    <option value="agency">I represent an agency and have clients</option>
                  </select>
                </div>

                <div className="check-field">
                  <input id={inputId('c1')} type="checkbox" checked={form.consentFees} onChange={set('consentFees')} />
                  <label htmlFor={inputId('c1')}>
                    I confirm that I understand there may be official government or administrative fees related to the application process.
                  </label>
                </div>
                <div className="check-field">
                  <input id={inputId('c2')} type="checkbox" checked={form.consentService} onChange={set('consentService')} />
                  <label htmlFor={inputId('c2')}>
                    I understand that the company provides paid guidance and support, including employment documents and a work permit. Visa sponsorship is not included, and the final visa decision is made by the relevant immigration authorities.
                  </label>
                </div>
                <div className="check-field">
                  <input id={inputId('c3')} type="checkbox" checked={form.consentContact} onChange={set('consentContact')} />
                  <label htmlFor={inputId('c3')}>
                    I agree to be contacted by email or WhatsApp regarding my request and consent to the processing of my personal data according to the{' '}
                    <Link to="/privacy-policy/">Privacy Policy</Link>.
                  </label>
                </div>

                <button type="submit" className="btn btn-primary form-submit" disabled={status.state === 'loading'}>
                  {status.state === 'loading' ? 'Sending…' : 'Apply Now'}
                </button>
                <p className="form-footnote">
                  No sponsorship provided · All programs are paid
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
