export default function ({ $axios, $config }, inject) {
  const usersApi = $axios.create({
    baseURL: $config.usersApiBaseUrl,
  })

  usersApi.login = (username, password) => {
    return usersApi.post('/login/', { username, password })
  }

  usersApi.current = (accessToken) => {
    return usersApi.get('/current/', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
  }

  usersApi.googleLogin = () => {
    return usersApi.get('login/')
  }

  usersApi.refresh = (refreshToken) => {
    return usersApi.post('/refresh/', { refresh: refreshToken })
  }

  inject('usersApi', usersApi)
}
