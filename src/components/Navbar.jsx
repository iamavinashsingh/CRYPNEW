'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 

const Navbar = () => {
    const pathname = usePathname(); 

    return (
        <nav className="mx-4 md:mx-8 rounded-3xl px-4 md:px-6 py-2 text-white flex flex-wrap gap-4 md:gap-20 items-center justify-between bg-transparent backdrop-blur-2xl shadow-lg shadow-black/20 border border-white/10">
            {/* Logo */}    
            <div className="tracking-widest ">
                <img src='/Logo-Crypnew.png' alt="logo of crypnew" className='sm:w-24 md:w-32  sm:h-8 md:h-12' />
            </div> 
            {/* Navigation Links */}
            <div className="flex flex-wrap gap-9 md:gap-20 items-center justify-center ">
                {[
                    { name: "HOME", path: "/" },
                    { name: "CRYPTO", path: "/crypto" },
                    { name: "WEATHER", path: "/weather" },
                ].map((link) => (
                    <Link 
                        key={link.path} 
                        href={link.path} 
                        className={`relative group transition duration-300 
                        ${pathname === link.path ? "text-[#1CA8E8] text-lg md:text-xl font-extrabold" : "text-white text-sm md:text-base"} 
                        hover:text-[#1CA8E8]`}>
                        {link.name}
                        {/* Animated Underline */}
                        <span className={`absolute left-0 -bottom-1 w-0 h-0.5 bg-[#1CA8E8] transition-all duration-300 group-hover:w-full`}></span>
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
