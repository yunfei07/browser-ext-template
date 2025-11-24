type Settings = {
  accent: string;
  enableHighlight: boolean;
};

const statusEl = document.getElementById("status");
const accentInput = document.getElementById("accent") as HTMLInputElement | null;
const highlightInput = document.getElementById("enable-highlight") as HTMLInputElement | null;
const saveButton = document.getElementById("save");

const setStatus = (text: string) => {
  if (statusEl) statusEl.textContent = text;
};

const loadSettings = async (): Promise<Settings> => {
  const result = await chrome.storage.sync.get({
    accent: "#22d3ee",
    enableHighlight: true
  });
  return {
    accent: result.accent,
    enableHighlight: Boolean(result.enableHighlight)
  };
};

const applySettingsToUI = (settings: Settings) => {
  if (accentInput) accentInput.value = settings.accent;
  if (highlightInput) highlightInput.checked = settings.enableHighlight;
};

const saveSettings = async () => {
  if (!accentInput || !highlightInput) return;
  const payload: Settings = {
    accent: accentInput.value || "#22d3ee",
    enableHighlight: highlightInput.checked
  };

  setStatus("正在保存...");
  await chrome.storage.sync.set(payload);
  setStatus("保存成功");
};

const init = async () => {
  const settings = await loadSettings();
  applySettingsToUI(settings);
  setStatus("设置已加载");
};

saveButton?.addEventListener("click", saveSettings);

init();
