'use client';

import React from 'react';
import NextLink from 'next/link';
import { usePathname, useParams as useNextParams, useSearchParams as useNextSearchParams } from 'next/navigation';

export interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to?: string;
  href?: string;
  children?: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, href, children, ...props }, ref) => {
    const destination = href || to || '#';
    return (
      <NextLink ref={ref} href={destination} {...props}>
        {children}
      </NextLink>
    );
  }
);
Link.displayName = 'Link';

export function useLocation() {
  const pathname = usePathname() || '/';
  return {
    pathname,
    search: '',
    hash: '',
    state: null,
    key: 'default',
  };
}

export function useParams<T extends Record<string, string | string[]>>() {
  return (useNextParams() || {}) as T;
}

export function useSearchParams() {
  const searchParams = useNextSearchParams();
  return [searchParams, () => {}] as const;
}

export default Link;
