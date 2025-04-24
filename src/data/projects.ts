// src/data/projects.ts

export interface Project {
  slug: string;
  title: string;
  summary: string;
  tech?: string[];
  github?: string;
  quantconnect?: string; // ← NEW
  demo?: string;
  content: string;
}
  
  export const projects: Project[] = [
    {
      slug: 'levered-beta-trend',
      title: 'Levered Beta Trend Algorithm',
      summary: 'An intraday market-neutral strategy based on time-varying beta estimation.',
      tech: ['Python', 'Pandas', 'Alphalens'],
      github: 'https://github.com/yourusername/levered-beta',
      content: `
  ## Overview
  This strategy models intraday beta changes and adapts portfolio leverage accordingly.
  
  ## Approach
  - Beta computed using rolling regressions
  - Uses leverage to enhance return when signal is strong
  - Market neutrality ensured via beta-weighted spread
  
  ## Stack
  Python, Pandas, Alphalens
  
  ## Links
  [GitHub Repo](https://github.com/yourusername/levered-beta)
      `,
    },
    {
      slug: 'sector-arbitrage',
      title: 'Sector Statistical Arbitrage',
      summary: 'Pairs trading and sector convergence strategy using PCA and co-integration.',
      tech: ['Python', 'statsmodels', 'QuantConnect'],
      github: 'https://github.com/yourusername/sector-arb',
      content: `## Overview\n...`,
    },
    {
      slug: 'options-research',
      title: 'Options Chain Rate Research',
      summary: 'In-progress project on pricing microstructure and implied rate anomalies.',
      tech: ['Python', 'Options', 'LOBSTER'],
      content: `## Overview\n...`,
    },
  ];
  