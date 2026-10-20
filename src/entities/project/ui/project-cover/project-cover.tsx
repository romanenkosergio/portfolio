import type { FC } from "react";

import { COVER_HEIGHT, COVER_WIDTH, coverOf } from "@/entities/project/lib";

import type { IProjectCoverProps } from "./project-cover.types";

// Abstract art drawn from the slug: soft glows and thin strokes in palette colours. Never a
// capture of real UI (D16).
const ProjectCover: FC<IProjectCoverProps> = ({ slug, className }) => {
  const { glows, lines } = coverOf(slug);

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${COVER_WIDTH} ${COVER_HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      <defs>
        {glows.map((glow, index) => (
          <radialGradient key={index} id={`${slug}-glow-${index}`}>
            <stop offset="0" stopColor={glow.color} stopOpacity="0.55" />
            <stop offset="1" stopColor={glow.color} stopOpacity="0" />
          </radialGradient>
        ))}
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
      {lines.map((line, index) => (
        <rect
          key={index}
          x={line.x}
          y={line.y}
          width={line.length}
          height="1.5"
          rx="0.75"
          fill={line.color}
          opacity="0.45"
          transform={`rotate(${line.angle} ${line.x} ${line.y})`}
        />
      ))}
    </svg>
  );
};

export default ProjectCover;
