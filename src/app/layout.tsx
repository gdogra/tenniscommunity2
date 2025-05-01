// src/app/layout.tsx
export const metadata = {
  title: "Tennis Community",
  description: "…",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* You can add any <meta> or <link> tags here */}
      </head>
      <body>{children}</body>
    </html>
  );
}

