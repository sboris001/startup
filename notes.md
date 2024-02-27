# CS 260 Notes
## Lesson 1: Git & GitHub
Git provides 2 things:
1. Version tracking in a repository
2. The ability to clone a copy of the repository to a different location

The following are useful git commands:
 - git clone <link>: This clones a repo to your pwd
 - git add <filename>: This stages a file so it is ready to be committed
 - git commit -am "message": This commits all of your changes.  Remove the a if you just want your previously staged files committed
 - git pull: Pulls the repository's latest changes from GitHub
 - git push: Pushes your changes that you've committed locally to GitHub
 - git fetch: Retrieves the latest information about the changes on GitHub without changing your local repository
 - git status: When run after git fetch it will show us the differences between our local repo and the one on GitHub

# Midterm Review

# The Console

- One of the primary purposes of a console application is to view the files on the computer.  The files on a computer are organized into a tree structure of nodes called directories.  At any point in time your console is located at one of the directories in the file system
- Useful commands:
    - `pwd` - Tells you which directory you are in
    - `ls` - lists all of the files in the directory
        - parameter `-la` will show even the hidden ones in a long format
    - `echo` - Output the parameters of the command
    - `cd` - Change directory
    - `mkdir` - Make directory
    - `rmdir` - Remove directory
    - `rm`  - Remove file(s)
    - `mv` - Move files
    - `cp` - copy
    - `curl`- Command line client URL browser
    - `grep` - Regular expression search
    - `find`  - find files
    - `top`  - View running processes with CPU and memory usage
    - `df` - View disk statistics
    - `cat` - Output the contents of a file
    - `less` - Interactively output the contents of a file
    - `wc`  - Count the words in a file
    - `ps` - View the currently running processes
    - `kill` - Kill a currently running process
    - `sudo` - Execute a command as a super user (admin)
    - `ssh` - Create a secure shell on a remote computer
    - `scp` - Securely copy files to a remote computer
    - `history` - Show the history of commands
    - `ping` - Check if a website is up
    - `tracert` - Trace the connections to a website
    - `dig` - Show the DNS information for a domain
    - `man` - Look up a command in the manual
- You can also chain the input and output of commands using special characters
    - `|` - Take the output from the command on the left and pipe it to the command on the right
    - `>` - Redirect output to a file.  Overwrites the file if it exists
    - `>>` - Redirect output to a file.  Appends if the file exists
- For example, let’s list the files in a directory, pipe it into `grep` to search for files created in Nov, and then pipe that into `wc` to count the number of files found with a date of Nov

```bash
ls -l | grep ' Nov ' | wc -l
```

- There are also keystrokes that have special meaning in the console
    - `CTRL-R` - Use type ahead to find previous commands
    - `CTRL-C` - Kill the currently running command

# HTML

- What are the main purposes of HTML?
    - Provide structure and content to your web application.
- Common elements
    - `html`  - The page container
    - `head` - Header information
    - `title` - Title of the page
    - `meta` - Metadata for the page such as character set or viewport settings
    - `script` - JavaScript reference. Either an external reference, or inline
    - `include` -External content reference
    - `body` - The entire content body of the page
    - `header` - Header of the main content
    - `nav` - Navigational inputs
    - `main` - Main content of the page
    - `section` - A section of the main content
    - `aside` - Aside content from the main content
    - `div` - A block division of content
    - `span` - An inline span of content
    - `h<1-9>` - Text heading. From h1, the highest level, down to h9, the lowest level
    - `p` - A paragraph of text
    - `b` - Bring attention
    - `table` - Table
    - `tr` - Table row
    - `th` - Table header
    - `td` - Table data
    - `ol, ul` - Ordered or unordered list
    - `li` - List item
    - `a` - Anchor the text to a hyperlink
    - `img` - Graphical image reference
    - `dialog` - Interactive component such as a confirmation
    - `form` - A collection of user input
    - `input` - User input field
    - `audio` - Audio content
    - `video` - Video content
    - `svg` - Scalable Vector Graphic content
    - `iframe` - Inline frame of another HTML page
- How to comment in HTML

```html
<!-- commented text -->
```

