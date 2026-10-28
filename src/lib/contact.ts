export const CONTACT = {
  email: "getcorporategifting@gmail.com",
  phoneDisplay: "+91 99855 90101",
  phoneTel: "+919985590101",
  whatsapp: "919985590101",
  hours: "Mon – Sat, 10:00 AM – 7:00 PM", // placeholder, editable
  delivery: "Pan-India delivery", // editable
};

export const waLink = (text: string) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;

export const mailLink = (subject: string, body: string) =>
  `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
