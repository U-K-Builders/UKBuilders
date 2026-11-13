// "Page not found" screen for any address that has no route (the `*` route
// in src/App.jsx). Owned by feature/navigation-design.
import Button from '../components/Button';

export default function NotFoundPage() {
  return (
    <div className="animate-fade-in min-h-[70vh] flex flex-col items-center justify-center text-center py-24 px-5">
      <span aria-hidden="true" className="block text-[5rem] md:text-[7.5rem] font-serif font-black text-gold-deep leading-none select-none">
        404
      </span>
      <h1 className="text-2xl md:text-3xl text-navy uppercase tracking-[4px] font-serif font-normal mt-4 mb-2">
        Page Not Found
      </h1>
      <span className="block w-[50px] h-[2px] bg-gold mx-auto mb-6" />
      <p className="text-text-tertiary max-w-[480px] leading-[1.8] mb-10">
        The page you are looking for may have been moved or does not exist. Let us guide you back home.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button to="/">Go Home</Button>
        <Button to="/contact" variant="secondary">Contact Us</Button>
      </div>
    </div>
  );
}
