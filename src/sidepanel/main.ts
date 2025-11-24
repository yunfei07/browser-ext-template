const statusEl = document.getElementById("status");
const titleEl = document.getElementById("tab-title");
const urlEl = document.getElementById("tab-url");
const refreshBtn = document.getElementById("refresh");
const pingBtn = document.getElementById("ping");
const highlightBtn = document.getElementById("highlight");

const setStatus = (text: string) => {
  if (statusEl) statusEl.textContent = text;
};

const setTabInfo = (title: string, url: string) => {
  if (titleEl) titleEl.textContent = title || "未获取标题";
  if (urlEl) urlEl.textContent = url || "";
};

const getActiveTab = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) throw new Error("未找到活动标签页");
  return tab;
};

const refreshTabInfo = async () => {
  setStatus("更新标签页信息...");
  try {
    const tab = await getActiveTab();
    setTabInfo(tab.title ?? "未命名页面", tab.url ?? "");
    setStatus("标签页信息已刷新");
  } catch (error) {
    setStatus(`刷新失败：${(error as Error).message}`);
  }
};

const sendMessageToContent = async (payload: unknown) => {
  const tab = await getActiveTab();
  return chrome.tabs.sendMessage(tab.id!, payload);
};

pingBtn?.addEventListener("click", async () => {
  setStatus("向 content script 发送 Ping...");
  try {
    const response = await sendMessageToContent({ type: "PING_FROM_POPUP" });
    setStatus(response?.message ?? "已发送 Ping");
  } catch (error) {
    setStatus(`发送失败：${(error as Error).message}`);
  }
});

highlightBtn?.addEventListener("click", async () => {
  setStatus("尝试高亮当前选中内容...");
  try {
    await sendMessageToContent({ type: "HIGHLIGHT_SELECTION" });
    setStatus("高亮已应用（若存在选中内容）");
  } catch (error) {
    setStatus(`操作失败：${(error as Error).message}`);
  }
});

refreshBtn?.addEventListener("click", refreshTabInfo);

chrome.tabs.onActivated.addListener(() => {
  refreshTabInfo();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === "complete") {
    refreshTabInfo();
  }
});

refreshTabInfo();
