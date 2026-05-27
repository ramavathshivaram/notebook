import { toPng } from "html-to-image";

export const download = async (title, downloading, setDownloading) => {
  if (downloading) return;

  setDownloading(true);

  try {
    const editorNode = document.querySelector(".ql-editor");

    if (!editorNode) {
      throw new Error("Editor not found");
    }

    const prevBg = editorNode.style.background;

    const prevColor = editorNode.style.color;

    editorNode.style.background = "#ffffff";

    editorNode.style.color = "#000000";

    await new Promise((r) => setTimeout(r, 150));

    const dataUrl = await toPng(editorNode, {
      cacheBust: true,
      backgroundColor: "#ffffff",
      pixelRatio: 3,
    });

    const link = document.createElement("a");

    link.download = `${title || "note"}.png`;

    link.href = dataUrl;

    link.click();

    editorNode.style.background = prevBg;

    editorNode.style.color = prevColor;
  } catch (error) {
    console.error(error);
  } finally {
    setDownloading(false);
  }
};
