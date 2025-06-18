# react-infinite-scroll-hook

![Build status](https://img.shields.io/github/actions/workflow/status/onderonur/react-infinite-scroll-hook/quality.yml)
![License](https://img.shields.io/npm/l/react-infinite-scroll-hook)
![Version](https://img.shields.io/npm/v/react-infinite-scroll-hook)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

This is a hook to create infinite scroll components!  
**Live demo is [here](https://onderonur.github.io/react-infinite-scroll-hook/).**

Basically, we need to set a `sentry` component to trigger infinite loading. When `sentry` becomes visible on the screen or it comes near to be visible (based on our config of course), it triggers infinite loading (by calling `onLoadMore` callback) all with the help of `IntersectionObserver`.

`sentry` should be some component which will **not** be unmounted as long as we want to keep the infinite scrolling observer **active**. For example, we can use a "loading" indicator as our sentry. The trick is, because that we want to keep the infinite scrolling observer active as long as there is a **next page**, we need to keep this "loading" component mounted even if we don't have a `loading` flag as `true`. This will also keep our layout more consistent and prevent flickering etc.

We don't need to use a "loading" component as the `sentry` and we can keep them separate too. It can be anything like some empty `div` or last item of your list etc. We just need to place it based on our scrolling direction. To bottom if we want to trigger loading when we scroll to bottom, to top if we want to trigger it when we scroll to top like a chat message box etc. Same approach can be used with horizontal scrolling too.

Please check below to find examples with different layouts and libraries.

**Note:** This package uses `IntersectionObserver` under the hood. You might want to check the browser compatibility from **[here](https://caniuse.com/intersectionobserver)** and if you want to support older browsers, you might need to use a polyfill.

## Versions

For **React v19**, it is recommended to use versions after `v6`, since it uses [cleanup functions for refs](https://react.dev/blog/2024/12/05/react-19#cleanup-functions-for-refs).

For older versions of React, you can stick with `v5` until you migrate to React 19.

## Installation

```sh
npm install react-infinite-scroll-hook
```

## Simple Example

```tsx
import useInfiniteScroll from 'react-infinite-scroll-hook';

function WindowScroll() {
  const { loading, items, hasNextPage, error, loadMore } = useLoadItems();

  const [infiniteRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    // When there is an error, we stop infinite loading.
    // It can be reactivated by setting "error" state as undefined.
    disabled: Boolean(error),
    // `rootMargin` is passed to `IntersectionObserver`.
    // We can use it to trigger 'onLoadMore' when the sentry comes near to become
    // visible, instead of becoming fully visible on the screen.
    rootMargin: '0px 0px 400px 0px',
  });

  return (
    <div>
      <List>
        {items.map((item) => (
          <ListItem key={item.key}>{item.value}</ListItem>
        ))}
      </List>
      {hasNextPage && <Loading ref={infiniteRef} />}
    </div>
  );
}
```

Or if we have a scrollable container and we want to use it as our "list container" instead of `document`, we just need to use `rootRef` like:

```tsx
import useInfiniteScroll from 'react-infinite-scroll-hook';

function VerticalElementScrollPage() {
  const { loading, items, hasNextPage, error, loadMore } = useLoadItems();

  const [infiniteRef, { rootRef }] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    // When there is an error, we stop infinite loading.
    // It can be reactivated by setting "error" state as undefined.
    disabled: Boolean(error),
    // `rootMargin` is passed to `IntersectionObserver`.
    // We can use it to trigger 'onLoadMore' when the sentry comes near to become
    // visible, instead of becoming fully visible on the screen.
    rootMargin: '0px 0px 400px 0px',
  });

  return (
    <Scrollable ref={rootRef}>
      <List>
        {items.map((item) => (
          <ListItem key={item.key}>{item.value}</ListItem>
        ))}
      </List>
      {hasNextPage && <Loading ref={infiniteRef} />}
    </Scrollable>
  );
}
```

## Other Examples

You can find different layout examples **[here](./apps/demo/src/app/)**. **[Live demo](https://onderonur.github.io/react-infinite-scroll-hook/)** contains all of these cases.

Also, we have more realistic examples with [SWR](https://github.com/onderonur/next-moviez) and [TanStack Query](https://github.com/onderonur/next-rickql) too.

## Arguments

| Name        | Description                                                                                      | Type         | Optional | Default Value |
| ----------- | ------------------------------------------------------------------------------------------------ | ------------ | -------- | ------------- |
| loading     | Some sort of "is fetching" info of the request.                                                  | boolean      | ❌       |               |
| hasNextPage | If the list has more items to load.                                                              | boolean      | ❌       |               |
| onLoadMore  | The callback function to execute when the 'onLoadMore' is triggered.                             | VoidFunction | ❌       |               |
| rootMargin  | We pass this to 'IntersectionObserver'. We can use it to configure when to trigger 'onLoadMore'. | string       | ✅       |               |
| disabled    | Flag to stop infinite scrolling. Can be used in case of an error etc too.                        | boolean      | ✅       |               |
| delayInMs   | How long it should wait before triggering 'onLoadMore' (in milliseconds).                        | number       | ✅       | 100           |

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://nl.linkedin.com/in/eugef"><img src="https://avatars0.githubusercontent.com/u/895071?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Eugene Fidelin</b></sub></a><br /><a href="https://github.com/onderonur/react-infinite-scroll-hook/commits?author=eugef" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Evanc123"><img src="https://avatars.githubusercontent.com/u/4010547?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Evan Cater</b></sub></a><br /><a href="https://github.com/onderonur/react-infinite-scroll-hook/commits?author=Evanc123" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/groomain"><img src="https://avatars.githubusercontent.com/u/3601848?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Romain</b></sub></a><br /><a href="#example-groomain" title="Examples">💡</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
