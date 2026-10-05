// Team members — 27, order matches the original site carousel.
// Photos are owner-supplied brand assets downloaded into public/assets/images/team/.
export const TEAM = [
  // `linkedin` is only set for the members the original links (3 of 27).
  { name: 'Yurii Asadchyi', role: 'CEO', photo: '/assets/images/team/01-yurii-asadchyi.jpg', linkedin: 'https://www.linkedin.com/in/yurii-asadchyi-b5b593404/' },
  { name: 'Oleh Shuba', role: 'Chief Marketing Officer', photo: '/assets/images/team/02-oleh-shuba.jpg' },
  { name: 'Liudmila Kantsler', role: 'Senior Immigration Expert', photo: '/assets/images/team/03-liudmila-kantsler.jpg', linkedin: 'https://www.linkedin.com/in/mila-k-546a0a178/' },
  { name: 'Tetiana Kodlubai', role: 'Senior Immigration Expert', photo: '/assets/images/team/04-tetiana-kodlubai.jpg' },
  { name: 'Alina Avramenko', role: 'Senior Immigration Expert', photo: '/assets/images/team/05-alina-avramenko.jpg' },
  { name: 'Oleh Ponomarenko', role: 'Senior Immigration Expert', photo: '/assets/images/team/06-oleh-ponomarenko.jpg' },
  { name: 'Alina Bashynska', role: 'Senior Immigration Expert', photo: '/assets/images/team/07-alina-bashynska.jpg' },
  { name: 'Yana Volkova', role: 'Senior Immigration Expert', photo: '/assets/images/team/08-yana-volkova.jpg' },
  { name: 'Julia Ivanchenko', role: 'Senior Immigration Expert', photo: '/assets/images/team/09-julia-ivanchenko.jpg' },
  { name: 'Jack Zhuravel', role: 'Senior Immigration Expert', photo: '/assets/images/team/10-jack-zhuravel.jpg', linkedin: 'https://www.linkedin.com/in/yevhenii-zhuravel-9b38173b5/' },
  { name: 'Oleksandra Hlushakova', role: 'Senior Immigration Expert', photo: '/assets/images/team/11-oleksandra-hlushakova.jpg' },
  { name: 'Yulia Pylypenko', role: 'Senior Immigration Expert', photo: '/assets/images/team/12-yulia-pylypenko.jpg' },
  { name: 'Nataliia Komendatenko', role: 'Senior Immigration Expert', photo: '/assets/images/team/13-nataliia-komendatenko.jpg' },
  { name: 'David Kovtun', role: 'Senior Immigration Expert', photo: '/assets/images/team/14-david-kovtun.jpg' },
  { name: 'Elizabeth Al Hames', role: 'Senior immigration expert', photo: '/assets/images/team/15-elizabeth-al-hames.jpg' },
  { name: 'Anastasia Medzhydova', role: 'Senior immigration expert', photo: '/assets/images/team/16-anastasia-medzhydova.jpg' },
  { name: 'Ivan Devitskyi', role: 'Senior immigration expert', photo: '/assets/images/team/17-ivan-devitskyi.jpg' },
  { name: 'Yaroslava Boltianska', role: 'Senior immigration expert', photo: '/assets/images/team/18-yaroslava-boltianska.jpg' },
  { name: 'Karyna Poida', role: 'Senior Immigration Expert', photo: '/assets/images/team/19-karyna-poida.jpg' },
  { name: 'Olha Lutchyn', role: 'Senior Immigration Expert', photo: '/assets/images/team/20-olha-lutchyn.jpg' },
  { name: 'Kareem Shetta', role: 'SENIOR IMMIGRATION EXPERT', photo: '/assets/images/team/21-kareem-shetta.jpg' },
  { name: 'Lale Shihimova', role: 'SENIOR IMMIGRATION EXPERT', photo: '/assets/images/team/22-lale-shihimova.jpg' },
  { name: 'Violetta Danyliak', role: 'SENIOR IMMIGRATION EXPERT', photo: '/assets/images/team/23-violetta-danyliak.jpg' },
  { name: 'Oleksandra Baranova', role: 'SENIOR IMMIGRATION EXPERT', photo: '/assets/images/team/24-oleksandra-baranova.jpg' },
  { name: 'Anjela Kulesha', role: 'Immigration Assistant', photo: '/assets/images/team/25-anjela-kulesha.jpg' },
  { name: 'Fedir Blanar', role: 'Senior immigration expert', photo: '/assets/images/team/26-fedir-blanar.jpg' },
  { name: 'Viktoria Poida', role: 'Senior Immigration Expert', photo: '/assets/images/team/27-viktoria-poida.jpg' },
];

