import { trigger, state, style, animate, transition } from '@angular/animations';

export const containerAnimation = trigger(
    'openClose',
    [
        state('open',
            style({ opacity: 1, height: '*', })),
        state('closed',
            style({
                opacity: 0, height: 0
            })),
        transition('closed => open', [
            animate('.5s')]),
        transition('open => closed', [
            animate('.5s')])

    ]
);