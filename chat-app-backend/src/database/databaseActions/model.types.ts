export interface UserI {
  uuid: string;
  username: string;
  password: string;
  profileImage?: string;
  accessToken?: string;
}

export interface DatabaseI {
  users: UserI[];
}
