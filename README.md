# React Component Resize Observer

Performant component resize observer

## Install

```
npm install react-component-resize-observer --save
```

## Demo

[http://weyforth.github.io/react-component-resize-observer/](http://weyforth.github.io/react-component-resize-observer/)

## Usage

```js
import React from 'react';
import ReactDOM from 'react-dom';
import ResizeObserver from 'react-component-resize-observer';

class App extends React.Component {
    render() {
        return (
            <ResizeObserver
                tag={string}
                onResize={func}
            >
                your contents here...
            </ResizeObserver>
        );
    }
}

ReactDOM.render(<App />, document.body);
```

## License

MIT.
