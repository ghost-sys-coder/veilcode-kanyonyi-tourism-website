import type { Guide } from "@/types/content";

// docs/copy/06-guides.md, Guide 3.

export const whatToPackGuide = {
  slug: "what-to-pack-gorilla-trekking-safari",
  title: "What to pack for gorilla trekking and a Uganda safari",
  h1: "What to pack for gorilla trekking and a Uganda safari",
  cardLine: "The clothes and kit that make a steep, wet trek easier, and what you can leave at home.",
  lede: "Bwindi is steep, often wet, and full of stinging nettles. Most of what you need is ordinary walking gear, but a few items make the difference between a hard trek and a miserable one. This list covers the trek and the rest of a typical safari.",
  sections: [
    {
      id: "for-the-gorilla-trek",
      heading: "For the gorilla trek",
      blocks: [
        {
          type: "list",
          items: [
            "**Waterproof walking boots, worn in.** Ankle support matters on steep, slippery slopes. Not new boots.",
            "**Gardening or work gloves.** For grabbing branches and vines, many of which have thorns or nettles. The most forgotten item.",
            "**Long trousers and a long-sleeved shirt** in a light, quick-drying fabric. Nettles reach through thin leggings.",
            "**Gaiters,** or tuck your trousers into your socks. Keeps out mud and safari ants.",
            "**A light waterproof jacket,** even in the dry season.",
            "**A warm layer** for the cool early-morning briefing.",
            "**A small daypack** with a rain cover, 1.5 to 2 litres of water, and a packed lunch (the lodge provides it).",
            "**A camera with a quiet shutter, and no flash.** Flash photography of the gorillas is not allowed.",
            "**Your passport.** It must match your permit.",
            "**Cash in small notes** for the porter and tips.",
          ],
        },
        { type: "paragraph", text: "The park gives you a walking stick at the start. Take it." },
      ],
    },
    {
      id: "for-the-rest-of-the-safari",
      heading: "For the rest of the safari",
      blocks: [
        {
          type: "list",
          items: [
            "Neutral-coloured clothing for game drives (khaki, green, beige). Avoid dark blue and black in Murchison and other areas with tsetse flies.",
            "A fleece or jumper for evenings and early game drives.",
            "Sunglasses, a hat and sunscreen. The Equator sun is strong even when it's cool.",
            "Insect repellent with DEET or picaridin.",
            "Binoculars, one pair per person if you can. Shared binoculars mean missed birds.",
            "A soft bag rather than a hard suitcase if you're taking a domestic flight; light aircraft have weight and bag-type limits we'll confirm with your quote.",
            "A power bank and a UK-style (Type G) plug adapter. Uganda uses 240 volt, three-pin sockets.",
          ],
        },
      ],
    },
    {
      id: "health-and-documents",
      heading: "Health and documents",
      blocks: [
        {
          type: "list",
          items: [
            "**Visa:** most visitors apply online for a Uganda e-visa (USD 50, single entry) before travelling. If you're also visiting Kenya and Rwanda, the East Africa Tourist Visa (USD 100) covers all three.",
            "**Yellow fever:** on 2 October 2026, Uganda's immigration directorate said a yellow fever vaccination certificate is no longer required to enter the country. Some airlines and foreign government pages still list it, so check with your airline before you fly and carry your certificate if you have one.",
            "**Malaria:** see a travel clinic about antimalarial tablets at least six weeks before you travel.",
            "**Travel insurance** that covers medical evacuation and permit costs.",
          ],
        },
        {
          type: "stamp",
          text: "Checked 4 October 2026. Entry rules can change; check official sources before you travel.",
        },
      ],
    },
    {
      id: "what-you-can-leave-at-home",
      heading: "What you can leave at home",
      blocks: [
        {
          type: "list",
          items: [
            "Heavy, full-leather hiking boots: they never dry. Waterproof fabric boots are better.",
            "Lots of outfits. Most lodges offer laundry.",
            "Camouflage clothing. It's associated with the military in Uganda and best avoided.",
          ],
        },
      ],
    },
  ],
  datePublished: "2026-10-04",
  dateModified: "2026-10-04",
  author: "Kanyonyi Expeditions planning team",
  image: { id: "guide-what-to-pack-gorilla-trekking-safari" },
  close: {
    heading: "Questions about kit?",
    body: "Message us on WhatsApp before you buy anything. We'll tell you what you really need for your dates and parks.",
    button: { label: "Chat on WhatsApp", target: "whatsapp" },
  },
  related: [
    { kind: "guide", slug: "uganda-gorilla-permits", label: "Gorilla permits explained" },
    { kind: "tour", slug: "3-day-bwindi-gorilla-trek", label: "3-Day Bwindi Gorilla Trek" },
  ],
} satisfies Guide;
