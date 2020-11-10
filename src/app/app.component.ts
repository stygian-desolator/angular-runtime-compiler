import { Component } from '@angular/core';
import { DynamicTemplate } from './dynamic-template';
import { RuntimeCompilerService } from './runtime-compiler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  name = 'angular-runtime-compiler';
  text = '<input [(ngModel)]="context.name">';
  dynamicTemplate: DynamicTemplate;

  generate() {
    this.runtimeCompilerService
      .createAndCompileTemplate(this, this.text)
      .then((data) => {
        this.dynamicTemplate = data;
      });
  }

  constructor(private runtimeCompilerService: RuntimeCompilerService) {}
}
