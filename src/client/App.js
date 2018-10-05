import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
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
            <li>
              <NavLink
                to="/"
                exact
                className="sf-house"
                activeClassName="active"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/codes"
                exact
                className="sf-file-code"
                activeClassName="active"
              >
                Answer codes
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const Header = () => (
  <header id="cm-header">
    <nav className="cm-navbar cm-navbar-primary">
      <div className="cm-flex">
        <h1>Home</h1>
      </div>
    </nav>
  </header>
);

const Home = () => (
  <div id="global">
    <div className="anchor" id="a0" />

    <div className="container-fluid cm-container-white">
      <div className="input-group input-group-lg">
        <input type="text" className="form-control" placeholder="Search ..." />
        <span className="input-group-btn">
          <button
            style={{ zIndex: 2 }}
            className="btn btn-primary md-search-white"
            type="button"
          >
            &nbsp;&nbsp;&nbsp;&nbsp;
          </button>
        </span>
      </div>
      <br />
      Hello Home
    </div>
  </div>
);

const Codes = () => (
  <div id="global">
    <div className="anchor" id="a0" />

    <div className="container-fluid cm-container-white">
      <b>Hello Codes</b>
    </div>
  </div>
);

const CurrentTab = () => (
  <React.Fragment>
    <Route path="/" exact component={Home} />
    <Route path="/codes" exact component={Codes} />
  </React.Fragment>
);

const SidebarExample = () => (
  <Router>
    <React.Fragment>
      <SideBar />
      <Header />
      <CurrentTab />
    </React.Fragment>
  </Router>
);

export default SidebarExample;
