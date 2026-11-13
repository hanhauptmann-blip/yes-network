import React, { useState } from 'react';
import {
  ArrowUpRight,
  Bookmark,
  Check,
  Copy,
  FileText,
  X,
} from 'lucide-react';
import {
  AREAS,
  DisciplineArea,
  INFLUENCERS,
  Influencer,
  THEMATIC_MOTIFS,
  ThematicMotif,
  getInstagramUrl,
} from '../data/influencers';

interface InspectorPanelProps {
  selectedInfluencer: Influencer | null;
  selectedArea: DisciplineArea | 'All';
  selectedMotif: ThematicMotif | 'All';
  isShortlisted: boolean;
  onSelectInfluencer: (influencer: Influencer | null) => void;
  onSelectArea: (area: DisciplineArea | 'All') => void;
  onSelectMotif: (motif: ThematicMotif | 'All') => void;
  onToggleShortlist: (id: string) => void;
}

export const InspectorPanel: React.FC<InspectorPanelProps> = ({
  selectedInfluencer,
  selectedArea,
  selectedMotif,
  isShortlisted,
  onSelectInfluencer,
  onSelectArea,
  onSelectMotif,
  onToggleShortlist,
}) => {
  const [copiedPitch, setCopiedPitch] = useState(false);

  if (selectedInfluencer) {
    const peers = selectedInfluencer.connectedIds
      .map((id) => INFLUENCERS.find((item) => item.id === id))
      .filter((item): item is Influencer => Boolean(item));

    const outreachDraft = `Hi ${selectedInfluencer.handle},\n\nI’m reaching out regarding "YES?" by Robert Silhol—a short indie sci-fi story exploring an alien encounter, trust, and destruction.\n\nGiven your work (${selectedInfluencer.whoTheyAre.charAt(0).toLowerCase() + selectedInfluencer.whoTheyAre.slice(1)}), we saw a natural fit for: ${selectedInfluencer.partnership}\n\nWould you be open to receiving an advance reading copy or collaborating on this angle?\n\nBest regards,`;

    const handleCopyPitch = async () => {
      try {
        await navigator.clipboard.writeText(outreachDraft);
        setCopiedPitch(true);
        setTimeout(() => setCopiedPitch(false), 2000);
      } catch {
        // Ignore clipboard failure
      }
    };

    return (
      <aside
        id="node-inspector"
        aria-label="Selected influencer details"
        className="bg-[#0B101D] border border-[#1E293B] rounded-lg flex flex-col h-full"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#1E293B] flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#94A3B8]">
              <span className="font-mono text-[#22D3EE] tabular-nums">
                NODE #{String(selectedInfluencer.order).padStart(2, '0')}
              </span>
              <span aria-hidden="true">·</span>
              <span>{selectedInfluencer.area}</span>
              {selectedInfluencer.locationOrAffiliation && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{selectedInfluencer.locationOrAffiliation}</span>
                </>
              )}
            </div>
            <h2 className="mt-1.5 font-serif text-2xl font-medium text-[#F8FAFC] tracking-wide break-all">
              {selectedInfluencer.handle}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onSelectInfluencer(null)}
            aria-label="Clear selected influencer"
            className="p-1.5 rounded-md text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#131B2E] transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 flex-1 overflow-y-auto">
          {/* Followers & Account Status */}
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#1E293B]">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-[#64748B]">
                Followers
              </div>
              <div className="mt-1 font-mono text-xl font-medium text-[#F8FAFC] tabular-nums">
                {selectedInfluencer.followersDisplay}
              </div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-[#64748B]">
                Signal Status
              </div>
              <div
                className={`mt-1.5 text-xs font-medium ${
                  selectedInfluencer.verificationStatus === 'verified'
                    ? 'text-[#2DD4BF]'
                    : 'text-[#FBBF24]'
                }`}
              >
                {selectedInfluencer.verificationStatus === 'verified'
                  ? 'Listed & Matched'
                  : selectedInfluencer.verificationStatus === 'profile-check'
                  ? 'Profile check pending'
                  : 'Unconfirmed official'}
              </div>
            </div>
          </div>

          {selectedInfluencer.verificationNote && (
            <div className="p-3 rounded-md bg-[#451A03]/40 border border-[#92400E]/60 text-xs text-[#FCD34D] leading-relaxed">
              {selectedInfluencer.verificationNote} Check live Instagram profile before outreach.
            </div>
          )}

          {/* Who They Are */}
          <div>
            <h3 className="text-[11px] font-medium uppercase tracking-wider text-[#64748B]">
              Who They Are
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[#CBD5E1] tracking-[0.01em]">
              {selectedInfluencer.whoTheyAre}
            </p>
          </div>

          {/* Why the Partnership */}
          <div className="p-4 rounded-lg bg-[#070B14] border border-[#1E293B]">
            <h3 className="text-[11px] font-medium uppercase tracking-wider text-[#22D3EE]">
              Why the Partnership with “YES?”
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[#F1F5F9] tracking-[0.01em]">
              {selectedInfluencer.partnership}
            </p>
            <div className="mt-3 pt-3 border-t border-[#1E293B] text-xs text-[#94A3B8] space-y-1">
              <div>
                <span className="text-[#64748B]">Formats:</span>{' '}
                {selectedInfluencer.formatTags.join(' · ')}
              </div>
              <div>
                <span className="text-[#64748B]">Themes:</span>{' '}
                {selectedInfluencer.motifs.join(' · ')}
              </div>
            </div>
          </div>

          {/* Associative Peers */}
          {peers.length > 0 && (
            <div>
              <h3 className="text-[11px] font-medium uppercase tracking-wider text-[#64748B]">
                Connected Nodes on Map
              </h3>
              <div className="mt-2.5 space-y-2">
                {peers.map((peer) => (
                  <button
                    key={peer.id}
                    type="button"
                    onClick={() => onSelectInfluencer(peer)}
                    className="w-full text-left px-3.5 py-2.5 rounded-md border border-[#1E293B] bg-[#080C16] hover:border-[#22D3EE]/50 hover:bg-[#11192B] transition-colors flex items-center justify-between gap-3 cursor-pointer"
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-[#22D3EE] truncate">
                        {peer.handle}
                      </div>
                      <div className="text-[11px] text-[#94A3B8] truncate">
                        {peer.area}
                      </div>
                    </div>
                    <div className="text-[11px] font-mono text-[#E2E8F0] tabular-nums shrink-0">
                      {peer.followersDisplay}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-[#1E293B] bg-[#080C16] space-y-2.5">
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => onToggleShortlist(selectedInfluencer.id)}
              className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
                isShortlisted
                  ? 'bg-[#22D3EE]/15 text-[#22D3EE] border-[#22D3EE]'
                  : 'bg-[#0F172A] text-[#E2E8F0] border-[#1E293B] hover:border-[#334155]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" fill={isShortlisted ? 'currentColor' : 'none'} />
              {isShortlisted ? 'Shortlisted' : 'Shortlist'}
            </button>

            <button
              type="button"
              onClick={handleCopyPitch}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md border border-[#1E293B] bg-[#0F172A] text-[#E2E8F0] hover:border-[#334155] transition-colors cursor-pointer"
            >
              {copiedPitch ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#2DD4BF]" />
                  Copied Pitch
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Pitch
                </>
              )}
            </button>
          </div>

          <a
            href={getInstagramUrl(selectedInfluencer.handle)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-md bg-[#22D3EE] text-[#041019] hover:bg-[#67E8F9] transition-colors"
          >
            Open {selectedInfluencer.handle} on Instagram
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </aside>
    );
  }

  // Default state when no node is clicked yet
  const areaMembers =
    selectedArea !== 'All'
      ? INFLUENCERS.filter((i) => i.area === selectedArea)
      : [];

  return (
    <aside
      id="node-inspector"
      aria-label="Associative map overview"
      className="bg-[#0B101D] border border-[#1E293B] rounded-lg flex flex-col h-full"
    >
      <div className="px-6 py-5 border-b border-[#1E293B]">
        <div className="text-[11px] font-mono uppercase tracking-wider text-[#22D3EE]">
          Signal Telemetry
        </div>
        <h2 className="mt-1 font-serif text-xl font-medium text-[#F8FAFC]">
          {selectedArea === 'All' ? 'Select any point on the map' : selectedArea}
        </h2>
        <p className="mt-1.5 text-xs text-[#94A3B8] leading-relaxed">
          {selectedArea === 'All'
            ? 'Click any star node to inspect who they are, their follower count, and why they connect with Robert Silhol’s “YES?”.'
            : AREAS.find((a) => a.id === selectedArea)?.description}
        </p>
      </div>

      <div className="p-6 space-y-6 flex-1 overflow-y-auto">
        {selectedArea !== 'All' ? (
          <div>
            <div className="flex items-center justify-between text-xs text-[#94A3B8] mb-3">
              <span>Signals in this sector ({areaMembers.length})</span>
              <button
                type="button"
                onClick={() => onSelectArea('All')}
                className="text-[#22D3EE] font-medium hover:underline cursor-pointer"
              >
                Show all sectors
              </button>
            </div>
            <div className="space-y-2">
              {areaMembers.map((inf) => (
                <button
                  key={inf.id}
                  type="button"
                  onClick={() => onSelectInfluencer(inf)}
                  className="w-full text-left p-3 rounded-md border border-[#1E293B] bg-[#080C16] hover:border-[#22D3EE]/60 hover:bg-[#11192B] transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-[#22D3EE]">
                      {inf.handle}
                    </span>
                    <span className="text-xs font-mono text-[#F8FAFC] tabular-nums">
                      {inf.followersDisplay}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[#94A3B8] line-clamp-2">
                    {inf.whoTheyAre}
                  </p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-[11px] font-medium uppercase tracking-wider text-[#64748B]">
              Thematic Bridges Across Space
            </h3>
            <p className="mt-1 text-xs text-[#94A3B8]">
              Isolate nodes linked by shared narrative motifs:
            </p>
            <div className="mt-3 space-y-2">
              {THEMATIC_MOTIFS.map((motif) => {
                const active = selectedMotif === motif.id;
                const count = INFLUENCERS.filter((i) =>
                  i.motifs.includes(motif.id)
                ).length;

                return (
                  <button
                    key={motif.id}
                    type="button"
                    onClick={() => onSelectMotif(active ? 'All' : motif.id)}
                    className={`w-full text-left p-3 rounded-md border transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#082F49]/50 border-[#22D3EE]'
                        : 'bg-[#080C16] border-[#1E293B] hover:border-[#334155]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-[#F1F5F9]">
                        {motif.title}
                      </span>
                      <span className="text-xs font-mono text-[#22D3EE] tabular-nums">
                        {count}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-[#94A3B8] leading-relaxed">
                      {motif.summary}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="p-5 border-t border-[#1E293B] bg-[#080C16]">
        <a
          href="/assets/aistudio/YES-influencer-overview-v2-076e3afc_ae639314.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-medium text-[#94A3B8] hover:text-[#22D3EE] transition-colors"
        >
          <FileText className="w-3.5 h-3.5" />
          Open Source Overview PDF
        </a>
      </div>
    </aside>
  );
};