- Special Characters
    - `&amp;` - &
    - `&lt;`  - <
    - `&gt;` - >
    - `&quot;` - “
    - `&apos;` - ‘
    - etc
- Block and inline
    - There is a distinction between structure elements that are block vs inline.  A block element is meant to be a distinct block in the flow of the content structure.  An inline element is meant to be inline with the content flow of a block

## HTML input elements

- `form` - Input container and submission
- `fieldset` - Labeled input grouping
- `input` - Multiple types of user input
- `select` - Selection dropdown
- `optgroup` - Grouped selection dropdown
- `option` - Selection option
- `textarea` - multiline text input
- `label` - Individual input label
- `output` - Output of input
- `meter` - Display value with a known range

# CSS

- Stands for Cascading Style Sheets
- Converts the structure and content of HTML into a vibrant, responsive experience.
- Syntax in a CSS file:

```css
p {
	color: green;
}
```

- In the above example, here is the terminology:
    - p —> selector
    - declaration —> :
    - rule —> color: green;
    - property —> color
    - value —> green
- Another example:

```css
p {
	font-family: sans-serif;
	font-size: 2em;
	color: navy;
	text-shadow: 3px 3px 1px #cccccc;
}
```

- In this example, the selector `p` selects all paragraph elements in the HTML document.  The four specified declarations then do the following:
    - change the font to use a sans-serif font
    - increase the font size to be twice as big as the default font
    - change the text color to be navy
    - create a gray shadow for the text

There are three ways that you can associate CSS with HTML:

1. use the `style` attribute of an HTML element and explicitly assign one or more declarations

```css
<p style="color:green">CSS</p>
```

1. Use the HTML `style` element to define CSS rules within the HTML document.  The `style` element should appear in the `head` element of the document so that the rules apply to all elements of the document

```css
<head>
  <style>
    p {
      color: green;
    }
  </style>
</head>
<body>
  <p>CSS</p>
</body>
```

1. The final way is to use the HTML `link`element to create a hyperlink reference to an external file containing CSS rules.  The `link`  element must appear in the `head` element of the document

```css
<link rel="stylesheet" href="styles.css" />
```

- This is what the styles.css file might look like

```css
p {
  color: green;
}
```

## Cascading styles

- Because elements inherit the rules applied to their parents you often end up with the same declaration property applied to a single element multiple times.  For example, we might set the color property for all `body` elements to be red, and then `paragraph`  elements to be green, and then `span` elements to be blue, and finally use a style element on a specific `span`  to be black

```html
<body>
	<p><span style="color:black">CSS</span></p>
</body>
```

```css
body {
  color: red;
}
p {
  color: green;
}
span {
  color: blue;
}
```

- In this case, the rules cascade from the highest node in the DOM tree to the lowest level.  Any declaration property defined at a lower level will override the higher declaration.  You can see this happening if you use the browser’s debugger.  In Chrome right click the element and select `inspect`. You can then click on each element in the debugger and see what the value of the color property is.

## The Box Model

CSS defines everything as boxes.  When you apply styles, you are applying them to a region of the display that is a rectangular box.  Within an element’s box there are several internal boxes.  The innermost box holds the element’s content.  This is where things like the text or image of an element is displayed.  Next is padding.  The padding will inherit things like the background color.  After padding is the border, which has properties like color, thickness, and line style.  The final box is the margin.  The margin is considered external to the actual styling of the box and therefore only represents whitespace.

- So in summary, from the outside going in it goes as follows:
    - Margin
    - Border
    - Padding
    - Content

## CSS Selectors

The CSS rule selector can take many forms.  Let’s use the following code to reference:

```html
<body>
  <h1>Departments</h1>
  <p>welcome message</p>
  <section id="physics">
    <h2>Physics</h2>
    <p class="introduction">Introduction</p>
    <p>Text</p>
    <p class="summary">Summary</p>
  </section>
  <section id="chemistry">
    <h2>Chemistry</h2>
    <p class="introduction">Introduction</p>
    <p>Text</p>
    <p class="summary">Summary</p>
  </section>
</body>
```

1. Element type selector
    - To start off, we want to make all elements in the document use a sans-serif font.  We can do this using an element name selector.  By selecting the `body` element we will cascade our declarations down to all the children of the body, which is the whole document

