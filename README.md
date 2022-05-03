# Upload pictures with GPS coordinations

## Table od content

- [Demo](#demo)
- [Description](#description)
- [Preview](#preview)
- [Technologies](#technologies)

## Demo

You can find a demo [here](https://paulgrym.github.io/upload-pictures-with-exif-coordinates/).

## Description

On this page you can upload one or more pictures from a local hard drive to a browser memory through file input or drag&drop area.
</br>Images are validated for type and size. GPS coordinates are obtained using the exif library.
</br>Added pictures will be displayed below drag&drop area creating the list. Each list row contains:

- numeric row id,
- thumbnail,
- file name and file extension,
- file size in MB,
- GPS coordinates in decimal degrees (+/-DDD.DDDDD°),
- button that removes the row.

## Preview

<img src="./Preview.gif" width="700px">

## Technologies

- HTML
- CSS (Flex, Grid)
- JavaScript (ES6+)
- BEM convention
- MediaQueries
- Normalize.css
- Exif-js
