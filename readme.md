# Nice Localhost File Browser

Don't like the home page of wamp, and you just **cannot** stand this awful *apache made* "browser".

Well, in just **2** steps, you can easily have a pretty nice browser.

## Installation

1. Simply download the zip, and extract it in your `www` folder (or just *gitclone* it into `www`).
2. open the `index.php` file and add this line at the beginning: `header('location: _nlfb/');`

That's it, open [localhost](http://localhost) and *savourez*.

## Current features

- Sidebar
- Breadcrumbs
- File can be view and are colored by the great [highlightjs](https://highlightjs.org/)
- If it is an image, it just renders it.
- Search in current folder based on letters' order (`ctrl` brings up `controller`)
- alias

## Features to add (imperative)

- open in **real** &#10004;
- ignored projects - folders/files &#10004;

## Features to add

- copy (name, path, URL path) &#10004;
- view mode (icon, list)
- load full sidebar at the beginning (settings)
- customs alias
- add icons to context menu
- add input to type the path
- set miniature for image corresponding
