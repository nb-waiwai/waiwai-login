import crypto from "crypto";

export const toHash = (str: string) => crypto.createHash('sha256').update(str + 'foge', 'utf8').digest('hex')