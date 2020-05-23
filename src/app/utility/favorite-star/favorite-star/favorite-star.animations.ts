import { animate, animation, style, keyframes, trigger, transition, useAnimation } from '@angular/animations';

export const starAnimation = animation([
  style({ transform: 'scale(1)' }),
  animate(
    '{{ timings }}',
    keyframes([
      style({ transform: 'scale(1)', offset: 0, opacity: 1 }),
      style({ transform: 'scale({{ scale }})', offset: 0.5, opacity: 0.7 }),
      style({ transform: 'scale(1)', offset: 1, opacity: 1 })
    ])
  )
]);

export const favoriteStarAnimations = [
  trigger('star', [
    transition(
      ':increment',
      useAnimation(starAnimation, {
        params: {
          timings: '400ms ease',
          scale: 1.7
        }
      })
    )
  ])
];
