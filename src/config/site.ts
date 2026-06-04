
export const SITE = {
  name: "GhanaBite",
  tagline: "Authentic Ghanaian food, delivered to your door.",
  domain: "ghana-bite.online",
  url: "https://ghana-bite.online",
  supportEmail: "jamalnasirone52@gmail.com",

  whatsappNumber: "233546573849",
  /** The users see this in the UI */
  whatsappDisplay: "+233 54 657 384",
  supportHours: "Mon–Sat, 9:00 AM – 6:00 PM (GMT)",
  lastUpdated: "June 3, 2026",
} as const;

export const getWhatsAppUrl = (prefilledMessage?: string) => {
  const base = `https://wa.me/${SITE.whatsappNumber}`;
  if (!prefilledMessage) {
    return base;
  }
  return `${base}?text=${encodeURIComponent(prefilledMessage)}`;
};

export const hasWhatsApp = () => Boolean(SITE.whatsappNumber);
