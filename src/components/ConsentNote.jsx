// The one-line consent notice under a form: "We'll use your details only to
// contact you about our projects. Privacy policy." Wording lives in
// src/data/site.js (CONSENT). Placed under every form by
// feature/enquiry-flow (Phase 3); not used on any page yet.
import { Link } from 'react-router-dom';
import { CONSENT } from '../data/site';

export default function ConsentNote({ className = '' }) {
  return (
    <p className={`text-small text-text-secondary ${className}`}>
      {CONSENT.text}{' '}
      <Link to={CONSENT.linkTo} className="text-gold underline underline-offset-2 hover:no-underline">
        {CONSENT.linkLabel}
      </Link>
    </p>
  );
}