```css
body {
  font-family: sans-serif;
}
```

1. Combinators
    - Next we want to change the color of the second level headings (h2), but we only want to do that within the sections for each department
    - To make that happen we can provide a `descendant combinator`  that is defined with a space delimited list of values where each item in the list is a descendant of the previous item. So our selector would be all `h2` elements that are descendants of `section` elements
    
    ```css
    section h2 {
    	color: #004400;
    }
    ```
    
2. Class Selector
    - Remember that any element can have zero or more classifications applied to it.  For example, our document has a class of `introduction` applied to the first paragraph, and a class of `summary` applied to the final paragraph of each section.  If we want to bold the summary paragraphs we would supply the class name summary prefixed with a period (`.summary` )

```css
.summary {
	font-weight: bold;
}
```

Or if we only wanted paragraphs with the summary class we could combine the element name with the class

```css
p.summary {
	font-weight: bold;
}
```

1. ID Selector
    - ID selectors reference the ID of an element.  All IDs should be unique within an HTML document and so this selects targets a specific element.  You prefix the ID with the hash symbol (`#`) to do this

```css
#physics {
	border-left: solid 1em purple;
}
```

1. Attribute selector
    - Attribute selectors allow you to select elements based on their attirbutes.  You use an attribute selector to select any element with a given attribute (`a[href]`). You can specify a required value for an attribute too (`a[href="./fish.png"]`) in order for the selector to match

```css
p[class='summary'] {
	color: red;
}
```

1. Pseudo selector
    - CSS also defines a significant list of pseudo selectors which select based on positional relationships, mouse interactions, hyperlink visitation states, and attributes

```css
section:hover {
	border-left: solid 1em purple;
}
```

## CSS Declarations

CSS rule declarations specify a property and value to assign when the rule selector matches one or more elements.  Essentially these are a group of possible properties defined to modify the style of an HTML document. The following are some commonly used ones.

| Property | Value | Example | Discussion |
| --- | --- | --- | --- |
| background-color | color | red | Fill the background color |
| border | color width style | #fad solid medium | Sets the border using shorthand where any or all of the values may be provided |
| border-radius | unit | 50% | The size of the border radius |
| box-shadow | x-offset y-offset blu-radius color | 2px 2px 2px gray | Creates a shadow |
| columns | number | 3 | Number of textual columns |
| column-rule | color width style | solid thin black | Sets the border used between columns using border shorthand |
| color | color | rgb(128, 0, 0) | Sets the text color |
| cursor | type | grab | Sets the cursor to display when hovering over the element |
| display | type | none | Defines how to display the element and its children |
| filter | filter-function | grayscale(30%) | Applies a visual filter |
| float | direction | right | Places the element to the left or right in the flow |
| flex |  |  | Flex layout. Used for responsive design |
| font | family size style | Arial 1.2em bold | Defines the text font using shorthand |
| grid |  |  | Grid layout. Used for responsive design |
| height | unit | .25em | Sets the height of the box |
| margin | unit | 5px 5px 0 0 | Sets the margin spacing |
| max-[width/height] | unit | 20% | Restricts the width or height to no more than the unit |
| min-[width/height] | unit | 10vh | Restricts the width or height to no less than the unit |
| opacity | number | .9 | Sets how opaque the element is |
| overflow | [visible/hidden/scroll/auto] | scroll | Defines what happens when the content does not fix in its box |
| position | [static/relative/absolute/sticky] | absolute | Defines how the element is positioned in the document |
| padding | unit | 1em 2em | Sets the padding spacing |
| left | unit | 10rem | The horizontal value of a positioned element |
| text-align | [start/end/center/justify] | end | Defines how the text is aligned in the element |
| top | unit | 50px | The vertical value of a positioned element |
| transform | transform-function | rotate(0.5turn) | Applies a transformation to the element |
| width | unit | 25vmin | Sets the width of the box |
| z-index | number | 100 | Controls the positioning of the element on the z axis |

### Units

- You can use a variety of units when defining the size of a CSS property.  For example, the width of an element can be defined using absolute units such as the number of pixels (`px` ) or inches (`in` ).  You can also use relative units such as a percentage of the parent element (`50%` ), a percentage of a minimum viewport dimension (`25vmin` ), or a multiplier of the size of the letter m (`1.5rem` )

