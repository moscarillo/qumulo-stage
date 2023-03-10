import React from 'react';

import { Main } from '~/components';
import { Navigation } from '~/components';
import type { LinksFunction } from '@remix-run/node';

import mainStylesheetUrl from '~/styles/main.css';
import navStylesheetUrl from '~/styles/navigation.css';
import chartsStylesheetUrl from '~/styles/charts.css';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: mainStylesheetUrl },
    { rel: 'stylesheet', href: navStylesheetUrl },
    { rel: 'stylesheet', href: chartsStylesheetUrl }
  ];
};

export default function Index() {
  return (
    <div className="app-container">
      <Navigation content="performance-metrics" />
      <Main content="performance-metrics" />
    </div>
  );
}
