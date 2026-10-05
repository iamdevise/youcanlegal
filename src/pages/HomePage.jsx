import Hero from '../components/hero/Hero';
import Marquee from '../components/common/Marquee';
import Services from '../components/services/Services';
import Numbers from '../components/numbers/Numbers';
import Testimonials from '../components/testimonials/Testimonials';
import Team from '../components/team/Team';
import Faq from '../components/faq/Faq';
import SeoCopy from '../components/seocopy/SeoCopy';
import { HOME_FAQ } from '../data/team';

// Homepage — section order replicates the original youcan.legal homepage.
export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee text="Work in the EU" alt="Study in the UK" />
      <Services />
      <Numbers />
      <Testimonials />
      <Team />
      <Faq items={HOME_FAQ} />
      <SeoCopy
        h1="Opportunities in Europe — Work, Study and Relocation Support"
        intro="Europe offers a wide range of opportunities for people who want to build a better future, increase their income, or gain international experience. Our company helps candidates from different countries access reliable opportunities in Europe, including employment and future education programs. We focus on creating a clear and structured path for relocation by providing support at every stage — from choosing the right direction to starting work or preparing for study programs. Our goal is to simplify the process and make opportunities in Europe more accessible."
        sections={[
          { h2: 'Work Opportunities in Europe', p: 'We currently help candidates find jobs in countries such as Poland, Slovakia, and Serbia. These positions are available in different industries and are suitable for people with or without previous experience. Many roles include accommodation, clear working conditions, and support with basic documentation. We cooperate with verified employers to ensure transparency and reliability.', items: ['Warehouse and logistics jobs', 'Factory and production work', 'Entry-level positions without experience', 'Jobs with accommodation provided', 'Opportunities with fast hiring process'] },
          { h2: 'Education Opportunities in Europe', p: 'In addition to employment, we are developing programs that will help candidates access education in Europe. This direction is focused on those who want to study, gain qualifications, and build long-term opportunities in European countries. Our goal is to provide clear guidance on available programs, admission requirements, and preparation steps. This service will be available soon as part of our full support system.' },
          { h2: 'What We Offer', items: ['Guidance on choosing the right path — work or study', 'Support with documents and preparation', 'Access to verified partners and opportunities', 'Clear explanation of requirements and conditions', 'Step-by-step assistance throughout the process'] },
          { h2: 'Simple and Transparent Process', p: 'We believe that access to opportunities should be clear and straightforward. That is why we use a simple process that allows candidates to move forward step by step.', items: ['Submit your request', 'Receive suitable options based on your goals', 'Get guidance on documents and requirements', 'Prepare for relocation, work, or study', 'Start your journey in Europe'] },
          { h2: 'Start Your Journey in Europe', p: 'If you are looking for a reliable way to work or study in Europe, our team is ready to help you find the right direction. Submit your request, and we will guide you through the next steps based on your goals.' },
        ]}
      />
    </>
  );
}
