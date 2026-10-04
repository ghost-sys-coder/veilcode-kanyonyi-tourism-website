import type { RichText, WithDemo } from "@/types/content";

// /booking-terms and /privacy, docs/copy/10-policies.md. Sample policies for the demo; a client
// build replaces them with its own lawyer-approved terms. [CLIENT: ...] placeholders have no demo
// value, so the live variants simply omit them until a client supplies the details.

export interface PolicySection {
  heading: string;
  paragraphs: RichText[];
  table?: { columns: string[]; rows: string[][] };
  after?: RichText[];
}

export interface PolicyPage {
  h1: string;
  updated: string;
  sections: WithDemo<PolicySection[]>;
}

export const demoPolicyNotice =
  "Sample policy for a demonstration site. A live operator's own terms apply to real bookings.";

export const updatedLabel = "Updated:";

const sharedTerms: PolicySection[] = [
  {
    heading: "2. Your quote",
    paragraphs: [
      "Quotes are valid for 14 days. Permit fees, park fees and flight prices are set by others and can change before they're paid; if they change before your booking is confirmed, we'll tell you before you pay.",
    ],
  },
  {
    heading: "3. Confirming your booking",
    paragraphs: [
      "Your booking is confirmed when we receive a 30% deposit plus the full cost of any gorilla or chimpanzee permits. The Uganda Wildlife Authority requires permits to be paid in full at the time of booking, so we can't hold them without payment.",
    ],
  },
  {
    heading: "4. Paying the balance",
    paragraphs: [
      "The balance is due 60 days before your trip starts. For bookings made within 60 days of travel, the full amount is due when you book.",
    ],
  },
  {
    heading: "5. If you cancel",
    paragraphs: ["Tell us in writing (email or WhatsApp). Charges depend on how close to travel you cancel:"],
    table: {
      columns: ["Notice before travel", "Charge (excluding permits)"],
      rows: [
        ["More than 60 days", "Your deposit"],
        ["30 to 60 days", "50% of the trip price"],
        ["Fewer than 30 days", "100% of the trip price"],
      ],
    },
    after: [
      "Permit refunds follow the Uganda Wildlife Authority's own rules, which depend on notice and permit type. Discounted low-season permits can't be rescheduled. We'll pass on any refund the park gives.",
    ],
  },
  {
    heading: "6. If we change or cancel",
    paragraphs: [
      "If we have to make a significant change (for example a different trekking sector or a lodge of a different standard), we'll tell you as soon as possible and offer an alternative or a refund of the affected part. If we cancel, you get a full refund of everything you've paid us, unless the cancellation is caused by events outside our control.",
    ],
  },
  {
    heading: "7. Events outside anyone's control",
    paragraphs: [
      "Severe weather, road closures, government restrictions, park closures and similar events can affect a trip. We'll work with you on the best alternative and pass on any refund we receive from suppliers.",
    ],
  },
  {
    heading: "8. Travel insurance",
    paragraphs: [
      "Travel insurance covering medical treatment, evacuation and cancellation (including permit costs) is a condition of booking. We'll ask for your policy details before you travel.",
    ],
  },
  {
    heading: "9. Health and fitness",
    paragraphs: [
      "Gorilla and chimp treks are physically demanding. Please tell us about any health condition or mobility need when you enquire, so we can plan around it. Park rules on illness and minimum ages are applied by the Uganda Wildlife Authority, not by us.",
    ],
  },
  {
    heading: "10. Behaviour around wildlife and communities",
    paragraphs: [
      "Follow your guide's and the rangers' instructions at all times. We may end a trip without refund for anyone whose behaviour puts people, wildlife or communities at risk.",
    ],
  },
  {
    heading: "11. Complaints",
    paragraphs: [
      "If something isn't right, tell your guide straight away so we can fix it while you're here. After the trip, email us within 30 days and we'll reply within 14 days.",
    ],
  },
  { heading: "12. Law", paragraphs: ["These terms are governed by the laws of Uganda."] },
];

export const bookingTerms: PolicyPage = {
  h1: "Booking terms",
  updated: "4 October 2026",
  sections: {
    live: [
      {
        heading: "1. Who you're booking with",
        paragraphs: [
          '"We" and "us" mean the operator; "you" means the person making the booking and everyone travelling on it.',
        ],
      },
      ...sharedTerms,
    ],
    demo: [
      {
        heading: "1. Who you're booking with",
        paragraphs: [
          "Kanyonyi Expeditions is a fictional operator created by VeilCode Studio to demonstrate this website. No bookings or payments are taken on this site. These terms show how a live operator's terms would be presented.",
        ],
      },
      ...sharedTerms,
    ],
  },
};

export const privacy: PolicyPage = {
  h1: "Privacy notice",
  updated: "4 October 2026",
  sections: {
    live: [
      {
        heading: "What we collect",
        paragraphs: [
          "When you send an enquiry: your name, email, phone or WhatsApp number (if you give it), travel dates, number of travellers, where you live (to check permit rates), and anything you write in your message. When you book, we also collect passport details for permits, and dietary and health information you choose to share for your safety.",
        ],
      },
      {
        heading: "Why we use it",
        paragraphs: [
          "To reply to your enquiry, plan and book your trip, buy permits in your name, and contact you about your trip. We don't sell your details or use them for unrelated marketing without your consent.",
        ],
      },
      {
        heading: "Who we share it with",
        paragraphs: [
          "Only those who need it for your trip: the Uganda Wildlife Authority (permits), the lodges and airlines we book, and our email and hosting providers. Some of these providers store data outside Uganda.",
        ],
      },
      {
        heading: "Analytics and cookies",
        paragraphs: [
          'With your consent, we use Google Analytics to understand which pages help people plan trips. You can accept or reject analytics cookies in the banner, and change your choice at any time from "Cookie settings" in the footer. Essential cookies that make the site work don\'t need consent.',
        ],
      },
      {
        heading: "How long we keep it",
        paragraphs: [
          "Enquiries that don't become bookings: 24 months. Booking records: as long as Ugandan law requires for tax and accounting.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          "You can ask to see, correct or delete the personal data we hold about you, or object to how we use it, by emailing us. Uganda's Data Protection and Privacy Act, 2019 applies to how we handle your data, and if you're in the UK or EU, you also have rights under data protection law there.",
        ],
      },
    ],
    demo: [
      {
        heading: "Who holds your data on this demo",
        paragraphs: [
          "Kanyonyi Expeditions is fictional, but the enquiry form works. If you send it, your details are received and stored by VeilCode Studio, the Kampala web studio that built this site, which is responsible for them.",
        ],
      },
      {
        heading: "What we collect and why",
        paragraphs: [
          "The details you type into the form, so we can send the confirmation email and reply to you. We don't sell them or add you to a mailing list.",
        ],
      },
      {
        heading: "Analytics",
        paragraphs: [
          'With your consent only, Google Analytics, to see how the demo is used. Change your choice any time from "Cookie settings" in the footer.',
        ],
      },
      {
        heading: "How long we keep it",
        paragraphs: ["12 months, then deleted. Ask us to delete it sooner and we will."],
      },
      {
        heading: "Your rights",
        paragraphs: [
          "You can ask to see, correct or delete your data. Uganda's Data Protection and Privacy Act, 2019 applies, and if you're in the UK or EU you also have rights under data protection law there.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: ["VeilCode Studio · frank@veilcode.studio · Kampala, Uganda"],
      },
    ],
  },
};
