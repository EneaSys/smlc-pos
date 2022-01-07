import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.prepareHeader(request)).pipe(
            switchMap(request => {
                return next.handle(request);
            })
        );
    }

    private async prepareHeader(request: HttpRequest<any>): Promise<HttpRequest<any>> {
        if (request.url.startsWith("https://api-gest.eneasys.net/")) {
            return this.prepareHeaderWithContext(request);
        }
        else {
            return request;
        }
    }

    private async prepareHeaderWithContext(request: HttpRequest<any>): Promise<HttpRequest<any>> {
        const user = await this.authService.getUser();

        request = request.clone({
            setHeaders: {
                'Authorization': 'Bearer ' + user.aigJwt,
                'X-Tenant-Code': user.context,
            }
        });

        return request;
    }
}
