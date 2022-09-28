# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
## To Do List
### Functionality
-The calculator can Perform these Basic functions

    ~~Can Add~~
    ~~Can Divide~~
    ~~Can Subtract~~
    ~~Can Multiply~~
    ~~Decimal Point can be placed no more than once~~
    ~~Can Reset Current equations~~
    ~~Can Repeat last function~~
    ~~Can make a number negative from positive or vice versa~~


-Transitionary Functions between states (?)

    I don't know what this would specifically be called but it refers to things such as the initial '0' value being replaced entirely when a new number is inputted.
    Or when a new number is being inputted by the user, the old number and value getting replaced after recieving the new input. Those sort of transitions.

    ~~When inputting a number from the initial state, the 0 in the calculator is replaced in the display~~
    ~~When inputting a new number after applying an operator, the previousValue is replaced in the display~~
    -When displaying the newly found solution, the previous Operator will not be visible.


### Looks
Pretty much everything about the looks has changed significantly to act very similarly to the current default Windows 10 Calculator. 
Some things, such as the debug values and height need to change once all functionality is complete!

### Version Notes
This current, most recent version has had a lot of changes to the way subtraction works for the sake of completing the FCC tests. Most, if not all of these will be reverted
and merge into the main branch once the tests can be passed! 

The details of the changes are: 

    -The subtraction(-) button will trigger the toggleNegative() function if performed immediately after any other operator, as is required from the FCC tests
    -The toggleNegative() script will now affect either the displayed currentValue or the displayed currentOperator depending on the button used to toggle it
    -The performOperators() function had to also be changed and now has a regex test on the currentOperator based on the changes above

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
