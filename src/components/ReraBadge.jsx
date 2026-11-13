// Shows a project's MahaRERA registration ("MahaRERA PR1180002500760") and,
// once the owner sends it, its QR code. Data: RERA in src/data/site.js.
// Used on ProjectCard, the project page's stats bar and the Footer.
// Owned by feature/trust (Phase 3), which adds the QR images and styling.
//
//   <ReraBadge slug="justin" />                  MahaRERA PR1180002500760
//   <ReraBadge slug="justin" showLabel={false} /> PR1180002500760
// Renders nothing for a project with no MahaRERA number.
import { RERA } from '../data/site';

export default function ReraBadge({ slug, showLabel = true, className = '' }) {
  const rera = RERA.projects[slug];
  if (!rera) return null;
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      {/* TODO(feature/trust, issue #51): QR images still to come from the owner;
          until `qr` is set in site.js nothing is shown here. */}
      {rera.qr && (
        <img src={rera.qr} alt={`${RERA.label} QR code for ${rera.name}`} width="64" height="64" className="w-16 h-16 bg-white p-1" />
      )}
      <span>{showLabel && `${RERA.label} `}{rera.number}</span>
    </span>
  );
}
