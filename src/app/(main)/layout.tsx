export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header>
        <h1>hi</h1>
      </header>
      <main className="flex-1">{children}</main>
      <footer>hi</footer>
    </div>
  );
}
