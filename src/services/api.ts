export class ApiService {
  async postData(url: any, data: any, headers?: any) {
    return fetch(url, {
      body: JSON.stringify(data),
      cache: 'no-cache',
      headers: {
        'content-type': 'application/json',
        ...headers,
      },
      method: 'POST',
      mode: 'cors',
      redirect: 'follow',
      referrer: 'no-referrer',
    }).then((response) => response.json())
  }
}
