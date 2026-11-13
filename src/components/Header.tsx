import React from 'react';

interface HeaderProps {
  shortlistCount: number;
  onOpenShortlist: () => void;
  onResetMap: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  shortlistCount,
  onOpenShortlist,
  onResetMap,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#060911]/90 backdrop-blur-md border-b border-[#1E293B]">
      <div className="max-w-[1380px] mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          className="font-serif text-xl font-medium tracking-tight text-[#F8FAFC] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] rounded-sm"
        >
          YES? Network
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#94A3B8]">
          <a
            href="#map-workspace"
            className="hover:text-[#F8FAFC] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Associative Map
          </a>
          <button
            type="button"
            onClick={onResetMap}
            className="hover:text-[#F8FAFC] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Reset Filters
          </button>
          <a
            href="/assets/aistudio/YES-influencer-overview-v2-076e3afc_ae639314.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#F8FAFC] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Overview PDF
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenShortlist}
            className="px-4 py-2 text-xs font-semibold text-[#041019] bg-[#22D3EE] hover:bg-[#67E8F9] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060911]"
          >
            Shortlist ({shortlistCount})
          </button>
        </div>
      </div>
    </header>
  );
};
