import React, { useEffect, useState } from 'react';
import { Check, Copy, Download, Trash2, X } from 'lucide-react';
import {
  Influencer,
  formatFollowerTotal,
} from '../data/influencers';

interface ShortlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  shortlistedInfluencers: Influencer[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
  onSelectInfluencer: (influencer: Influencer) => void;
  onExportCsv: (items: Influencer[], filename: string) => void;
}

export const ShortlistDrawer: React.FC<ShortlistDrawerProps> = ({
  isOpen,
  onClose,
  shortlistedInfluencers,
  onRemove,
  onClearAll,
  onSelectInfluencer,
  onExportCsv,
}) => {
  const [copiedSummary, setCopiedSummary] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const totalVisibleReach = shortlistedInfluencers.reduce(
    (sum, item) => sum + (item.followersCount ?? 0),
    0
  );

  const handleCopySummary = async () => {
    const lines = shortlistedInfluencers.map(
      (i) =>
        `${i.handle} (${i.area} · ${i.followersDisplay}) — ${i.partnership}`
    );
    const text = `YES? by Robert Silhol — Outreach Shortlist (${shortlistedInfluencers.length} influencers)\n\n${lines.join('\n')}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2000);
    } catch {
      // Ignore clipboard failure
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-[2px]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Outreach Shortlist"
    >
      <aside
        className="bg-[#0B101D] w-full max-w-md h-full flex flex-col border-l border-[#1E293B] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5 border-b border-[#1E293B] flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl font-medium text-[#F8FAFC]">
              Outreach Shortlist
            </h2>
            <p className="text-xs text-[#94A3B8] mt-0.5 tabular-nums">
              {shortlistedInfluencers.length} selected · {formatFollowerTotal(totalVisibleReach)} visible reach
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close shortlist drawer"
            className="p-2 rounded-md text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#131B2E] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {shortlistedInfluencers.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm font-medium text-[#F8FAFC]">
                No nodes shortlisted yet
              </p>
              <p className="mt-1.5 text-xs text-[#94A3B8] max-w-xs mx-auto leading-relaxed">
                Click any influencer point on the associative map and press Shortlist to assemble your outreach list for “YES?”.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-[#1E293B]">
              {shortlistedInfluencers.map((inf) => (
                <li key={inf.id} className="py-4 first:pt-0">
                  <div className="flex items-start justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onSelectInfluencer(inf);
                      }}
                      className="text-left min-w-0 cursor-pointer group"
                    >
                      <div className="text-sm font-semibold text-[#22D3EE] group-hover:underline truncate">
                        {inf.handle}
                      </div>
                      <div className="mt-0.5 text-xs text-[#94A3B8] tabular-nums">
                        {inf.area} · {inf.followersDisplay}
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemove(inf.id)}
                      aria-label={`Remove ${inf.handle}`}
                      className="p-1.5 text-[#64748B] hover:text-[#FB7185] transition-colors cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-[#CBD5E1] leading-relaxed">
                    {inf.partnership}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {shortlistedInfluencers.length > 0 && (
          <div className="p-6 border-t border-[#1E293B] bg-[#080C16] space-y-3">
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={handleCopySummary}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-medium rounded-md border border-[#1E293B] bg-[#0F172A] text-[#E2E8F0] hover:border-[#334155] hover:bg-[#1E293B] transition-colors cursor-pointer"
              >
                {copiedSummary ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#2DD4BF]" />
                    Copied Brief
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy Brief
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() =>
                  onExportCsv(shortlistedInfluencers, 'yes-influencer-shortlist.csv')
                }
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold rounded-md bg-[#22D3EE] text-[#041019] hover:bg-[#67E8F9] transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Export CSV
              </button>
            </div>
            <button
              type="button"
              onClick={onClearAll}
              className="w-full py-1.5 text-xs text-[#64748B] hover:text-[#FB7185] transition-colors cursor-pointer"
            >
              Clear shortlist
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};
