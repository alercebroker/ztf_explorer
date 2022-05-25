export default function ({ $axios, $config }, inject) {
  const usersApi = $axios.create({
    baseURL: $config.usersApiBaseUrl,
    withCredentials: true,
  })

  usersApi.login = (username, password) => {
    return usersApi.post('/login/', { username, password })
  }

  usersApi.current = (accessToken) => {
    return usersApi.get('/current/', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
  }

  usersApi.getGoogleUrl = () => {
    return usersApi.get(
      '/social/o/google-oauth2/?redirect_uri=' + $config.googleRedirectUri
    )
  }

  usersApi.loginGoogle = ({ code, state }) => {
    const data = new URLSearchParams()
    data.append('code', code)
    data.append('state', state)
    return usersApi.post('/social/o/google-oauth2/', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
  }

  usersApi.refresh = (refreshToken) => {
    return usersApi.post('/refresh/', { refresh: refreshToken })
  }

  usersApi.register = (payload) => {
    return usersApi.post('/', payload)
  }

  inject('usersApi', usersApi)
}
