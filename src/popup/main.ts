const pingButton = document.getElementById("ping");
const highlightButton = document.getElementById("highlight");
const statusEl = document.getElementById("status");

const setStatus = (text: string) => {
  if (statusEl) {
    statusEl.textContent = text;
  }
};

const getActiveTabId = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) {
    throw new Error("未找到活动标签页");
  }
  return tab.id;
};

const sendMessageToContent = async (payload: unknown) => {
  const tabId = await getActiveTabId();
  return chrome.tabs.sendMessage(tabId, payload);
};

pingButton?.addEventListener("click", async () => {
  setStatus("正在发送 Ping...");
  try {
    const response = await sendMessageToContent({ type: "PING_FROM_POPUP" });
    setStatus(response?.message ?? "Ping 已发送");
  } catch (error) {
    setStatus(`发送失败：${(error as Error).message}`);
  }
});

highlightButton?.addEventListener("click", async () => {
  setStatus("尝试高亮当前选中内容...");
  try {
    await sendMessageToContent({ type: "HIGHLIGHT_SELECTION" });
    setStatus("高亮已应用（若存在选中内容）");
  } catch (error) {
    setStatus(`操作失败：${(error as Error).message}`);
  }
});
