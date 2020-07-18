
export enum GRAVITY {
  c = 'center',
  n = 'north',
  ne = 'northeast',
  nw = 'northwest',
  e = 'east',
  w = 'west',
  s = 'south',
  se = 'southeast',
  sw = 'southwest',
  center = 'center',
  centre = 'centre',
  north = 'north',
  northeast = 'northeast',
  northwest = 'northwest',
  east = 'east',
  west = 'west',
  south = 'south',
  southeast = 'southeast',
  southwest = 'southwest',
  auto = 'attention',
  // With g-prefix
  gc = 'center',
  gn = 'north',
  gne = 'northeast',
  gnw = 'northwest',
  ge = 'east',
  gw = 'west',
  gs = 'south',
  gse = 'southeast',
  gsw = 'southwest',
  gcenter = 'center',
  gcentre = 'centre',
  gnorth = 'north',
  gnortheast = 'northeast',
  gnorthwest = 'northwest',
  geast = 'east',
  gwest = 'west',
  gsouth = 'south',
  gsoutheast = 'southeast',
  gsouthwest = 'southwest',
  gauto = 'attention',
}

type GRAVITY_KEYS = keyof typeof GRAVITY;

export interface CaravaggioOptions {
  o?: 'auto' | 'original' | 'jpg' | 'jpeg' | 'png' | 'tiff' | 'webp';
  progressive?: boolean;
  rs?: {
    s: string;
    m?: 'scale' | 'fit' | 'downfit' | 'upfit' | 'fill' | 'downfill' | 'embed';
    iar?: boolean;
    b?: string;
    g?: GRAVITY_KEYS;
  };
  ex?: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  overlay?: {
    url: string;
    g?: GRAVITY_KEYS;
    x?: number;
    y?: number;
    watermark?: boolean;
  };
  q?: number;
  rotate?: {
    v: number;
    b?: string;
  };
  flip?: 'x' | 'y';
  blur?: number;
  duotone?: {
    h: string;
    s: string;
    o?: number;
  };
}

const urlBuilder = (caravaggioUrl: string, imageUrl: string, opt: CaravaggioOptions) => {
  const options = Object.entries(opt)
  .map(([operation, value]) => {
      if (typeof value !== 'object') {
        return `${operation}:${value}`;
      }
      const valueString = Object.entries(value as Record<string, unknown>)
        .map(([k, v]) => `${k}:${v}`)
        .join(',');
      return `${operation},${valueString}`;
    })
    .join('/');
  return `${caravaggioUrl}/${options}?image=${imageUrl}`;
}

export default urlBuilder;
