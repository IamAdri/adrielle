import { atom } from "jotai";
//Define number of items per page with jotai atoms
const sliceStartAtom = atom(0);
const sliceEndAtom = atom(8);
const currentPageAtom = atom(1);

export { sliceStartAtom, sliceEndAtom, currentPageAtom };
