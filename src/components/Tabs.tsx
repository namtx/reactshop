import * as React from "react";

interface IState {
  activeName: string;
  activeContent: React.ReactNode;
}

interface ITabProps {
  name: string;
  heading: () => JSX.Element | string;
  initialActive?: boolean;
}

interface ITabsContext {
  activeName?: string;
  handleTabClick?: (name: string, activeContent: React.ReactNode) => void;
}

const TabsContext = React.createContext<ITabsContext>({});

class Tabs extends React.Component<{}, IState> {
  public static Tab: React.SFC<ITabProps> = props => (
    <TabsContext.Consumer>
      {(context: ITabsContext) => {
        if (!context.activeName && props.initialActive) {
          if (context.handleTabClick) {
            context.handleTabClick(props.name, props.children);
            return null;
          }
        }
        const activeName = context.activeName
          ? context.activeName
          : props.initialActive
          ? props.name
          : "";
        const handleTabClick = (e: React.MouseEvent<HTMLLIElement>) => {
          if (context.handleTabClick) {
            context.handleTabClick(props.name, props.children);
          }
        };

        return (
          <li
            onClick={handleTabClick}
            className={props.name === activeName ? "active" : ""}
          >
            {props.heading()}
          </li>
        );
      }}
    </TabsContext.Consumer>
  );

  private handleTabClick = (name: string, activeContent: React.ReactNode) => {
    this.setState({ activeName: name, activeContent: activeContent });
  };

  public render() {
    return (
      <TabsContext.Provider
        value={{
          activeName: this.state ? this.state.activeName : "",
          handleTabClick: this.handleTabClick
        }}
      >
        <ul className="tabs">{this.props.children}</ul>
        <div>{this.state && this.state.activeContent}</div>
      </TabsContext.Provider>
    );
  }
}

export default Tabs;
