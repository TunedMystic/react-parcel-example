import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {
	BrowserRouter as Router,
	Route,
	Link,
} from 'react-router-dom'


// getComponent is a function that returns a promise for a component
// It will not be called until the first mount
// https://gist.github.com/acdlite/a68433004f9d6b4cbc83b5cc3990c194
function asyncComponent(getComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(Component => {
          AsyncComponent.Component = Component
          this.setState({ Component })
        })
      }
    }
    render() {
      const { Component } = this.state
      if (Component) {
        return <Component {...this.props} />
      }
      return null
    }
  }
}

const routes = [
	{
		path: '/home',
		component: asyncComponent(() => import('./home').then(x => x.default))
	},
  {
    path: '/',
    exact: true,
    component: asyncComponent(() => import('./dashboard').then(x => x.default))
  },
]

const App = () => (
  <Router>
			<div>
				{routes.map((route, i) => <Route key={i} {...route} />)}
			</div>
	</Router>
);

ReactDOM.render(<App />, document.getElementById('root'));

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
