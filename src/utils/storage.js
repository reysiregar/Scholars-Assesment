export const STORAGE_KEYS = {
  BIODATA: "eduscholar_biodata",
  QUIZ_SESSION: "eduscholar_quiz_session",
  QUIZ_RESULT: "eduscholar_quiz_result",
};

function safeGet(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.error(`[Storage] Failed to parse key "${key}":`, err);
    return fallback;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.error(`[Storage] Failed to save key "${key}":`, err);
    return false;
  }
}

function safeRemove(key) {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error(`[Storage] Failed to remove key "${key}":`, err);
  }
}

export function getStoredBiodata() {
  return safeGet(STORAGE_KEYS.BIODATA, null);
}

export function saveStoredBiodata(biodata) {
  return safeSet(STORAGE_KEYS.BIODATA, biodata);
}

export function clearStoredBiodata() {
  safeRemove(STORAGE_KEYS.BIODATA);
}

export function getStoredQuizSession() {
  return safeGet(STORAGE_KEYS.QUIZ_SESSION, null);
}

export function saveStoredQuizSession(session) {
  return safeSet(STORAGE_KEYS.QUIZ_SESSION, session);
}

export function clearStoredQuizSession() {
  safeRemove(STORAGE_KEYS.QUIZ_SESSION);
}

export function getStoredQuizResult() {
  return safeGet(STORAGE_KEYS.QUIZ_RESULT, null);
}

export function saveStoredQuizResult(result) {
  return safeSet(STORAGE_KEYS.QUIZ_RESULT, result);
}

export function clearStoredQuizResult() {
  safeRemove(STORAGE_KEYS.QUIZ_RESULT);
}

export function resetTestSessionOnly() {
  clearStoredQuizSession();
  clearStoredQuizResult();
}

export function resetAllData() {
  clearStoredBiodata();
  clearStoredQuizSession();
  clearStoredQuizResult();
}
