import { DynamicTemplate } from './dynamic-template';
import {
  Compiler,
  Component,
  Injectable,
  ModuleWithComponentFactories,
  NgModule,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class RuntimeCompilerService {
  private compiledModule?: ModuleWithComponentFactories<any>;

  constructor(private compiler: Compiler) {}

  public async createAndCompileTemplate(context: any, template: string) {
    const dynamicComponent = Component({ template })(
      class {
        context = context;
      }
    );

    const dynamicModule = NgModule({
      declarations: [dynamicComponent],
      exports: [dynamicComponent],
      imports: [FormsModule],
    })(class DynamicModule {});

    this.compiledModule = await this.compiler.compileModuleAndAllComponentsSync(
      dynamicModule
    );
    return new DynamicTemplate(
      template,
      dynamicComponent,
      this.compiledModule.ngModuleFactory
    );
  }
}
