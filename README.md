# adv-react-nba-router

## Demo

[NBA Router](https://nba-router.netlify.app/)

### Learning Objectives

 - Use `react-router-dom` v5 to handle page transitions
 - Use a `Router` to handle our page changes
 - Use the `useParams` hook to to grab parameters from our url
 - Use the `useHistory` hook to programatically navigate to pages
 - use the `useLocation` hook to grab query paremeters from the URL
 - Use the `Switch` component to render routes
 - Use the `Link` component to change between views.
 - Use `MemoryRouter` to test our app navigation
 - Use the `initialEntries` prop to add history to our app navigation
 - Use the `initialIndex` prop to set a page in our app for testing

### Description

React is great at building single page applications AKA SPAs. A single page applications uses only one .html file to make up the entire application and React handles switching out different views based on the URL. React doesn't have a built in Router so we use the react-router-dom library to give React this ability to switch out components.  React router dom provides use with multiple custom hooks including `useParams`, `useHistory`, and `useLocation` to help manage our state. It also gives us multiple components like `Switch`, `BrowserRouter` and `Route`, and `Link` to navigate around our application

For this project you will be creating a list/detail view for data retrieved from an api of your choice. You'll be using React Router to navigate to a detail page that shows specific information about the selected item.

### Acceptance Criteria

- Render a list of items returned from an API of your choice
- View a details page when clicking an item from the list
- URL updates when visiting details page
- Details page continues to work on page refresh
- Tests check navigation from list view to details page
  - Test checks for a list of items on the list view, then a single item after navigating to the detail view  

### Rubric

| Task | Points |
| --   | --     |
| List/Detail Page  |      3 |
| uses `useLocation`, `useParams`, and/or `useHistory`                    |      3 |
| A list of items are shown on page load                                         |      2 |
| Detail Page info remains on page refresh                            |      2 |
| Use a `Switch` Component inside of Router |      2 |
| Testing Navigation with `MemoryRouter`                   |      3 |
| Testing details page directly with `initialEntries` prop                                    |      3 |
| Deployed on Netlify with passing CI                                |      2 |
