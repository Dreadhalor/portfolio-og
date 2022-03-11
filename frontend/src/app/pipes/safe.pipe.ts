import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safe',
})
export class SafePipe implements PipeTransform {
  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }
  constructor(private sanitizer: DomSanitizer) {}
  transform(URL: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(URL);
  }
}
