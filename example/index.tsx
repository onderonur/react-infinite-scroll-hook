import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import InfiniteList from './InfiniteList';
import styled from 'styled-components';

interface ListContainerProps {
  scrollable: boolean;
}

const ListContainer = styled.div<ListContainerProps>`
  max-height: ${(props) => (props.scrollable ? '600px' : 'auto')};
  max-width: ${(props) => (props.scrollable ? '600px' : 'auto')};
  overflow: auto;
  background-color: #e4e4e4;
`;

const Footer = styled.div`
  height: 600px;
  background-color: yellow;
`;

function App() {
  const [scrollParent, setScrollParent] = React.useState(false);

  function handleChange(e) {
    const checked = e.target.checked;
    setScrollParent(checked);
  }

  return (
    <React.Fragment>
      <h1>Infinite List</h1>
      <h3>Created by using “react-infinite-scroll-hook”</h3>
      <input type="checkbox" checked={scrollParent} onChange={handleChange} />
      Scrollable Parent
      <ListContainer scrollable={scrollParent}>
        <InfiniteList scrollContainer={scrollParent ? 'parent' : 'window'} />
      </ListContainer>
      <Footer>Footer</Footer>
    </React.Fragment>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
