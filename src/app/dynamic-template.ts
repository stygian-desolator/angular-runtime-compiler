import { NgModuleFactory, Type } from '@angular/core';

export class DynamicTemplate {
  constructor(
    public readonly template: string,
    public readonly component: Type<any>,
    public readonly moduleFactory?: NgModuleFactory<any>
  ) {}
}