// NOTE: the invented written testimonials that used to live here are gone.
// The real testimonials are the original's YouTube videos — see
// src/data/testimonials.js and components/testimonials/Testimonials.jsx.

export const HOME_FAQ = [
  {
    q: '1. What does YouCanLegal do?',
    a: ['YouCanLegal helps people study, work, and relocate abroad legally. We provide full support — from choosing an opportunity to starting your new life in another country.'],
  },
  {
    q: '2. Who can apply for your programs?',
    a: [
      'Our services are designed for individuals who want to:',
      'work in Europe',
      'study abroad',
      'legally relocate to another country',
      'Each program has its own requirements, which we explain before starting.',
    ],
  },
  {
    q: '3. What services do you provide?',
    a: [
      'We offer full support, including:',
      'job or study program selection',
      'document preparation',
      'visa or residence permit guidance',
      'step-by-step support throughout the process',
    ],
  },
  {
    q: '4. Is YouCanLegal a legitimate company?',
    a: ['Yes, YouCanLegal operates as a legally registered company. We focus on transparent processes and cooperate with verified partners and employers.'],
  },
  {
    q: '5. How does the process work?',
    a: [
      'The process is simple and structured:',
      'Initial consultation',
      'Program selection',
      'Document preparation',
      'Application submission',
      'Relocation and start',
      'You are guided at every step.',
    ],
  },
  {
    q: '6. Why should I choose YouCanLegal?',
    a: [
      'Clients choose us because:',
      'we focus on legal and transparent processes',
      'we provide step-by-step guidance',
      'we work with verified opportunities abroad',
      'we support clients until they start their journey',
    ],
  },
];

