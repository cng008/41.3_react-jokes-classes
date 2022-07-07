# CheeZJokes App

We’ve built an app that lets people view and vote on cheesy jokes. To generate jokes, it uses the [ICanHazDadJoke API](https://icanhazdadjoke.com/api).

When the page loads, the application fetches 10 jokes, making sure that no joke appears more than once on the page.

The application lists the jokes, along with a “vote-up” button, a “vote-down” button, and the net score (up - down) for each joke. Users can vote, and the net score updates.

Right now, the application is written using hooks and function components. Let’s refactor the app to use class components.

[<img src="_images/jokes-demo.gif" width="700"/>](_images/jokes-demo.gif)

## Further Study

- [x] When jokes are loading, display a loading spinner or message notifying me that the jokes are being loaded. This should hide once the jokes have finished loading.
- [ ] Store the list of jokes, with votes in local storage. When users visit the app, it should show saved jokes, rather than fetching new jokes. However, the user should still be able to generate new jokes via the button, and these new jokes should replace the ones in local storage.
- [x] Add the ability to reset the vote counts by clicking on a button. This should also clear out local storage.
- [ ] Add the ability to “lock” a joke with a lock button, so that you can keep jokes on the page when you request new jokes.

## How to Run

    $ git clone https://github.com/cng008/41.3_react-jokes-classes.git
    $ npm install
    $ npm start
