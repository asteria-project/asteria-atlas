import { Injectable, Injector } from '@angular/core';
import { BreadcrumbItem } from '../util/breadcrumb/breadcrumb-item.model';
import { BreadcrumbItemBuilder } from '../util/breadcrumb/breadcrumb-item.builder';

/**
 * The <code>BreadcrumbService</code> service allows to manage the Atlas app breadcrumb.
 */
@Injectable({
    providedIn: 'root'
})
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
     * Represent the snapshot of the current breadcrumb item list.
     */
    private _snapshot: BreadcrumbItem[] = null;

    /**
     * Return the list of breadcrumb items.
     */
    public get items(): BreadcrumbItem[] {
        return this._items;
    }

    /**
     * Return a copy of the list of breadcrumb items stored in the internal snapshot.
     */
    public get snapshot(): BreadcrumbItem[] {
        return this._snapshot ? this._snapshot.slice() : null;
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
    
    /**
     * Take a snapshot of the current list of breadcrumb items.
     * 
     * @param {string} lastItemRoute the optional value of the last item route.
     * 
     * @returns {BreadcrumbItem[]} a copy of the newly created snapshot.
     */
    public takeSnapshot(lastItemRoute?: string): BreadcrumbItem[] {
        this._snapshot = this._items.slice(1);
        if (lastItemRoute) {
            this._snapshot[this._snapshot.length - 1].route = lastItemRoute;
        }
        return this.snapshot;
    }
    
    /**
     * Clear the breadcrumb items snapshot, if exists.
     */
    public clearSnapshot(): void {
        this._snapshot = null;
    }
}