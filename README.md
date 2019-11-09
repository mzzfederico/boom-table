# boom-table

## Starting the project

Hello to everyone who will review this repository. I'll be commenting on my choices and thoughts from here onwards and pointing out what I will and will not use.

### Bootstraping the app

Since we're time costrained and it's not really a critical choice in the grand scheme of things, I'll just use `create-react-app` to inizialize this project. I've written a number of webpack configurations in the past but it's a time consuming part of a project, that often leads to try and errors because of the complicated schema required - even staring at the documentation. Some projects had me write for example simple translations from ES8 to ES5 just so I could inject widgets made with React around, or libraries that I could use to do stuff in the background but relying on a modern syntax and new features, which quickens the task. I even used it to make web workers.

I'll be installing my usual libraries of choice, `react-router` and `react-intl`, just to handle localization and routing. Perhaps I will not need them until later but it's a safe bet.

More importantly, I'll be installing `storybook` with a React configuration. It's a killer app for front end developers and designers working on the same project, because it can allow us to test components, views and more in isolation and make visual inspections easier. It's also full of useful addons and it integrates well with docs, tests, and more.

I will _not_ install Redux. While I see that you use it internally and I'm sure it serves you well, in this project it would be just overkill and an incredible amount of sofistication for a bunch of reducers! In a post React Hooks world, contexts & `useReducers` seriously simplified the handling of global states without the need for decorators and magic functions people don't really know 100% what they do. Storing a controlled state in a context is a very simple thing to reasonate around, and I feel like it's the best choice just so to isolate the state and data needs for each branch of our app. But it's not like I hate Redux of course! I've also been eyeing xState these days, since it brings the whole redux paradigm to a higher level by introducing a finite state machine to our components.

To test our stuff, I'll use `Jest`. No particular reason; most test frameworks are pretty much the same in terms of features and ideas. It's pointless to fight over it - especially when people always (but shouldn't) skip them regardless. I'll be aiming to test my reducers and util functions here, while also doing basic checks on the components. Storybook also does a great job to help us check for regressions and more. On the editor side of things, `ESLint` is just the only good answer right now to my linter necessities.

Handling my style, there's `styled-jsx`. It's pretty easy to reason around, and it follows the whole CSS in JS craze. I also like, however, to just use SASS and bundle it up, because it's just more accessible and easier to introduce to designers who still aren't all in on JavaScript doing all the work. Last but not least, if the app calls for it and I have time, I'll install `framer-motion` and do some animation tricks, which are faster than plain CSS animations to write when you only have your weekend to work on a project. ;)
