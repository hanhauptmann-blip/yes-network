import React, { useMemo, useState } from 'react';
import {
  AREAS,
  DisciplineArea,
  INFLUENCERS,
  Influencer,
} from '../data/influencers';

interface AssociativeGraphProps {
  filteredInfluencers: Influencer[];
  selectedArea: DisciplineArea | 'All';
  selectedInfluencer: Influencer | null;
  onSelectArea: (area: DisciplineArea | 'All') => void;
  onSelectInfluencer: (influencer: Influencer) => void;
  shortlistIds: Set<string>;
}

const AREA_COLORS: Record<DisciplineArea, string> = {
  'Mystery / Thriller / Conspiracy': '#38BDF8',
  'Science-fiction': '#2DD4BF',
  'Astronomy / Space / Alien': '#818CF8',
  Philosophy: '#FBBF24',
  Psychology: '#C084FC',
  Bookstagram: '#FB7185',
};

// Deterministic pseudo-random generator for clean deep-space starfield
function seededStar(index: number) {
  const s1 = Math.sin(index * 12.9898 + 78.233) * 43758.5453;
  const s2 = Math.sin(index * 93.9898 + 19.133) * 24634.6345;
  const s3 = Math.sin(index * 45.164 + 31.719) * 19384.1234;
  return {
    x: (s1 - Math.floor(s1)) * 1080,
    y: (s2 - Math.floor(s2)) * 740,
    r: 0.55 + (s3 - Math.floor(s3)) * 0.95,
    opacity: 0.16 + ((s1 - Math.floor(s1)) * 0.42),
  };
}

const STARFIELD = Array.from({ length: 85 }, (_, idx) => seededStar(idx + 1));

