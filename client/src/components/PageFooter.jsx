import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from 'react-router-dom';

class PageFooter extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className = "Footer">
        FOOTER
      </div>
    );
  }
}

export default PageFooter;