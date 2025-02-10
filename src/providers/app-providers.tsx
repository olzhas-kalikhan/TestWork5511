import QueryClientProvider from "./query-client-provider";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <QueryClientProvider>{children}</QueryClientProvider>;
}