```css
p {
	width: 25%;
	height: 30vh;
}
```

- The following is a list of the most commonly used units:

| Unit | Description |
| --- | --- |
| px | The number of pixels |
| pt | The number of points (1/72 of an inch) |
| in | The number of inches |
| cm | The number of centimeters |
| % | A percentage of the parent element |
| em | A multiplier of the width of the letter m in the parent's font |
| rem | A multiplier of the width of the letter m in the root's font |
| ex | A multiplier of the height of the element's font |
| vw | A percentage of the viewport's width |
| vh | A percentage of the viewport's height |
| vmin | A percentage of the viewport's smaller dimension |
| vmax | A percentage of the viewport's larger dimension |

### Color

| Method | Example | Description |
| --- | --- | --- |
| keyword | red | A set of predefined colors (e.g. white, cornflowerblue, darkslateblue) |
| RGB hex | #00FFAA22 or #0FA2 | Red, green, and blue as a hexadecimal number, with an optional alpha opacity |
| RGB function | rgb(128, 255, 128, 0.5) | Red, green, and blue as a percentage or number between 0 and 255, with an optional alpha opacity percentage |
| HSL | hsl(180, 30%, 90%, 0.5) | Hue, saturation, and light, with an optional opacity percentage. Hue is the position on the 365 degree color wheel (red is 0 and 255). Saturation is how gray the color is, and light is how bright the color is. |

## CSS Fonts

- The CSS `font-family` property defines what fonts should be used.  The property value represents an ordered list of fonts.  The first font in the list that is available will be used.  This ability to select from a list of fonts is important because different operating systems have different default fonts.

### Font families

- There are four major font familes:
1. Serif - A serif is a small stroke attached to ends of character’s major strokes
2. Sans-serif - Do not have that small stroke
3. Fixed - All characters are the same size
4. Symbol - represent non-language characters such as arrows or emojis

### Importing fonts

- In addition to referencing standard fonts found on the user’s computer, you can specify a font that you provide with your application.  That way your application is guaranteed to look the same.  In order to have the browser load a font you use the `@font-face` rule and provide the font name and source location

```css
@font-face {
	font-family: 'Quicksand';
	src: url('https://cs260.click/fonts/quicksand.ttf');
}
p {
	font-family: Quicksand;
}
```

- If you don’t wanna host font files on your server, then you can load them from a provider.  For example, Google provides a large selection of open source fonts

```css
@import url('https://fonts.googleapis.com/css2?family=Rubik Microbe&display=swap');

p {
	font-family: 'Rubik Microbe';
}
```

## CSS Animation

Using CSS to animate your components is an easy way to make your application feel alive and interactive. You create CSS animations using the `animation` properties and defining `keyframes` for what the element should look like at different times in the animation. Let's walk through an example.

We have a paragraph of centered text and we want it to zoom in until its size is 20% of the view height.

```
p {
  text-align: center;
  font-size: 20vh;
}
```

To make this happen we specify that we are animating the selected elements by adding the `animation-name` property with a value of demo. This name refers to the name of the `keyframes` that we will specify in a minute. The keyframes tell what CSS properites should be applied at different key points in the animation sequence. We also add an `animation-duration` property in order to specify that the animation should last for three seconds.

```
p {
  text-align: center;
  font-size: 20vh;

  animation-name: demo;
  animation-duration: 3s;
}
```

Now we are ready to create the keyframes. We don't have to define what happens at every millisecond of the animation. Instead we only need to define the key points, and CSS will generate a smooth transition to move from one keyframe to another. In our case we simply want to start with text that is invisible and have it zoom into the full final size. We can do this with two frames that are designated with the keywords `from` and `to`.

```
@keyframes demo {
  from {
    font-size: 0vh;
  }

  to {
    font-size: 20vh;
  }
}

```

That's everything we need to do. However, let's make one more addition. It would look better if towards the end, the paragraph bounced out a little bigger than its final size. We can accommodate that by adding another key frame that happens 95 percent through the animation.

