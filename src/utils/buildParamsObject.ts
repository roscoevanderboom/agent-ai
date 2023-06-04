import { PARAM_KEYS } from "@/constants/params";

export default function buildParamsObject(strings: string[]): { [key: string]: string } {
  const params: { [key: string]: string } = {};

  for (const str of strings) {
    const k = str.slice(str.lastIndexOf(":") + 2, str.lastIndexOf("="))
    const value = str.slice(str.lastIndexOf("=") + 2)
    const key = k.trim()

    if (key && PARAM_KEYS.includes(key)) {
      params[key] = value.trim();
    }
  }

  return params;
}
