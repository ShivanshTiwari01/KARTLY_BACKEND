import admin from 'firebase-admin';

import serviceAccount from './ecommerce-app-46783-firebase-adminsdk-fbsvc-dd573a0d1a.json';

const ecommercedb = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
  databaseURL: 'https://ecommerce-app-46783-default-rtdb.firebaseio.com/',
  databaseAuthVariableOverride: {
    uid: 'ecommerce_service_worker_firebasedb',
  },
});

export default ecommercedb;
