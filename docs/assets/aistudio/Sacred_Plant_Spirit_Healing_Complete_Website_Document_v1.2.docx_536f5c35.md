

# **SACRED PLANT** **SPIRIT HEALING**

**Complete Website Specification & Ready-to-Use Content**

Version 1.2  \|  22 October 2026

Implementation target: GitHub Pages \+ Google Apps Script \+ Google Sheets

Purpose: provide the complete project brief, page structure, English website copy, booking workflow, administrator requirements, email templates, data model, launch checklist, and a list of organizer inputs that must be confirmed before publication.

Important: all event dates, prices, payment details, location details and legal permissions remain unconfirmed. Do not publish invented values. This document distinguishes publish-ready copy from placeholders and content requiring organizer/legal review.

# **1\. Project Summary**

Create an elegant, responsive, English-language website for Sacred Plant Spirit Healing. The website introduces the organizer's ceremonial practice, explains the visitor journey, publishes upcoming gatherings, accepts applications for selected dates, and provides a controlled process for manual review, deposit collection and booking confirmation.

| Decision | Approved direction |
| :---- | :---- |
| **Frontend hosting** | GitHub Pages |
| **Backend** | Google Apps Script Web App |
| **Data store** | Private Google Sheets spreadsheet |
| **Booking approval** | Manual organizer review |
| **Payment model** | Deposit after approval; amount and method not yet provided |
| **Administration** | Private web dashboard |
| **Capacity** | Limited capacity; waitlist support |
| **Location** | Must be confirmed before publication |
| **Contact channels** | Email and Facebook Messenger |
| **Website language** | English |
| **Visual direction** | Botanical, editorial, calm; forest green, warm ivory, sage, muted gold |

# **2\. Important Content and Safety Rules**

The supplied source material describes Velada as a ceremony based on a Mazatecan practice and mentions powdered mushrooms mixed with a cacao drink, alongside other plant medicines. It also contains strong claims about treating depression, anxiety and trauma, and describes the experience as very safe. Such claims must not be presented on the website as established medical facts.

* Do not promise healing, treatment, guaranteed safety, spiritual contact or a specific outcome.  
* Do not describe the ceremony as medically approved or legally authorized unless the organizer provides reliable, applicable evidence.  
* Before publishing details about substances, eligibility, preparation or the event itself, the organizer must confirm the content and obtain appropriate legal and safety review.  
* Do not advise visitors to stop prescribed medication. Any medical eligibility process should be handled by an appropriately qualified professional through a protected process.  
* Collect only the personal information needed to handle an application. Do not collect detailed medical histories through the public booking form.  
* The source material includes a location link and an email address, but the exact location and public-facing contact details must be checked by the organizer before publication.

# **3\. Information Architecture**

| Page / section | Purpose | Primary action |
| :---- | :---- | :---- |
| **Home** | Introduce the service and guide visitors | Explore Upcoming Ceremonies |
| **The Ceremony** | Explain the format and approach | Read Preparation Guide |
| **Upcoming Ceremonies** | Show published future events and availability | Apply for a Date |
| **Booking / Application** | Collect an application for a selected event | Submit Application |
| **Preparation Guide** | Present approved preparation and packing information | Contact the Organizer |
| **FAQ** | Answer common questions | Browse Dates / Contact |
| **Contact & Location** | Provide verified contact and location details | Email / Messenger |
| **Privacy Policy** | Explain data collection, use, retention and contact | Review Privacy Policy |
| **Booking Terms** | Explain approval, deposits, cancellation and refunds | Review Terms |
| **Admin Dashboard** | Private management of events, applications and deposits | Administrator actions |

# **4\. Visual Design System**

| Token | Value | Usage |
| :---- | :---- | :---- |
| **Forest Green** | \#142A21 | Primary dark background, header, footer |
| **Warm Ivory** | \#F4F0E6 | Main light background |
| **Sage** | \#B8C7AE | Secondary elements and subtle surfaces |
| **Muted Gold** | \#C4A46A | Accent and selected highlights |
| **Heading font** | Cormorant Garamond or similar | Editorial headings |
| **Body font** | Inter or system sans-serif | Body text, forms, navigation |

