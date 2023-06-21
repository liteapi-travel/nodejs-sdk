export * from './bookApi';
import { BookApi } from './bookApi';
export * from './bookingManagementApi';
import { BookingManagementApi } from './bookingManagementApi';
export * from './guestAndLoyaltyApi';
import { GuestAndLoyaltyApi } from './guestAndLoyaltyApi';
export * from './searchApi';
import { SearchApi } from './searchApi';
export * from './staticDataApi';
import { StaticDataApi } from './staticDataApi';
import * as http from 'http';

export class HttpError extends Error {
    constructor (public response: http.IncomingMessage, public body: any, public statusCode?: number) {
        super('HTTP request failed');
        this.name = 'HttpError';
    }
}

export { RequestFile } from '../model/models';

export const APIS = [BookApi, BookingManagementApi, GuestAndLoyaltyApi, SearchApi, StaticDataApi];
