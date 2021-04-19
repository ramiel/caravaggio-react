import { CaravaggioContext } from './CaravaggioProvider';

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

export type GRAVITY_KEYS = keyof typeof GRAVITY;

export interface CaravaggioOptions {
  o?: 'auto' | 'original' | 'jpg' | 'jpeg' | 'png' | 'tiff' | 'webp';
  progressive?: boolean;
  /**
   * Resize the image to the given dimension
   * @see https://caravaggio.ramielcreations.com/docs/resize
   */
  rs?: {
    /**
     * The desired dimension in the format WIDTHxHEIGHT
     * @example
     *  `1080x1024`
     *  `1080x`
     *  `x1024`
     *  `0.8x0.6` (percentages)
     * @see https://caravaggio.ramielcreations.com/docs/resize#sizes
     */
    s: string;
    /**
     * The resize method. For in depth explanation
     * @see https://caravaggio.ramielcreations.com/docs/resize#resize-methods
     */
    m?: 'scale' | 'fit' | 'downfit' | 'upfit' | 'fill' | 'downfill' | 'embed';
    /**
     * Ignore aspect ratio. If true the aspect ratio of the image is not kept and the image
     * is allowed to be distorted. It works with method `scale`
     */
    iar?: boolean;
    /**
     * Background color. With some resize methods an empty space can be left and you can use this value
     * to fill it with a color.
     *
     * @example
     * `b: '120230007'` is for rgb(120, 230, 7)
     * `b: 120230007.4` same as before but with an opacity, rgba(120, 230, 7, 0.4)
     * `b: 'FF00AB'` is for exadecimal color
     * `b: 'FF00AB.4'` same as before but with an opacity of 0.4
     *
     * @see https://caravaggio.ramielcreations.com/docs/resize#colors
     */
    b?: string;
    /**
     * Define the gravity of the image. If an empty space is left, this let you decide where to put the image
     *
     * @see https://caravaggio.ramielcreations.com/docs/resize#gravity
     */
    g?: GRAVITY_KEYS;
  };
  /**
   * Extracy a portion of the image
   * @see https://caravaggio.ramielcreations.com/docs/extract
   */
  ex?: {
    /**
     * Pixel from the left
     */
    x: number;
    /**
     * Pixel from the top
     */
    y: number;
    /**
     * Width of the extracted area
     */
    w: number;
    /**
     * Height of the extracted area
     */
    h: number;
  };
  /**
   * Add an overlay image (watermark)
   * @see https://caravaggio.ramielcreations.com/docs/overlay
   */
  overlay?: {
    /**
     * The url of the overlay image
     */
    url: string;
    /**
     * The gravity of the overlay
     *
     * @see https://caravaggio.ramielcreations.com/docs/overlay#position-with-gravity
     * @see https://caravaggio.ramielcreations.com/docs/resize#gravity
     */
    g?: GRAVITY_KEYS;
    /**
     * Position from the left, in pixels or percentage
     * @example
     * `x: 130`
     * `x: 0.6`
     *
     * @see https://caravaggio.ramielcreations.com/docs/overlay#positioning-with-coordinates
     */
    x?: number;
    /**
     * Position from the top, in pixels or percentage
     * @example
     * `y: 130`
     * `y: 0.6`
     *
     * @see https://caravaggio.ramielcreations.com/docs/overlay#positioning-with-coordinates
     */
    y?: number;
    /**
     * If true, the overlay is repeated
     * @see https://caravaggio.ramielcreations.com/docs/overlay#watermark-repeat
     */
    watermark?: boolean;
  };
  /**
   * Set the quality of the final image
   * @see https://caravaggio.ramielcreations.com/docs/quality
   */
  q?: number;
  /**
   * Rotate the image arbitrarly
   * @see https://caravaggio.ramielcreations.com/docs/rotate
   */
  rotate?: {
    /**
     * Value, in degree, of the rotation angle
     */
    v: number | 'auto';
    /**
     * If the rotation is not multiple of 90°, this defines the background color
     * of the resulting area.
     *
     * @example
     * `b: '120230007'` is for rgb(120, 230, 7)
     * `b: 120230007.4` same as before but with an opacity, rgba(120, 230, 7, 0.4)
     * `b: 'FF00AB'` is for exadecimal color
     * `b: 'FF00AB.4'` same as before but with an opacity of 0.4
     *
     * @see https://caravaggio.ramielcreations.com/docs/resize#colors
     */
    b?: string;
  };
  /**
   * Flip the image. Set `x` to flip horzontally, or `y` to flip vertically
   * @see https://caravaggio.ramielcreations.com/docs/flip
   */
  flip?: 'x' | 'y';
  /**
   * Blur the image
   * @see https://caravaggio.ramielcreations.com/docs/blur
   */
  blur?: number;
  /**
   * Apply a duotone effect to the image
   * @see https://caravaggio.ramielcreations.com/docs/duotone
   */
  duotone?: {
    /**
     * Highlight color
     */
    h: string;
    /**
     * Shadow color
     */
    s: string;
    /**
     * Opacity
     */
    o?: number;
  };
}

export const urlBuilder = (
  { url: caravaggioUrl, baseUrl }: CaravaggioContext,
  imageUrl: string,
  opt: CaravaggioOptions = {},
): string => {
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
  const finalImageUrl =
    /^\.?\//.test(imageUrl) && baseUrl ? `${baseUrl}${imageUrl}` : imageUrl;
  return options
    ? `${caravaggioUrl}/${options}?image=${encodeURIComponent(finalImageUrl)}`
    : finalImageUrl;
};
