// Row of three flip cards (LeetCode / Codeforces / AtCoder). Clicking a card opens the profile.
import React from 'react';
import { stats } from '../../data/stats';
import { useLinkConfirm } from '../../context/LinkConfirm';
import StatCard from './StatCard';

export default function StatsBlock() {
  const requestLink = useLinkConfirm();
  return (
    <div className="mt-32 w-full max-w-7xl relative z-10 px-8 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 perspective-1000">
        {stats.map((s) => (
          <StatCard key={s.platform} stat={s} onOpen={() => requestLink(s.url, s.platform)} />
        ))}
      </div>
    </div>
  );
}
