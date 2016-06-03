import React from 'react';
import {Console, Accordion, Link, IndexLink} from '../../artui/react';

export default function (props) {
  return (
    <Console.Navbar>
      <Accordion className="ui vertical fluid secondary inverted pointing accordion menu">
        <div className="item">
          <a className="active title"><i className="dropdown icon"/>Use Case</a>
          <div className="active content menu">
            <Link to="/usecase/list-all" className="item">List All</Link>
            <Link to="/usecase/search" className="item">Search</Link>
            <Link to="/usecase/explore" className="item">Explore</Link>
          </div>
        </div>
      </Accordion>
    </Console.Navbar>
  )
}