# react-infinite-scroll-hook

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

🔨 Under construction 🛠  
Will release soon :)

This is a hook to create infinite scroll components!  
It has a really basic logic that solved a lot of problems for me. So, I just wanted to publish it as a package.

Basically;  
`useInfiniteScroll` hook checks the DOM with an interval and looks at the distance between the bottom of your "infinite" component and the bottom of the window.  
You can set `scrollContainer` prop to `parent` if you want to use the scrollable parent of that infinite container and not the window.

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo
[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package
[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