Design rules:

* Use high-quality botanical and tropical nature photography. Avoid imagery that implies guaranteed outcomes or depicts people in a way that could misrepresent the actual service.  
* Use generous spacing, clear hierarchy and readable line lengths.  
* Use a clear primary call to action on the home page and event cards.  
* Do not autoplay audio or video.  
* Support keyboard navigation, visible focus indicators, reduced motion preferences and WCAG 2.2 AA as the target accessibility level.  
* Use responsive images (WebP/AVIF where appropriate), lazy-load images below the fold and keep JavaScript lightweight.

# **5\. Website Copy — English**

The following copy is the proposed public-facing text. Replace bracketed placeholders only after the organizer confirms the information. Content marked REVIEW REQUIRED must not be published unchanged.

## **5.1 Home Page**

### **Navigation**

The Ceremony \| Preparation \| Upcoming Ceremonies \| FAQ \| Contact

### **Hero**

Eyebrow: SACRED PLANT SPIRIT HEALING

Headline: A Space for Reflection, Connection & Discovery

Intro: Explore the Velada ceremonial experience, learn about the preparation process, and enquire about upcoming gatherings.

Primary button: Explore Upcoming Ceremonies

Secondary button: Learn About Velada

Location line: \[CONFIRM PUBLIC LOCATION — e.g., Philippines, if approved by the organizer\]

### **Introduction section**

Heading: A Thoughtful Approach to Ceremony

Body: Sacred Plant Spirit Healing offers a space for people who wish to learn about a ceremonial practice and consider whether an upcoming gathering is right for them. We encourage every visitor to read the available information, ask questions, understand the participation requirements, and make an informed decision before applying.

### **How it works**

Heading: From Enquiry to Confirmation

1. Explore the ceremony. Read the overview, preparation information and frequently asked questions.  
2. Choose an available date. Review the event details and select a gathering that is open for applications.  
3. Submit an application. Provide your contact details and any relevant questions.  
4. Wait for review. The organizer reviews applications individually. Submitting a form does not confirm a place.  
5. Follow the next steps. If your application is approved, the organizer will provide the applicable deposit instructions.  
6. Receive confirmation. Your place is confirmed only after the organizer has completed the required steps and sent a confirmation.

### **Upcoming events section**

Heading: Upcoming Ceremonies

Body: Review the currently published dates and event details. Availability may change as applications are reviewed.

Button: View All Dates

### **Preparation section**

Heading: Prepare with Care

Body: Each gathering has specific instructions. Read the preparation guide and contact the organizer if anything is unclear. Do not assume that general preparation advice replaces medical or professional guidance.

Button: Read the Preparation Guide

### **Closing CTA**

Heading: Have Questions Before Applying?

Body: If you would like to clarify the format, preparation, location or application process, contact the organizer before submitting your application.

Buttons: Email the Organizer \| Message on Facebook

### **Footer**

Sacred Plant Spirit Healing

Links: The Ceremony \| Preparation Guide \| Upcoming Ceremonies \| FAQ \| Contact \| Privacy Policy \| Booking Terms

Footer note: Participation is subject to application review and event-specific requirements. An application is not a confirmed booking.

Copyright: © \[YEAR\] Sacred Plant Spirit Healing. All rights reserved.

## **5.2 The Ceremony Page**

### **Page title**

Understanding the Velada Experience

### **What Is Velada?**

Velada is a Spanish word associated with a night gathering or vigil. The organizer describes their ceremony as a guided ceremonial gathering informed by a traditional Mazatecan practice. The exact format, components and schedule should be confirmed for each published event.

### **The Ceremonial Approach**

The gathering is presented as a reflective and spiritual experience. Participants should take time to understand the format, ask questions, and consider their own circumstances before applying. The organizer should provide clear information about what will happen, who will be present, what support is available, and what participation involves.

### **What to Expect**

