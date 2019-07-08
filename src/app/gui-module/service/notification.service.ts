import { Injectable, Injector } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';

/**
 * The <code>NotificationService</code> service is responsible for managing the application notifications.
 */
@Injectable({
    providedIn: 'root'
})
export class NotificationService {
 
    /**
     * The config object for success notifications.
     */
    private readonly SUCCESS_CONFIG: any = {
        nzStyle: {
            'background-color': '#f6ffed',
            border: '1px solid #b7eb8f'
        },
        nzDuration: 2500
    };

    /**
     * The config object for warning notifications.
     */
    private readonly WARNING_CONFIG: any = {
        nzStyle: {
            'background-color': '#fffbe6',
            border: '1px solid #ffe58f'
        },
        nzDuration: 2500
    };

    /**
     * The config object for error notifications.
     */
    private readonly ERROR_CONFIG: any = {
        nzStyle: {
            'background-color': '#fff1f0',
            border: '1px solid #ffa39e'
        },
        nzDuration: 2500
    };

    /**
     * The reference to the NgZorro notifications service.
     */
    private readonly _notification: NzNotificationService = null;

    /**
     * Create a new <code>NotificationService</code> instance.
     * 
     * @param {Injector} injector the reference to the Angular services injector.
     */
    constructor(protected injector: Injector) {
        this._notification = injector.get(NzNotificationService);
    }

    /**
     * Display an error notification.
     * 
     * @param {string} title the title of the notification.
     * @param {string} message the message of the notification.
     */
    public error(title: string, message: string): void {
        this._notification.error(title, message, this.ERROR_CONFIG);
    }
    
    /**
     * Display a success notification.
     * 
     * @param {string} title the title of the notification.
     * @param {string} message the message of the notification.
     */
    public success(title: string, message: string): void {
        this._notification.success(title, message, this.SUCCESS_CONFIG);
    }
    
    /**
     * Display a warning notification.
     * 
     * @param {string} title the title of the notification.
     * @param {string} message the message of the notification.
     */
    public warning(title: string, message: string): void {
        this._notification.success(title, message, this.WARNING_CONFIG);
    }
}