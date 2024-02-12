"use client";

import { usePathname } from "next/navigation";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Link = {
  name: string;
  rootHref: string;
  children: {
    name: string;
    href: string;
  }[];
};

const defaultLinks: Link[] = [
  {
    name: "Hello World",
    rootHref: "/Hello-World",
    children: [
      {
        name: "Getting Started",
        href: "/Hello-World/Getting-Started",
      },
      {
        name: "The Alphabet",
        href: "/Hello-World/The-Alphabet",
      },
      {
        name: "Your Roadmap",
        href: "/Hello-World/Roadmap",
      },
    ],
  },
  {
    name: "Genders",
    rootHref: "/Genders",
    children: [
      {
        name: "Genders",
        href: "/Genders/Genders",
      },
    ],
  },
  {
    name: "Articles (Der-Die-Das)",
    rootHref: "/Articles",
    children: [
      {
        name: "Articles",
        href: "/Articles/Articles",
      },
    ],
  },
  {
    name: "The Tivs (Grammatical Cases)",
    rootHref: "/The-Tivs",
    children: [
      {
        name: "The Nominative",
        href: "/The-Tivs/The-Nominative",
      },
      {
        name: "The Accusative",
        href: "/The-Tivs/The-Accusative",
      },
      {
        name: "The Dative",
        href: "/The-Tivs/The-Dative",
      },
      {
        name: "The Genitive",
        href: "/The-Tivs/The-Genitive",
      },
      {
        name: "Gramatical Cases Cheatsheet",
        href: "/The-Tivs/Cheatsheet",
      },
    ],
  },
  {
    name: "Vocabulary",
    rootHref: "/Vocabulary",
    children: [
      {
        name: "Shapes",
        href: "/Vocabulary/Shapes",
      },
    ],
  },
];

const flattenedLinks = defaultLinks.map((link) => link.children).flat();

export const linksContext = createContext<{
  links: Link[];
  nextLink?: Link["children"][0];
  prevLink?: Link["children"][0];
}>({
  links: [],
});

export const useLinks = () => useContext(linksContext);

export default function LinksProvider({ children }: PropsWithChildren) {
  const [nextLink, setNextLink] = useState<Link["children"][0]>();
  const [prevLink, setPrevLink] = useState<Link["children"][0]>();

  const path = usePathname();

  // set initial current link on initial load
  useEffect(() => {
    console.log("path", path);

    if (path === "/") {
      setPrevLink(undefined);
      setNextLink(flattenedLinks[0]);
    }

    const currentLink = flattenedLinks.find((link) => link.href === path);

    if (!currentLink) {
      return;
    }

    const currentLinkIndex = flattenedLinks.indexOf(currentLink);

    if (currentLinkIndex === 0) {
      // if at first link, there is no prev link
      setPrevLink(undefined);
    } else {
      setPrevLink(flattenedLinks[currentLinkIndex - 1]);
    }

    if (currentLinkIndex === flattenedLinks.length - 1) {
      // if at last link, there is no next link
      setNextLink(undefined);
    } else {
      setNextLink(flattenedLinks[currentLinkIndex + 1]);
    }

    return () => {
      setPrevLink(undefined);
      setNextLink(undefined);
    };
  }, [path]);

  return (
    <linksContext.Provider
      value={{
        links: defaultLinks,
        nextLink: nextLink,
        prevLink: prevLink,
      }}
    >
      {children}
    </linksContext.Provider>
  );
}
