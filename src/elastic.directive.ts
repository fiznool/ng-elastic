import { ElementRef, HostListener, Directive, AfterViewInit, Optional, OnInit, OnDestroy, NgZone } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Observable, Subscription } from 'rxjs/Rx';

@Directive({
  selector: '[fz-elastic]'
})

export class ElasticDirective implements OnInit, OnDestroy, AfterViewInit {
  private modelSub: Subscription;
  private textareaEl: HTMLTextAreaElement;
  private defaultTextareaElHeight: number;
  private clonedTextareaEl: HTMLTextAreaElement;

  constructor(
    private element: ElementRef,
    private ngZone: NgZone,
    @Optional() private model: NgModel
  ) {}

  ngOnInit() {
    if(!this.model) {
      return;
    }

    // Listen for changes to the underlying model
    // to adjust the textarea size.
    this.modelSub = this.model
      .valueChanges
      .debounceTime(100)
      .subscribe(() => this.adjust());
  }

  ngOnDestroy() {
    if(this.modelSub) {
      this.modelSub.unsubscribe();
    }
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
    // This is run whenever the user changes the input.
    this.adjust();
  }

  private isTextarea(el: HTMLElement) {
    return el.tagName === 'TEXTAREA';
  }

  private setupTextarea(textareaEl: HTMLTextAreaElement) {
    this.textareaEl = textareaEl;
    this.defaultTextareaElHeight = this.textareaEl.clientHeight;

    // Set some necessary styles
    const style = this.textareaEl.style;
    style.overflow = 'hidden';
    style.resize = 'none';

    // Clone the textarea for height calculations
    this.clonedTextareaEl = <HTMLTextAreaElement>this.textareaEl.cloneNode(false);
    this.clonedTextareaEl.tabIndex = -1;
    this.clonedTextareaEl.disabled = true;
    this.clonedTextareaEl.style.height = '0';

    // Remove margin top and bottom because it does not matter in
    // calculating the height of textarea and they make useless space.
    this.clonedTextareaEl.style.marginTop = '0';
    this.clonedTextareaEl.style.marginBottom = '0';

    this.textareaEl.parentNode.appendChild(this.clonedTextareaEl);

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

  private adjust(): void {
    if(this.textareaEl && this.clonedTextareaEl) {
      // Set the value of the cloned textarea to the actual value
      this.clonedTextareaEl.value = this.textareaEl.value;

      // Allow reflow, then measure the cloned height and use to set real height
      setTimeout(() => this.textareaEl.style.height = Math.max(this.clonedTextareaEl.scrollHeight, this.defaultTextareaElHeight) + 'px', 0);
    }
  }
}
