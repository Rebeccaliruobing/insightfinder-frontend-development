## 2017-04-21
### Fixed
- Extend fui select component & style to support inline mode
- Display keyword and episodes when mouse over event cluster.
- In log event, make cluster name editable
- Fix timestamp issue in log rare events
- Remove mock data in log streaming


## 2017-04-20
### Added
- Integrate log streaming with streaming API

## 2017-04-14
### Fix
- Fix missing All group in exec-db

## 2017-04-13
### Added
- Add fetchGet used to send GET command

### Change
- Improve error handle message for API call.
- Hide language selector in navbar.

## 2017-04-12
### Changed
- Use new events api to get predicted & detected events.
- Improve showAppLoader & hideAppLoader, when app is initialized, show page loader.
- Improve the app error handling, when app is not inited, show error in the whole page, otherwise show the errors in toaster.

## 2017-04-07
### Added

### Fixed
- Exec-dashboard startTime/endTime bug.

## 2017-04-06
### Added
- Add model upload in file anlysis
- Add fixed table header in exec-dashboard

### Fixed
- Exec-dashboard time change bug.

## 2017-04-01
### Added
- Add locale support for topbar menu.
- Add model download in project settings.

### Fixed

## 2017-03-30
### Added
- Add application global fatal error message box with APP_FATAL_ERROR action.
- Add react-router-redux package to support saving routing in redux store.

### Fixed
- Fix component recreate issue caused by HOC component.
- Add tooltip for KPI all checkbox in project threshold setting.

## 2017-03-29
### Added
- Add checkbox to select/unselect KPI in project threshold setting.

### Fixed
- Fix console warning for duplicated element key for model picking.