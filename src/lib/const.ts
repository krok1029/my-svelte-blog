export enum NAVBAR_URL {
  HOME = '/',
  BLOG = '/blog',
  ABOUT = '/about',
  DEFAULT = '#',
}
type NavbarList = {
  text: string,
  link: string,
}
export const navbarList: NavbarList[] = [
  {text: 'Home', link: NAVBAR_URL.HOME},
  {text: 'My Blog', link: NAVBAR_URL.BLOG},
  {text: 'About', link: NAVBAR_URL.ABOUT},
  {text: 'Contact me', link: NAVBAR_URL.DEFAULT},
]