"use client";

import {
  QueryClient,
  QueryClientProvider as _QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
    },
  },
});

export default function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <_QueryClientProvider client={queryClient}>{children}</_QueryClientProvider>
  );
}
