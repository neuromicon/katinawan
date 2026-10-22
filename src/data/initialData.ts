import { CeremonyEvent, Application, SystemSettings } from '../types';

export const INITIAL_EVENTS: CeremonyEvent[] = [
  {
    event_id: 'KTW-EVT-2026-11-06',
    title: 'Velada Night Vigil & Plant Spirit Awakening',
    slug: 'velada-nov-2026',
    description: 'An intimate 2-day ceremonial gathering guided by traditional Mazatecan sacred practice with powdered mushroom and ceremonial cacao, held in our secluded sanctuary.',
    starts_at: '2026-11-06T15:00:00+08:00',
    ends_at: '2026-11-08T12:00:00+08:00',
    timezone: 'Asia/Manila (GMT+8)',
    capacity: 10,
    occupied_count: 7,
    remaining_capacity: 3,
    registration_deadline: '2026-11-01T23:59:59+08:00',
    status: 'ALMOST_FULL',
    location_label: 'Sanctuary in Visayas (Disclosed upon confirmation)',
    location_visibility: 'PRIVATE',
    deposit_amount: 'Configured on review',
    deposit_currency: 'PHP',
    deposit_deadline_hours: 48,
    created_at: '2026-10-15T00:00:00Z',
    updated_at: '2026-10-22T00:00:00Z'
  },
  {
    event_id: 'KTW-EVT-2026-11-20',
    title: 'Katin-awan: Clarity & Ancestral Harmonic Gathering',
    slug: 'katin-awan-nov-2026',
    description: 'A weekend vigil honoring inner clarity (katin-awan). Incorporates Rapé & Sanangga blessing, full-dose Velada vigil, and restorative morning sharing.',
    starts_at: '2026-11-20T15:00:00+08:00',
    ends_at: '2026-11-22T12:00:00+08:00',
    timezone: 'Asia/Manila (GMT+8)',
    capacity: 12,
    occupied_count: 5,
    remaining_capacity: 7,
    registration_deadline: '2026-11-15T23:59:59+08:00',
    status: 'AVAILABLE',
    location_label: 'Sanctuary in Visayas (Disclosed upon confirmation)',
    location_visibility: 'PRIVATE',
    deposit_amount: 'Configured on review',
    deposit_currency: 'PHP',
    deposit_deadline_hours: 48,
    created_at: '2026-10-18T00:00:00Z',
    updated_at: '2026-10-22T00:00:00Z'
  },
  {
    event_id: 'KTW-EVT-2026-12-04',
    title: 'Solstice Renewal Velada Ceremony',
    slug: 'solstice-velada-dec-2026',
    description: 'Year-end spiritual vigil dedicated to deep contemplation, releasing stagnant energy, and connecting to the loving wisdom of sacred plant teachers.',
    starts_at: '2026-12-04T15:00:00+08:00',
    ends_at: '2026-12-06T12:00:00+08:00',
    timezone: 'Asia/Manila (GMT+8)',
    capacity: 10,
    occupied_count: 10,
    remaining_capacity: 0,
    registration_deadline: '2026-11-28T23:59:59+08:00',
    status: 'WAITLIST',
    location_label: 'Sanctuary in Visayas (Disclosed upon confirmation)',
    location_visibility: 'PRIVATE',
    deposit_amount: 'Configured on review',
    deposit_currency: 'PHP',
    deposit_deadline_hours: 48,
    created_at: '2026-10-19T00:00:00Z',
    updated_at: '2026-10-22T00:00:00Z'
  }
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    application_id: 'KTW-20261020-1092',
    event_id: 'KTW-EVT-2026-11-06',
    event_title: 'Velada Night Vigil & Plant Spirit Awakening',
    full_name: 'Elena Rostova',
    email: 'elena.rostova@example.com',
    attendee_count: 1,
    message: 'Seeking clarification and grounded spiritual guidance after a long period of burnout.',
    preferred_contact: 'email',
    status: 'PENDING_REVIEW',
    privacy_consent_at: '2026-10-20T10:14:00Z',
    created_at: '2026-10-20T10:14:00Z',
    updated_at: '2026-10-20T10:14:00Z',
    status_updated_by: 'system',
    status_updated_at: '2026-10-20T10:14:00Z'
  },
  {
    application_id: 'KTW-20261021-3481',
    event_id: 'KTW-EVT-2026-11-06',
    event_title: 'Velada Night Vigil & Plant Spirit Awakening',
    full_name: 'Markus Lindholm',
    email: 'm.lindholm@example.org',
    attendee_count: 2,
    message: 'Attending with my partner. We have both practiced meditation for 8 years.',
    preferred_contact: 'email',
    status: 'AWAITING_DEPOSIT',
    privacy_consent_at: '2026-10-21T08:30:00Z',
    created_at: '2026-10-21T08:30:00Z',
    updated_at: '2026-10-21T14:20:00Z',
    status_updated_by: 'admin@katinawan.ph',
    status_updated_at: '2026-10-21T14:20:00Z'
  },
  {
    application_id: 'KTW-20261021-9812',
    event_id: 'KTW-EVT-2026-11-20',
    event_title: 'Katin-awan: Clarity & Ancestral Harmonic Gathering',
    full_name: 'Gabriel Morales',
    email: 'gabriel.m@example.ph',
    attendee_count: 1,
    message: 'Deeply drawn to the Cebuano roots and traditional Mazatecan Velada blend.',
    preferred_contact: 'messenger',
    status: 'CONFIRMED',
    privacy_consent_at: '2026-10-21T09:00:00Z',
    created_at: '2026-10-21T09:00:00Z',
    updated_at: '2026-10-22T06:15:00Z',
    status_updated_by: 'admin@katinawan.ph',
    status_updated_at: '2026-10-22T06:15:00Z',
    deposit_reported_reference: 'BPI-TRX-94819284',
    deposit_verified_at: '2026-10-22T06:15:00Z'
  }
];

export const INITIAL_SETTINGS: SystemSettings = {
  ORGANIZER_NAME: 'Katin-awan — Sacred Plant Spirit Healing',
  CONTACT_EMAIL: 'katinawanph@gmail.com',
  FACEBOOK_PAGE_URL: 'https://facebook.com/katinawanph',
  MESSENGER_URL: 'https://m.me/katinawanph',
  DEFAULT_TIMEZONE: 'Asia/Manila (GMT+8)',
  DEFAULT_CURRENCY: 'PHP',
  LOCATION_POLICY: 'Private Sanctuary in Visayas, Philippines (exact directions provided upon verified booking)',
  APPS_SCRIPT_URL: ''
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
