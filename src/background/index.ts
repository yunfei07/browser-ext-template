const showBadge = () => {
  chrome.action.setBadgeText({ text: "DEV" });
  chrome.action.setBadgeBackgroundColor({ color: "#22d3ee" });
};

const setupSidePanel = async () => {
  // 设置默认 side panel 页面，并允许点击扩展图标时自动打开
  try {
    await chrome.sidePanel.setOptions({ path: "sidepanel.html", enabled: true });
    await chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
  } catch (error) {
    console.warn("[background] side panel 配置失败：", (error as Error).message);
  }
};

chrome.runtime.onInstalled.addListener(({ reason }) => {
  showBadge();
  setupSidePanel();
  if (reason === "install") {
    console.info("[background] 扩展已安装");
  } else if (reason === "update") {
    console.info("[background] 扩展已更新");
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === "CONTENT_READY") {
    console.info("[background] content script 已就绪，来自标签页：", sender.tab?.id);
    sendResponse({ ok: true });
    return;
  }

  if (message?.type === "PING_BACKGROUND") {
    sendResponse({ message: "来自 background 的响应" });
    return;
  }
});
