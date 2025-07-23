import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { socialLinks } from './socialLinks'; 
import { FooterDesignShapes } from './FooterDesignShapes';

export default function Footer() {
    return (
        <footer className='bg-white py-6 px-6 text-center border-t-4 border-[#004AAD] overflow-x-hidden'>
            <div className='max-w-3xl mx-auto flex items-center justify-center gap-6 mb-3'>
                {/* Left shape design */}
                <FooterDesignShapes direction="left" />

                {/* Navigation Links */}
                <div className='flex justify-center gap-4'>
                    {socialLinks.map(({ href, icon, label }) => (
                        <Link
                            key={label}
                            href={href}
                            target='_blank'
                            aria-label={label}
                            className="bg-[#004AAD] text-white rounded-full w-10 h-10 flex items-center justify-center hover:scale-110 transition"
                        >
                            <FontAwesomeIcon icon={icon} size="lg" />
                        </Link>
                    ))}
                </div>

                {/* Right shape design */}
                <FooterDesignShapes direction="right" />
                
            </div>
            {/* Text Under Navigation Links */}
            <div className='text-center text-sm text-[#B5B5B5] font-bold'>
                ACM @ CBU {new Date().getFullYear()}   
            </div>
        </footer>
    )
}