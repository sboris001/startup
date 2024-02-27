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
