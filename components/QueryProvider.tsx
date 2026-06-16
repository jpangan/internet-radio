"use client";

import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { trackError } from "@/lib/analytics";

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
        queryCache: new QueryCache({
          onError: (error, query) => {
            trackError(error.message, {
              type: "api_error",
              query_key: JSON.stringify(query.queryKey),
            });
          },
        }),
      })
  );
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
