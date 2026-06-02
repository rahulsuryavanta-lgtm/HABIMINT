import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const isBrowser = (): boolean => typeof window !== 'undefined';


export function setLoginInfo(data: any) {
  cookies.set('habi_user', JSON.stringify(data), { path: '/' });
  cookies.set('habi_token', data?.login_token, { path: '/' });
  return true
}

export async function setCookieUserInfo(info: any) {
  cookies.set('habi_user', JSON.stringify(info), { path: '/' });
}

export async function setUserToken(token: string) {
  cookies.set('habi_token', token, { path: '/' });
}

export function getUserInfo() {
  const userData = cookies.get('habi_user')
  if (userData) {
    try {
      return userData
    } catch (error) {
      return null
    }
  }
  return null
}

export function getUserToken() {
  return cookies.get('habi_token')
}



export function removeToken() {
  cookies.remove('habi_token')
  cookies.remove('habi_user')
  window.location.href = '/';

}

export function checkAuth() {
  const authHeader = cookies.get('habi_token');
  if (authHeader) {
    return true;
  } else {
    Error('Session Expired. Please login to continue');
    setTimeout(() => {
      removeToken();
      window.location.href = '/login';
    }, 1000);
    return false;
  }
}
