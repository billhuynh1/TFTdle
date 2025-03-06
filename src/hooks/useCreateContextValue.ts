import { useMemo } from "react";

// Custome hook for creating context value, unfinished
function useCreateContextValue<T>(value: T, dependencies: any[]): T {
  return useMemo(() => value, []);
}

export default useCreateContextValue;
