  import { SideBarProvider } from "./components/sideBarProvider";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>

      <SideBarProvider>
        {children}
      </SideBarProvider>
    </>
  );
}