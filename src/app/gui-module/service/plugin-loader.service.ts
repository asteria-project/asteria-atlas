import { Injectable, Compiler, Injector, ComponentFactory } from '@angular/core';

declare const System: any;

/**
 * @deprecated
 * 
 * Allows to load app plugins.
 */
@Injectable()
export class PluginLoaderService {

  /**
   * The reference to the Angular Compiler service.
   */
  private readonly _compiler: Compiler = null;

  /**
   * Create a new <code>PluginLoaderService</code> instance.
   * 
   * @param {Injector} injector the reference to the Angular services injector.
   */
  constructor(protected injector: Injector) {
    this._compiler = injector.get(Compiler);
  }

  /**
   * Loads a new app pluglin.
   * 
   * @param plugin 
   * @param callback 
   */
  public loadPlugin<T>(plugin: any, callback: (factory: ComponentFactory<T>)=> void): void {
    System.import(plugin.path).then((module: any) => {
      this._compiler.compileModuleAndAllComponentsAsync(module[plugin.className])
                    .then((compiled) => {
                      const factory: ComponentFactory<T> = compiled.componentFactories[0];
                      callback(factory);
                    });
    });
  }
}