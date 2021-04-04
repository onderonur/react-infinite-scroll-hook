# react-infinite-scroll-hook

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

This is a hook to create infinite scroll components!  
**Live demo is [here](https://onderonur.github.io/react-infinite-scroll-hook/).**

Before **v4**, `useInfiniteScroll` hook would basically check the DOM with an interval and look at the distance between the bottom of your "infinite" component and the bottom of the window. This was a simple solution. But it had its difficulties. It was not so easy to change the layout of your "infinite" component (like creating a chat message box with inverted scrolling etc). It was a requirement to modify the package based on each different use case.

And also, checking the DOM with an interval by using `setInterval` wasn't a sophisticated solution. It was enough, but it had it's limits.
With **v4**, we migrated to use `IntersectionObserver` and created a much more flexible API to support different design. Basically, now we have a little bit more [inversion of control](https://kentcdodds.com/blog/inversion-of-control).

Basically, we need to set a `sentry` component to trigger infinite loading. When `sentry` becomes visible on the screen, or it comes near (based on our config of course), it triggers infinite loading all with the help of `IntersectionObserver`. So, we can make components with different layouts like an inverted scrolling chat message box, horizontal scrolling etc.

**Note:** This package uses `IntersectionObserver` under the hood. You might want to check the browser compatibility from **[here](https://caniuse.com/intersectionobserver)** and if you want to support older browsers, you might need to use a polyfill.

If you want to use the older version which is using `setInterval`, you can find it **[here](https://github.com/onderonur/react-infinite-scroll-hook/tree/v3)**.

### Installation

```sh
npm install react-infinite-scroll-hook
```

### Simple Example

```javascript
import useInfiniteScroll from 'react-infinite-scroll-hook';

function SimpleInfiniteList() {
  const { loading, items, hasNextPage, error, loadMore } = useLoadItems();

  const [infiniteRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    // When there is an error, we stop infinite loading.
    // It can be reactivated by setting "error" state as undefined.
    disabled: !!error,
    // `rootMargin` is passed to `IntersectionObserver`.
    // We can use it to trigger 'onLoadMore' when the sentry comes near to become
    // visible, instead of becoming fully visible on the screen.
    rootMargin: '0px 0px 400px 0px',
  });

  return (
    <List>
      {items.map((item) => (
        <ListItem key={item.key}>{item.value}</ListItem>
      ))}
      {/* 
          As long as we have a "next page", we show "Loading" right under the list.
          When it becomes visible on the screen, or it comes near, it triggers 'onLoadMore'.
          This is our "sentry".
          We can also use another "sentry" which is separated from the "Loading" component like:
            <div ref={infiniteRef} />
            {loading && <ListItem>Loading...</ListItem>}
          and leave "Loading" without this ref.
      */}
      {hasNextPage && (
        <ListItem ref={infiniteRef}>
          <Loading />
        </ListItem>
      )}
    </List>
  );
}
```

Or if we have a scrollable container and we want to use it as our "list container" instead of `document`, we just need to use `rootRef` like:

```js
function InfiniteListWithVerticalScroll() {
  const { loading, items, hasNextPage, error, loadMore } = useLoadItems();

  const [infiniteRef, { rootRef }] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: !!error,
    rootMargin: '0px 0px 400px 0px',
  });

  return (
    <ListContainer
      // This where we set our scrollable root component.
      ref={rootRef}
    >
      <List>
        {items.map((item) => (
          <ListItem key={item.key}>{item.value}</ListItem>
        ))}
        {hasNextPage && (
          <ListItem ref={infiniteRef}>
            <Loading />
          </ListItem>
        )}
      </List>
    </ListContainer>
  );
}
```

You can find different layout examples **[here](https://github.com/onderonur/react-infinite-scroll-hook/tree/master/example/examples)**. **[Live demo](https://onderonur.github.io/react-infinite-scroll-hook/)** contains all of these cases.

## Arguments

| Name        | Description                                                                                      | Type         | Optional | Default Value |
| ----------- | ------------------------------------------------------------------------------------------------ | ------------ | -------- | ------------- |
| loading     | Some sort of "is fetching" info of the request.                                                  | boolean      | ❌       |               |
| hasNextPage | If the list has more items to load.                                                              | boolean      | ❌       |               |
| onLoadMore  | The callback function to execute when the 'onLoadMore' is triggered.                             | VoidFunction | ❌       |               |
| rootMargin  | We pass this to 'IntersectionObserver'. We can use it to configure when to trigger 'onLoadMore'. | string       | ✅       |               |
| disabled    | Flag to stop infinite scrolling. Can be used in case of an error etc too.                        | boolean      | ✅       |               |
| delayInMs   | How long it should wait before triggering 'onLoadMore'.                                          | number       | ✅       | 100           |

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo
[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package
[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://nl.linkedin.com/in/eugef"><img src="https://avatars0.githubusercontent.com/u/895071?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Eugene Fidelin</b></sub></a><br /><a href="https://github.com/onderonur/react-infinite-scroll-hook/commits?author=eugef" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Evanc123"><img src="https://avatars.githubusercontent.com/u/4010547?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Evan Cater</b></sub></a><br /><a href="https://github.com/onderonur/react-infinite-scroll-hook/commits?author=Evanc123" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
