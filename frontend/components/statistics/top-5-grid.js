import React, {PropTypes as T} from 'react';
import _ from 'lodash';

const Top5Grid = ({title, parentType, parentName, duration }) => {
	const defaultProps = { title:"Top 5 Projects", 
										parentType:"Project", 
										parentName:"All", 
										duration:'7' };
				
  return (
    <div>
    </div>
  )
};

Top5Grid.propTypes = {
	title: T.string,
  parentType: T.string,
  parentName: T.string,
  duration: T.number
};

export default Top5Grid;
