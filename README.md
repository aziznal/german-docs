# German Docs

This is a personal project of mine meant to help me kill two birds with one stone
by both using NextJS, tailwind, and Vercel to rapidly build and deploy a website,
while at the same time learning German.

**Production domain:** https://german-docs.aziznal.com

**Development domain:** https://german-docs.dev.aziznal.com

## What is this exactly?

This is a work in progress meant for me to document my German learning.

Learning languages is pretty hard, so I decided to add to it something I love with
a passion: Building Software!

I also wanted to flex my web-dev muscles a bit by using NextJS, to which I was
still fairly new, to build the site and Vercel to host it. Combined with
tailwindcss, radix-ui, and a bunch of coffee, I was able to release a working version in
~20 hours of on and off work during a weekend.

## Features

- SSR (Server-Side Rendering)
- Writing content in markdown
- Automatically generated sidebar links based on available markdown content
- Fully responsive layout which works on both desktop and mobile screens
- Dark / Light mode

## Upcoming Features

The below list has the top priority item on the top:

1. [ ] Fuzzy search using the searchbar
2. [ ] Ability to add contributions more easily
3. [ ] Seeing recent searches

## Design Inspiration

I've always been a fan of how the documentation of the NestJS backend framework was.
I find them easy to go through and well laid out. At the same time, I've always
struggled reading through sites which talk about the Grammar of a language.

The genius idea that popped into my head was to make a documentation website just like
NestJS but for language learning.

Naturally, the design is heavily based on the NestJS documentation website [found here](https://docs.nestjs.com).

The entire design and all features were implemented by me.

---

## About the Project

This is a NextJS app bootstrapped using create-next-app

### Running locally

Clone the repo and run the following commands:

```bash
npm install
npm run dev
```

### Building

Run the following command:

```bash
npm run build
```

### Deploying

To deploy the project on Vercel, simply push to `main` or `develop`.

Pushing to main will deploy on the [german-docs.aziznal.com](https://german-docs.aziznal.com)
domain, while pushing to develop will deploy on the
[german-docs.dev.aziznal.com](https://german-docs.dev.aziznal.com) domain.

### Creating the Search index

To enable the searchbar to work, an index of the markdown files must be created.

I'm working on creating a JS script to do this and keep the index out of git history,
but for now it's done manually by importing the build script into the main layout and having
it run once, like so:

```tsx
// ...
import { buildSearchIndex } from "@/lib/search";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  buildSearchIndex();

  return (
    // ...
  );
}
```

Once the search index is built, these changes are undone to prevent the script
from being built on every request.

Again, this is by no means a production-ready way of doing things and I'm working on
making a proper solution.

---

## Contribution

Any contributions are more than welcome! There are two ways you can contribute to this project:

### Technical Contributions

Technical contributions are where you can improve the code-base, fix a bug, or 
even add a new feature.

To do this, fork this repository, implement your changes, then open a pull request
to this repo. It's a good idea to start with an issue first so discussions can be had!

### Contributions to the Documentation

Contributions to the docs are still not very easily doable as of now, though
this is something I plan on tackling. Since everything is written in markdown,
it should be fairly easy to add, change, or remove something.

For now, you can either open an issue in the repository or contact me directly
at [aziznal.dev@gmail.com](mailto:aziznal.dev@gmail.com)

