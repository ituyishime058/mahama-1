import type { Article } from '../types';

const DB_NAME = 'KireheTVDB';
const DB_VERSION = 1;
const STORE_NAME = 'articles';

function getDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
        reject(new Error("IndexedDB is not supported by this browser."));
        return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(new Error("Error opening DB"));
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
}

async function imageToDataURL(url: string): Promise<string> {
    // Directly fetch the image. picsum.photos supports CORS.
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

export function saveArticleForOffline(article: Article): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      const imageBase64 = article.imageUrl.startsWith('data:') ? article.imageUrl : await imageToDataURL(article.imageUrl);
      const articleToSave: Article = { ...article, imageUrlBase64: imageBase64 };
      const db = await getDB();
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(articleToSave);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error("Failed to save article."));
    } catch (error) {
        console.error('Failed to save article for offline:', error);
        reject(error);
    }
  });
}

export function getOfflineArticles(): Promise<Article[]> {
  return new Promise(async (resolve, reject) => {
    const db = await getDB();
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(new Error("Failed to get articles."));
  });
}

export function deleteOfflineArticle(id: number): Promise<void> {
  return new Promise(async (resolve, reject) => {
    const db = await getDB();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(new Error("Failed to delete article."));
  });
}

export function clearAllOfflineArticles(): Promise<void> {
    return new Promise(async (resolve, reject) => {
        const db = await getDB();
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.clear();
        request.onsuccess = () => resolve();
        request.onerror = () => reject(new Error("Failed to clear articles."));
    });
}

export function getOfflineArticleIds(): Promise<number[]> {
  return new Promise(async (resolve, reject) => {
    const db = await getDB();
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAllKeys();
    request.onsuccess = () => resolve(request.result as number[]);
    request.onerror = () => reject(new Error("Failed to get article keys."));
  });
}