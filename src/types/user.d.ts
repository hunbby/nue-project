declare interface Profile {
  username: string
  bio: string
  image: string
  following: boolean
}

declare interface User {
  userId: number
  pwChangeDt: string
  creationId: string
  role: string
  accessToken: string | undefined
  refreshToken: string
}
