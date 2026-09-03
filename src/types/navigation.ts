
/// HEADER ///

export type HeaderItem = {
    name: string;
    href: string;
};

export type headerType = HeaderItem[];

export type BurgerMenuType = {
  isVisible: boolean;
  toggleSideMenu: () => void;
};