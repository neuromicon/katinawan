import { CeremonyEvent, Application, SystemSettings } from '../types';

// All event dates, capacities, and applications remain unconfirmed until provided by the organizer.
// Per specification: "Do not publish invented values. Empty state until organizer publishes confirmed dates."
export const INITIAL_EVENTS: CeremonyEvent[] = [];

export const INITIAL_APPLICATIONS: Application[] = [];

export const INITIAL_SETTINGS: SystemSettings = {
  ORGANIZER_NAME: 'Sacred Plant Spirit Healing (Katin-awan)',
  CONTACT_EMAIL: 'katinawanph@gmail.com',
  FACEBOOK_PAGE_URL: 'https://facebook.com/katinawanph',
  MESSENGER_URL: 'https://m.me/katinawanph',
  DEFAULT_TIMEZONE: 'Asia/Manila (GMT+8)',
  DEFAULT_CURRENCY: 'PHP',
  LOCATION_POLICY: 'Private Sanctuary in Visayas, Philippines (exact directions provided upon confirmed booking)',
  APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbwzY-NMBbpaKxX8XYtPRDiRnvc7EW_yRQEaYLzj3mOa8eOclhpVX-Z98K2SJ5mwxQeaMQ/exec',
  GOOGLE_FORM_URL: '',
  GOOGLE_SHEET_URL: ''
};

export const FAQ_ITEMS = [
  {
    category: 'Ceremony & Origins',
    question: 'What does the word "Velada" mean?',
    answer: 'Velada is a Spanish word that means a gathering at night or a vigil. In this ceremonial context, it refers to a sacred overnight communion informed by traditional Mazatecan practice.'
  },
  {
    category: 'Ceremony & Origins',
    question: 'What is the meaning behind the name "Katin-awan"?',
    answer: 'In Cebuano (Visayan), "katin-awan" translates to "explanation," "clarification," or "enlightenment" (from the root "tin-aw," meaning clear or lucid). It represents the clarity of mind, heart, and spirit that seekers ask for when navigating life\'s crossroads.'
  },
  {
    category: 'Ceremony & Origins',
    question: 'How is the Velada ceremony conducted?',
    answer: 'The gathering is conducted in the Mazatecan tradition, featuring the ingestion of sacred mushroom prepared into powder mixed with a ritual ceremonial cacao drink, accompanied by sacred songs, grounding incense, and optional complementary plant medicines such as Rapé and Sanangga.'
  },
  {
    category: 'Experience & Flow',
    question: 'What can participants expect during the experience?',
    answer: 'It is best to arrive with an open heart and zero rigid expectations. Participants commonly experience deep introspection, visual and energetic dimensions, communion with inner wisdom or spirit guides, and emotional clarity. The space is held by experienced guides in a calm, supportive sanctuary.'
  },
  {
    category: 'Experience & Flow',
    question: 'What is the difference between recreational and ceremonial use?',
    answer: 'A ceremony is an intentionally consecrated, safe space held by compassionate and trained facilitators who remain fully present throughout the night to provide support, guidance, and grounding. It is focused on reverence, self-exploration, and healing rather than casual recreation.'
  },
  {
    category: 'Experience & Flow',
    question: 'How long does the ceremony last?',
    answer: 'The main nocturnal vigil lasts between 4 to 6 hours, followed by a warm light meal and rest. The full gathering spans from 15:00 on Saturday until 12:00 Sunday noon, including morning group integration.'
  },
  {
    category: 'Preparation & Safety',
    question: 'Is it suitable for beginners?',
    answer: 'Yes. When held with proper preparation, gentle dosing, and conscious guidance, it provides a safe, welcoming, and profound introduction to sacred plant medicine. A comprehensive pre-screening is conducted for every applicant.'
  },
  {
    category: 'Preparation & Safety',
    question: 'How should I prepare beforehand (La Dieta)?',
    answer: 'Preparation begins the Monday prior: avoid alcohol, recreational drugs, and toxic media consumption. Starting Thursday (2 days before), refrain from eating meat and avoid sexual activity. Cultivate clear intentions and questions for your journey.'
  },
  {
    category: 'Preparation & Safety',
    question: 'Does the ceremony treat medical or psychiatric conditions?',
    answer: 'No. The ceremony is a spiritual and reflective practice, not a medical or psychiatric treatment. We do not make medical claims or promise guaranteed cures for depression, anxiety, or trauma. Participants must never discontinue prescribed medications without consulting a qualified medical doctor.'
  },
  {
    category: 'Preparation & Safety',
    question: 'Is this aligned with or against any religion?',
    answer: 'No. The ceremony is neither for nor against any religion. It is not a cult or a dogma, but an ancient earth-honoring medium to connect directly with personal divinity, ancestral reverence, and nature.'
  },
  {
    category: 'Booking & Logistics',
    question: 'Is my place confirmed immediately upon submitting an application?',
    answer: 'No. Submitting an application enters our manual review queue. Your spot is confirmed only after your application is reviewed, deposit instructions are fulfilled, and the organizer issues an official confirmation.'
  },
  {
    category: 'Booking & Logistics',
    question: 'How do deposits and payments work?',
    answer: 'If approved, you will receive an email specifying the deposit amount, approved payment channels (e.g. bank transfer / Maya / GCash), and payment window. Deposit verification is performed manually by the organizer.'
  },
  {
    category: 'Booking & Logistics',
    question: 'What happens if a ceremony is fully booked?',
    answer: 'You may request to join the waiting list. If an approved applicant cancels or fails to complete their deposit before the deadline, waitlisted applicants will be contacted in order.'
  },
  {
    category: 'Booking & Logistics',
    question: 'Where is the ceremony located?',
    answer: 'Our private ceremonial sanctuary is located in the Visayan islands of the Philippines. For privacy and sanctuary protection, exact coordinates, pin, and travel logistics are provided privately to confirmed participants.'
  }
];

