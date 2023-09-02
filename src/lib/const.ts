import type { NavbarList } from "$type/NavbarList"

export enum NAVBAR_URL {
  HOME = '/',
  BLOG = '/blog',
  ABOUT = '/about',
  DEFAULT = '#',
  PRACTICE = '/practices',
}

export const navbarList: NavbarList[] = [
  {text: 'Home', link: NAVBAR_URL.HOME},
  {text: 'My Blog', link: NAVBAR_URL.BLOG},
  {text: 'About', link: NAVBAR_URL.ABOUT},
  {text: 'Practice', link: NAVBAR_URL.PRACTICE},
]

export enum DATABASE {
  FIRESTORE = 'Firestore',
  GITHUB_ISSUE = 'GithubIssue',
}
