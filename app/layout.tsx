import "./globals.css";

export const metadata = {
  title: "MotionAI Studio",
  description: "AI motion graphics presentation generator"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
