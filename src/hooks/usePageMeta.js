import { useEffect } from 'react';
import { DEFAULT_META } from '../data/pageMeta';

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

/** Sets document title, meta description and the matching social tags. */
export default function usePageMeta(meta, skip = false) {
  const title = meta?.title || DEFAULT_META.title;
  const description = meta?.description || DEFAULT_META.description;
  useEffect(() => {
    if (skip) return;
    document.title = title;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
  }, [title, description, skip]);
}
