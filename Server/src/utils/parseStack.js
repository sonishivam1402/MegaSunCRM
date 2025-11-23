export function parseErrorStack(stack) {
  if (!stack) return {};

  const lines = stack.split("\n").slice(1); // skip error message line

  for (const line of lines) {
    // Ignore internal Node & node_modules stack frames
    if (
      line.includes("node_modules") ||
      line.includes("node:internal") ||
      line.includes("(internal")
    ) {
      continue;
    }

    // Case 1 — function + ESM file path + line + column
    let match = line.match(/\s+at\s+(.*?)\s+\((file:\/\/\/.*):(\d+):(\d+)\)/);
    if (match) {
      return {
        MethodName: match[1] || null,
        FilePath: match[2].replace("file:///", ""), // remove file:///
        LineNumber: Number(match[3]) || null,
      };
    }

    // Case 2 — function + normal path (CommonJS style)
    match = line.match(/\s+at\s+(.*?)\s+\((.*):(\d+):(\d+)\)/);
    if (match) {
      return {
        MethodName: match[1] || null,
        FilePath: match[2],
        LineNumber: Number(match[3]) || null,
      };
    }

    // Case 3 — anonymous file path
    match = line.match(/\s+at\s+(file:\/\/\/.*):(\d+):(\d+)/);
    if (match) {
      return {
        MethodName: null,
        FilePath: match[1].replace("file:///", ""),
        LineNumber: Number(match[2]) || null,
      };
    }

    // Case 4 — normal path without file:///
    match = line.match(/\s+at\s+(.*):(\d+):(\d+)/);
    if (match) {
      return {
        MethodName: null,
        FilePath: match[1],
        LineNumber: Number(match[2]) || null,
      };
    }
  }

  return {};
}
