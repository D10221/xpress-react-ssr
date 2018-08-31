

/** */
export function getErrorMessage(payload: string | Error | undefined) {
    return !payload
      ? payload
      : typeof payload === "string"
        ? payload
        : payload && payload.message
          ? payload.message
          : payload.toString();
  }
  