Event details may include an arrival period, an introduction and discussion, the main ceremonial period, rest, and a closing or group-sharing session. The actual programme may vary. Consult the event listing for the confirmed schedule.

### **Before You Apply**

Please read the preparation guide and the event-specific information carefully. If you have questions about eligibility, safety, substances, medication, or other health-related considerations, seek advice from an appropriately qualified professional and contact the organizer to clarify the event's requirements. Do not stop prescribed medication based on website instructions.

### **A Note on Outcomes**

Individual experiences differ. The website does not promise a particular emotional, spiritual or health outcome, and the ceremony should not be presented as a substitute for medical or mental health care.

### **CTA**

Explore Upcoming Ceremonies

## **5.3 Upcoming Ceremonies Page**

Heading: Upcoming Ceremonies

Intro: Explore the gatherings currently open for applications. Select an event to review its schedule, location information, participation requirements and application deadline.

Empty state: No upcoming ceremonies are currently published. Please check again later or contact the organizer to ask about future dates.

Full state: This event has reached its current application capacity. You may request to join the waiting list if it is available.

Closed state: Applications for this event are closed.

Cancelled state: This event has been cancelled. Please contact the organizer if you have an existing application.

Availability note: Availability is subject to review and may change. Selecting a date or submitting an application does not guarantee a place.

Event card fields: Event title; date and time; timezone; duration; location label; application deadline; availability status; short description; View Details; Apply.

No real event dates, event names, prices or capacities are to be populated until the organizer supplies them.

## **5.4 Booking / Application Page**

### **Page heading**

Ceremony Application

Intro: Complete the form below to enquire about participation in the selected gathering. The organizer will review your application and contact you by email. Your place is not confirmed until you receive a separate booking confirmation.

### **Form labels**

Full name \*

Email address \*

Selected ceremony \*

Number of applicants \*

Message to the organizer (optional)

Preferred contact method (optional): Email / Facebook Messenger

Privacy consent checkbox: I have read the Privacy Policy and agree that my information may be used to process this application and contact me about it.

Submit button: Submit Application

### **Form validation messages**

Required field: Please complete this field.

Email: Enter a valid email address.

Event unavailable: This event is no longer accepting applications. Please choose another date.

Capacity changed: Availability has changed while you were completing the form. Please review the current event status.

Consent: Please confirm that you have read the Privacy Policy.

Network error: We could not submit your application. Please try again. If the problem continues, contact the organizer.

### **Success screen**

Heading: Your Application Has Been Received

Body: Thank you for contacting Sacred Plant Spirit Healing. Your application has been recorded and is awaiting review. Keep the reference below for your records. The organizer will contact you with the next steps.

Fields: Application reference; selected event; submitted date.

Notice: This is an application receipt, not a booking confirmation.

### **Deposit notice**

If approved, you will receive the deposit amount, currency, payment method, recipient and deadline by email. Do not send a deposit until you have received and checked the organizer's official instructions.

## **5.5 Preparation Guide**

### **Before the Gathering**

Please review the instructions provided for your specific event. The organizer's source material describes a preparation period that includes avoiding alcohol and recreational drugs and suggests dietary and lifestyle changes in the days before a ceremony. The exact instructions and dates must be confirmed by the organizer before publication.

Preparation note — REVIEW REQUIRED: Preparation advice does not guarantee safety or a particular outcome. Do not stop or change prescribed medication without consulting a qualified healthcare professional. If you are uncertain whether participation is appropriate for you, seek qualified advice before applying.

### **What to Bring**

* Comfortable, loose-fitting clothing.  
* A change of clothes.  
* Socks.  
* A reusable water bottle.  
* An extra blanket.

Packing note: Please check the event-specific instructions for any additional requirements.

### **Example Schedule**

The organizer's source material includes the following sample programme. It must be treated as an example only and replaced by the confirmed schedule for each event.

| Time | Activity |
| :---- | :---- |
| **15:00** | Arrival and settling in |
| **16:30** | Discussion and introduction |
| **17:00** | Additional ceremonial activities — details to be confirmed |
| **18:00** | Main ceremony — details to be confirmed |
| **00:00** | Light meal and rest |
| **08:00** | Breakfast |
| **09:00** | Group sharing |
| **10:00** | Additional session — details to be confirmed |
| **12:00** | Lunch and closing |

