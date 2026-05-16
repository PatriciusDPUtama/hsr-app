import { Element } from "./element";
import { Path } from "./path";

export type Character = {
    id: string;
    name: string;
    rarity : number;
    element: Element;
    path: Path;
    image: string;
};