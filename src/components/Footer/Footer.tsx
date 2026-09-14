import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { site } from "@/src/config/site";

const nav = [
  { href: "/teams", label: "Teams" },
  { href: "/about", label: "About" },
  { href: "/join", label: "Join" },
  { href: "/contact", label: "Contact" },
  { href: "/linktree", label: "All links" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="container-x flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <div className="flex items-center gap-3">
            <Image src="/acm.png" alt="" width={36} height={36} className="h-9 w-9" unoptimized />
            <span className="font-semibold text-ink">ACM at CBU</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-ink-3">
            The Association for Computing Machinery student chapter at {site.university}.
          </p>
        </div>

        <div className="flex gap-12">
          <div>
            <p className="eyebrow mb-3">Site</p>
            <ul className="space-y-2">
              {nav.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-ink-2 hover:text-brand">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-3">Reach us</p>
            <ul className="space-y-2">
              <li>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-ink-2 hover:text-brand"
                >
                  <FontAwesomeIcon icon={faInstagram} className="w-4" /> Instagram
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 text-sm text-ink-2 hover:text-brand">
                  <FontAwesomeIcon icon={faEnvelope} className="w-4" /> Email
                </a>
              </li>
              <li>
                <Link href={site.linktree} className="inline-flex items-center gap-2 text-sm text-ink-2 hover:text-brand">
                  <i className="bi bi-microsoft-teams w-4" /> Microsoft Teams
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-1 py-4 text-xs text-ink-3 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} ACM at CBU</span>
          <span>A student organization at {site.university}</span>
        </div>
      </div>
    </footer>
  );
}
