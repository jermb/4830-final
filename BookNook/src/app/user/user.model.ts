export interface User {
  username: string,
  password: string,
  bookmarked?: string[],
  favorited?: {
    id: string,
    score?: number
  }[]
}
