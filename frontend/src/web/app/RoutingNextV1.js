import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { App as AppV1 } from '../../../root';

import {
  FileTabs,
  FileNewModel,
  FileDetection,
  FileUpdateModel,
  FileDisplayModel,
  FileUpload,
  UploadModel,
} from '../../../components/filetabs';

export const RoutingV1FileTabs = () =>
  <AppV1>
    <Switch>
      <Route
        path="/filetabs/fileNewModel"
        render={() =>
          <FileTabs>
            <FileNewModel />
          </FileTabs>}
      />
      <Route
        path="/filetabs/uploadModel"
        render={() =>
          <FileTabs>
            <UploadModel />
          </FileTabs>}
      />
      <Route
        path="/filetabs/filedetection"
        render={() =>
          <FileTabs>
            <FileDetection />
          </FileTabs>}
      />
      <Route
        path="/filetabs/fileupdatemodel"
        render={() =>
          <FileTabs>
            <FileUpdateModel />
          </FileTabs>}
      />
      <Route
        path="/filetabs/filedisplaymodel"
        render={() =>
          <FileTabs>
            <FileDisplayModel />
          </FileTabs>}
      />
      <Route
        path="/filetabs/fileupload"
        render={() =>
          <FileTabs>
            <FileUpload />
          </FileTabs>}
      />
      <Redirect from="/filetabs" to="/filetabs/fileNewModel" />
    </Switch>
  </AppV1>;
