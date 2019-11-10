# boom-table

## Starting the project

Hello to everyone who will review this repository. I'll be commenting on my choices and thoughts from here onwards and pointing out what I will and will not use.

## Bootstraping the app

Since we're time costrained and it's not really a critical choice in the grand scheme of things, I'll just use `create-react-app` to inizialize this project. I've written a number of webpack configurations in the past but it's a time consuming part of a project, that often leads to try and errors because of the complicated schema required - even staring at the documentation. Some projects had me write for example simple translations from ES8 to ES5 just so I could inject widgets made with React around, or libraries that I could use to do stuff in the background but relying on a modern syntax and new features, which quickens the task. I even used it to make web workers.

I'll be installing my usual libraries of choice, `react-router` and `react-intl`, just to handle localization and routing. Perhaps I will not need them until later (ndF: yeah, I really didn't have the time or will for such a small example.) but it's a safe bet.

More importantly, I'll be installing `storybook` with a React configuration. It's a killer app for front end developers and designers working on the same project, because it can allow us to test components, views and more in isolation and make visual inspections easier. It's also full of useful addons and it integrates well with docs, tests, and more.

I will _not_ install Redux. While I see that you use it internally and I'm sure it serves you well, in this project it would be just overkill and an incredible amount of sofistication for a bunch of reducers! In a post React Hooks world, contexts & `useReducers` seriously simplified the handling of global states without the need for decorators and magic functions people don't really know 100% what they do. Storing a controlled state in a context is a very simple thing to reasonate around, and I feel like it's the best choice just so to isolate the state and data needs for each branch of our app. But it's not like I hate Redux of course! I've also been eyeing xState these days, since it brings the whole redux paradigm to a higher level by introducing a finite state machine to our components.

To test our stuff, I'll use `Jest`. No particular reason; most test frameworks are pretty much the same in terms of features and ideas. It's pointless to fight over it - especially when people always (but shouldn't) skip them regardless. I'll be aiming to test my reducers and util functions here, while also doing basic checks on the components. Storybook also does a great job to help us check for regressions and more. On the editor side of things, `ESLint` is just the only good answer right now to my linter necessities.

Handling my style, there's `styled-jsx`. It's pretty easy to reason around, and it follows the whole CSS in JS craze. I also like, however, to just use SASS and bundle it up, because it's just more accessible and easier to introduce to designers who still aren't all in on JavaScript doing all the work. Last but not least, if the app calls for it and I have time, I'll install `framer-motion` and do some animation tricks, which are faster than plain CSS animations to write when you only have your weekend to work on a project. ;)

## Building our main table

Ok, once I've initialized our app, storybook, some example tests and created an initial folder structure, I'll start working on our star of the show (the week timetable). I'll start by creating a branch of course. Next, I'll create a new story and add the component folder, while also dropping my thoughts here. I usually create a folder to store all the stuff pertaining to a feature next to it; this includes stylesheets, tests, utilities, hooks, and so on.

Since your request is to build a table with the number of photos for each day and client and so on, I assume that you intend the API to represent a sample week of work.

I'll put the days at the top in the columns, and display the shoots under them. They will be ordered by id (as I would guess that those are incremental) and since our query parameters are quite limited, there won't be an option to reverse.

The table will have multiple modes. First, I built the view by photoshoot. Next, the view by client, and then, the one by event type.

The API unfortunately doesn't provide a way to query by event, client or so, so I'm organizing the data on my end for now. In real project, I would've queried the clients, and built a dynamic scrolling loading list.

## Observations on the API

Unfortunately the data about photoshoot comes in two sets of items. While I would've definitely had to query separately for in-depth info about photoshots, the fact that we have to display sums for each of our data objects which aren't actually provided (dates, clients and types of photoshoots) makes it difficult to deal with different sets of data being parallel to each other. So for now, I just called both and mapped the details to the generic info.

The data fetching is handled by a nice reimplementation of `axios` called `ky`, which has become my favorite way to do requests. It has a good amount of features and well replaces `axios`, which is now pretty much abandoned. I'm doing the calls with a simple effect, which is dispatching our actions to handle the state; which, by itself, is stored in a context at the top, so that it is shared between routes. I created a number of helper variables to make my source speak a little bit more like our business specs.

## Regrets in the second day

While giving it a bit of a responsiveness at the end of the excercize, I realize that I would've probably did a better job, instead of mapping and declearing elements, to just add in a function that defines a column, takes in the component to display the single cell, the header, and a formatting function that would get the data from a messy bunch to a reasonable format.

```jsx
    // pseudocode
    function DataColumn ({header = "", CellComponent, formatFn, totalFn, dataset = []}) {
        const dataColumn = formatFn(dataset);
        return (
            <React.Fragment>
                <HeaderCell label={header} />
                {dataColumn.map(cellData => <CellComponent {...cellData} />)}
                <CellComponent {...totalFn(dataset)} />
            </React.Fragment>
        )
    }
```

I'm now nearing the end of my time doing this so I'll see if I can implement it without too much hassle. 

I'm also handling the responsive for last while I should've started it at the beginning probably, but it's pretty basic anyway. Tables are really the hardest kind of element to display on a mobile phone, so I will have them scroll horizontally. I ended up making their content smaller, then added in a small animation.

## Closing thoughts

So, at the end of the process, I have a couple thoughts.

- I'm still very weak at writing tests, I have yet to learn some proper TDD.
- It's really hard to make up and build an UI without collaborating actively with a designer and a pregress design system around which I wrap my project. In a real business situation, I'd expect a designer to provide use cases and more, and to work together on a solution, if there isn't already a design system in place. Most of the work on a real interface would be already be done by the time we're at the step of implementing the end result. We would sit down and build the library if it is not present, or we're at risk of writing more code and leaving around stuff we won't actually mantain in the long term.
- A good user interface would also be very deterministic and data driven, and such a thing would be impossible without strict collaboration with the back end. In particular, it needs some sort of meta informations if we were to implements a dashboard of sort that gives the entire picture for a time frame, without the need for multiple queries. Even better, let the UI call for the data it needs with a solution like GraphQL.

---

All said and done, you can run the project by doing `yarn start`, or run the tests with `yarn test`.