```
@keyframes demo {
  from {
    font-size: 0vh;
  }

  95% {
    font-size: 21vh;
  }

  to {
    font-size: 20vh;
  }
}
```

# Responsive Design

Modern web applications are expected to run well on a large variety of computing devices. This includes everything from desktops, to mobile phones, to shopping kiosks, to car dashboards. This ability to reconfigure the interface so the application accommodates and takes advantage of the screen's size and orientation is called `responsive design`.

Much of HTML and CSS is already fluid due to the fact that it responds to the browser window being resized. For example a paragraph element will resize when the browser window is resized. However, the following features can completely change the layout of the application based on the device's size and orientation.

## Display

The CSS display property allows you to change how an HTML element is displayed by the browser. The common options for the display property include the following.

| Value | Meaning |
| --- | --- |
| none | Don't display this element. The element still exists, but the browser will not render it. |
| block | Display this element with a width that fills its parent element. A p or div element has block display by default. |
| inline | Display this element with a width that is only as big as its content. A b or span element has inline display by default. |
| flex | Display this element's children in a flexible orientation. |
| grid | Display this element's children in a grid orientation. |

We can demonstrate the different CSS display property values with the following HTML that contains a bunch of `div` elements. By default `div` elements have a display property value of `block`.

```
<div class="none">None</div>
<div class="block">Block</div>
<div class="inline">Inline1</div>
<div class="inline">Inline2</div>
<div class="flex">
  <div>FlexA</div>
  <div>FlexB</div>
  <div>FlexC</div>
  <div>FlexD</div>
</div>
<div class="grid">
  <div>GridA</div>
  <div>GridB</div>
  <div>GridC</div>
  <div>GridD</div>
</div>

```

If we modify the display property associated with each element with the following CSS, then we get a totally different rendering.

```
.none {
  display: none;
}

.block {
  display: block;
}

.inline {
  display: inline;
}

.flex {
  display: flex;
  flex-direction: row;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

```

## Viewport meta tag

When smart mobile devices started gaining popularity they began to be used to view websites. However, the websites were optimized for desktop displays and not little tiny mobile screens. To solve this mobile browsers automatically started scaling the website so that it looked better on a small screen. Unfortunately, as web applications started being responsive to the screen size, the mobile browser's scaling got in the way. The solution is to include a meta tag in the `head` element of all your HTML pages. This tells the browser to not scale the page.

```
<meta name="viewport" content="width=device-width,initial-scale=1" />
```

## Float

The float css property moves an element to the left or right of its container element and allows inline elements to wrap around it. For example, if we had an `aside` element followed by a large paragraph of text, we could create the following CSS rule in order to cause the text to wrap around the aside.

```
aside {
  float: right;
  padding: 3em;
  margin: 0.5em;
  border: black solid thin;
}
```

When the browser resizes, the text will flow around the floating element. 

## Media queries

One of the main CSS features for creating responsive applications is the `@media` selector. This selector dynamically detects the size and orientation of the device and applies CSS rules to represent the structure of the HTML in a way that accommodates the change.

We can use the `@media` selector to tell us which side of the screen (technically the viewport) is the longest. A media query takes one or more predicates separated by boolean operators. In our case we simply want to know if the screen is oriented in portrait mode (short side on top) or not. If it is then we transform all of our div elements by rotating them 270 degrees.

```
@media (orientation: portrait) {
  div {
    transform: rotate(270deg);
  }
}

```

You can also use media queries to make entire pieces of your application disappear, or move to a different location. For example, if we had an aside that was helpful when the screen is wide, but took up too much room when the screen got narrow, we could use the following media query to make it disappear.

```
@media (orientation: portrait) {
  aside {
    display: none;
  }
}
```

## CSS Grid

The `grid` display layout is useful when you want to display a group of child elements in a responsive grid.  We start with a container element that has a bunch of child elements

```css
<div class="container">
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
</div>
```

We turn this into a responsive grid by including a CSS `display` property with the value of `grid` on the container element.  This tells the browser that all of the children of this element are to be displayed in a grid flow.

