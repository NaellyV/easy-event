import './globals.css';

export const metadata = {
  title: "Event Manager",
  description: "Easy Event",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