Schedule note: Times and activities may change. The confirmed event listing takes precedence.

### **Location**

The location and arrival instructions will be provided for each event after the organizer confirms what can be published publicly. Do not publish the supplied map link until it has been checked and approved.

## **5.6 FAQ — Proposed Public Answers**

### **What is Velada?**

Velada is a Spanish word associated with a night gathering or vigil. The organizer describes this event as a guided ceremonial gathering informed by a traditional Mazatecan practice. Please read the event details for the specific format.

### **What happens during the ceremony?**

The schedule may include arrival, an introduction, ceremonial activities, rest and group sharing. The exact programme varies by event and will be provided in the event listing.

### **How long does it last?**

The duration depends on the specific event. Review the published schedule for confirmed start and end times.

### **Is prior experience required?**

Please contact the organizer to discuss the event's participation requirements. Do not assume that a ceremony is suitable for every person.

### **How should I prepare?**

Read the preparation guide and the instructions for your selected event. If you have health-related questions, consult an appropriately qualified professional.

### **What should I bring?**

The general packing list includes comfortable loose-fitting clothing, a change of clothes, socks, a water bottle and an extra blanket. Check the event-specific list before travelling.

### **Is my place confirmed when I apply?**

No. Applications are reviewed manually. Your place is confirmed only after the organizer sends a separate confirmation.

### **How does the deposit work?**

If your application is approved, the organizer will send the applicable deposit amount, currency, payment instructions and deadline. Deposit verification is handled by the organizer.

### **What if the event is full?**

If the waiting list is enabled, you may submit a request to join it. A waiting-list position is not a confirmed place.

### **Can I cancel my application?**

Contact the organizer using the details in your application email. Any deposit refund or cancellation conditions are governed by the published booking terms.

### **Where does the event take place?**

The confirmed location and arrival instructions will be provided in the event listing or by the organizer. Location information must be verified before publication.

### **Does the ceremony treat medical conditions?**

The website does not make medical treatment claims or guarantee health outcomes. The ceremony should not be presented as a substitute for qualified medical or mental health care.

### **How do I contact the organizer?**

Use the verified contact email or the official Facebook Messenger link shown on the Contact page.

## **5.7 Contact Page**

Heading: Contact Sacred Plant Spirit Healing

Intro: Have a question about an upcoming gathering, the application process or the preparation guide? Contact the organizer before applying.

Email: \[CONFIRM PUBLIC CONTACT EMAIL\]

Facebook: \[CONFIRM OFFICIAL FACEBOOK PAGE URL\]

Messenger: \[CONFIRM OFFICIAL MESSENGER URL\]

Location: \[CONFIRM WHAT LOCATION INFORMATION MAY BE PUBLISHED\]

Contact CTA: Send an Email \| Message on Facebook

Response-time statement: Do not publish a promised response time unless the organizer can consistently meet it.

## **5.8 Privacy Policy — Draft Template**

IMPORTANT: This is a drafting template, not legal advice. Replace all placeholders and obtain appropriate review before publication.

Title: Privacy Policy

Last updated: \[DATE\]

Who we are: Sacred Plant Spirit Healing operates this website and processes applications for its events. Contact: \[CONFIRMED CONTACT EMAIL\].

Information we collect: When you submit an application, we may collect your name, email address, selected event, number of requested places, optional message, consent record and application status.

Why we use it: We use this information to process applications, review availability, communicate with applicants, manage deposits and bookings, respond to enquiries, and maintain necessary operational records.

Legal basis and consent: The organizer must specify the applicable legal basis for processing and explain how consent may be withdrawn where applicable.

Who can access it: Access is limited to authorized personnel who need the information to operate the booking service. Google services may process data as service providers under their applicable terms.

Retention: Application and payment-related records are retained only for the period required by the organizer's documented retention policy and applicable law. The organizer must define the period before launch.

