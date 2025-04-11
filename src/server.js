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
        const insuranceStore = db.createObjectStore('insurance', { keyPath: 'policyNumber' }); // Use policyNumber as the key

        // Define indexes for structured data
        insuranceStore.createIndex('insuranceProvider', 'insuranceProvider', { unique: false });
        insuranceStore.createIndex('policyPaymentTerm', 'policyPaymentTerm', { unique: false });
        insuranceStore.createIndex('premiumPaymentFrequency', 'premiumPaymentFrequency', { unique: false });
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
    if (!db) {
      reject(new Error('Database connection not available'));
      return;
    }

    try {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.add(data);
      
      request.onsuccess = (event) => {
        console.log(`Data added to ${storeName} successfully:`, data);
      };
      
      request.onerror = (event) => {
        console.error(`Failed to add data to ${storeName}:`, event.target.error);
        reject(event.target.error);
      };
      
      transaction.oncomplete = () => {
        console.log('Transaction completed successfully');
        resolve();
      };
      
      transaction.onerror = (event) => {
        console.error('Transaction failed:', event.target.error);
        reject(event.target.error);
      };
    } catch (error) {
      console.error(`Error in addData for ${storeName}:`, error);
      reject(error);
    }
  });
};

// Fetch all data from a specific object store
export const fetchData = (db, storeName) => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database connection not available'));
      return;
    }

    try {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = (event) => {
        console.log(`Successfully fetched data from ${storeName}:`, event.target.result);
        resolve(event.target.result || []);
      };

      request.onerror = (event) => {
        console.error(`Error fetching data from ${storeName}:`, event.target.error);
        reject(event.target.error);
      };
    } catch (error) {
      console.error(`Error in fetchData for ${storeName}:`, error);
      reject(error);
    }
  });
};
