import type { Config, State } from "#types/graph.types.js";

const applyReplace = ({
  originalHtml,
  html,
}: {
  originalHtml: string;
  html: string;
}) => {
  return html;
};

const applyUpdate = ({
  originalHtml,
  startIndex,
  endIndex,
  html,
}: {
  originalHtml: string;
  startIndex: number;
  endIndex: number;
  html: string;
}) => {
  return (
    originalHtml.slice(0, startIndex) + html + originalHtml.slice(endIndex)
  );
};

const applyInsert = ({
  originalHtml,
  startIndex,
  html,
}: {
  originalHtml: string;
  startIndex: number;
  html: string;
}) => {
  return (
    originalHtml.slice(0, startIndex) + html + originalHtml.slice(startIndex)
  );
};

const applyDelete = ({
  originalHtml,
  startIndex,
  endIndex,
}: {
  originalHtml: string;
  startIndex: number;
  endIndex: number;
}) => {
  return originalHtml.slice(0, startIndex) + originalHtml.slice(endIndex);
};

const applyAppend = ({
  originalHtml,
  html,
}: {
  originalHtml: string;
  html: string;
}) => {
  return originalHtml + html;
};

const patchNode = async (state: State, _config: Config) => {
  const pageResponse = state.pageResponse;

  if (!pageResponse) {
    return {
      error: "Missing page response.",
    };
  }

  const { operation, startIndex, endIndex, html } = pageResponse;

  const originalHtml = state.resourceContent || "<p><br></p>";

  let updatedHtml = originalHtml;

  switch (operation) {
    case "replace":
      updatedHtml = applyReplace({
        originalHtml,
        html,
      });

      break;

    case "update":
      if (startIndex === undefined || endIndex === undefined) {
        return {
          error: "Update operation requires indexes.",
        };
      }

      updatedHtml = applyUpdate({
        originalHtml,
        startIndex,
        endIndex,
        html,
      });

      break;

    case "insert":
      if (startIndex === undefined) {
        return {
          error: "Insert operation requires startIndex.",
        };
      }

      updatedHtml = applyInsert({
        originalHtml,
        startIndex,
        html,
      });

      break;

    case "delete":
      if (startIndex === undefined || endIndex === undefined) {
        return {
          error: "Delete operation requires indexes.",
        };
      }

      updatedHtml = applyDelete({
        originalHtml,
        startIndex,
        endIndex,
      });

      break;

    case "append":
      updatedHtml = applyAppend({
        originalHtml,
        html,
      });

      break;

    default:
      return {
        error: "Unsupported operation.",
      };
  }

  return {
    resourceContent: updatedHtml,
  };
};

export default patchNode;
