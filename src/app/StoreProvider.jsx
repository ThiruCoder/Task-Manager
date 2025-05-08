'use client'

import { Provider } from "react-redux"
import { store } from "./ReduxSection/ReduxStore/ReduxStore"
import createCache from '@emotion/cache';

function StoreProvider({ children }) {
    return <Provider store={store}>{children}</Provider>
}

function createEmotionCache() {
    return createCache({ key: 'css', prepend: true });
}

export { StoreProvider, createEmotionCache }