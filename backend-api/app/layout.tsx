export const metadata = {
  title: "OPSC7312-Backend",
  description: "Created by Charles Rossouw (Joel Shaduka)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
