import { ElementRef, HostListener, Directive, AfterViewInit, Optional, NgZone } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

@Directive({
  selector: '[fz-elastic]'
})

export class ElasticDirective implements AfterViewInit {
  textareaEl: HTMLTextAreaElement;

  private previousScrollHeight = 0;

  constructor(public element: ElementRef, private ngZone: NgZone, @Optional() public model: NgModel) {
    if (!model) {
      return;
    }

    // Hijack NgModels ControlValueAccessor to detect when model is updated.
    // This is more performant than listening for model changes
    // with angular's change detection cycle.
    let self = this;
    let originalWriteValue = model.valueAccessor.writeValue;
    function writeValue(obj: any) {
      if (originalWriteValue) {
        // Invoke the original writeValue function.
        originalWriteValue.call(this, obj);
      }

      // Adjust the textarea size.
      self.adjust();
    }

    model.valueAccessor.writeValue = writeValue;
  }

  isTextarea(el: HTMLElement) {
    return el.tagName === 'TEXTAREA';
  }

  setupTextarea(textareaEl: HTMLTextAreaElement) {
    this.textareaEl = textareaEl;

    // Set some necessary styles
    const style = this.textareaEl.style;
    style.overflow = 'hidden';
    style.resize = 'none';

    // Listen for window resize events
    this.ngZone.runOutsideAngular(() => {
      Observable.fromEvent(window, 'resize')
        .debounceTime(100)
        .subscribe(() => this.adjust());
    });

    // Ensure we adjust the textarea if
    // content is already present
    this.adjust();
  }

  ngAfterViewInit() {
    if (this.isTextarea(this.element.nativeElement)) {
      this.setupTextarea(this.element.nativeElement);
      return;
    }

    const children: HTMLElement[] = Array.from(this.element.nativeElement.children) as HTMLElement[];
    const textareaEl = children.find(el => this.isTextarea(el));
    if (textareaEl) {
      this.setupTextarea(textareaEl as HTMLTextAreaElement);
      return;
    }

    throw new Error('The `fz-elastic` attribute directive must be used on a `textarea` or an element that contains a `textarea`.');
  }

  @HostListener('input')
  onInput(): void {
    this.adjust();
  }

  adjust(): void {
    if (!this.textareaEl || this.previousScrollHeight === this.textareaEl.scrollHeight) {
      return;
    }

    this.textareaEl.style.height = 'auto';
    this.textareaEl.style.height = this.textareaEl.scrollHeight + "px";
    this.previousScrollHeight = this.textareaEl.scrollHeight;
  }
}
