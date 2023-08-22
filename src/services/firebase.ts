import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getAnalytics } from 'firebase/analytics'

let firebaseConfig = {}

if (process.env.REACT_APP_MODE) {
  firebaseConfig = {
    apiKey: 'AIzaSyAfDUvkjlsEC63b6wbeX__kUD2YKdudc48',
    authDomain: 'staging-sistema-conrado.firebaseapp.com',
    projectId: 'staging-sistema-conrado',
    storageBucket: 'staging-sistema-conrado.appspot.com',
    messagingSenderId: '773846011608',
    appId: '1:773846011608:web:d67b2c329ca250807ed1ad',
    measurementId: 'G-HDMLD5849J',
  }
} else {
  firebaseConfig = {
    apiKey: 'AIzaSyDcgVWYzH1BBoDFEMqKTsMNiRmyOeQDKmA',
    authDomain: 'sistema-conradotech.firebaseapp.com',
    projectId: 'sistema-conradotech',
    storageBucket: 'sistema-conradotech.appspot.com',
    messagingSenderId: '536465159378',
    appId: '1:536465159378:web:e32287f2fdce669093690b',
    measurementId: 'G-TEZ8MEV2M8',
  }
}

const app = initializeApp(firebaseConfig)

const storage = getStorage(app)
const analytics = getAnalytics(app)

export { storage, analytics }
