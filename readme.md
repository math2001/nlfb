# Nice Localhost File Browser

Don't like the WAMP homepage, and you just **cannot** stand this *apache made* "browser".

Well, in just **2** steps, you can easily have a pretty nice browser.

## Installation

1. Run `cd C:/wamp/www & git clone https://github.com/math2001/nlfb.git "_nlfb"`
2. Open the `index.php` file in your `www` directory and add this line at the beginning: `<?php header('location: _nlfb/'); ?>`

That's it, open [localhost](http://localhost) and *savourez*.

## Current features

- Breadcrumbs
- File can be view and are colored by [highlightjs](https://highlightjs.org/)
- If it is an image, it just renders it.
- Nice icons for files
- Search in current folder based on letters' order (`ctrl` brings up `controller` for example)
- input to type the path (edit path)
- context menu [jQuery.contextMenu](https://swisnl.github.io/jQuery-contextMenu/)
- copy name/path/URL path
- open in **real** (new tab)
- Sidebar
- ignored files/folders/projects

## Features to add

- load full sidebar at the beginning (settings)
- customs alias
- add icons to context menu
- add the use of a screenshot.(jpg|png) for project instead of a folder images
