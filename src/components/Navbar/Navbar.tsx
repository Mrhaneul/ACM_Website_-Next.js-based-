import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
    return (
        <nav className='bg-white text-black p-2 border-b-[6px] border-[#004AAD]'>
            <div className='container mx-auto flex justify-between items-center'>

                <Link href="/" className="flex items-center space-x-2">
                    <Image src="/acm.png" alt="ACM Logo" width={80} height={80}/>
                    <span className="text-xl font-black">Association for <br/> Computing Machinery</span>
                </Link>

                <ul className="flex items-center space-x-6">
                    {[
                        { href: '/', label: 'Home' },
                        { href: '/teams', label: 'Teams' },
                        { href: '/about', label: 'About' },

                    ].map(({ href, label }) => (
                        <li
                            key={href}
                            className="relative pr-3 after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-2.5 after:h-2.5 after:bg-[#004AAD] after:rotate-45 after:rounded-sm"
                        >
                            <Link href={href} className="hover:text-[#58cbf7] px-1">
                                {label}
                            </Link>
                        </li>
                    ))}

                    <li>
                        <Link
                            href="/contact"
                            className="bg-[#004AAD] hover:bg-[#58cbf7] text-white font-semibold py-2 px-4 rounded-[8px] transition"
                        >
                            Lets Connect!
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar; 