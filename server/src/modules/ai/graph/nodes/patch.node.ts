import type { Config, State } from "#types/graph.types.js";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const validateRange = (
  startIndex: number,
  endIndex: number,
  htmlLength: number,
) => {
  if (startIndex < 0 || endIndex < 0) {
    return "Indexes cannot be negative.";
  }

  if (startIndex > endIndex) {
    return "startIndex must be <= endIndex.";
  }

  if (endIndex > htmlLength) {
    return "Index exceeds document length.";
  }

  return null;
};

const patchNode = async (state: State, _config: Config) => {
  const pageResponse = state.pageResponse;

  if (!pageResponse) {
    return { error: "Missing page response." };
  }

  const originalHtml = state.resourceContent || "<p><br></p>";

  const { operation, startIndex, endIndex, html = "" } = pageResponse;

  let updatedHtml = originalHtml;

  switch (operation) {
    case "replace":
      updatedHtml = html;
      break;

    case "append":
      updatedHtml = originalHtml + html;
      break;

    case "insert":
      if (startIndex == null) {
        return { error: "Insert requires startIndex." };
      }

      if (startIndex < 0 || startIndex > originalHtml.length) {
        return { error: "Invalid insert index." };
      }

      updatedHtml =
        originalHtml.slice(0, startIndex) +
        html +
        originalHtml.slice(startIndex);

      break;

    case "update":
      if (startIndex == null || endIndex == null) {
        return { error: "Update requires indexes." };
      }

      {
        const error = validateRange(startIndex, endIndex, originalHtml.length);

        if (error) {
          return { error };
        }
      }

      updatedHtml =
        originalHtml.slice(0, startIndex) + html + originalHtml.slice(endIndex);

      break;

    case "delete":
      if (startIndex == null || endIndex == null) {
        return { error: "Delete requires indexes." };
      }

      {
        const error = validateRange(startIndex, endIndex, originalHtml.length);

        if (error) {
          return { error };
        }
      }

      updatedHtml =
        originalHtml.slice(0, startIndex) + originalHtml.slice(endIndex);

      break;

    default:
      return {
        error: `Unsupported operation: ${operation}`,
      };
  }

  return {
    updatedResourceContent: updatedHtml,
  };
};

export default patchNode;
