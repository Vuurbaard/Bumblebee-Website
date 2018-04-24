export interface IUser {
    _id: string,
    id: string,
    externalId: string;
    email: string;
    name: string;
    username: string;
    password: string;
    isAdmin: boolean;
    avatar: string;
}