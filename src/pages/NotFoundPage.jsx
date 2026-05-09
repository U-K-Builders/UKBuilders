import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="animate-fade-in min-h-[70vh] flex flex-col items-center justify-center text-center py-24 px-5">
      <span className="block text-[5rem] md:text-[7.5rem] font-serif font-black text-border-light leading-none select-none">
        404
      </span>
      <h2 className="text-2xl md:text-3xl text-navy uppercase tracking-[4px] font-serif font-normal mt-4 mb-2">
        Page Not Found
      </h2>
      <span className="block w-[50px] h-[2px] bg-gold mx-auto mb-6" />
      <p className="text-text-tertiary max-w-[480px] leading-[1.8] mb-10">
        The page you are looking for may have been moved or does not exist. Let us guide you back home.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          to="/"
          className="bg-gold text-white px-10 py-4 no-underline text-sm tracking-[2px] uppercase border border-gold transition-all duration-300 hover:bg-transparent hover:text-gold"
        >
          Go Home
        </Link>
        <Link
          to="/contact"
          className="bg-transparent text-gold px-10 py-4 no-underline text-sm tracking-[2px] uppercase border border-gold transition-all duration-300 hover:bg-gold hover:text-white"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
