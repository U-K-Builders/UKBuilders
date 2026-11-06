import { useRef, useState } from 'react';

const FALLBACK_ERROR =
  'Sorry, we could not send your details. Please check your connection, or call +91 98203 11177.';

/**
 * Sends a form to /api/lead. Usage:
 *   const lead = useLeadSubmit();
 *   <input {...lead.honeypotProps} />            // inside the <form>
 *   if (!(await lead.submit('enquiry', fields))) return;
 *   {lead.error && <p role="alert">{lead.error}</p>}
 * Only show "thank you" when submit() resolves true.
 */
export default function useLeadSubmit() {
  const startedAt = useRef(0);
  const trapRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  // Start the clock when the visitor first interacts with the form.
  const markStart = () => {
    if (!startedAt.current) startedAt.current = Date.now();
  };

  async function submit(category, fields) {
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          fields,
          page: window.location.pathname,
          startedAt: startedAt.current || Date.now() - 60_000,
          website: trapRef.current?.value || '',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setError(data.error || FALLBACK_ERROR);
        return false;
      }
      return true;
    } catch {
      setError(FALLBACK_ERROR);
      return false;
    } finally {
      setSending(false);
    }
  }

  // A field people never see. Bots that fill every input reveal themselves.
  const honeypotProps = {
    ref: trapRef,
    type: 'text',
    name: 'website',
    tabIndex: -1,
    autoComplete: 'off',
    'aria-hidden': true,
    onFocus: markStart,
    className: 'absolute -left-[9999px] w-px h-px opacity-0',
  };

  return { submit, sending, error, honeypotProps, markStart };
}
