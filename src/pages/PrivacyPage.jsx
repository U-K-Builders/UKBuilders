// Privacy policy page (/privacy). Linked from ConsentNote under every form.
// STUB: feature/trust (Phase 3) writes the policy; a lawyer reviews it
// before it goes live. Not linked from the menu or footer yet.
const PAGE = {
  title: 'Privacy Policy',
  body: 'DRAFT: lawyer to review. Coming soon.',
};

export default function PrivacyPage() {
  return (
    <div className="animate-fade-in">
      <div className="bg-surface-light py-16 px-gutter text-center border-b border-border-light">
        <h1 className="font-serif font-normal text-navy text-title sm:text-heading uppercase tracking-[3px]">
          {PAGE.title}
          <span className="block w-[60px] h-[2px] bg-gold mx-auto mt-4" />
        </h1>
      </div>
      <div className="max-w-[720px] mx-auto py-16 px-gutter">
        <p className="text-body text-text-primary">{PAGE.body}</p>
      </div>
    </div>
  );
}
