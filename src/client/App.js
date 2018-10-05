import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
/* 
// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.
const routes = [
  {
    path: "/",
    exact: true,
    sidebar: () => <div>home!</div>,
    main: () => <h2>Home</h2>
  },
  {
    path: "/bubblegum",
    sidebar: () => <div>bubblegum!</div>,
    main: () => <h2>Bubblegum</h2>
  },
  {
    path: "/shoelaces",
    sidebar: () => <div>shoelaces!</div>,
    main: () => <h2>Shoelaces</h2>
  }
];

const SidebarExample = () => (
  <Router>
    <div style={{ display: "flex" }}>
      <div
        style={{
          padding: "10px",
          width: "40%",
          background: "#f0f0f0"
        }}
      >
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/bubblegum">Bubblegum</Link>
          </li>
          <li>
            <Link to="/shoelaces">Shoelaces</Link>
          </li>
        </ul>

        {routes.map((route, index) => (
          // You can render a <Route> in as many places
          // as you want in your app. It will render along
          // with any other <Route>s that also match the URL.
          // So, a sidebar or breadcrumbs or anything else
          // that requires you to render multiple things
          // in multiple places at the same URL is nothing
          // more than multiple <Route>s.
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.sidebar}
          />
        ))}
      </div>

      <div style={{ flex: 1, padding: "10px" }}>
        {routes.map((route, index) => (
          // Render more <Route>s with the same paths as
          // above, but different components this time.
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        ))}
      </div>
    </div>
  </Router>
); */

const SideBar = () => (
  <div id="cm-menu">
    <nav className="cm-navbar cm-navbar-primary">
      <div className="cm-flex">
        <div className="cm-logo" />
      </div>
      <div className="btn btn-primary md-menu-white" data-toggle="cm-menu" />
    </nav>
    <div id="cm-menu-content">
      <div id="cm-menu-items-wrapper">
        <div id="cm-menu-scroller">
          <ul className="cm-menu-items">
            <li className="active">
              <a href="#" className="sf-house">
                Home
              </a>
            </li>
            <li>
              <a href="answer_items.html" className="sf-window-system">
                Answer items
              </a>
            </li>
            <li>
              <a href="answer_codes.html" className="sf-file-code">
                Answer codes
              </a>
            </li>
            <li>
              <a href="answer_variables.html" className="sf-sign-sync">
                Answer variables
              </a>
            </li>
            <li>
              <a href="commands.html" className="sf-notepad">
                Commands
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const Header = (
  <header id="cm-header">
    <nav className="cm-navbar cm-navbar-primary">
      <div className="cm-flex">
        <h1>Home</h1>
      </div>
    </nav>
  </header>
);

const Content = <div id="global">Hello it is me</div>;

const SidebarExample = () => (
  <React.Fragment>
    <div>Said</div>
  </React.Fragment>
);

export default SidebarExample;