- The `grid-template-columns`  property specifies the layout of the grid columns.  We set this to repeatedly define each olumn to auto-fill the parent element’s width with children that are resized, in this case, to a minimum of 300 pixels and a maximum of one equal fractional unit (`1fr` ) of the parents total width.  A fractional unit is dynamically computed by splitting up the parent element’s width into equal parts.
- Next, we fix the height of the rows to be exactly 300 pixels by specifying the `grid-auto-rows` property
- Finally, we finish off the grid construction by setting the `grid-gap` property to have a gap of at least 1 em between each grid item.

```css
.container {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	grid-auto-rows: 300px;
	grid-gap: 1em;
}
```

## CSS Flexbox

The `flex` display layout is useful when you want to partition your application into areas that responsively move around as the window resizes or the orientation changes.

- Here is some example html that we can mess with

```html
<body>
  <header>
    <h1>CSS flex &amp; media query</h1>
  </header>
  <main>
    <section>
      <h2>Controls</h2>
    </section>
    <section>
      <h2>Content</h2>
    </section>
  </main>
  <footer>
    <h2>Footer</h2>
  </footer>
</body>

```

Now we can use Flexbox to make it all come alive. We make the body element into a responsive flexbox by including the CSS `display` property with the value of `flex`. This tells the browser that all of the children of this element are to be displayed in a flex flow. We want our top level flexbox children to be column oriented and so we add the `flex-direction` property with a value of `column`. We then add some simple other declarations to zero out the margin and fill the entire viewport with our application frame.

```css
body {
  display: flex;
  flex-direction: column;
  margin: 0;
  height: 100vh;
}
```

To get the division of space for the flexbox children correct we add the following flex properties to each of the children.

- **header** - `flex: 0 80px` - Zero means it will not grow and 80px means it has a starting basis height of 80 pixels. This creates a fixed size box.
- **footer** - `flex: 0 30px` - Like the header it will not grow and has a height of 30 pixels.
- **main** - `flex: 1` - One means it will get one fractional unit of growth, and since it is the only child with a non-zero growth value, it will get all the remaining space. Main also gets some additional properties because we want it to also be a flexbox container for the controls and content area. So we set its display to be `flex` and specify the `flex-direction` to be row so that the children are oriented side by side.

```
header {
  flex: 0 80px;
  background: hsl(223, 57%, 38%);
}

footer {
  flex: 0 30px;
  background: hsl(180, 10%, 10%);
}

main {
  flex: 1;
  display: flex;
  flex-direction: row;
}
```

Now we just need to add CSS to the control and content areas represented by the two child section elements. We want the controls to have 25% of the space and the content to have the remaining. So we set the `flex` property value to 1 and 3 respectively. That means that the controls get one unit of space and the content gets three units of space. No matter how we resize things this ratio will responsively remain.

```
section:nth-child(1) {
  flex: 1;
  background-color: hsl(180, 10%, 80%);
}
section:nth-child(2) {
  flex: 3;
  background-color: white;
}

```

## Media Query

That completes our original design, but we also want to handle small screen sizes. To do this, we add some media queries that drop the header and footer if the viewport gets too short, and orient the main sections as rows if it gets too narrow.

To support the narrow screen (portrait mode), we include a media query that detects when we are in portrait orientation and sets the `flex-direction` of the main element to be column instead of row. This causes the children to be stacked on top of each other instead of side by side.

To handle making our header and footer disappear when the screen is to short to display them, we use a media query that triggers when our viewport height has a maximum value of 700 pixels. When that is true we change the `display` property for both the header and the footer to `none` so that they will be hidden. When that happens the main element becomes the only child and since it has a flex value of 1, it takes over everything.

```
@media (orientation: portrait) {
  main {
    flex-direction: column;
  }
}

@media (max-height: 700px) {
  header {
    display: none;
  }
  footer {
    display: none;
  }
}
```

## CSS Frameworks

- Tailwind
- Bootstrap

# JavaScript

## Introduction

Let's start with a basic example. The following JavaScript will concatenate three strings together and then throw away the result. Not very useful, but JavaScript doesn't complain much.

```
'Hello' + ' ' + 'world';

```

Only slightly more complex is to call a function with the result of our concatenated string. In this case we call the JavaScript runtime's built in function `console.log` to output the string to the debugger console.

```
console.log('Hello' + ' ' + 'world');
// OUTPUT: Hello world

```

