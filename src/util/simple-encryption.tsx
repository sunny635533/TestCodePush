export const b64Table = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function xorEncryption(key: string, data: string): string {
  let tempArray: string[] = [...data];
  return tempArray.map((char: string, i: number) => {
    return String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(Math.floor(i % key.length)));
  }).join('');
}

function b64Encode(data: string): string {
  let o1: number, o2: number, o3: number, h1, h2, h3, h4, bits, r, i = 0,
    enc: string = '';
  if (!data) {
    return data;
  }

  do {
    o1 = data.charCodeAt(i++);
    o2 = data.charCodeAt(i++);
    o3 = data.charCodeAt(i++);
    bits = o1 << 16 | o2 << 8 | o3;
    h1 = bits >> 18 & 0x3f;
    h2 = bits >> 12 & 0x3f;
    h3 = bits >> 6 & 0x3f;
    h4 = bits & 0x3f;
    enc += b64Table.charAt(h1) + b64Table.charAt(h2) + b64Table.charAt(h3) + b64Table.charAt(h4);
  } while (i < data.length);
  r = data.length % 3;
  return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
}

function b64Decode(data: string): string {
  let o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
    result: string[] = [];
  if (!data) {
    return data;
  }

  data += '';
  do {
    h1 = b64Table.indexOf(data.charAt(i++));
    h2 = b64Table.indexOf(data.charAt(i++));
    h3 = b64Table.indexOf(data.charAt(i++));
    h4 = b64Table.indexOf(data.charAt(i++));
    bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
    o1 = bits >> 16 & 0xff;
    o2 = bits >> 8 & 0xff;
    o3 = bits & 0xff;
    result.push(String.fromCharCode(o1));
    if (h3 !== 64) {
      result.push(String.fromCharCode(o2));
      if (h4 !== 64) {
        result.push(String.fromCharCode(o3));
      }
    }
  } while (i < data.length);
  return result.join('');
}

export function encrypt(key: string, data: string): string {
  return b64Encode(xorEncryption(key, data));
}

export function decrypt(key: string, data: string): string {
  return xorEncryption(key, b64Decode(data));
}