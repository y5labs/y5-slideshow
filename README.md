# Y5 Slideshow

Single file to iterate over at a specifcied duration and display a number of addresses.

#### Example parameters to be encoded and added to the URI

* duration_s - Time for each address to display in seconds
* addresses - An array of objects with a name and src attribute
* show_nav - Boolean to show or hide the navigation

```javascript
{
  duration_s: 20,
  addresses: [
    { name: 'Address One', src: 'https://address-one.nz' },
    { name: 'Address Two', src: 'https://address-two.nz' }
  ],
  show_nav: true
}
```
