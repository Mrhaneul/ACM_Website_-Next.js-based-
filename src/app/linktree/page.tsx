import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaGlobe, FaClipboardList, FaMicrosoft } from "react-icons/fa";

const links = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/acm_cbu/",
    icon: FaInstagram,
    external: true,
  },
  {
    label: "ACM Website",
    href: "/",
    icon: FaGlobe,
    external: false,
  },
  {
    label: "Register",
    href: "/register",
    icon: FaClipboardList,
    external: false,
  },
  {
    label: "Join our Teams",
    href: "https://teams.microsoft.com/l/channel/19%3A-FcyH0PUAu5BrEzBOkfnPOBKvaTS0qfxqkKyr5BMlzA1%40thread.tacv2/General?groupId=8d9bc2b5-c778-4292-a6e1-3d23300bdcd5&tenantId=d49f2cc1-1f59-4495-96c2-c72e31678766",
    icon: FaMicrosoft,
    external: true,
  },
];

export default function LinktreePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#004AAD] to-[#58cbf7] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm text-center">
        <Image
          src="/acm.png"
          alt="ACM Logo"
          width={96}
          height={96}
          unoptimized
          className="mx-auto mb-6 rounded-full bg-white p-2 shadow-lg"
        />
        <h1 className="text-white text-2xl font-black mb-1">ACM @ CBU</h1>
        <p className="text-white/80 text-sm mb-8">
          Association for Computing Machinery at California Baptist University
        </p>

        <div className="flex flex-col gap-4">
          {links.map(({ label, href, icon: Icon, external }) => {
            const className =
              "flex items-center gap-3 justify-center w-full bg-white text-[#004AAD] font-semibold py-4 px-6 rounded-full shadow-lg hover:bg-gray-100 hover:scale-[1.02] transition-all duration-200";
            return external ? (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                <Icon className="text-lg" />
                {label}
              </a>
            ) : (
              <Link key={label} href={href} className={className}>
                <Icon className="text-lg" />
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
