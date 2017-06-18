import React from 'react';
import {Console, Link} from '../../artui/react';
import {Route, IndexRedirect, IndexRoute} from 'react-router';

import Navbar   from './navbar';
import FileNewModel  from './fileNewModel/index';
import FileDetection  from './fileDetection/index';
import FileUpdateModel  from './fileUpdateModel/index';
import FileDisplayModel  from './fileDisplayModel/index';
import FileUpload from './fileUpload/index';
import UploadModel from './UploadModel';

export { FileNewModel, FileDetection, FileUpdateModel, FileDisplayModel, FileUpload, UploadModel };

export class FileTabs extends React.Component {
  render() {
    return (
      <Console.Wrapper className="cloud-page has-navbar">
        <Navbar />
        {this.props.children}
      </Console.Wrapper>
    );
  }
}

export const fileTabsRoute = (
  <Route component={FileTabs} path="filetabs">
    <IndexRedirect to="fileNewModel" />
    <Route path="fileNewModel" component={FileNewModel} />
    <Route path="uploadModel" component={UploadModel} />
    <Route path="filedetection" component={FileDetection} />
    <Route path="fileupdatemodel" component={FileUpdateModel} />
    <Route path="filedisplaymodel" component={FileDisplayModel} />
    <Route path="fileupload" component={FileUpload} />
  </Route>
);
