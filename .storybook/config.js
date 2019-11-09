import { addDecorator, configure } from '@storybook/react';
import React from "react";
import App from "../src/components/layouts/App";

addDecorator(storyFn => (
    <App>{storyFn()}</App>
))

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.js$/), module);
