# caravaggio-react

This library provides react components and hooks to integrate [Caravaggio](https://caravaggio.ramielcreations.com) in your react projects.

## Install

Install with

```bash
yarn add caravaggio-react
```

or

```bash
npm install caravaggio-react
```

This library is entirelly written in `typescript`.

## Caravaggio Provider

Any component or hook in this library need to be descendant of a `CaravaggioProvider`. This provider will set which Caravaggio instance to use for transformations. Put this provider as on top as you can.

```tsx
// App.tsx  (or App.js)

import { CaravaggioProvider } from "caravaggio-react";

export default function App(props) {
  return (
    <CaravaggioProvider
      url="https://mycaravaggio.dev"
    >
      {props.children}
    </CaravaggioProvider>
  );
}
```

The available props for the provider are

| props   | description                                                                                                                                                               | optional/mandatory        |
|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------|
| url     | Tells the provider the url of Caravaggio instance\. It can be an absolute of relative url in case Caravaggio is served from the same domain as your app                   | mandatory                 |
| baseUrl | Caravaggio can only transform images with absolute url\. If you want to use relative urls, set this value and all the images will be considered relative to this baseUrl  | optional, default \`null` |


## Image component

An image component is available to transform your images. It takes the same props as a normal `img` tag, plus an addotional `opt` props. You can pass any option available on [Caravaggio](https://caravaggio.ramielcreations.com).

```tsx
import { Image } from 'caravaggio-react';

<Image
  src="https://pexels.com/cangaroo.png"
  alt="A cangaroo jumping around"
  opt={{
    o: "webp",
    q: 90,
    blur: 10,
    rs: {
      s: "640x480",
    },
  }}
/>
```

In the above example we transform the image to `webp`, with a quality of `90`, a blur effect and resizing it to `640x480` pixels.

Check [Caravaggio documentation](https://caravaggio.ramielcreations.com) to know about all possible options.

## Image srcset

You can generate a [`srcset`](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) using the `ImageSet` component.


```tsx
import { ImageSet } from "caravaggio-react";

<ImageSet
  src="https://img.com/butterfly.png"
  alt="A butterfly"
  className="myclass"
  // Sets is an array of sources
  sets={[
    {
      // This source produce a webp image
      type: "image/webp",
      // The rules for this source
      rules: {
        // When screen is less wider than 300px
        "300w": {
          // Use this caravaggio options to produce the image
          opt: {
            o: "webp",
            rs: {
              s: "300x",
            },
          },
        },
        // Use this for screen large up to 600px
        "600w": {
          opt: {
            o: "webp",
            rs: {
              s: "600x",
            },
          },
        },
      },
    },
    // This is the second set, we want it for browsers 
    // not capable of handling webp images.
    // The rules are the same except for the output format
    {
      rules: {
        "300w": {
          opt: {
            rs: {
              s: "300x",
            },
          },
        },
        "600w": {
          opt: {
            rs: {
              s: "600x",
            },
          },
        },
      },
    },
  ]}
/>;
```

The component generates this html:

```html
<figure class="myclass">
  <picture>
    <source
      type="image/webp"
      srcset="
        /api/assets/o:webp/rs,s:300x?image=http://localhost:3000/myimage.png 300w,
        /api/assets/o:webp/rs,s:600x?image=http://localhost:3000/myimage.png 600w
      "
    />
    <source
      srcset="
        /api/assets/rs,s:300x?image=http://localhost:3000/myimage.png 300w,
        /api/assets/rs,s:600x?image=http://localhost:3000/myimage.png 600w
      "
    />
    <img src="/myimage.png" alt="example image" />
  </picture>
</figure>
```

## Hooks

### useCaravaggio

A hook, `useCaravaggio`, is provided to get, instead of an image tag, an image url with all the transformation applied. Very useful to insert images in css, or for css-in-js libraries

```tsx
import { useCaravaggio } from "caravaggio-react";

const Component = () => {
  const image = useCaravaggio("https://img.com/landscape.png", {
    blur: 0.3,
  });

  return <div style={{ backgroundImage: `url('${image}')` }}>Some content</div>;
};
```

The first parameter is the image to transform, the second an object with all the transformations.

### useCaravaggioIfAvailable

Sometimes you may not be sure if Caravaggio is available or not. This hook behaves exactly as `useCaravaggio` but
is less sensible to problems: if Caravaggio provider is not available or the image is not defined, it returns a sensible default:

```tsx
import { useCaravaggioIfAvailable } from "caravaggio-react";

const Component = ({image}: {image?: string}) => {
  const image = useCaravaggioIfAvailable(image, {
    blur: 0.3,
  });

  // If the image is not available returns null.
  // If the provider is not available, returns the original image url

  return <div style={{ backgroundImage: `url('${image}')` }}>Some content</div>;
};
```

### useCaravaggioBuilder

This hook return a function that can be invoked later to produce the image url

```tsx
import { useCaravaggioIfAvailable } from "caravaggio-react";

const Component = ({image}: {image?: string}) => {
  const builder = useCaravaggioBuilder();
  const animals = [
    {
      name: 'tiger',
      image: 'https://images.com/tiger.png'
    },
    {
      name: 'monkey',
      image: 'https://images.com/monkey.png'
    },
    {
      name: 'horse',
      image: 'https://images.com/horse.png'
    }
  ]

  // If the image is not available returns null.
  // If the provider is not available, returns the original image url

  return <div>{
    animals.map(animal => <img src={builder(animal.image, {o: 'jpg'})} key={animal.name} />)
  }</div>;
};
```

## Available options

To know about all the options, check [Caravaggio documentation](https://caravaggio.ramielcreations.com).