You can also write your own functions.

```
function join(a, b) {
  return a + ' ' + b;
}

console.log(join('Hello', 'world'));
// OUTPUT: Hello world
```

## Comments

You can comment your JavaScript with either line or block comments.

```
// Line comment

/*
Block comment
*/

```

## Code delimiters

While not technically required in most cases, it is considered good form to end JavaScript statements with a semicolon (`;`). Code blocks, and their resulting scope, are defined with curly braces (`{ }`).

# JavaScript console

The JavaScript console object provides interaction with the JavaScript runtime's debugger console. This usage of console should not be confused with your operating system's console (AKA terminal or command line). The console object provides functionality for outputting the value of text and objects, running timers, and counting iterations. These are useful debugging tools when you can actually execute your code in an interactive debugger (such as VS Code).

## Log

The basic usage of the console object is to output a log message.

```
console.log('hello');
// OUTPUT: hello

```

You can create formatted messages in the log parameter.

```
console.log('hello %s', 'world');
// OUTPUT: hello world

```

You can even specify CSS declarations in order to style the log output.

```
console.log('%c JavaScript Demo', 'font-size:1.5em; color:green;');
// OUTPUT: JavaScript Demo //in large green text

```

## Timers

If you are trying to see how long a piece of code is running you can wrap it with `time` and `timeEnd` calls and it will output the duration between the `time` and `timeEnd` calls.

```
console.time('demo time');
// ... some code that takes a long time.
console.timeEnd('demo time');
// OUTPUT: demo time: 9762.74 ms

```

## Count

To see how many times a block of code is called you can use the `count` function.

```
console.count('a');
// OUTPUT: a: 1
console.count('a');
// OUTPUT: a: 2
console.count('b');
// OUTPUT: b: 1
```

# Adding JavaScript to HTML

You can insert JavaScript into HTML either by directly including it in the HTML within the content of a `<script>` element, or by using the `src` attribute of the script element to reference an external JavaScript file.

**index.js**

```
function sayHello() {
  console.log('hello');
}

```

**index.html**

```
<head>
  <script src="index.js"></script>
</head>
<body>
  <button onclick="sayHello()">Say Hello</button>
  <button onclick="sayGoodbye()">Say Goodbye</button>
  <script>
    function sayGoodbye() {
      alert('Goodbye');
    }
  </script>
</body>

```

Notice that we call the `sayHello` and `sayGoodbye` JavaScript functions from the HTML in the `onclick` attribute of the button element. Special attributes like `onclick` automatically create event listeners for different DOM events that call the code contained in the attribute's value. The code specified by the attribute value can be a simple call to a function or any JavaScript code.

```
<button onclick="let i=1;i++;console.log(i)">press me</button>
<!-- OUTPUT: 2 -->
```

# JavaScript type and construct

## Declaring variables

Variables are declared using either the `let` or `const` keyword. `let` allows you to change the value of the variable while `const` will cause an error if you attempt to change it.

```
let x = 1;

const y = 2;
```

⚠ Originally JavaScript used the keyword `var` to define variables. This has been deprecated because they cause hard-to-detect errors in code related to the scope of the variable. You should avoid `var` and always declare your variables either with `let` or `const`.

## Type

JavaScript defines several primitive types.

| Type | Meaning |
| --- | --- |
| Null | The type of a variable that has not been assigned a value. |
| Undefined | The type of a variable that has not been defined. |
| Boolean | true or false. |
| Number | A 64-bit signed number. |
| BigInt | A number of arbitrary magnitude. |
| String | A textual sequence of characters. |
| Symbol | A unique value. |

Of these types Boolean, Number, and String are the types commonly thought of when creating variables. However, variables may commonly refer to the Null or Undefined primitive. Because JavaScript does not enforce the declaration of a variable before you use it, it is entirely possible for a variable to have the type of Undefined.

In addition to the above primitives, JavaScript defines several object types. Some of the more commonly used objects include the following:

