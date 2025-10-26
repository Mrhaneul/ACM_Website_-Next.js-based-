/**
 * ContactPage is the route-level component rendered at /contact route.
 * This renders the ContactWrapper component, which contains all the Contact layout and form logic.
 */
import ContactWrapper from "@/src/components/Contact/ContactWrapper";

export default function ContactPage() {
  return (
    <main
      className="min-h-screen"
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(0, 74, 173, 0.8), rgba(88, 203, 247, 0.7)), url('/home.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "scroll",
      }}
    >
      <ContactWrapper />
    </main>
  );
}
