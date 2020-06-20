import { IFragment } from './fragment';
import { IUser } from './user';

export interface IWord {
	text: string;
	fragments: [IFragment];
	createdAt: Date;
	createdBy: IUser;
}
