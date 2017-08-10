# React setup with webpack config file

### File Structure

```
|-- .gitignore
|-- package.json
|-- webpack.config.js
|-- node_modules
|-- src
    |-- css
        |-- style.scss
    |-- dist
        |-- css
            |-- style.css
        |-- app.min.js
    |-- js
        |-- App.js
    |-- index.html
```

* * *

### Getting Started

* Clone this repo
* Run `npm` or `yarn` to install all node modules.
* Run `yarn start` to compile code and start a dev server

* * *

### Available Commands

`yarn build-css` will compile all the scss into a .css file. \n
`yarn watch-css` will watch for any scss changes and re-compile the .css file. \n
`yarn dev` will start up the webpack dev server on <http://localhost:8080>. \n
`yarn start` will run webpack dev server & watch for scss changes. \n
`yarn prod` build the project for production. Uses Uglifyjs to minify the js file. \n

* * *

### CSS / SCSS

This template is setup to use scss, which can be located in `src/css`. All styling can be added to the style.scss file however, you are also able to include stylesheets into the style.scss file to split up styling for different components. A good way is to create a new folder in the css folder called components. Create partial scss files, for example `_component.scss` and then include into the style.scss using `@import 'components/component';`.

The css should be loaded into your Main Container Component. In this template it is being included in the App.js file using the line `const url = require('../dist/css/style.css');`. Webpack will automatically load this file into `<head>` of the DOM, using the `file-loader` loader.