export const AssociativeGraph: React.FC<AssociativeGraphProps> = ({
  filteredInfluencers,
  selectedArea,
  selectedInfluencer,
  onSelectArea,
  onSelectInfluencer,
  shortlistIds,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [showCrossLinks, setShowCrossLinks] = useState(true);

  const visibleIds = useMemo(
    () => new Set(filteredInfluencers.map((i) => i.id)),
    [filteredInfluencers]
  );

  const layout = useMemo(() => {
    const cx = 540;
    const cy = 370;
    const hubRadius = 165;

    const areaAngles: Record<DisciplineArea, number> = {
      'Mystery / Thriller / Conspiracy': -Math.PI / 2,
      'Science-fiction': -Math.PI / 6,
      'Astronomy / Space / Alien': Math.PI / 6,
      Philosophy: Math.PI / 2,
      Psychology: (5 * Math.PI) / 6,
      Bookstagram: -(5 * Math.PI) / 6,
    };

    const hubs = AREAS.map((area) => {
      const angle = areaAngles[area.id];
      return {
        ...area,
        angle,
        x: cx + Math.cos(angle) * hubRadius,
        y: cy + Math.sin(angle) * hubRadius,
      };
    });

    const nodePositions: Record<
      string,
      { x: number; y: number; influencer: Influencer; hubX: number; hubY: number }
    > = {};

    AREAS.forEach((area) => {
      const members = INFLUENCERS.filter((i) => i.area === area.id);
      const baseAngle = areaAngles[area.id];
      const hubX = cx + Math.cos(baseAngle) * hubRadius;
      const hubY = cy + Math.sin(baseAngle) * hubRadius;
      const spread = members.length >= 5 ? 0.54 : 0.46;

      members.forEach((inf, idx) => {
        const offset =
          members.length === 1
            ? 0
            : (idx / (members.length - 1) - 0.5) * spread;
        const theta = baseAngle + offset;
        const rJitter = idx % 2 === 0 ? 295 : 238;
        nodePositions[inf.id] = {
          x: cx + Math.cos(theta) * rJitter,
          y: cy + Math.sin(theta) * rJitter,
          influencer: inf,
          hubX,
          hubY,
        };
      });
    });

    const crossEdges: { source: string; target: string }[] = [];
    const seen = new Set<string>();
    INFLUENCERS.forEach((inf) => {
      inf.connectedIds.forEach((targetId) => {
        const key = [inf.id, targetId].sort().join('--');
        if (!seen.has(key) && nodePositions[targetId]) {
          seen.add(key);
          crossEdges.push({ source: inf.id, target: targetId });
        }
      });
    });

    return { cx, cy, hubs, nodePositions, crossEdges };
  }, []);

  const focusId = hoveredId ?? selectedInfluencer?.id ?? null;

  const focusPeers = useMemo(() => {
    if (!focusId) return new Set<string>();
    const target = INFLUENCERS.find((i) => i.id === focusId);
    if (!target) return new Set<string>();
    return new Set([target.id, ...target.connectedIds]);
  }, [focusId]);

  const previewInfluencer =
    (hoveredId ? INFLUENCERS.find((i) => i.id === hoveredId) : null) ??
    selectedInfluencer;

  const orbitalBearings = [0, 60, 120, 180, 240, 300];

  return (
    <div className="bg-[#080C16] border border-[#1E293B] rounded-lg overflow-hidden flex flex-col">
      {/* Graph Toolbar */}
      <div className="px-5 py-3.5 border-b border-[#1E293B] flex flex-wrap items-center justify-between gap-3 bg-[#0B101D]">
        <div className="text-xs text-[#94A3B8]">
          Showing{' '}
          <span className="font-mono font-medium text-[#F8FAFC] tabular-nums">
            {filteredInfluencers.length}
          </span>{' '}
          of 27 signal nodes · Select any star point to inspect contact rationale
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowCrossLinks((prev) => !prev)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors cursor-pointer whitespace-nowrap ${
              showCrossLinks
                ? 'bg-[#22D3EE]/15 text-[#22D3EE] border-[#22D3EE]/40 hover:bg-[#22D3EE]/25'
                : 'bg-[#080C16] text-[#94A3B8] border-[#1E293B] hover:text-[#F8FAFC]'
            }`}
          >
            {showCrossLinks ? 'Hide Thematic Bridges' : 'Show Thematic Bridges'}
          </button>
          {selectedArea !== 'All' && (
            <button
              type="button"
              onClick={() => onSelectArea('All')}
              className="px-3 py-1.5 text-xs font-medium rounded-md border border-[#1E293B] bg-[#080C16] text-[#22D3EE] hover:border-[#22D3EE]/50 transition-colors cursor-pointer whitespace-nowrap"
            >
              Reset Sector
            </button>
          )}
        </div>
      </div>

      {/* Deep Space Constellation SVG Canvas */}
      <div className="relative w-full overflow-x-auto bg-[#060911]">
        <div className="min-w-[740px]">
          <svg
            viewBox="0 0 1080 740"
            className="w-full h-auto block select-none cursor-crosshair"
            role="img"
            aria-label="Deep space associative constellation linking YES? by Robert Silhol to 6 thematic sectors and 27 influencers"
          >
            <defs>
              <radialGradient id="beaconCorona" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.28" />
                <stop offset="45%" stopColor="#0EA5E9" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#060911" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="nebulaWash" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1E1B4B" stopOpacity="0.28" />
                <stop offset="60%" stopColor="#082F49" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#060911" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Subtle cosmic ambient nebula backdrop */}
            <circle cx={layout.cx} cy={layout.cy} r={390} fill="url(#nebulaWash)" />
            <circle cx={layout.cx} cy={layout.cy} r={145} fill="url(#beaconCorona)" />

            {/* Deterministic deep-space starfield */}
            {STARFIELD.map((star, idx) => (
              <circle
                key={`star-${idx}`}
                cx={star.x}
                cy={star.y}
                r={star.r}
                fill="#E2E8F0"
                opacity={star.opacity}
              />
            ))}

            {/* Coordinate Crosshairs */}
            <line
              x1={layout.cx - 340}
              y1={layout.cy}
              x2={layout.cx + 340}
              y2={layout.cy}
              stroke="#162033"
              strokeWidth={0.75}
              strokeDasharray="2 6"
            />
            <line
              x1={layout.cx}
              y1={layout.cy - 335}
              x2={layout.cx}
              y2={layout.cy + 335}
              stroke="#162033"
              strokeWidth={0.75}
              strokeDasharray="2 6"
            />

            {/* Concentric Orbital Rings */}
            <circle
              cx={layout.cx}
              cy={layout.cy}
              r={95}
              fill="none"
              stroke="#162238"
              strokeWidth={0.8}
              strokeDasharray="2 4"
            />
            <circle
              cx={layout.cx}
              cy={layout.cy}
              r={165}
              fill="none"
              stroke="#1E293B"
              strokeDasharray="4 4"
            />
            <circle
              cx={layout.cx}
              cy={layout.cy}
              r={268}
              fill="none"
              stroke="#162033"
            />
            <circle
              cx={layout.cx}
              cy={layout.cy}
              r={332}
              fill="none"
              stroke="#131C2E"
              strokeDasharray="1 5"
            />

            {/* Orbital Azimuth Bearings */}
            {orbitalBearings.map((deg) => {
              const rad = ((deg - 90) * Math.PI) / 180;
              const rx = layout.cx + Math.cos(rad) * 346;
              const ry = layout.cy + Math.sin(rad) * 346;
              return (
                <text
                  key={`deg-${deg}`}
                  x={rx}
                  y={ry + 3}
                  textAnchor="middle"
                  fill="#475569"
                  fontSize="9"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {String(deg).padStart(3, '0')}°
                </text>
              );
            })}

            {/* Center to Hub trajectory vectors */}
            {layout.hubs.map((hub) => {
              const isActive =
                selectedArea === 'All' || selectedArea === hub.id;
              return (
                <line
                  key={`spoke-${hub.id}`}
                  x1={layout.cx}
                  y1={layout.cy}
                  x2={hub.x}
                  y2={hub.y}
                  stroke={isActive ? AREA_COLORS[hub.id] : '#1E293B'}
                  strokeWidth={isActive ? 1.4 : 0.9}
                  strokeOpacity={isActive ? 0.55 : 0.35}
                />
              );
            })}

            {/* Cross-disciplinary associative arcs */}
            {showCrossLinks &&
              layout.crossEdges.map(({ source, target }) => {
                const p1 = layout.nodePositions[source];
                const p2 = layout.nodePositions[target];
                const bothVisible = visibleIds.has(source) && visibleIds.has(target);
                const isHighlighted =
                  focusId !== null && (source === focusId || target === focusId);

                if (!bothVisible && !isHighlighted) return null;

                return (
                  <path
                    key={`cross-${source}-${target}`}
                    d={`M ${p1.x} ${p1.y} Q ${layout.cx} ${layout.cy} ${p2.x} ${p2.y}`}
                    fill="none"
                    stroke={isHighlighted ? '#22D3EE' : '#334155'}
                    strokeWidth={isHighlighted ? 1.85 : 0.85}
                    strokeOpacity={
                      focusId ? (isHighlighted ? 0.92 : 0.08) : 0.45
                    }
                    strokeDasharray={isHighlighted ? undefined : '3 4'}
                  />
                );
              })}

            {/* Hub to Influencer trajectory lines */}
            {Object.values(layout.nodePositions).map(
              ({ x, y, influencer, hubX, hubY }) => {
                const isVisible = visibleIds.has(influencer.id);
                const isPeer = focusId ? focusPeers.has(influencer.id) : true;
                const areaColor = AREA_COLORS[influencer.area];

                return (
                  <line
                    key={`edge-${influencer.id}`}
                    x1={hubX}
                    y1={hubY}
                    x2={x}
                    y2={y}
                    stroke={isVisible ? areaColor : '#1E293B'}
                    strokeWidth={focusId === influencer.id ? 1.8 : 0.95}
                    strokeOpacity={!isVisible ? 0.1 : isPeer ? 0.58 : 0.12}
                  />
                );
              }
            )}

            {/* Center Node: YES? Alien Contact Anomaly */}
            <g>
              <circle
                cx={layout.cx}
                cy={layout.cy}
                r={54}
                fill="none"
                stroke="#22D3EE"
                strokeWidth={0.75}
                strokeOpacity={0.35}
                strokeDasharray="3 3"
              />
              <circle
                cx={layout.cx}
                cy={layout.cy}
                r={46}
                fill="#0B1324"
                stroke="#22D3EE"
                strokeWidth={1.75}
              />
              <text
                x={layout.cx}
                y={layout.cy - 4}
                textAnchor="middle"
                fill="#F8FAFC"
                fontSize="17"
                fontFamily="Fraunces, Georgia, serif"
                fontWeight="600"
              >
                “YES?”
              </text>
              <text
                x={layout.cx}
                y={layout.cy + 14}
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="9.5"
                fontFamily="JetBrains Mono, monospace"
                letterSpacing="0.04em"
              >
                ROBERT SILHOL
              </text>
            </g>

            {/* 6 Sector Hub Stations */}
            {layout.hubs.map((hub) => {
              const isSelected = selectedArea === hub.id;
              const isDimmed = selectedArea !== 'All' && !isSelected;
              const color = AREA_COLORS[hub.id];

              return (
                <g
                  key={`hub-${hub.id}`}
                  onClick={() => onSelectArea(isSelected ? 'All' : hub.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <rect
                    x={hub.x - 70}
                    y={hub.y - 16}
                    width={140}
                    height={32}
                    rx={6}
                    fill={isSelected ? color : '#0D1425'}
                    stroke={color}
                    strokeWidth={isSelected ? 2 : 1.2}
                    strokeOpacity={isDimmed ? 0.35 : 0.9}
                    opacity={isDimmed ? 0.45 : 1}
                  />
                  <text
                    x={hub.x}
                    y={hub.y + 4}
                    textAnchor="middle"
                    fill={isSelected ? '#041019' : '#F1F5F9'}
                    fontSize="10.5"
                    fontWeight="600"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    opacity={isDimmed ? 0.5 : 1}
                  >
                    {hub.shortLabel} ({hub.count})
                  </text>
                </g>
              );
            })}

            {/* 27 Influencer Star / Signal Nodes */}
            {Object.values(layout.nodePositions).map(({ x, y, influencer }) => {
              const isVisible = visibleIds.has(influencer.id);
              const isSelected = selectedInfluencer?.id === influencer.id;
              const isHovered = hoveredId === influencer.id;
              const isPeer = focusId ? focusPeers.has(influencer.id) : false;
              const isShortlisted = shortlistIds.has(influencer.id);
              const color = AREA_COLORS[influencer.area];

              const count = influencer.followersCount ?? 1500;
              const r =
                count >= 30000
                  ? 9.5
                  : count >= 10000
                  ? 8
                  : count >= 3000
                  ? 6.8
                  : 5.5;

              const labelAnchor =
                x > layout.cx + 15
                  ? 'start'
                  : x < layout.cx - 15
                  ? 'end'
                  : 'middle';
              const labelDx =
                labelAnchor === 'start'
                  ? r + 8
                  : labelAnchor === 'end'
                  ? -(r + 8)
                  : 0;
              const labelDy =
                labelAnchor === 'middle'
                  ? y < layout.cy
                    ? -(r + 10)
                    : r + 15
                  : 3.5;

              const dimmed = !isVisible || (focusId !== null && !isPeer);

              return (
                <g
                  key={`node-${influencer.id}`}
                  onMouseEnter={() => setHoveredId(influencer.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => onSelectInfluencer(influencer)}
                  style={{ cursor: 'pointer' }}
                  opacity={dimmed ? 0.2 : 1}
                >
                  {/* Selection / active orbit ring */}
                  {(isSelected || isHovered) && (
                    <circle
                      cx={x}
                      cy={y}
                      r={r + 6.5}
                      fill="none"
                      stroke="#22D3EE"
                      strokeWidth={1.5}
                      strokeDasharray={isSelected ? undefined : '3 2'}
                      strokeOpacity={0.85}
                    />
                  )}

                  {/* Outer subtle star halo */}
                  <circle
                    cx={x}
                    cy={y}
                    r={r + 2.5}
                    fill={isSelected ? '#22D3EE' : color}
                    opacity={isSelected || isHovered ? 0.28 : 0.12}
                  />

                  <circle
                    cx={x}
                    cy={y}
                    r={isHovered || isSelected ? r + 2 : r}
                    fill={
                      isSelected
                        ? '#22D3EE'
                        : isShortlisted
                        ? '#22D3EE'
                        : isHovered || isPeer
                        ? color
                        : '#080C16'
                    }
                    stroke={isSelected || isShortlisted ? '#22D3EE' : color}
                    strokeWidth={isSelected || isShortlisted || isHovered ? 2.2 : 1.6}
                  />

                  <text
                    x={x + labelDx}
                    y={y + labelDy}
                    textAnchor={labelAnchor}
                    fill={
                      isSelected || isHovered
                        ? '#22D3EE'
                        : isPeer
                        ? '#F8FAFC'
                        : '#CBD5E1'
                    }
                    fontSize={isSelected || isHovered ? '11.5' : '10.5'}
                    fontWeight={isSelected || isHovered || isShortlisted ? '700' : '500'}
                    letterSpacing="0.01em"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                  >
                    {influencer.handle}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Bottom Telemetry Strip */}
      <div className="px-5 py-3 border-t border-[#1E293B] bg-[#0B101D] flex flex-wrap items-center justify-between gap-3 text-xs">
        {previewInfluencer ? (
          <div className="flex flex-wrap items-center gap-2 min-w-0">
            <span className="font-semibold text-[#22D3EE]">
              {previewInfluencer.handle}
            </span>
            <span aria-hidden="true" className="text-[#475569]">
              ·
            </span>
            <span className="font-mono text-[#F8FAFC] tabular-nums">
              {previewInfluencer.followersDisplay}
            </span>
            <span aria-hidden="true" className="text-[#475569]">
              ·
            </span>
            <span className="text-[#94A3B8] truncate max-w-md">
              {previewInfluencer.whoTheyAre}
            </span>
          </div>
        ) : (
          <div className="text-[#94A3B8]">
            Node diameter scales with audience size · Dashed orbital trajectories indicate shared thematic bridges across disciplines
          </div>
        )}
      </div>
    </div>
  );
};
