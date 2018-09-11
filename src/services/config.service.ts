import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {Config} from '../model/config.model';
import {Injectable} from '@angular/core';

@Injectable()
export class ConfigService {

    constructor(public http: HttpClient, public authService: AuthService) {
    }

    getConfig(key: string) {
        return this.http.get<Config>(this.authService.host + '/config/' + key + '?access_token=' + this.authService.accessToken);
    }

    editConfig(config: Config) {
        return this.http.put(this.authService.host + '/config/' + config.key + '?access_token=' + this.authService.accessToken, config);
    }
}
