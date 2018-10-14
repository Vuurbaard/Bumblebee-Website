import { IUser } from "./user";

export interface IApp {
	name: string;
	token: string;
	createdAt: Date;
	createdBy: IUser
}
