import { useState, useEffect } from 'react';
import { getSubmissions, clearSubmissions } from '../utils/submissions';

const TABS = [
  {
    key: 'buyers',
    label: 'Buyer Enquiries',
    cols: [
      { key: 'name',     label: 'Name'    },
      { key: 'email',    label: 'Email'   },
      { key: 'phone',    label: 'Phone'   },
      { key: 'interest', label: 'Project' },
      { key: 'message',  label: 'Message' },
    ],
  },
  {
    key: 'enquiries',
    label: 'Project Enquiries',
    cols: [
      { key: 'name',    label: 'Name'    },
      { key: 'phone',   label: 'Phone'   },
      { key: 'project', label: 'Project' },
      { key: 'bhk',     label: 'BHK'     },
      { key: 'message', label: 'Message' },
    ],
  },
  {
    key: 'site_visits',
    label: 'Site Visits',
    cols: [
      { key: 'name',    label: 'Name'    },
      { key: 'email',   label: 'Email'   },
      { key: 'phone',   label: 'Phone'   },
      { key: 'project', label: 'Project' },
    ],
  },
  {
    key: 'video_calls',
    label: 'Video Calls',
    cols: [
      { key: 'name',     label: 'Name'     },
      { key: 'email',    label: 'Email'    },
      { key: 'phone',    label: 'Phone'    },
      { key: 'country',  label: 'Country'  },
      { key: 'project',  label: 'Project'  },
      { key: 'date',     label: 'Date'     },
      { key: 'slot',     label: 'Time Slot'},
      { key: 'timezone', label: 'Timezone' },
      { key: 'message',  label: 'Notes'    },
    ],
  },
  {
    key: 'waitlist',
    label: 'Waitlist',
    cols: [
      { key: 'name',    label: 'Name'    },
      { key: 'email',   label: 'Email'   },
      { key: 'project', label: 'Project' },
      { key: 'bhk',     label: 'BHK Pref.'},
    ],
  },
  {
    key: 'milestone_subs',
    label: 'Milestone Updates',
    cols: [
      { key: 'name',    label: 'Name'    },
      { key: 'email',   label: 'Email'   },
      { key: 'project', label: 'Project' },
    ],
  },
  {
    key: 'society',
    label: 'Owner Registrations',
    cols: [
      { key: 'name',    label: 'Name'     },
      { key: 'email',   label: 'Email'    },
      { key: 'phone',   label: 'Phone'    },
      { key: 'project', label: 'Building' },
      { key: 'unit',    label: 'Unit'     },
    ],
  },
  {
    key: 'investors',
    label: 'Investor Enquiries',
    cols: [
      { key: 'name',    label: 'Name'    },
      { key: 'email',   label: 'Email'   },
      { key: 'phone',   label: 'Phone'   },
      { key: 'budget',  label: 'Budget'  },
      { key: 'project', label: 'Project' },
      { key: 'message', label: 'Message' },
    ],
  },
  {
    key: 'contractors',
    label: 'Contractors',
    cols: [
      { key: 'company',  label: 'Company'    },
      { key: 'contact',  label: 'Contact'    },
      { key: 'email',    label: 'Email'      },
      { key: 'phone',    label: 'Phone'      },
      { key: 'category', label: 'Category'   },
      { key: 'years',    label: 'Exp. (yrs)' },
      { key: 'pan',      label: 'PAN'        },
      { key: 'message',  label: 'Message'    },
    ],
  },
  {
    key: 'careers',
    label: 'Career Applications',
    cols: [
      { key: 'name',    label: 'Name'  },
      { key: 'email',   label: 'Email' },
      { key: 'phone',   label: 'Phone' },
      { key: 'role',    label: 'Role'  },
      { key: 'message', label: 'Note'  },
    ],
  },
  {
    key: 'downloads',
    label: 'Guide Downloads',
    cols: [
      { key: 'name',  label: 'Name'  },
      { key: 'email', label: 'Email' },
      { key: 'guide', label: 'Guide' },
    ],
  },
];

function formatDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) +
    ' ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

function SubmissionsTable({ tabKey, cols }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getSubmissions(tabKey).then(setData).finally(() => setLoading(false));
  }, [tabKey]);

  const handleClear = async () => {
    if (window.confirm('Clear all entries for this category? This cannot be undone.')) {
      await clearSubmissions(tabKey);
      setData([]);
    }
  };

  if (loading) {
    return <div className="text-center py-16 text-text-muted text-sm uppercase tracking-[2px]">Loading…</div>;
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-16 border border-dashed border-border-light bg-surface-light">
        <p className="text-text-muted text-sm uppercase tracking-[2px]">No submissions yet</p>
        <p className="text-text-muted text-xs mt-2">Entries will appear here when forms are submitted.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-text-muted text-xs uppercase tracking-[2px]">{data.length} {data.length === 1 ? 'entry' : 'entries'}</span>
        <button
          onClick={handleClear}
          className="text-[0.625rem] uppercase tracking-[1.5px] text-red-400 border border-red-300 px-3 py-1.5 hover:bg-red-50 transition-colors duration-300"
        >
          Clear All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-navy text-white">
              <th className="text-left px-3 py-3 text-[0.625rem] uppercase tracking-[1.5px] font-normal whitespace-nowrap border-r border-white/10">#</th>
              <th className="text-left px-3 py-3 text-[0.625rem] uppercase tracking-[1.5px] font-normal whitespace-nowrap border-r border-white/10">Date &amp; Time</th>
              {cols.map((c) => (
                <th key={c.key} className="text-left px-3 py-3 text-[0.625rem] uppercase tracking-[1.5px] font-normal whitespace-nowrap border-r border-white/10 last:border-r-0">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={row._id} className={`border-b border-border-light ${i % 2 === 0 ? 'bg-white' : 'bg-surface-light'} hover:bg-gold/5 transition-colors duration-150`}>
                <td className="px-3 py-3 text-xs text-text-muted border-r border-border-light">{data.length - i}</td>
                <td className="px-3 py-3 text-xs text-text-muted whitespace-nowrap border-r border-border-light">{formatDate(row._at)}</td>
                {cols.map((c) => (
                  <td key={c.key} className="px-3 py-3 text-text-secondary text-xs border-r border-border-light last:border-r-0 max-w-[200px]">
                    <span className="block truncate" title={row[c.key] || '—'}>{row[c.key] || '—'}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('buyers');
  const [counts, setCounts] = useState({});
  const current = TABS.find((t) => t.key === activeTab);

  useEffect(() => {
    Promise.all(TABS.map(t => getSubmissions(t.key).then(d => [t.key, d.length])))
      .then(entries => setCounts(Object.fromEntries(entries)));
  }, []);

  return (
    <div>
      <div className="border border-gold/30 bg-gold/5 px-6 py-4 mb-8 flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
        <p className="text-text-secondary text-sm">
          Admin mode active — all form submissions captured below. Data is stored locally in this browser.
        </p>
      </div>

      {/* Tab bar — scrollable on mobile */}
      <div className="overflow-x-auto -mx-1 mb-8">
        <div className="flex gap-0 border-b border-border-light min-w-max px-1">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`relative px-4 py-3 text-[0.625rem] uppercase tracking-[1.5px] whitespace-nowrap transition-all duration-200 border-b-2 ${
                activeTab === t.key
                  ? 'border-gold text-navy font-bold'
                  : 'border-transparent text-text-muted hover:text-navy hover:border-border-light'
              }`}
            >
              {t.label}
              {counts[t.key] > 0 && (
                <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-gold text-white text-[0.5rem] font-bold">
                  {counts[t.key] > 99 ? '99+' : counts[t.key]}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {current && <SubmissionsTable key={activeTab} tabKey={current.key} cols={current.cols} />}
    </div>
  );
}
