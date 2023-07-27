import React from "react";
import Weather from "./component/pages/weather";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Weather />
      </QueryClientProvider>
    </>
  );
}

export default App;
