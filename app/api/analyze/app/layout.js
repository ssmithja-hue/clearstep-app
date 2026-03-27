export const metadata = {
  title: "ClearStep",
  description: "AI problem solver"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
