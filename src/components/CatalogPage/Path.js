import React from "react";

class Path extends React.PureComponent {
    state = {  }
    render() { 
        const { path, pathFirst } = this.props;
        return  <div className ="path-cata">
              {`${pathFirst} / ${path}`}
        </div>;
    }
}
 
export default Path;