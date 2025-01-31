import { z } from 'zod';

const test_monezi = {
	EUR: 'EUR',
	RON: 'RON',
} as const;

export type MoneziType = keyof typeof test_monezi;


type ToIntersection<T> = (T extends T ? (_: T) => 0 : never) extends (_: infer U) => 0
	? U
	: never;

type Last<T> = ToIntersection<T extends unknown ? () => T : never> extends () => infer U
	? U
	: never;

type Keys<T> = [T] extends [never] ? [] : [...Keys<Exclude<T, Last<T>>>, Last<T>];

// UTILITY TYPE, that takes object type and retuns a union of ZodLiteral's

type MakeValues<T> = { [K in keyof T]: z.ZodLiteral<T[K]> }[keyof T]

/* eslint-disable @typescript-eslint/no-unused-vars */
type _V = MakeValues<typeof test_monezi>
    //^?

// UTILITY FUNCTION, that takes object and returns an array z.literal() but asserts its
// type to be a tuple of specific values from the object keys.

export function makeValues<T extends Record<string, unknown>>(options: T)
{
	return Object.keys(options).map((k) => z.literal(k)) as Keys<MakeValues<T>>
}

/* eslint-disable @typescript-eslint/no-unused-vars */
const _F = makeValues(test_monezi)
     //^?