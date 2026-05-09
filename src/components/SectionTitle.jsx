export default function SectionTitle({ children, className = '' }) {
  return (
    <h2 className={`text-center text-4xl text-navy mb-16 uppercase tracking-[3px] font-serif font-normal ${className}`}>
      {children}
      <span className="block w-[60px] h-[2px] bg-gold mx-auto mt-4" />
    </h2>
  );
}
