---
title: How To React-Redux
subTitle: all things Redux with React
hashtag: redux store dispatch reducer
category: "Redux"
time: 15 min
castImage:
cover: a.png
---


Skip the why- link

Why Redux?

1) It's popular

When I was in school, Redux was mentioned as a state mangement tool. When I was networking with other developers, I heard more than one person say that Redux was required for their job. When I shadowed a company for a full stack position, Redux was used in their application. When I started this blog, Redux was used in the starter template. When I looked at React jobs, Redux was listed as a technology for almost every posting. In others Redux is a thing (It's a thing!)

And because it is a thing there are many great resources and tutorials!

2) It's easier (sometimes)

To understand why Redux makes life easier (someimes), we need to review some common ways to share info between React components.

Parent to Child

A) Traditional:

Define the prop as a class and pass to the child component(s) (Specialization). Or place a props.children into the child and pass any jsx to the child (Composition). Or create a prop to pass state to child components to dynamically render the child component (Render Prop).

B) Instance Method:

React allows you to create a 'ref' or reference to a function in a child component and then call that child function in the parent using the ref. The opposite can be done using the callbacks described below in Child to Parent.

C) Context API:

Pass data to an entire subtree. This mostly used for themes, logged in user information. Things that could be defined as global scope.

Child to Parent

A) Callbacks:

Create parent function to be executed by the child. Arguments inserted as a parameter of the function in the child. When the callback function is executed in the child, these arguments are passed to the parent.

B) Event Bubbling:

Add a div around a child component(s). Once the child component is executed, the event will be called in the parent.

Child to Child

Siblings:

If components need to share state or props, you could make them siblings by adding them to the render of a new parent component.

***

An object at the top level of all components that stores all copies of state from all component would create a single source of truth and make each state change accessible to all components! All previous copies of state saved in the store could be 'replayed' for debugging.

I give you **Redux!**

***

Any Direction

A) Event Emitter:

Utilizing the observer pattern, add-on libraries can listen and send data inbetween objects.

B) Higher Order Components (HOC):

These components return new components. Props from one one component could be passed to another (through props). For example, React Router and Relay use HOC.

C) Stores:

You could create your own global store object or even use the window. But Redux already has a store with built-in methods and a workflow designed for debugging.

Skip to Build and Burns!

When to Redux?

Some examples...themes, styling (presentational), or sharing state between components that are far apart in the component tree.

How to learn Redux?

On to the fun stuff....chaaaaa! Ninja kick!

Do not learn Redux with the redux-starter-kit! There are a few reasons...

1) The docs leave out a lot of code.
2) It's newer and not as popular.
3) The kit gives shortcuts that undermine Redux principles. For example...

Redux does not to want you to mutate state, but the redux-starter-kit allows you to mutate state by automagically creating a copy of state. This could be confusing especially for newbies. 

Learn the react-redux way first, then experiment with the redux-starter-kit.

What is Redux?

Parts

1) Store - global object holds all copies of state 
2) Reducer - function that depending on the action.type (if or switch statement) returns a new state. It's called a reducer because it 'reduces' state by going thru each slice of state with the action and returning one new state.
3) Action - object that has a type and payload property
4) Action Creator - function that returns action (used in place of setState() in components)

Setup

1. Store object is created by createStore(reducer, [preloadedState], [enhancer]) and added as a prop to Provider component which wraps the main App component. Store object can be created in an outside file and imported into index.js then added as prop to Provider.

2. Reducers are created to pass to createStore. If multiple reducers one must use combineReducers() to rootReducers.

3. Action creators are created to be dispatched to Store.

Basic Flow

Actions are called in components. Actions are dispatched to Store. Store sends Actions to Reducers. Reducers return a new state which is added to Store.

For super detailed step-by-step flow with cartoons.

Principles

1. Immutability: 

State is copied, not mutated.

2. Pure Functions: 

Reducers return a new state, Actions return a new action. Only use Redux function for their designated purpose.

3. Single Source of Truth: 

There is only one store.

Seems like a lot to remember, but you'll feel more comfortable after some build and burns.

Builds

Some use cases: views (mobile, @media, buyer, renter), saving searches, tracking clicks, navbars, sidebars, toggles (language, dark mode, font size), steps (if complete...show)

Let's make a dark mode toggle.

Lightening!

```
npx create-react-app my-app
cd my-app
npm start
```
You should see the React start-up page.

```
$ npm i react-redux
$ touch store.js
$ touch styling.js

```

You just reduxed! High five!

Pick one more example to try on your own. 

Now we'll combine a couple.

```
```

Here we are going to use a playback to see exactly what happened.


```
```


I hope this was a helpful guide. It really just touches the surface.

Common questions:

What is the difference between Context API and Redux?

Best explanation I've seen: link to article

What are some other Redux resources?

redux website

list of articles


Please come up with something more original they said...

Next post will be on Elm, Elixir, Crystal or Rust?

Comment below!

















 