export const PACKING_ITEMS = [
  { id: 'clothes-ceremony', label: 'Comfortable, loose-fitting clothes (white or earthy tones recommended)', required: true },
  { id: 'clothes-change', label: 'Change of clothes for 2 full days', required: true },
  { id: 'socks', label: 'Warm socks for night relaxation in the temple', required: true },
  { id: 'water-bottle', label: 'Reusable water bottle (drinking water provided)', required: true },
  { id: 'blanket', label: 'Personal cozy blanket or shawl', required: true },
  { id: 'journal', label: 'Journal and pen for morning insights and reflections', required: false },
  { id: 'toiletries', label: 'Personal organic toiletries & small towel', required: false },
  { id: 'intentions', label: 'Written intentions and questions for the divine', required: false }
];

export const SCHEDULE_FLOW = [
  { time: '15:00', title: 'Arrival & Settling In', desc: 'Welcome tea, room assignment, unwinding and orientation with the grounds.' },
  { time: '16:30', title: 'Discussion & Introduction', desc: 'Opening circle, community agreements, overview of the night and intentions.' },
  { time: '17:00', title: 'Rapé & Sanangga Clearing', desc: 'Optional sacred Amazonian plant medicines for mental centering and sensory clarity.' },
  { time: '18:00', title: 'Velada Full-Dose Ceremony', desc: 'The sacred nocturnal vigil begins with ceremonial cacao and consecrated mushroom.' },
  { time: '00:00', title: 'Light Meal & Rest', desc: 'Warm nourishing broth, fruits, quiet integration, and peaceful sleep.' },
  { time: '08:00', title: 'Morning Breakfast', desc: 'Fresh local tropical fruit, herbal teas, and restorative breakfast.' },
  { time: '09:00', title: 'Group Sharing & Integration', desc: 'Reflective circle sharing insights, lessons, and symbolic interpretations.' },
  { time: '10:00', title: 'Velada Low-Dose Harmony Session', desc: 'Gentle micro-ceremony for anchoring the healing and emotional grounding.' },
  { time: '12:00', title: 'Communal Lunch & Closing', desc: 'Closing blessings, final goodbyes, and departure with open hearts.' }
];
