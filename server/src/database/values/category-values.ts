import { env } from "@/env";

export namespace CategoryValue {
  const metadata = env.category;

  export class Name {
    private static readonly regex = /^[^\n]*$/;
    public static readonly min = metadata.name.min;
    public static readonly max = metadata.name.max;

    private constructor(public readonly value: string) {}

    public static verify(value: string): Name | null {
      const { regex, min, max } = Name;
      if (!regex.test(value)) return null;
      if (value.length < min) return null;
      if (value.length > max) return null;
      return new Name(value);
    }
  }
}
