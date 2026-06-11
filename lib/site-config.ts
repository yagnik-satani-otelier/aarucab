export const siteConfig = {
  name: "Aaru Cab",
  tagline: "Your Journey, Our Commitment",
  phone: "+91 96250 12345",
  phoneHref: "tel:+919625012345",
  email: "bookings@aarucab.com",
  serviceAreas: [
    "Surat",
    "Ahmedabad",
    "Vadodara",
    "Rajkot",
    "Mumbai",
    "Delhi NCR",
    "Airport transfers (Mumbai, Delhi & major hubs)",
  ],
  social: {
    instagram: "",
    facebook: "",
    whatsapp: "https://wa.me/919625012345",
  },
  navLinks: [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Tariff", href: "#tariff" },
    { label: "Fleet", href: "#fleet" },
    { label: "Contact Us", href: "#contact" },
  ],
} as const;
