import { trigger, state, style, animate, transition } from '@angular/animations';

export const errorAnimation = trigger(
    'errorAnimation',
    [
        transition(
            ':enter',
            [
                style({ height: 0, opacity: 0 }),
                animate('1s ease-in-out',
                    style({ height: 30, opacity: 1 }))
            ]
        ),
        transition(
            ':leave',
            [
                style({ opacity: 1, height: 30 }),
                animate('1s ease-in-out',
                    style({ height: 0, opacity: 0 }))
            ]
        )
    ]
)