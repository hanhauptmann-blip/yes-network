import React, { useEffect, useMemo, useState } from 'react';
import { RotateCcw, Search, X } from 'lucide-react';
import {
  AREAS,
  DisciplineArea,
  INFLUENCERS,
  Influencer,
  THEMATIC_MOTIFS,
  ThematicMotif,
  formatFollowerTotal,
} from './data/influencers';
import { Header } from './components/Header';
import { AssociativeGraph } from './components/AssociativeGraph';
import { InspectorPanel } from './components/InspectorPanel';
import { ShortlistDrawer } from './components/ShortlistDrawer';

type AudienceTier = 'all' | 'micro' | 'mid' | 'macro' | 'unlisted';

const STORAGE_KEY = 'yes-network-shortlist-v1';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState<DisciplineArea | 'All'>('All');
  const [selectedMotif, setSelectedMotif] = useState<ThematicMotif | 'All'>('All');
  const [audienceTier, setAudienceTier] = useState<AudienceTier>('all');

  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null);
  const [isShortlistOpen, setIsShortlistOpen] = useState(false);

  const [shortlistIds, setShortlistIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return new Set(parsed);
        }
      }
    } catch {
      // Ignore storage errors
    }
    return new Set();
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(shortlistIds)));
    } catch {
      // Ignore storage errors
    }
  }, [shortlistIds]);

  const toggleShortlist = (id: string) => {
    setShortlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filteredInfluencers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return INFLUENCERS.filter((inf) => {
      if (selectedArea !== 'All' && inf.area !== selectedArea) return false;
      if (selectedMotif !== 'All' && !inf.motifs.includes(selectedMotif)) return false;

      if (audienceTier === 'micro') {
        if (inf.followersCount === null || inf.followersCount >= 3000) return false;
      } else if (audienceTier === 'mid') {
        if (
          inf.followersCount === null ||
          inf.followersCount < 3000 ||
          inf.followersCount >= 15000
        ) {
          return false;
        }
      } else if (audienceTier === 'macro') {
        if (inf.followersCount === null || inf.followersCount < 15000) return false;
      } else if (audienceTier === 'unlisted') {
        if (inf.followersCount !== null) return false;
      }

      if (query) {
        const searchable = [
          inf.handle,
          inf.area,
          inf.whoTheyAre,
          inf.partnership,
          inf.locationOrAffiliation ?? '',
          ...inf.motifs,
          ...inf.formatTags,
        ]
          .join(' ')
          .toLowerCase();
        if (!searchable.includes(query)) return false;
      }

      return true;
    });
  }, [searchQuery, selectedArea, selectedMotif, audienceTier]);

  const shortlistedInfluencers = useMemo(
    () => INFLUENCERS.filter((inf) => shortlistIds.has(inf.id)),
    [shortlistIds]
  );

  const totalVisibleReachAll = useMemo(
    () => INFLUENCERS.reduce((sum, i) => sum + (i.followersCount ?? 0), 0),
    []
  );

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedArea !== 'All' ||
    selectedMotif !== 'All' ||
    audienceTier !== 'all';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedArea('All');
    setSelectedMotif('All');
    setAudienceTier('all');
    setSelectedInfluencer(null);
  };

  const handleSelectInfluencer = (inf: Influencer | null) => {
    setSelectedInfluencer(inf);
    if (inf && window.innerWidth < 1024) {
      setTimeout(() => {
        document
          .getElementById('node-inspector')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
    }
  };

  const exportCsv = (items: Influencer[], filename: string) => {
    const escapeCell = (val: string) => `"${val.replace(/"/g, '""')}"`;
    const headers = [
      'Order',
      'Handle',
      'Area',
      'Followers',
      'Who They Are',
      'Potential Partnership with YES?',
      'Verification Status',
      'Instagram URL',
    ];
    const rows = items.map((i) => [
      String(i.order),
      i.handle,
      i.area,
      i.followersDisplay,
      i.whoTheyAre,
      i.partnership,
      i.verificationNote ? i.verificationNote : 'Listed & matched',
      `https://www.instagram.com/${i.handle.replace(/^@/, '')}/`,
    ]);
    const csvContent = [headers, ...rows]
      .map((row) => row.map(escapeCell).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#060911] text-[#E2E8F0]">
      <Header
        shortlistCount={shortlistIds.size}
        onOpenShortlist={() => setIsShortlistOpen(true)}
        onResetMap={resetFilters}
      />

      <main className="flex-1">
        {/* Deep-Space Editorial Title Band */}
        <section className="relative overflow-hidden border-b border-[#1E293B] bg-[#090D18]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(34,211,238,0.08),_transparent_55%)]"
          />
          <div className="relative max-w-[1380px] mx-auto px-6 py-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#94A3B8]">
                <span className="text-[#22D3EE]">ROBERT SILHOL</span>
                <span aria-hidden="true">·</span>
                <span>“YES?” (ALIEN, TRUST &amp; DESTRUCTION)</span>
                <span aria-hidden="true">·</span>
                <span>27 SIGNAL NODES · 6 SECTORS</span>
              </div>
              <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#F8FAFC] text-balance">
                Associative Constellation for “YES?”
              </h1>
            </div>

            <div className="flex items-center gap-6 text-xs text-[#94A3B8] tabular-nums shrink-0">
              <div>
                <div className="text-[#64748B]">Signals</div>
                <div className="font-mono text-base font-medium text-[#F8FAFC]">
                  27
                </div>
              </div>
              <div className="h-7 w-px bg-[#1E293B]" aria-hidden="true" />
              <div>
                <div className="text-[#64748B]">Visible Reach</div>
                <div className="font-mono text-base font-medium text-[#22D3EE]">
                  {formatFollowerTotal(totalVisibleReachAll)}
                </div>
              </div>
              <div className="h-7 w-px bg-[#1E293B]" aria-hidden="true" />
              <div>
                <div className="text-[#64748B]">Sectors</div>
                <div className="font-mono text-base font-medium text-[#F8FAFC]">
                  6
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Associative Map Workspace */}
        <section id="map-workspace" className="max-w-[1380px] mx-auto px-6 py-8 space-y-6">
          {/* Map Filter Bar */}
          <div className="bg-[#0B101D] border border-[#1E293B] rounded-lg p-4 space-y-3.5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Highlight node by @handle, topic, or angle..."
                  aria-label="Filter map nodes"
                  className="w-full pl-10 pr-8 py-2 text-sm bg-[#060911] border border-[#1E293B] rounded-md text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none focus:border-[#22D3EE] transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#64748B] hover:text-[#F8FAFC] cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Motif & Audience Selects */}
              <div className="flex flex-wrap items-center gap-3">
                <label className="inline-flex items-center gap-2 text-xs text-[#94A3B8]">
                  <span>Bridge</span>
                  <select
                    value={selectedMotif}
                    onChange={(e) =>
                      setSelectedMotif(e.target.value as ThematicMotif | 'All')
                    }
                    className="px-2.5 py-1.5 text-xs bg-[#060911] border border-[#1E293B] rounded-md text-[#F1F5F9] focus:outline-none focus:border-[#22D3EE]"
                  >
                    <option value="All">All Thematic Bridges</option>
                    {THEMATIC_MOTIFS.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.title}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="inline-flex items-center gap-2 text-xs text-[#94A3B8]">
                  <span>Followers</span>
                  <select
                    value={audienceTier}
                    onChange={(e) => setAudienceTier(e.target.value as AudienceTier)}
                    className="px-2.5 py-1.5 text-xs bg-[#060911] border border-[#1E293B] rounded-md text-[#F1F5F9] focus:outline-none focus:border-[#22D3EE]"
                  >
                    <option value="all">All Sizes</option>
                    <option value="micro">Micro (&lt; 3K)</option>
                    <option value="mid">Mid (3K – 15K)</option>
                    <option value="macro">Macro (15K+)</option>
                    <option value="unlisted">Count Not Visible</option>
                  </select>
                </label>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-[#22D3EE] hover:underline cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Discipline Cluster Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#1E293B]">
              <button
                type="button"
                onClick={() => setSelectedArea('All')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors cursor-pointer whitespace-nowrap tabular-nums ${
                  selectedArea === 'All'
                    ? 'bg-[#22D3EE] text-[#041019] border-[#22D3EE] font-semibold'
                    : 'bg-[#060911] text-[#94A3B8] border-[#1E293B] hover:text-[#F8FAFC] hover:border-[#334155]'
                }`}
              >
                All Sectors (27)
              </button>
              {AREAS.map((area) => {
                const active = selectedArea === area.id;
                return (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => setSelectedArea(active ? 'All' : area.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors cursor-pointer whitespace-nowrap tabular-nums ${
                      active
                        ? 'bg-[#22D3EE]/15 text-[#22D3EE] border-[#22D3EE]'
                        : 'bg-[#060911] text-[#94A3B8] border-[#1E293B] hover:text-[#F8FAFC] hover:border-[#334155]'
                    }`}
                  >
                    {area.shortLabel} ({area.count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2-Column Split: Associative Map + Live Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8">
              <AssociativeGraph
                filteredInfluencers={filteredInfluencers}
                selectedArea={selectedArea}
                selectedInfluencer={selectedInfluencer}
                onSelectArea={setSelectedArea}
                onSelectInfluencer={handleSelectInfluencer}
                shortlistIds={shortlistIds}
              />
            </div>

            <div className="lg:col-span-4 lg:sticky lg:top-20">
              <InspectorPanel
                selectedInfluencer={selectedInfluencer}
                selectedArea={selectedArea}
                selectedMotif={selectedMotif}
                isShortlisted={
                  selectedInfluencer ? shortlistIds.has(selectedInfluencer.id) : false
                }
                onSelectInfluencer={handleSelectInfluencer}
                onSelectArea={setSelectedArea}
                onSelectMotif={setSelectedMotif}
                onToggleShortlist={toggleShortlist}
              />
            </div>
          </div>
        </section>
      </main>

      <ShortlistDrawer
        isOpen={isShortlistOpen}
        onClose={() => setIsShortlistOpen(false)}
        shortlistedInfluencers={shortlistedInfluencers}
        onRemove={(id) => toggleShortlist(id)}
        onClearAll={() => setShortlistIds(new Set())}
        onSelectInfluencer={(inf) => handleSelectInfluencer(inf)}
        onExportCsv={exportCsv}
      />
    </div>
  );
}
