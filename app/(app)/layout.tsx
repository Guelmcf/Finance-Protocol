  import { NavBarProvider } from "./components/navBarProvider";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>

      <NavBarProvider>
        {children}
      </NavBarProvider>
    </>
  );
}