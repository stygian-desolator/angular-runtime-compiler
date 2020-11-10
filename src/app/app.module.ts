import { BrowserModule } from '@angular/platform-browser';
import {
  Compiler,
  CompilerFactory,
  COMPILER_OPTIONS,
  NgModule,
  ViewEncapsulation,
} from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule],
  providers: [
    {
      provide: COMPILER_OPTIONS,
      useValue: {
        useJit: true,
        defaultEncapsulation: ViewEncapsulation.None,
      },
      multi: true,
    },
    {
      provide: CompilerFactory,
      useClass: JitCompilerFactory,
      deps: [COMPILER_OPTIONS],
    },
    {
      provide: Compiler,
      useFactory: (compilerFactory: CompilerFactory) =>
        compilerFactory.createCompiler([
          {
            useJit: true,
            defaultEncapsulation: ViewEncapsulation.None,
          },
        ]),
      deps: [CompilerFactory],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
