// The site's one button style, at least 48px tall (`min-h-tap`).
// Renders a router <Link> when given `to`, an <a> when given `href`,
// otherwise a <button> (type="button" unless you pass type="submit").
// Used by Header, Footer, the stub pages and NotFoundPage; Phase 3 moves the
// rest of the site's buttons onto it.
//
//   <Button to="/contact">Enquire</Button>
//   <Button variant="secondary" href={CONTACT.phone.href}>Call</Button>
//   <Button variant="link" href="https://…" external>Open in Google Maps</Button>
//   <Button type="submit" disabled={sending}>Send</Button>
import { Link } from 'react-router-dom';

const BASE =
  'inline-flex items-center justify-center gap-2 min-h-tap px-6 py-2 rounded-button text-small text-center font-semibold tracking-[0.14em] uppercase no-underline cursor-pointer transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed';

const VARIANTS = {
  primary: 'bg-gold text-navy border border-gold hover:bg-gold-dark hover:border-gold-dark',
  secondary: 'bg-transparent text-gold border border-gold hover:bg-gold hover:text-navy',
  link: 'bg-transparent text-gold border-0 !px-0 hover:underline',
};

export default function Button({ variant = 'primary', to, href, external = false, className = '', children, ...rest }) {
  const classes = `${BASE} ${VARIANTS[variant]} ${className}`;
  if (to) {
    return <Link to={to} className={classes} {...rest}>{children}</Link>;
  }
  if (href) {
    const newTab = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    return <a href={href} className={classes} {...newTab} {...rest}>{children}</a>;
  }
  return <button type="button" className={classes} {...rest}>{children}</button>;
}