| Type | Use | Example |
| --- | --- | --- |
| Object | A collection of properties represented by name-value pairs. Values can be of any type. | {a:3, b:'fish'} |
| Function | An object that has the ability to be called. | function a() {} |
| Date | Calendar dates and times. | new Date('1995-12-17') |
| Array | An ordered sequence of any type. | [3, 'fish'] |
| Map | A collection of key-value pairs that support efficient lookups. | new Map() |
| JSON | A lightweight data-interchange format used to share information across programs. | {"a":3, "b":"fish"} |

## Common operators

When dealing with a number variable, JavaScript supports standard mathematical operators like `+` (add), `-` (subtract), `*` (multiply), `/` (divide), and `===` (equality). For string variables, JavaScript supports `+` (concatenation) and `===` (equality).

## Type conversions

JavaScript is a weakly typed language. That means that a variable always has a type, but the variable can change type when it is assigned a new value, or that types can be automatically converted based upon the context that they are used in. Sometimes the results of automatic conversions can be unexpected from programmers who are used to strongly typed languages. Consider the following examples.

```
2 + '3';
// OUTPUT: '23'
2 * '3';
// OUTPUT: 6
[2] + [3];
// OUTPUT: '23'
true + null;
// OUTPUT: 1
true + undefined;
// OUTPUT: NaN

```

Getting unexpected results is especially common when dealing with the [equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness) operator.

```
1 == '1';
// OUTPUT: true
null == undefined;
// OUTPUT: true
'' == false;
// OUTPUT: true

```

⚠ The unexpected results happen in JavaScript because it uses [complex rules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#strict_equality_using) for defining equality that depend upon the conversion of a type to a boolean value. You will sometimes hear this referred to as [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) and [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) evaluations. To remove this confusion, JavaScript introduced the strict equality (===) and inequality (!==) operators. The strict operators skip the type conversion when computing equality. This results in the following.

```
1 === '1';
// OUTPUT: false
null === undefined;
// OUTPUT: false
'' === false;
// OUTPUT: false

```

Because strict equality is considered more intuitive, it is almost always preferred and should be used in your code.

Here is a fun example of JavaScript's type conversion. Execute the following in the browser's debugger console.

```
('b' + 'a' + +'a' + 'a').toLowerCase();

```

## Conditionals

JavaScript supports many common programming language conditional constructs. This includes `if`, `else`, and `if else`. Here are some examples.

```
if (a === 1) {
  //...
} else if (b === 2) {
  //...
} else {
  //...
}

```

You can also use the ternary operator. This provides a compact `if else` representation.

```
a === 1 ? console.log(1) : console.log('not 1');

```

You can use boolean operations in the expression to create complex predicates. Common boolean operators include `&&` (and), `||` (or), and `!` (not).

```
if (true && (!false || true)) {
  //...
}

```

### Loops

JavaScript supports many common programming language looping constructs. This includes `for`, `for in`, `for of`, `while`, `do while`, and `switch`. Here are some examples.

### for

Note the introduction of the common post increment operation (`i++`) for adding one to a number.

```
for (let i = 0; i < 2; i++) {
  console.log(i);
}
// OUTPUT: 0 1

```

### do while

```
let i = 0;
do {
  console.log(i);
  i++;
} while (i < 2);
// OUTPUT: 0 1

```

### while

```
let i = 0;
while (i < 2) {
  console.log(i);
  i++;
}
// OUTPUT: 0 1

```

### for in

The `for in` statement iterates over an object's property names.

```
const obj = { a: 1, b: 'fish' };
for (const name in obj) {
  console.log(name);
}
// OUTPUT: a
// OUTPUT: b

```

For arrays the object's name is the array index.

```
const arr = ['a', 'b'];
for (const name in arr) {
  console.log(name);
}
// OUTPUT: 0
// OUTPUT: 1

```

### for of

The `for of` statement iterates over an iterable's (Array, Map, Set, ...) property values.

```
const arr = ['a', 'b'];
for (const val of arr) {
  console.log(val);
}
// OUTPUT: 'a'
// OUTPUT: 'b'

```

### Break and continue

All of the looping constructs demonstrated above allow for either a `break` or `continue` statement to abort or advance the loop.

```
let i = 0;
while (true) {
  console.log(i);
  if (i === 0) {
    i++;
    continue;
  } else {
    break;
  }
}
// OUTPUT: 0 1
```
