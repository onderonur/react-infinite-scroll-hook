# react-infinite-scroll-hook

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

This is a hook to create infinite scroll components!  
It has a really basic logic that solved a lot of problems for me. So, I just wanted to publish it as a package.

**Live demo is [here](https://onderonur.github.io/react-infinite-scroll-hook/).**  
Also, you can find a more complete usage with **react-apollo** [here](https://github.com/onderonur/movies-app-graphql).

Basically; `useInfiniteScroll` hook checks the DOM with an interval and looks at the distance between the bottom of your "infinite" component and the bottom of the window.  
You can set `scrollContainer` prop to `parent` if you want to use the scrollable parent of that infinite container and not the window. With this setting, when the parent component is in view, the hook will check the bottom offset and trigger the `onLoadMore` callback if offset is less than `threshold`.

While setting the interval, we use another custom hook named `useInterval` and it makes the `setInterval` declarative. It has been explained by Dan Abramov [here](https://overreacted.io/making-setinterval-declarative-with-react-hooks/).

### Installation

```sh
npm install react-infinite-scroll-hook
```

### Basic Usage

```javascript
import useInfiniteScroll from 'react-infinite-scroll-hook';

function InfiniteList({}) {
  const [items, setItems] = useState([]);
  const [hasNextPage, setHasNextPage] = useState();

  /// ...

  function handleLoadMore() {
    setLoading(true);
    // Some API call to fetch the next page
    loadNextPage(endCursor, pageSize).then((newPage) => {
      setLoading(false);
      setHasNextPage(newPage.hasNextPage);
      setItems([...items, newPage.items]);
    });
  }

  const infiniteRef = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: handleLoadMore,
    scrollContainer,
  });

  // ...

  return (
    <List ref={infiniteRef}>
      {items.map((item) => (
        <ListItem key={item.key}>{item.value}</ListItem>
      ))}
      {loading && <ListItem>Loading...</ListItem>}
    </List>
  );
}
```

### Props

- **loading:** Some sort of "fetching" info of the request.
- **hasNextPage:** If the list has more items to load.
- **onLoadMore:** The callback function to execute when the threshold is exceeded.
- **threshold:** Maximum distance to bottom of the window/parent to trigger the callback. Default is 150.
- **checkInterval:** Frequency to check the dom. Default is 200.
- **scrollContainer:** May be `"window"` or `"parent"`. Default is `"window"`. If you want to use a scrollable parent for the infinite list, use `"parent"`.

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
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
