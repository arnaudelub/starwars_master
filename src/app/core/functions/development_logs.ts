
import { environment } from '../../../environments/environment';
enum types { warn, count, log, err };

/// This will print the log in console only in development environment.
/// Be sure to build using the --prod tag if you don't want any log in 
/// production
export function devLog(message: any, type = types.log) {
    if (!environment.production) {
        switch (type) {
            case types.log:
                console.log(message);
            case types.warn:
                console.warn(message);
            case types.count:
                console.count(message);
            case types.err:
                console.error(message);
        }
        console.log(message);
    }
}