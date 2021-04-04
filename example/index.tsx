import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import InfiniteListSimple from './components/InfiniteListSimple';
import InfiniteListWithVerticalScroll from './components/InfiniteListWithVerticalScroll';
import InfiniteListWithHorizontalScroll from './components/InfiniteListWithHorizontalScroll';
import styled from 'styled-components';
import InfiniteListWithReverseVerticalScroll from './components/InfiniteListWithReverseVerticalScroll';
import InfiniteListWithReverseHozirontalScroll from './components/InfiniteListWithReverseHozirontalScroll';

const Label = styled.label`
  font-weight: 600;
  > * {
    margin-left: 8px;
  }
`;

// eslint-disable-next-line no-shadow
enum InfiniteListType {
  SIMPLE,
  VERTICAL_SCROLL,
  HORIZONTAL_SCROLL,
  REVERSE_VERTICAL_SCROLL,
  REVERSE_HORIZONTAL_SCROLL,
}

function App() {
  const [listType, setListType] = React.useState<InfiniteListType>(
    InfiniteListType.SIMPLE,
  );

  let InfiniteList;

  switch (listType) {
    case InfiniteListType.VERTICAL_SCROLL:
      InfiniteList = InfiniteListWithVerticalScroll;
      break;
    case InfiniteListType.HORIZONTAL_SCROLL:
      InfiniteList = InfiniteListWithHorizontalScroll;
      break;
    case InfiniteListType.REVERSE_VERTICAL_SCROLL:
      InfiniteList = InfiniteListWithReverseVerticalScroll;
      break;
    case InfiniteListType.REVERSE_HORIZONTAL_SCROLL:
      InfiniteList = InfiniteListWithReverseHozirontalScroll;
      break;
    default:
      InfiniteList = InfiniteListSimple;
  }

  return (
    <>
      <h1>Infinite List</h1>
      <h3>Created by using “react-infinite-scroll-hook”</h3>
      <Label htmlFor="listType">
        List Type
        <select
          id="listType"
          value={listType}
          onChange={(e) => {
            setListType(parseInt(e.target.value));
          }}
        >
          <option value={InfiniteListType.SIMPLE}>Simple List</option>
          <option value={InfiniteListType.VERTICAL_SCROLL}>
            Vertically Scrollable List
          </option>
          <option value={InfiniteListType.HORIZONTAL_SCROLL}>
            Horizontally Scrollable List
          </option>
          <option value={InfiniteListType.REVERSE_VERTICAL_SCROLL}>
            Reversed Vertically Scrollable List
          </option>
          <option value={InfiniteListType.REVERSE_HORIZONTAL_SCROLL}>
            Reversed Horizontally Scrollable List
          </option>
        </select>
      </Label>
      <InfiniteList />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
