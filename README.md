# Angular2-Elastic

Automatically grows and shrinks textareas based on their content. Supports both regular Angular 2 `<textarea>` and Ionic 2 `<ion-textarea>` controls.

[See the demo here](http://embed.plnkr.co/8a3hvdzIIUs3X1nOKPtK?show=preview).

## Installation

```
npm install angular2-elastic
```

## Quick Start

1. Import the `ElasticModule`.
2. Add the directive `fz-elastic` to your `textarea` or `ion-textarea`.
3. Watch as your textareas automatically grow and shrink depending on their content.

## Usage

### Angular 2

**1. Import the `ElasticModule`:**

``` ts
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { ElasticModule } from 'angular2-elastic';

import { AppComponent }  from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ElasticModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
```

**2. Use the directive in your component HTML:**

``` ts
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<textarea fz-elastic></textarea>`
})
export class AppComponent {};
```

That's it! Your textarea will now grow and shrink as you type.

The textarea will also respond to changes from any one or two way bindings that are setup, e.g. with `[(ngModel)]`.

### Ionic 2

1. Import the module as above.
2. Use the directive on an `ion-textarea` instead:

``` html
<ion-textarea fz-elastic></ion-textarea>
```

## License

MIT

## Credits

Heavily inspired by the following:

- [angular-elastic](https://github.com/monospaced/angular-elastic)
- [angular2-autosize](https://github.com/stevepapa/angular2-autosize)
- This [Ionic community thread](https://forum.ionicframework.com/t/elastic-ion-textarea/55671)
