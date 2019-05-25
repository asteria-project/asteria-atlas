import { Injectable, Injector } from '@angular/core';
import { BreadcrumbItem } from '../../util/breadcrumb/breadcrumb-item.model';
import { BreadcrumbItemBuilder } from '../../util/breadcrumb/breadcrumb-item.builder';

/**
 * The <code>BreadcrumbService</code> service allows to manage the Atlas app breadcrumb.
 */
@Injectable()
export class BreadcrumbService {
 
    /**
     * Represents the breadcrumb item for the Atlas app route.
     */
    private static readonly ROOT_ITEM: BreadcrumbItem[] = [BreadcrumbItemBuilder.build('Atlas')];

    /**
     * The list of breadcrumb items.
     */
    private _items: BreadcrumbItem[] = null;

    /**
     * Return the list of breadcrumb items.
     */
    public get items(): BreadcrumbItem[] {
        return this._items;
    }

    /**
     * Create a new <code>BreadcrumbService</code> instance.
     * 
     * @param {Injector} injector the reference to the Angular services injector.
     */
    constructor(protected injector: Injector) {
        this.setItems();
    }

    /**
     * Set the list of breadcrumb items.
     * 
     * @param {BreadcrumbItem[]} items the new list of breadcrumb items.
     */
    public setItems(items?: BreadcrumbItem[]): void {
        const self: BreadcrumbService = this;
        setTimeout((handler: TimerHandler)=> {
            self._items = items ? BreadcrumbService.ROOT_ITEM.concat(items) : BreadcrumbService.ROOT_ITEM;
        });
    }
}