// /privacy-policy/ — exact text from the original site (18 sections).
const LAST_UPDATED = '30 April 2026';
const CONTACT = {
  company: 'YOU CAN LEGAL SERVICES LTD',
  number: '16872568',
  email: 'hello@youcan.legal',
  address: '167–169 Great Portland Street, London, England, W1W 5PF',
};

export default function PrivacyPage() {
  return (
    <>
      <div className="container privacy-page" data-component="privacy-policy">
        <article className="article" style={{ padding: '50px 20px 80px', margin: 0, maxWidth: 900 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.2rem', color: 'var(--color-ink-heading)', marginBottom: 14 }}>
            Privacy Policy
          </h1>
          <p style={{ marginBottom: 8 }}><strong>Last updated:</strong> {LAST_UPDATED}</p>
          <p>
            This Privacy Policy explains how <strong>{CONTACT.company}</strong>, company number <strong>{CONTACT.number}</strong>,
            operating under the brand <strong>You Can Legal</strong> (“Company”, “You Can Legal”, “we”, “us”, or “our”),
            collects, uses, stores, shares, and protects personal data when you visit our website, submit an application,
            contact us, or use our services.
          </p>
          <p>
            Our website is available at: <strong>https://youcan.legal/</strong> and related pages or domains operated by You Can Legal (the “Website”).
          </p>
          <p>
            For privacy-related questions, requests, or complaints, you may contact us at:
            <strong> Email:</strong> {CONTACT.email} · <strong>Company:</strong> {CONTACT.company} ·
            <strong> Company number:</strong> {CONTACT.number} ·
            <strong> Registered / contact address:</strong> {CONTACT.address}
          </p>
          <p>
            This Privacy Policy applies to website visitors, applicants, clients, potential clients, partners,
            and any person who contacts or interacts with You Can Legal.
          </p>

          <h2>1. About You Can Legal</h2>
          <p>
            You Can Legal provides immigration support, legal work journey support, job offer assistance, work permit guidance,
            visa application support, document preparation support, and step-by-step assistance for people seeking legal work
            opportunities in Europe. The information on our Website is provided for general informational purposes only.
            It does not constitute immigration, legal, financial, or professional advice. Visa rules, employment requirements,
            government procedures, fees, processing times, and employer conditions may change at any time.
          </p>

          <h2>2. Updates to this Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our services, technologies, legal
            requirements, or business operations. The updated version will be posted on this page with a revised “Last updated” date.
            We encourage you to review this Privacy Policy periodically.
          </p>

          <h2>3. What Data We Collect</h2>
          <p>Depending on how you interact with us, we may collect the following categories of data.</p>
          <h3>3.1. Contact and Application Data</h3>
          <p>When you fill out a form, apply for a consultation, request information, or contact us, we may collect:</p>
          <ul>
            <li>full name;</li>
            <li>country of residence or citizenship;</li>
            <li>phone number;</li>
            <li>email address;</li>
            <li>WhatsApp or other messenger contact details;</li>
            <li>preferred destination country;</li>
            <li>employment interest;</li>
            <li>information submitted through our application or consultation form;</li>
            <li>consent confirmations and checkbox answers, including confirmation that you understand the terms of the program, payment requirements, and that we do not provide sponsorship or payment after visa approval.</li>
          </ul>
          <h3>3.2. Eligibility and Work-Related Data</h3>
          <p>To assess whether a program or opportunity may be suitable for you, we may ask for or receive information such as:</p>
          <ul>
            <li>age range or date of birth;</li>
            <li>work experience;</li>
            <li>education;</li>
            <li>occupation;</li>
            <li>language skills;</li>
            <li>physical ability or suitability for a specific type of work, where relevant;</li>
            <li>availability to travel or relocate;</li>
            <li>prior visa or immigration history;</li>
            <li>criminal record status, where this is required for a specific employer, authority, or program;</li>
            <li>other information necessary to assess your eligibility for a job, work permit, visa, or residence permit process.</li>
          </ul>
          <h3>3.3. Identity, Passport, and Document Data</h3>
          <p>If you decide to proceed with a service, we may request and process documents such as:</p>
          <ul>
            <li>passport scans or passport details;</li>
            <li>national ID documents, where applicable;</li>
            <li>police clearance certificate or similar background documents;</li>
            <li>CV or resume;</li>
            <li>education or qualification documents;</li>
            <li>employment records;</li>
            <li>translated documents;</li>
            <li>visa application documents;</li>
            <li>work permit, residence permit, or employer-related documents;</li>
            <li>signed service agreements;</li>
            <li>accommodation confirmation documents;</li>
            <li>employer invitation letters;</li>
            <li>other documents required for the relevant process.</li>
          </ul>
          <p>Please do not send us documents unless we request them or unless they are necessary for the service you are applying for.</p>
          <h3>3.4. Payment and Transaction Data</h3>
          <p>
            If you purchase services from us, we may process information related to your payment, invoice, service agreement,
            payment status, and transaction history. If payments are processed through a third-party payment provider, your card
            or banking information may be processed directly by that provider. We do not intentionally store full payment card
            details on our systems unless expressly stated and lawfully required.
          </p>
          <h3>3.5. Communication Data</h3>
          <p>When you communicate with us, we may collect and store:</p>
          <ul>
            <li>email correspondence;</li>
            <li>WhatsApp or messenger messages;</li>
            <li>phone call notes;</li>
            <li>call recordings, where permitted by law and/or where you have been notified;</li>
            <li>support requests;</li>
            <li>complaints, questions, feedback, or other communications.</li>
          </ul>
          <p>We may use this data to respond to you, provide services, improve service quality, prevent fraud, and keep records of our relationship with you.</p>
          <h3>3.6. Technical and Website Usage Data</h3>
          <p>When you visit the Website, we and our service providers may automatically collect:</p>
          <ul>
            <li>IP address;</li>
            <li>browser type and version;</li>
            <li>device type;</li>
            <li>operating system;</li>
            <li>pages visited;</li>
            <li>time and date of visit;</li>
            <li>clicks, navigation, and interactions with the Website;</li>
            <li>approximate location based on IP address;</li>
            <li>referral source;</li>
            <li>cookie and tracking data;</li>
            <li>security and anti-spam verification data.</li>
          </ul>
          <h3>3.7. Marketing and Advertising Data</h3>
          <p>
            We may collect data about how you interact with our ads, Website, landing pages, forms, and social media accounts.
            This may include information collected through Meta/Facebook Pixel, TikTok Pixel, cookies, similar tracking
            technologies, and advertising platforms.
          </p>

          <h2>4. How We Collect Data</h2>
          <ul>
            <li>directly from you when you complete a form or contact us;</li>
            <li>when you communicate with us by phone, email, WhatsApp, social media, messenger, online chat, or other channels;</li>
            <li>when you sign a service agreement or provide documents;</li>
            <li>automatically through cookies, pixels, analytics, server logs, and security technologies;</li>
            <li>from employers, partners, consultants, translators, immigration support providers, or other service providers involved in your case, where appropriate;</li>
            <li>from public sources or official registers, where necessary and lawful.</li>
          </ul>

          <h2>5. Why We Use Your Data</h2>
          <h3>5.1. To Provide Services</h3>
          <p>We use your data to:</p>
          <ul>
            <li>respond to your request;</li>
            <li>assess your eligibility for available opportunities;</li>
            <li>provide a consultation;</li>
            <li>prepare service agreements;</li>
            <li>coordinate document preparation;</li>
            <li>support work permit, visa, and residence permit processes;</li>
            <li>communicate with employers, partners, and service providers;</li>
            <li>provide step-by-step support until you begin the relevant process or job journey.</li>
          </ul>
          <h3>5.2. To Communicate with You</h3>
          <p>We may use your contact details to:</p>
          <ul>
            <li>call you;</li>
            <li>send emails;</li>
            <li>send WhatsApp or messenger messages;</li>
            <li>provide updates about your application;</li>
            <li>answer questions;</li>
            <li>request missing information or documents;</li>
            <li>send service-related notices.</li>
          </ul>
          <h3>5.3. To Assess Suitability for a Program</h3>
          <p>
            We may use your data to understand whether you meet basic program requirements, such as age, country, work readiness,
            document availability, ability to pay required fees, absence of sponsorship expectations, and other criteria relevant
            to a specific job or visa process.
          </p>
          <h3>5.4. To Process Payments and Manage Contracts</h3>
          <p>We may use your data to:</p>
          <ul>
            <li>prepare and manage service agreements;</li>
            <li>issue invoices or receipts;</li>
            <li>confirm payments;</li>
            <li>manage refunds, disputes, or chargebacks;</li>
            <li>comply with accounting, tax, and legal obligations.</li>
          </ul>
          <h3>5.5. To Improve Our Website and Services</h3>
          <p>We may use technical and usage data to:</p>
          <ul>
            <li>monitor Website performance;</li>
            <li>fix technical issues;</li>
            <li>improve user experience;</li>
            <li>understand which pages, ads, and offers are effective;</li>
            <li>protect the Website from spam, fraud, abuse, and unauthorized access.</li>
          </ul>
          <h3>5.6. For Marketing and Remarketing</h3>
          <p>Where permitted by law and where required with your consent, we may use your data to:</p>
          <ul>
            <li>send information about our services;</li>
            <li>follow up after you submit a form;</li>
            <li>show relevant ads on platforms such as Facebook, Instagram, TikTok, Google, or similar platforms;</li>
            <li>create custom or lookalike audiences;</li>
            <li>measure ad performance;</li>
            <li>improve our marketing campaigns.</li>
          </ul>
          <p>
            You may opt out of marketing communications at any time by contacting us at <strong>{CONTACT.email}</strong> or by
            using any unsubscribe option provided in our messages.
          </p>
          <h3>5.7. For Legal, Security, and Compliance Purposes</h3>
          <p>We may use your data to:</p>
          <ul>
            <li>comply with applicable laws and regulations;</li>
            <li>respond to lawful requests from authorities;</li>
            <li>prevent fraud, abuse, or misuse of our services;</li>
            <li>enforce our agreements;</li>
            <li>protect our rights, clients, partners, employees, and business;</li>
            <li>keep legally required records.</li>
          </ul>

          <h2>6. Legal Bases for Processing</h2>
          <p>
            Where data protection laws such as the UK GDPR, EU GDPR, or other applicable laws apply, we rely on one or more of
            the following legal bases:
          </p>
          <ul>
            <li><strong>Consent</strong> — for example, when you agree to receive emails and WhatsApp messages, consent to personal data processing, submit optional information, or accept certain cookies and tracking technologies.</li>
            <li><strong>Performance of a contract</strong> — when processing is necessary to provide the services you requested, prepare a service agreement, process your application, or support your case.</li>
            <li><strong>Legitimate interests</strong> — for example, to respond to inquiries, improve our services, prevent fraud, secure our Website, keep business records, and conduct limited direct marketing where allowed.</li>
            <li><strong>Legal obligation</strong> — when we must process or retain data to comply with laws, accounting rules, tax obligations, court orders, or regulatory requirements.</li>
            <li><strong>Establishment, exercise, or defense of legal claims</strong> — when necessary to protect our legal rights or respond to disputes.</li>
          </ul>

          <h2>7. Cookies and Tracking Technologies</h2>
          <p>
            Our Website may use cookies, pixels, tags, scripts, local storage, and similar technologies. Cookies are small files
            placed on your device when you visit a website. They help websites function, remember preferences, analyze traffic,
            and support advertising.
          </p>
          <h3>7.1. Essential and Security Cookies</h3>
          <p>
            These are necessary for the Website to work properly, protect forms from spam, load pages, and secure the Website.
            This may include technologies such as <strong>Cloudflare Turnstile</strong> or similar anti-spam and security tools.
          </p>
          <h3>7.2. Analytics and Performance Cookies</h3>
          <p>
            These help us understand how visitors use the Website, which pages are viewed, how users interact with forms,
            and how we can improve Website performance.
          </p>
          <h3>7.3. Advertising and Remarketing Cookies</h3>
          <p>These help us measure advertising performance and show relevant ads to people who have visited our Website or interacted with our services. Our Website may use:</p>
          <ul>
            <li><strong>Meta / Facebook Pixel</strong>;</li>
            <li><strong>TikTok Pixel</strong>;</li>
            <li>other advertising or analytics tools that may be added from time to time.</li>
          </ul>
          <p>
            These tools may collect information such as your IP address, browser information, device data, page views, form
            interactions, and other online identifiers. Advertising platforms may combine this information with data they
            already have about you, subject to their own privacy policies and settings.
          </p>
          <h3>7.4. Embedded Video and Third-Party Content</h3>
          <p>
            Our Website may contain embedded YouTube videos and links to social media platforms such as Facebook, Instagram,
            and YouTube. When you interact with embedded content or click third-party links, those third parties may collect
            data according to their own privacy policies.
          </p>
          <h3>7.5. Managing Cookies</h3>
          <p>
            You can control cookies through your browser settings. You may block, delete, or restrict cookies. If you disable
            certain cookies, some Website features may not work properly. You may also manage advertising preferences directly
            through the relevant advertising platforms, including Meta/Facebook, TikTok, Google, and your device settings.
          </p>

          <h2>8. Third-Party Services We May Use</h2>
          <p>
            We may use third-party providers to operate our Website, forms, analytics, advertising, communications, payments,
            security, hosting, CRM, email, messaging, document signing, and business operations. These may include:
          </p>
          <ul>
            <li>website hosting providers;</li>
            <li>form and CRM providers;</li>
            <li>email and messaging providers;</li>
            <li>WhatsApp or messenger communication tools;</li>
            <li>payment processors;</li>
            <li>cloud storage providers;</li>
            <li>analytics providers;</li>
            <li>advertising platforms such as Meta/Facebook and TikTok;</li>
            <li>anti-spam and security providers such as Cloudflare;</li>
            <li>YouTube or other video platforms;</li>
            <li>employers, recruitment partners, immigration support providers, translators, consultants, and document preparation partners.</li>
          </ul>
          <p>
            Third-party providers may process data only as necessary to provide services to us or to you, or as otherwise
            described in their own privacy policies.
          </p>

          <h2>9. Sharing Data with Third Parties</h2>
          <p>We do not sell your personal data in the ordinary meaning of selling a client list for money. However, we may share your personal data where necessary and lawful, including with:</p>
          <ul>
            <li>service providers who help us operate our business;</li>
            <li>employers or potential employers, where you have requested or consented to this as part of your application;</li>
            <li>immigration support providers, consultants, translators, and document preparation partners;</li>
            <li>payment processors and financial institutions;</li>
            <li>advertising and analytics platforms;</li>
            <li>IT, hosting, CRM, cloud, security, and communication providers;</li>
            <li>professional advisers, including lawyers, accountants, auditors, and insurers;</li>
            <li>government authorities, courts, regulators, or law enforcement where required by law;</li>
            <li>affiliated companies, successors, or buyers in the event of a merger, acquisition, restructuring, or sale of all or part of our business.</li>
          </ul>
          <p>
            When your information is shared with a potential employer or a government authority as part of a process you requested,
            that party may become an independent controller of your personal data and may process it according to its own policies
            and legal obligations.
          </p>

          <h2>10. International Data Transfers</h2>
          <p>
            Because our services may involve applicants, employers, partners, and service providers in different countries, your
            data may be transferred to or processed in countries outside your country of residence, including the United Kingdom,
            European Union countries, Serbia, Poland, Slovakia, Ukraine, and other countries relevant to your application or service.
          </p>
          <p>
            Where required by applicable law, we use appropriate safeguards for international transfers, such as contractual
            protections, data processing agreements, adequacy decisions, or other lawful transfer mechanisms.
          </p>

          <h2>11. Data Retention</h2>
          <p>We keep personal data only for as long as reasonably necessary for the purposes described in this Privacy Policy. Retention periods may depend on:</p>
          <ul>
            <li>whether you are only a Website visitor, applicant, client, or partner;</li>
            <li>whether we need the data to provide services;</li>
            <li>whether there is an active application, service agreement, payment, dispute, or support request;</li>
            <li>legal, accounting, tax, compliance, and reporting obligations;</li>
            <li>limitation periods for legal claims;</li>
            <li>your request to delete data, where deletion is legally possible.</li>
          </ul>
          <p>When personal data is no longer needed, we will delete it, anonymize it, or securely archive it where permitted by law.</p>

          <h2>12. How We Protect Your Data</h2>
          <p>
            We use reasonable technical and organizational measures to protect personal data against unauthorized access, loss,
            misuse, disclosure, alteration, or destruction. These measures may include access controls, secure communication
            channels, limited internal access, provider security controls, anti-spam tools, and data handling procedures.
          </p>
          <p>
            No website, email system, cloud service, or internet transmission is completely secure. You should avoid sending
            highly sensitive documents unless requested and should use secure channels whenever available.
          </p>

          <h2>13. Your Privacy Rights</h2>
          <p>Depending on your country, region, and applicable law, you may have the right to:</p>
          <ul>
            <li>request access to personal data we hold about you;</li>
            <li>request correction of inaccurate or incomplete data;</li>
            <li>request deletion of your data;</li>
            <li>request restriction of processing;</li>
            <li>object to processing based on legitimate interests;</li>
            <li>withdraw consent where processing is based on consent;</li>
            <li>request data portability;</li>
            <li>object to direct marketing;</li>
            <li>lodge a complaint with a data protection authority.</li>
          </ul>
          <p>
            To exercise your rights, contact us at <strong>{CONTACT.email}</strong>. We may need to verify your identity before
            responding to a request. Some rights may be limited where we have legal obligations, contractual obligations, fraud
            prevention needs, or legitimate grounds to retain certain information.
          </p>

          <h2>14. Marketing Communications</h2>
          <p>
            If you submit a form, contact us, or consent to communications, we may contact you by email, phone, WhatsApp,
            messenger, or other channels about your inquiry, application, services, and related offers. You can opt out of
            marketing communications at any time by contacting <strong>{CONTACT.email}</strong> or using the unsubscribe option
            where available.
          </p>
          <p>
            Please note that even if you opt out of marketing, we may still send you service-related messages necessary to
            process your application, respond to your request, manage a contract, or comply with legal obligations.
          </p>

          <h2>15. Children’s Privacy</h2>
          <p>
            Our services are intended for adults and persons who are legally able to enter into service agreements and
            work-related processes. We do not knowingly collect personal data from children under the age of 16 without
            appropriate parental or legal guardian consent, where such consent is required by law. If you believe a child
            has provided us with personal data without proper consent, please contact us at <strong>{CONTACT.email}</strong>.
          </p>

          <h2>16. Third-Party Links</h2>
          <p>
            Our Website may contain links to third-party websites, social media pages, video platforms, government websites,
            employer websites, or partner websites. We are not responsible for the privacy practices, content, security, or
            policies of third-party websites. Please review their privacy policies before submitting personal data to them.
          </p>

          <h2>17. No Guarantee of Visa, Job, or Government Decision</h2>
          <p>
            This Privacy Policy explains how we process personal data. It does not create a guarantee of visa approval, work
            permit approval, residence permit approval, job placement, government decision, salary level, processing time, or
            employer outcome. All immigration, employment, and government-related decisions are subject to applicable laws,
            employer requirements, government procedures, and the information provided by the applicant.
          </p>

          <h2>18. Contact Us</h2>
          <p>If you have questions about this Privacy Policy, your personal data, or your privacy rights, please contact us:</p>
          <p>
            <strong>{CONTACT.company}</strong><br />
            <strong>Company number:</strong> {CONTACT.number}<br />
            <strong>Email:</strong> {CONTACT.email}<br />
            <strong>Address:</strong> {CONTACT.address}
          </p>
        </article>
      </div>
    </>
  );
}
