const HIGHLIGHT_STYLE_ID = "__ext_highlight_style";

const ensureHighlightStyle = () => {
  if (document.getElementById(HIGHLIGHT_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = HIGHLIGHT_STYLE_ID;
  style.textContent = `
    .ext-highlight {
      background: rgba(34, 211, 238, 0.35);
      box-shadow: 0 0 0 1px rgba(34, 211, 238, 0.7);
      border-radius: 4px;
      padding: 0 2px;
      transition: box-shadow 160ms ease, background 160ms ease;
    }
    .ext-highlight:hover {
      box-shadow: 0 0 0 2px rgba(34, 211, 238, 0.9);
      background: rgba(34, 211, 238, 0.45);
    }
  `;
  document.head.appendChild(style);
};

const highlightSelection = () => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) {
    return { ok: false, message: "未选中文字" };
  }

  const text = selection.toString().trim();
  if (!text) {
    return { ok: false, message: "未选中文字" };
  }

  const range = selection.getRangeAt(0);
  const wrapper = document.createElement("span");
  wrapper.className = "ext-highlight";

  try {
    const contents = range.extractContents();
    wrapper.appendChild(contents);
    range.insertNode(wrapper);
    selection.removeAllRanges();
    return { ok: true, message: `已高亮：${text.slice(0, 40)}` };
  } catch (error) {
    return { ok: false, message: `无法高亮：${(error as Error).message}` };
  }
};

chrome.runtime.sendMessage({ type: "CONTENT_READY" });

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === "PING_FROM_POPUP") {
    sendResponse({ message: "content script 已收到 Ping" });
    return;
  }

  if (message?.type === "HIGHLIGHT_SELECTION") {
    ensureHighlightStyle();
    const result = highlightSelection();
    sendResponse(result);
    return;
  }
});
