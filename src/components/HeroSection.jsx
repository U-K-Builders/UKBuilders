import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <div
      className="py-32 px-5 text-center text-white bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(11, 29, 58, 0.7), rgba(11, 29, 58, 0.7)), url('/images/Building/La Serena.jpg')`,
      }}
    >
      <h2 className="text-[56px] mb-4 font-serif font-normal">Crafting Legacy Residences</h2>
      <p className="text-xl text-[#e0e0e0] max-w-[700px] mx-auto mb-10">
        Experience unparalleled luxury and architectural excellence in the heart of Mumbai.
      </p>
      <Link
        to="/projects/ongoing"
        className="inline-block bg-gold text-white px-12 py-5 no-underline text-sm tracking-[2px] uppercase border border-gold transition-all duration-300 hover:bg-transparent hover:text-gold"
      >
        View Ongoing Masterpieces
      </Link>
    </div>
  );
}
