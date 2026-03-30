export interface ActivityPrefs {
  pinned: string[];
  hidden: string[];
}

const getStorageKey = (userId: string) => `user_activity_prefs_${userId}`;

export const getUserActivityPrefs = (userId: string): ActivityPrefs => {
  try {
    const data = localStorage.getItem(getStorageKey(userId));
    if (data) {
      return JSON.parse(data) as ActivityPrefs;
    }
  } catch (e) {
    console.error('Failed to parse activity prefs', e);
  }
  return { pinned: [], hidden: [] };
};

export const setUserActivityPrefs = (userId: string, prefs: ActivityPrefs): void => {
  try {
    localStorage.setItem(getStorageKey(userId), JSON.stringify(prefs));
  } catch (e) {
    console.error('Failed to save activity prefs', e);
  }
};

export const toggleActivityPin = (userId: string, activityName: string): ActivityPrefs => {
  const prefs = getUserActivityPrefs(userId);
  if (prefs.pinned.includes(activityName)) {
    prefs.pinned = prefs.pinned.filter(a => a !== activityName);
  } else {
    prefs.pinned.push(activityName);
  }
  setUserActivityPrefs(userId, prefs);
  return prefs;
};
