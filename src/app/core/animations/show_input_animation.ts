
import { trigger, style, animate, transition } from '@angular/animations';

export const showInputAnimation = trigger(
    'easeAnimation',
    [
        transition(
            ':enter',
            [
                style({ opacity: 0 }),
                animate('.4s ease-in',
                    style({ opacity: 1 }))
            ]
        ),
        transition(
            ':leave',
            [
                style({ opacity: 1, height: 30 }),
                animate('.3s ease-out',
                    style({ height: 0, opacity: 0 }))
            ]
        )
    ]
)