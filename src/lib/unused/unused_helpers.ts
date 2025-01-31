// heplers from: https://www.typescriptlang.org/play/?#code/JYWwDg9gTgLgBAbzgLzgXzgMyhEcBEyEAJvgNwBQFA9NXAIIAKAkgFxwDuApnABYCGANx4BnXDybNOvYAGNecKFxgBXKADsRcGLy4guWgEYBPOLIgAbaHGDERVLupV5zVqIgpxFXYnAC8BEqkADSecADmSo7+BJFcjvihaJQwxmA8AMKW0My+AQDWXMYQmNppXCVm2VBUqelwACq6+gBKXACOKgbwAQhhrjnE7FluuZTJVMRcshb8Slgq6rIwwBDqEcpNelz0YMAAFErt7FutHV0iMACU7PzqxpQ0dACqDcwAMm8Amo1fjACiAGVgtoIFV1MJYI1AXBFqt1jAwQ0YaowBYuLVyo0IMx1DAuFARNMVmsADwNAB8MX2DTgXAAHvj1HZGnAAPxwfYAfROV38VIADHB2OouJC+QymSzuexgOpMAS4M8+X5BRQAJAc54akVigmPOo8d78S7kqkBBo4vEEonLeHkumMxwsxb5dQQDjrDn7FVU2m6yFUyXOrQ+-k2eWK7WapU6uCiyEGrEAaSKIjNMQA2g0ALqOqVaTMJgl5jmZvPsTMAOhrqeM6f+9JmKim5JBxtNlIpFPbJpgZpzj1oSre72YDR+E4BIJ0-HgMH4hS0EEMACtiWV6ndfEpVJo4PxYep4XBKgAtEjvYD4qD8CwAcnsFENcAAsouuAA1O8XDO9OCZsmEZwIUxSlLm7DIFWF7EFeN53uSgE5lSaCZqBlS5pi9Rcp+MTvoU34WL+hqVAMUAUmEXi0AAemyVDDq8Hzjj8ABizwAHIZG8ADy7EzgI84fsua4btu3iqBoWh3AeUC3qYUEWNeBJ3mGhgqPAJpErAWjXvYw4voicCGDwh6ouip6lCI6SyMAmByHAgg-gYWA4HgOg8Cu67LCBaZVlQmCLHaaxwCAH6Eb+tLBsyWhtOYUDEKSlxQHK4Qgq67qet2+wQGAJKaLyHheLuajrNxInLFWoEiNluXwiIVxVqFYD7Ps+S+igVaKfBFitVcfImnAdbpvhX5OemXYUGgVDmJo8BcixMShQRY37GRVyUVR1C0fRdBntxAAicCAhkAAS-yvvQIIcDI8hVCAhhys5OgpVo2C4AehgQMI01rJcVRuG0nTdIC8h6IeARQZ5xL7H0XhkbkkFVnCaz7Eto1EQYq3VH1k1XEOLyAvQADi-zsOiMCPpwyX4nAYj6FUUz+YFeUbDApxcFjoxDLTMDJeo4R8rD4J-UcFw9P90CA2LIPNPwVZgHMRIwxLUC5OgeMbV4m3bV44SbM0Ox7Ic5zdBrU1AA

// UTILTIY TYPES, to convert TS union to TS tuple

import { z } from "zod";

// API: we have some API which returns themes by color ids

enum color {
  red = "red",
  green = "green",
};
type ColorId = keyof typeof color

type ThemeRequest = {
  colorId: ColorId;
};

declare function getThemeApi(req: ThemeRequest): any;

// UTILTIY TYPES, to convert TS union to TS tuple

type ToIntersection<T> = (T extends T ? (_: T) => 0 : never) extends (_: infer U) => 0
	? U
	: never;

type Last<T> = ToIntersection<T extends unknown ? () => T : never> extends () => infer U
	? U
	: never;

type Keys<T> = [T] extends [never] ? [] : [...Keys<Exclude<T, Last<T>>>, Last<T>];

// UTILITY TYPE, that takes object type and retuns a union of ZodLiteral's

type MakeValues<T> = { [K in keyof T]: z.ZodLiteral<T[K]> }[keyof T]

type _V = MakeValues<typeof color>
    //^?

// UTILITY FUNCTION, that takes object and returns an array z.literal() but asserts its
// type to be a tuple of specific values from the object keys.

function makeValues<T extends Record<string, unknown>>(options: T) {
  return Object.keys(options).map((k) => z.literal(k)) as Keys<MakeValues<T>>
}

const _F = makeValues(color)
     //^?

// ZOD SCHEMA, which combines things from above

const colorRequestSchema = z.object({
  colorId: z.union(makeValues(color))
});

// USAGE: let's write some code

function getTheme(colorId: string) {
  const request = colorRequestSchema.parse({ colorId });
        //^?
  getThemeApi(request);
}
