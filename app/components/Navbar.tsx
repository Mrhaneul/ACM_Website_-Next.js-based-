import Image from "next/image"

const Navbar = () => {
  return (
    <>
			<header
        className="flex items-center justify-between px-6 py-4 border-b-4"
        style={{ borderColor: "#004AAD" }}
      >
        <div className="flex items-center space-x-4">
          <Image
            src="/ACMatCBULogo.png"
            alt="ACM Logo"
            width={75}
            height={75}
          />
          <h1 className="text-2xl font-bold leading-tight">
            Association for
            <br />
            Computing Machinery
          </h1>
        </div>

        <nav className="navbar">
          <a href="/" className="navLink">
            Home <span className="diamond"></span>
          </a>
          <a href="/teams" className="navLink">
            Teams <span className="diamond"></span>
          </a>
          <a href="/about" className="navLink">
            About <span className="diamond"></span>
          </a>
          <a href="/contact" className="connectButton">
            Let's Connect!
          </a>
        </nav>
      </header>
		</>
  )
}

export default Navbar