Security: Reasonable technical and organizational measures are used to restrict access and protect the information. No internet service can guarantee absolute security.

Your choices and rights: Depending on applicable law, you may have rights to access, correct, delete or restrict the use of your personal information. Contact \[CONFIRMED CONTACT EMAIL\] to make a request.

Children: The organizer must define and publish an age and eligibility policy before accepting applications. Do not accept applications from minors unless the activity is lawful and the required safeguards are in place.

Changes: This policy may be updated. The current version and its update date will be published on this page.

Privacy contact: \[CONFIRMED CONTACT EMAIL\]

## **5.9 Booking Terms — Draft Template**

IMPORTANT: Complete and review these terms before publication.

Title: Booking Terms

Application: Submitting an application does not guarantee participation or reserve a confirmed place.

Review: The organizer reviews applications and may approve, decline or waitlist an application according to the event's stated requirements.

Deposit: If an application is approved, the organizer will provide the applicable deposit amount, currency, payment method and deadline. A booking is not confirmed until the organizer verifies the required payment and sends a confirmation, unless the published event terms expressly define another process.

Capacity: Events have limited capacity. Availability may change while applications are being reviewed.

Cancellation and refunds: \[INSERT THE ORGANIZER'S APPROVED CANCELLATION, REFUND AND NO-SHOW POLICY\]. Do not publish this page with the placeholder still present.

Changes to events: If an event is changed or cancelled, the organizer will contact applicants using the contact details provided.

Participant responsibility: Applicants should review all event information and seek appropriate professional advice where relevant before deciding whether to participate.

Contact: \[CONFIRMED CONTACT EMAIL\]

# **6\. Booking Operations and Statuses**

| Status | Meaning | Allowed next actions |
| :---- | :---- | :---- |
| **PENDING\_REVIEW** | Application received; organizer has not decided | Approve, decline, waitlist, request information, cancel |
| **AWAITING\_DEPOSIT** | Application approved; deposit instructions issued | Record payment report, expire, cancel |
| **DEPOSIT\_REPORTED** | Applicant says payment was sent | Verify or reject payment report |
| **DEPOSIT\_VERIFIED** | Organizer has checked and verified payment | Confirm booking or cancel |
| **CONFIRMED** | Booking confirmed by organizer | Cancel; handle approved amendments |
| **WAITLISTED** | No place currently allocated | Offer place, decline, cancel |
| **DECLINED** | Application declined | No automatic reopening |
| **CANCELLED** | Application or booking cancelled | Administrative correction only |
| **EXPIRED** | Deposit deadline passed without verified payment | Reopen only by authorized decision |

Status transitions must be enforced server-side. The public browser must never be able to set an application to CONFIRMED or mark a deposit as verified.

# **7\. Backend and Data Model**

## **7.1 Events Sheet**

Required columns: event\_id, title, slug, description, starts\_at, ends\_at, timezone, capacity, registration\_deadline, status, location\_label, location\_visibility, deposit\_amount, deposit\_currency, deposit\_deadline\_hours, created\_at, updated\_at.

## **7.2 Applications Sheet**

Required columns: application\_id, event\_id, full\_name, email, attendee\_count, message, preferred\_contact, status, privacy\_consent\_at, created\_at, updated\_at, status\_updated\_by, status\_updated\_at.

## **7.3 Payments Sheet**

Required columns: payment\_id, application\_id, payment\_type, expected\_amount, currency, payment\_method, payment\_reference, reported\_at, verified\_at, verified\_by, status, admin\_notes.

## **7.4 AdminUsers Sheet**

Required columns: admin\_email, role, active, created\_at. The sheet is private and is not a substitute for server-side identity verification.

## **7.5 Settings Sheet**

Store organizer display name, notification recipient, public contact email, official Facebook URL, Messenger URL, default event timezone, default currency, deposit policy, cancellation policy and privacy policy URL. Sensitive credentials must be stored in Apps Script Properties or the relevant secure configuration mechanism, not in public source files.

## **7.6 AuditLog Sheet**

Required columns: log\_id, timestamp, admin\_email, action, entity\_type, entity\_id, result. Avoid logging full message bodies or unnecessary personal data.

# **8\. Administration Dashboard — Functional Requirements**

* Google identity-based authentication with a server-side allowlist of authorized administrator accounts.  
* Dashboard summary: upcoming events, pending applications, applications awaiting deposits, verified deposits, confirmed bookings and waitlist count.  
* Create, edit, publish, unpublish and cancel events.  
* Set event capacity, registration deadline, location visibility and deposit configuration.  
* Search applications by reference and filter by event/status.  
* Review applicant details and change status using permitted transitions.  
* Record deposit details and verification result.  
* Resend email notifications and view notification failures.  
* Export authorized records to CSV.  
* Log security-sensitive administrative actions.

Do not rely on a hidden URL, client-side-only password, or browser-supplied email address as authentication.

# **9\. Email Templates**

## **9.1 Application Received**

Subject: We've received your ceremony application

Hello \[FULL\_NAME\],

Thank you for your interest in Sacred Plant Spirit Healing. We have received your application and it is awaiting review.

Application reference: \[APPLICATION\_ID\]

Event: \[EVENT\_TITLE\]

Requested date: \[EVENT\_DATE\_AND\_TIME\]

Submitting an application does not confirm a place. We will contact you with the next steps after the organizer reviews your application.

If you have questions, contact us at \[PUBLIC\_EMAIL\] or through \[MESSENGER\_URL\].

Sacred Plant Spirit Healing

## **9.2 Application Approved — Deposit Required**

Subject: Next steps for your ceremony application

Hello \[FULL\_NAME\],

Your application \[APPLICATION\_ID\] has been approved to proceed to the deposit stage.

Event: \[EVENT\_TITLE\]

Date and time: \[EVENT\_DATE\_AND\_TIME\]

Deposit amount: \[CONFIGURED\_AMOUNT\] \[CURRENCY\]

Payment method and instructions: \[APPROVED\_PAYMENT\_INSTRUCTIONS\]

Payment deadline: \[CONFIGURED\_DEADLINE\]

Please follow only the payment instructions included in this message. Your booking is not confirmed until the organizer verifies the required payment and sends a separate confirmation.

If you have questions, contact \[PUBLIC\_EMAIL\].

Sacred Plant Spirit Healing

## **9.3 Deposit Report Received**

Subject: Your deposit report has been received

Hello \[FULL\_NAME\],

We have received your payment report for application \[APPLICATION\_ID\]. The organizer will verify the payment and contact you with the result.

This message does not confirm that the funds have cleared or that your booking is confirmed.

Sacred Plant Spirit Healing

## **9.4 Booking Confirmed**

Subject: Your ceremony booking is confirmed

Hello \[FULL\_NAME\],

Your booking for \[EVENT\_TITLE\] has been confirmed.

Date and time: \[EVENT\_DATE\_AND\_TIME\]

Time zone: \[EVENT\_TIMEZONE\]

Location and arrival instructions: \[CONFIRMED\_LOCATION\_INSTRUCTIONS\]

Preparation guide: \[PREPARATION\_URL\]

If you need to contact the organizer, email \[PUBLIC\_EMAIL\] or message \[MESSENGER\_URL\].

Please review the event information before travelling. If anything changes, the organizer will contact you using the details provided.

Sacred Plant Spirit Healing

## **9.5 Waitlist**

Subject: Your application is on the waiting list

Hello \[FULL\_NAME\],

Thank you for applying to \[EVENT\_TITLE\]. The event has reached its current capacity and your application has been placed on the waiting list.

A waiting-list position is not a confirmed booking. We will contact you if a place becomes available.

Sacred Plant Spirit Healing

## **9.6 Declined**

Subject: Update on your ceremony application

Hello \[FULL\_NAME\],

Thank you for your interest in Sacred Plant Spirit Healing. After review, we are unable to confirm your application for \[EVENT\_TITLE\].

If you have a question about this decision, contact \[PUBLIC\_EMAIL\].

Sacred Plant Spirit Healing

## **9.7 Event Cancelled**

Subject: Important update about \[EVENT\_TITLE\]

Hello \[FULL\_NAME\],

We are contacting you to let you know that \[EVENT\_TITLE\], scheduled for \[EVENT\_DATE\], has been cancelled.

Please contact \[PUBLIC\_EMAIL\] for information about next steps and any applicable deposit or refund arrangements under the published booking terms.

We apologize for the change and appreciate your understanding.

Sacred Plant Spirit Healing

# **10\. API Operations**

| Operation | Access | Expected behavior |
| :---- | :---- | :---- |
| **GET published events** | Public | Return only safe fields for published future events |
| **GET event details** | Public | Return public event data and availability state |
| **POST application** | Public, rate-limited | Validate event and fields; enforce capacity policy; create application |
| **GET application status** | Restricted / reference-based design | Do not expose personal information through a guessable ID |
| **Admin list events** | Admin only | Return events to authorized administrator |
| **Admin create/update event** | Admin only | Validate all values; write audit record |
| **Admin list applications** | Admin only | Return authorized application records |
| **Admin update status** | Admin only | Validate allowed state transition; send notification if configured |
| **Admin verify deposit** | Admin only | Record verifier, timestamp and outcome |
| **Admin export CSV** | Admin only | Export only authorized fields |

The exact transport and authentication approach must be validated during implementation. Google Apps Script web app deployment settings can affect caller identity and access controls. Do not launch the admin interface until authorization has been tested from both authorized and unauthorized accounts.

# **11\. Security and Reliability Requirements**

* Use HTTPS for all public and backend traffic.  
* Keep the spreadsheet private.  
* Validate every field on the server.  
* Use LockService around capacity-sensitive read/check/write operations.  
* Protect against duplicate submissions and repeated payment reports.  
* Use server-side authorization for every administrative operation.  
* Do not put privileged secrets in GitHub Pages source or public build output.  
* Apply rate limits or equivalent abuse protection to public submissions.  
* Encode output safely and avoid injecting user-provided text into HTML.  
* Log failures without storing unnecessary personal data.  
* Ensure notification failure does not roll back a valid application.  
* Define a data retention and deletion policy before launch.  
* Test capacity behavior with simultaneous submissions.

Operational caveat: Google Sheets and Apps Script have quotas and are not a transactional booking database. This design is appropriate for an initial low-volume service only after concurrency, identity and quota behavior have been tested. If traffic or booking criticality grows, migrate the booking store to a database with transactional capacity enforcement.

# **12\. SEO and Social Sharing**

Suggested page title: Sacred Plant Spirit Healing \| Ceremonies & Applications

Suggested meta description: Learn about the ceremonial approach, review preparation information, and enquire about upcoming gatherings with Sacred Plant Spirit Healing.

Open Graph title: Sacred Plant Spirit Healing

Open Graph description: Explore the ceremony, preparation guide and upcoming gatherings.

Open Graph image: \[APPROVED BRAND IMAGE\]

Use semantic HTML, unique titles, canonical URLs, sitemap.xml, robots.txt, favicon and verified social preview images. Do not index admin pages or expose application data to search engines.

# **13\. Repository Structure**

sacred-plant-spirit-healing/

├── public/

│   ├── images/

│   ├── favicon.svg

│   ├── robots.txt

│   └── sitemap.xml

├── src/

│   ├── components/

│   ├── pages/

│   ├── sections/

│   ├── booking/

│   ├── admin/

│   ├── services/

│   ├── styles/

│   └── utils/

├── apps-script/

│   ├── Code.gs

│   ├── Auth.gs

│   ├── Events.gs

│   ├── Applications.gs

│   ├── Payments.gs

│   ├── Notifications.gs

│   └── Admin.gs

├── tests/

├── .github/workflows/

├── .env.example

├── README.md

├── PRIVACY.md

└── package.json

The Apps Script code is deployed separately from GitHub Pages. The README must explain spreadsheet creation, script properties, deployment permissions, admin allowlisting, API configuration and redeployment.

# **14\. Acceptance Test Plan**

| ID | Test | Acceptance criterion |
| :---- | :---- | :---- |
| **AT-01** | Responsive layout | No horizontal overflow on supported mobile and desktop widths |
| **AT-02** | Public navigation | All links lead to the intended sections/pages |
| **AT-03** | Event visibility | Only published, future, open events appear |
| **AT-04** | Date selection | Selected event is preserved in the application form |
| **AT-05** | Form validation | Missing and invalid required values are rejected |
| **AT-06** | Application creation | Application is stored and receives a unique reference |
| **AT-07** | Duplicate submission | Retries do not create unintended duplicate applications |
| **AT-08** | Capacity | Concurrent requests cannot exceed configured capacity |
| **AT-09** | Manual review | Only authorized administrators can approve or decline |
| **AT-10** | Deposit verification | Only authorized administrators can verify payment |
| **AT-11** | Booking confirmation | Confirmation email is sent only after required conditions are met |
| **AT-12** | Email failure | Application remains stored and failure is logged |
| **AT-13** | Privacy | Public users cannot read other applicants' records |
| **AT-14** | Admin authorization | Unauthorized accounts cannot perform admin operations |
| **AT-15** | Waitlist | Full events can accept waitlist requests when enabled |
| **AT-16** | Cancellation | Cancelled events cannot accept new applications |
| **AT-17** | Accessibility | Main flow is keyboard accessible and has clear form errors |
| **AT-18** | Deployment | GitHub Pages frontend works on the production URL |

# **15\. Launch Checklist**

* ☐ Confirm the official name and brand assets.  
* ☐ Approve all public English copy.  
* ☐ Confirm the event location and public/private location policy.  
* ☐ Enter real event dates, time zone, capacity and application deadlines.  
* ☐ Set deposit amount, currency, payment method, recipient and deadline.  
* ☐ Approve cancellation and refund terms.  
* ☐ Confirm public email and official Facebook/Messenger links.  
* ☐ Create the private Google spreadsheet and configure access.  
* ☐ Configure and test Apps Script deployment.  
* ☐ Verify administrator identity and permissions.  
* ☐ Test application creation, approval, deposit reporting and confirmation.  
* ☐ Test capacity enforcement with simultaneous submissions.  
* ☐ Test notification failures and retry handling.  
* ☐ Approve privacy policy and data retention rules.  
* ☐ Review legal and safety wording before publication.  
* ☐ Verify mobile layout, accessibility and SEO metadata.  
* ☐ Publish the site and run the complete end-to-end test.

# **16\. Organizer Inputs Required Before Production**

| Input | Current state | Required action |
| :---- | :---- | :---- |
| **Actual event dates and schedules** | Not provided | Organizer must supply confirmed dates |
| **Event capacity** | Policy selected; values not provided | Set capacity per event |
| **Deposit amount and currency** | Not provided | Organizer must supply values |
| **Payment method and recipient** | Not provided | Provide verified payment instructions |
| **Deposit deadline** | Not provided | Set event/application policy |
| **Cancellation/refund policy** | Not provided | Approve written terms |
| **Location** | Unconfirmed | Verify location and public disclosure |
| **Notification email** | Must be confirmed | Provide working address |
| **Facebook page and Messenger URLs** | Must be verified | Confirm official links |
| **Administrator accounts** | Not provided | Supply authorized Google account emails |
| **Preparation instructions** | Source contains draft guidance | Review and approve event-specific copy |
| **Eligibility and safety process** | Not defined | Confirm lawful and appropriate procedure |
| **Privacy and retention rules** | Not defined | Approve after applicable legal review |

# **17\. Definition of Done**

The project is complete when a visitor can browse verified event information, submit an application, receive a reference, and receive status updates; the organizer can manage events, review applications, request and verify deposits, and confirm bookings through a protected web dashboard; capacity restrictions are enforced; personal data is protected; and the site is published on GitHub Pages.

No real event dates, prices, payment details, location details or legal permissions are to be invented. All unresolved values remain explicit placeholders until the organizer confirms them.