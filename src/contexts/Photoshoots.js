import {createContext, useContext} from "react";

/* Our shared space for the data from the APIs for the shoots */
const PhotoshootsCtx = createContext({ data: [] });
/* A shortcut to the component providing the data down the tree */
const PhotoshootsProvider = PhotoshootsCtx.Provider;
/* A shortcut to using this data for our purposes inside the pertinent components */
const usePhotoshoots = () => useContext(PhotoshootsCtx);

export { PhotoshootsCtx, PhotoshootsProvider, usePhotoshoots };