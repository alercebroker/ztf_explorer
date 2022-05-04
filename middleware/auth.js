export default function ({ store }) {
  const accessToken = localStorage.getItem('access_token')
  const refreshToken = localStorage.getItem('refresh_token')
  if (!store.state.user.logged) {
    if (accessToken) {
      store.dispatch('user/getCurrentUser', { accessToken, refreshToken })
    } else {
      store.dispatch('user/logout')
    }
  }
}
