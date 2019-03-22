---
title: React
---

Start up:

```
$ npx create-react-app my-app
$ cd my-app
$ npm start
```
Component lifecycle: Mount -> Update -> Unmount

Mounting methods:

```javascript
constructor()
static getDerivedStateFromProps()
render()
componentDidMount()
```

State management:
- Redux
- local state
- Relay
- Context api
- Hooks
- Apollo
- Mobx


Async calls:

```javascript

state = {
    people: ''
    fetching: true
}

async componentDidMount() {
    const linksResponse = await fetch(`${baseURL}/api`)
    const linksJson = await LinksResponse.json()
    const peopleResponse = await fetch(LinksJson.peopleHref)
    const peopleJson = await peopleResponse.json()
    this.setState(PrevState => ({
        ...PrevState,
        people: normalize(peopleJson.people)
    }))

    Or 

    selectPerson = async (id) => {
        //set state.fetching = true
        //await fetch
        //set state.fetching = false
    }
}

{this.state.fetching ? this.spinner() : <div>this.state.people<div> }
```
