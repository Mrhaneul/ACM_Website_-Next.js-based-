import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { socialLinks } from './socialLinks'; 
import { FooterDesignShapes } from './FooterDesignShapes';

export default function Footer() {
    return (
        <footer className='bg-white py-[3rem] px-8 text-center border-t-[6px] border-[#004AAD] overflow-x-hidden'>
            <div className='max-w-4xl mx-auto flex items-center justify-center gap-10 mb-4'>
                {/* Left shape design */}
                <FooterDesignShapes direction="left" />

                {/* Navigation Links */}
                <div className='flex justify-center gap-8'>
                    {socialLinks.map(({ href, icon, label }) => (
                        <Link
                            key={label}
                            href={href}
                            target='_blank'
                            aria-label={label}
                            className="bg-[#004AAD] text-white rounded-full w-14 h-14 flex items-center justify-center hover:scale-110 transition"
                        >
                            <FontAwesomeIcon icon={icon} size="2xl" />
                        </Link>
                    ))}
                </div>

                {/* Right shape design */}
                <FooterDesignShapes direction="right" />
                
            </div>
            {/* Text Under Navigation Links */}
            <div className='text-center text-lg text-[#B5B5B5] font-bold'>
                ACM @ CBU {new Date().getFullYear()}   
            </div>
        </footer>
    )
}