export const initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('MyDatabase', 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Create an 'investments' object store
      if (!db.objectStoreNames.contains('investments')) {
        const investmentsStore = db.createObjectStore('investments', { keyPath: 'id', autoIncrement: true });

        // Define indexes for structured data
        investmentsStore.createIndex('financialOrganization', 'financialOrganization', { unique: false });
        investmentsStore.createIndex('typeOfInvestment', 'typeOfInvestment', { unique: false });
      }

      // Create an 'insurance' object store
      if (!db.objectStoreNames.contains('insurance')) {
        const insuranceStore = db.createObjectStore('insurance', { keyPath: 'id', autoIncrement: true });

        // Define indexes for structured data
        insuranceStore.createIndex('provider', 'provider', { unique: false });
        insuranceStore.createIndex('policyNumber', 'policyNumber', { unique: true });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result); // Database initialized successfully
    };

    request.onerror = (event) => {
      reject(event.target.error); // Handle errors
    };
  });
};

// Add data to a specific object store
export const addData = (db, storeName, data) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.add(data);

    request.onsuccess = () => {
      resolve(request.result); // Returns the key of the added data
    };

    request.onerror = (event) => {
      reject(event.target.error); // Handle errors
    };
  });
};

// Fetch all data from a specific object store
export const fetchData = (db, storeName) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result); // Returns all data in the object store
    };

    request.onerror = (event) => {
      reject(event.target.error); // Handle errors
    };
  });
};
