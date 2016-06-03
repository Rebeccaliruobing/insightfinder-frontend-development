import React from 'react';
import {Console, Link} from '../../artui/react';
import {Route, IndexRedirect, IndexRoute} from 'react-router';

import Navbar   from './navbar';
import ListAll  from './list-all/index';
import Search   from './search/index';
import Explore  from './explore/index';

export class UseCase extends React.Component {
  render() {
    return (
      <Console.Wrapper>
        <Navbar/>
        {this.props.children}
      </Console.Wrapper>
    )
  }
}

// export const useCaseRoute = (
//   <Route component={UseCase} path="usecase">
//     <IndexRoute component={ListAll}/>
//     <Route path="list-all" component={ListAll}/>
//   </Route>
// );

export const useCaseRoute = (
  <Route component={UseCase} path="usecase">
    <IndexRoute component={ListAll}/>
    <Route path="list-all" component={ListAll}/>
    <Route path="list-some" component={ListAll}/>
    <Route path="search" component={Search}/>
    <Route path="explore" component={Explore}/>
  </Route>
);