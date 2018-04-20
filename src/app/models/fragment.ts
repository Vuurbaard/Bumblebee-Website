import { ISource } from "./source";
import { IUser } from "./user";
import { IWord } from "./word";

export interface IFragment {
	start: string;
	end: string;
	active: boolean;
	source: ISource;
	word: IWord;
	createdAt: Date;
	createdBy: IUser
}
