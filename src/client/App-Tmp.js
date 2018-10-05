import "./assets/css/*";

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
    <nav className="cm-navbar cm-navbar-primary" style="z-index:49">
      <div className="cm-flex">
        <h1>Home</h1>
      </div>
    </nav>
  </header>
);

const Content = <div id="global">Hello it's me</div>;
