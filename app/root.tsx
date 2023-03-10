import React from 'react';

import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';

import qumuloStylesheetUrl from '~/styles/qumulo.css';
import rootStylesheetUrl from '~/styles/root.css';

import type { MetaFunction, LinksFunction } from '@remix-run/node';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: qumuloStylesheetUrl },
    { rel: 'stylesheet', href: rootStylesheetUrl }
  ];
};

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Qumulo Test',
  viewport: 'width=device-width,initial-scale=1',
  description: 'staging site for qumulo hw'
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
