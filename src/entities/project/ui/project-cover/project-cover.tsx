import type { FC } from "react";

import { COVER_HEIGHT, COVER_WIDTH, coverOf } from "@/entities/project/lib";

import type { IProjectCoverProps } from "./project-cover.types";

const RING_RADII = [30, 56, 82, 108] as const;
const PATTERN_COUNT = 4;

interface IPatternProps {
  id: string;
  variant: number;
  accent: string;
}

// Tiles for the first three variants. Plain rects: the card hover drifts the glows' circles only.
const Tile: FC<IPatternProps> = ({ id, variant, accent }) => {
  if (variant === 0) {
    return (
      <pattern id={id} width="14" height="14" patternUnits="userSpaceOnUse">
        <rect x="6" y="6" width="2" height="2" rx="1" fill={accent} />
      </pattern>
    );
  }
  if (variant === 1) {
    return (
      <pattern
        id={id}
        width="12"
        height="12"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)"
      >
        <rect width="1.5" height="12" fill={accent} />
      </pattern>
    );
  }
  return (
    <pattern id={id} width="24" height="24" patternUnits="userSpaceOnUse">
      <rect width="24" height="1" fill={accent} />
      <rect width="1" height="24" fill={accent} />
    </pattern>
  );
};

const Rings: FC<{ accent: string }> = ({ accent }) => (
  <g fill="none" stroke={accent} strokeWidth="1" opacity="0.3">
    {RING_RADII.map(radius => (
      <ellipse
        key={radius}
        cx={COVER_WIDTH * 0.78}
        cy={COVER_HEIGHT / 2}
        rx={radius}
        ry={radius}
      />
    ))}
  </g>
);

// Abstract art generated per project: glows seeded by the slug, the main tech's colour, and one
// of four patterns. Palette colours only; never a capture of real UI (D16).
const ProjectCover: FC<IProjectCoverProps> = ({
  slug,
  accent,
  variant,
  className
}) => {
  const { glows } = coverOf(slug);
  const pattern = variant % PATTERN_COUNT;
  const patternId = `${slug}-pattern`;

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${COVER_WIDTH} ${COVER_HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      <defs>
        {glows.map((glow, index) => {
          const color = index === 0 ? accent : glow.color;
          return (
            <radialGradient key={index} id={`${slug}-glow-${index}`}>
              <stop offset="0" stopColor={color} stopOpacity="0.55" />
              <stop offset="1" stopColor={color} stopOpacity="0" />
            </radialGradient>
          );
        })}
        {pattern < 3 && (
          <Tile id={patternId} variant={pattern} accent={accent} />
        )}
      </defs>
      <rect
        width={COVER_WIDTH}
        height={COVER_HEIGHT}
        fill="var(--color-primary-6)"
      />
      {glows.map((glow, index) => (
        <circle
          key={index}
          cx={glow.cx}
          cy={glow.cy}
          r={glow.r}
          fill={`url(#${slug}-glow-${index})`}
        />
      ))}
      {pattern < 3 ? (
        <rect
          width={COVER_WIDTH}
          height={COVER_HEIGHT}
          fill={`url(#${patternId})`}
          opacity="0.22"
        />
      ) : (
        <Rings accent={accent} />
      )}
    </svg>
  );
};

export default ProjectCover;
