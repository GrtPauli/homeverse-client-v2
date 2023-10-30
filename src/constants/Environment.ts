interface Environment {
  Uri: {
    Api: string
    Graphql: string
    Image: String
    Ws: string
  }
  FirebaseConfig: {
    apiKey: string
    authDomain: string
    projectId: string
    storageBucket: string
    messagingSenderId: string
    appId: string
    measurementId: string
  }
  OneSignal: {
    AppId: string
  }
  Google: {
    ApiKey: string
  }
  Youtube: {
    ApiKey: string
  }
}

export const environment: Environment = {
  Uri: {
    Api: `${process.env.NEXT_PUBLIC_BASE_URL}/api/`,
    Graphql: `${process.env.NEXT_PUBLIC_BASE_URL}/graphql/`, //`http${isProd ? 's' : ''}://${Host}/graphql/`, //Config.graphql_url as any,
    Image: '',
    Ws: '',
  },
  FirebaseConfig: {
    apiKey: 'AIzaSyDFV0VfkgwNxSmnodSI0qgqnCWuMLKZUQQ',
    authDomain: 'homeverse-397119.firebaseapp.com',
    projectId: 'homeverse-397119',
    storageBucket: 'homeverse-397119.appspot.com',
    messagingSenderId: '977679557725',
    appId: '1:977679557725:web:8e03dcfc8c113d0c55d9b4',
    measurementId: 'G-WN3WQTMTKE',
  },
  OneSignal: {
    AppId: 'xxxx',
  },
  Youtube: {
    ApiKey: 'xxxx',
  },
  Google: {
    ApiKey: 'xxxx',
  },
}
