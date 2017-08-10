# React setup with webpack config file

### File Structure

```
node_modules
src
| css
|- style.scss
| dist
|- css
|-- style.css
|- app.min.js
| js
|- App.js
| index.html
.gitignore
package.json
webpack.config.js
```

### Getting Started

Run `npm` or `yarn` to install all node modules.

`yarn build-css` will compile all the scss into a .css file.

`yarn watch-css` will watch for any scss changes and re-compile the .css file.

`yarn dev` will start up the webpack dev server on localhost:8080

`yarn start` will run webpack dev server & watch for scss changes

`yarn prod` build the project for production. Uses Uglifyjs to minify the js file.

* * *

### CSS / SCSS

This template is setup to use scss, which can be located in `src/css`. All styling can be added to the style.scss file however, you are also able to include stylesheets into the style.scss file to split up styling for different components. A good way is to create a new folder in the css folder called components. Create partial scss files, for example `_component.scss` and then include into the style.scss using `@import 'components/component';`