import { IFragment } from './fragment';
import { IUser } from './user';

export interface ISource {
	id: string;
	origin: string;
	fragments: [IFragment];
	createdAt: Date;
	createdBy: IUser;
}
