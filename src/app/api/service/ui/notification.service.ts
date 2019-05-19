import { Injectable, Injector } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';

/**
 * The <code>NotificationService</code> service is responsible for managing the application notifications.
 */
@Injectable()
export class NotificationService {
 
    /**
     * The reference to the Zorro notifications service.
     */
    private _notification: NzNotificationService = null;

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
        this._notification.error(
            title,
            message,
            {
                nzStyle: {
                    'background-color': '#fff1f0',
                    border: '1px solid #ffa39e'
                }
            }
        );
    }
}