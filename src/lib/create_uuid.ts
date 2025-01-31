import { UUID } from 'crypto';
import { v4 as uuidv4 } from 'uuid';


export function createUUID() : UUID
{
	return uuidv4() as UUID;
}