// FAQ blocks copied word for word from each original page (6 per page).
export const COUNTRY_FAQ = {
  eu: [
    { q: '1. What does “Work in the EU” mean?', a: ['This program helps you find legal job opportunities in European countries and relocate with full support.', 'We guide you through the entire process — from job selection to starting work in Europe.'] },
    { q: '2. What countries are included in this program?', a: ['We offer opportunities in different European countries, such as:', 'Poland', 'Slovakia', 'Serbia', 'Available countries may change depending on current employer demand.'] },
    { q: '3. Are the jobs official and legal?', a: ['Yes, all jobs are official.', 'You receive a work permit, employment contract, and all required documents to work legally in the chosen country.'] },
    { q: '4. What is included in your service?', a: ['We provide full support, including:', 'job matching with verified employers', 'document preparation', 'visa or residence permit guidance', 'step-by-step assistance until you start working'] },
    { q: '5. Do I need experience or language skills?', a: ['Most positions are entry-level jobs, so:', 'experience is usually not required', 'language skills are not mandatory', 'However, basic communication skills can be an advantage.'] },
    { q: '6. Will I receive support after arriving in Europe?', a: ['Yes. We continue supporting you even after arrival:', 'guidance on starting work', 'basic adaptation help', 'assistance with initial steps in the country'] },
  ],
  poland: [
    { q: '1. What type of work will I do in Poland?', a: ['Most positions are entry-level jobs, such as:', 'warehouse work (packing, sorting, logistics)', 'production and factory work', 'general labor roles', 'These jobs usually do not require prior experience or language skills.'] },
    { q: '2. Is the job in Poland official and legal?', a: ['Yes, all employment is official.', 'You will receive a work contract and a legal work permit before starting your job.', 'We only cooperate with verified employers.'] },
    { q: '3. What documents do I need to work in Poland?', a: ['To work legally in Poland, you typically need:', 'a valid passport', 'a work permit', 'a visa or residence document', 'a signed employment contract', 'We guide you through the full document preparation process.'] },
    { q: '4. Do you provide accommodation in Poland?', a: ['In most cases, accommodation is provided or arranged by the employer.', 'Housing conditions and costs are explained before you start the process.'] },
    { q: '5. How long does the process take?', a: ['The timeline depends on the program and embassy workload.', 'On average, the process can take from several weeks to a few months.'] },
    { q: '6. Will I get support after arriving in Poland?', a: ['Yes. We provide step-by-step guidance even after arrival, including:', 'instructions for starting work', 'basic adaptation support', 'communication assistance if needed'] },
  ],
  slovakia: [
    { q: '1. What type of work will I do in Slovakia?', a: ['Most positions are in manufacturing, such as:', 'production line operator', 'packer', 'basic factory work', 'The exact role depends on the employer and assignment.'] },
    { q: '2. Is the job official and does it provide legal documents?', a: ['Yes, the employment is fully official.', 'You will receive an employment contract and can apply for a residence permit for up to 2 years, allowing you to legally live and work in Slovakia.'] },
    { q: '3. What salary and working conditions can I expect?', a: ['The average salary is: €900 – €1,600 per month (gross)', 'Working schedule: approximately 160–200 hours per month', 'Taxes and insurance are handled according to local regulations.'] },
    { q: '4. Is accommodation provided?', a: ['Yes, accommodation is usually provided in a shared dormitory or apartment.', 'Cost: approximately €80 – €150 per month, typically deducted from your salary.'] },
    { q: '5. Do I need experience or language skills?', a: ['No, most positions:', 'do not require previous experience', 'do not require language skills', 'However, there may be a simple selection process, such as:', 'a basic logic test', 'a manual dexterity test'] },
    { q: '6. Are there any requirements or restrictions?', a: ['Basic requirements include:', 'age up to 55 years', 'good physical condition', 'readiness to work in a production environment', 'Please note that this is a paid program, and costs will be explained in advance.'] },
  ],
  serbia: [
    { q: '1. What type of work will I do in Serbia?', a: ['Most positions are general labor jobs, such as:', 'warehouse work', 'loading and unloading', 'cleaning and basic manual tasks', 'After arrival, there may be opportunities to move into more skilled roles (construction, driving, machine operation, etc.).'] },
    { q: '2. What salary and working conditions can I expect?', a: ['The average salary is: around €1,100 per month.', 'Working schedule:', '6 days per week', '8–12 hours per shift', 'approximately 200–280 hours per month', 'Overtime may be available depending on workload.'] },
    { q: '3. What documents will I receive?', a: ['You will receive official documents from the employer, including:', 'employment contract', 'invitation letter', 'accommodation confirmation', 'documents for Work Visa Type D and Residence Permit', 'These documents allow you to legally work and live in Serbia.'] },
    { q: '4. Is accommodation provided?', a: ['Yes, accommodation is provided:', 'shared apartments (2–4 people)', 'fully equipped housing', 'Cost: approximately €150 per month, deducted from salary.'] },
    { q: '5. What is included and what is not included?', a: ['Included:', 'transport to/from work', '1 meal per day', 'health insurance', 'tax registration', 'Not included:', 'flight tickets', 'personal expenses', 'document-related fees'] },
    // "Make payment" was dropped from this list: it is payment content and the
    // owner manages payment outside the site (round 2 rule).
    { q: '6. How does the application process work?', a: ['The process is step-by-step:', 'Sign service agreement', 'Document preparation (up to ~10 days)', 'Receive employer documents', 'Submit application', 'Wait for visa decision (up to ~90 days)', 'Travel to Serbia and start work', 'After arrival, the employer assists with obtaining a residence permit for up to 3 years'] },
  ],
};
