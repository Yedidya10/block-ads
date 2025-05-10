export default defineBackground(() => {
  console.log("Hello background!", { id: browser.runtime.id });

  let currentActiveTabUrl: string | null = null;
  const monitoredDomain = "https://1337x.to/"; // החלף לדומיין שאתה רוצה

  // עוקב אחרי הטאב הפעיל
  browser.tabs.onActivated.addListener(async (activeInfo) => {
    try {
      const tab = await browser.tabs.get(activeInfo.tabId);
      currentActiveTabUrl = tab.url || null;
    } catch (e) {
      currentActiveTabUrl = null;
    }
  });

  // גם מאזין לעדכון בכתובת בטאב
  browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.active && changeInfo.url) {
      currentActiveTabUrl = changeInfo.url;
    }
  });

  // כשנפתח טאב חדש — בודק אם הוא קשור לאתר המקורי
  browser.tabs.onCreated.addListener(async (newTab) => {
    if (!currentActiveTabUrl) return;

    const isOnMonitoredSite = currentActiveTabUrl.includes(monitoredDomain);
    const isNewTabTrusted =
      newTab.pendingUrl?.includes(monitoredDomain) ||
      newTab.url?.includes(monitoredDomain);

    if (isOnMonitoredSite && !isNewTabTrusted && newTab.id) {
      console.log("Blocked suspicious tab:", newTab.url);
      await browser.tabs.remove(newTab.id);
    }
  });
});
