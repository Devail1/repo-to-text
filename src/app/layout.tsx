import './globals.css';

import QueryProvider from './providers/QueryProvider';

export const metadata = {
  title: 'Repo to Text',
  description: 'A web app to select and process files from GitHub repositories',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
