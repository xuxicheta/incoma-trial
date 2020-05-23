import { trigger, transition, query, stagger, animateChild, style, animate, animation, useAnimation } from '@angular/animations';

const childAnimation = animation([
  query('@items', stagger(100, animateChild()))
]);

const itemAnimation = animation([
  style({ opacity: '{{ from }}' }),
  animate('0.45s {{ direction }}',
    style({ opacity: '{{ to }}' }))
]);

export const movieListAnimations = [
  trigger('items', [
    transition(':enter', useAnimation(itemAnimation, { params: { direction: 'ease-in', to: 1, from: 0 }})),
    transition(':leave', useAnimation(itemAnimation, { params: { direction: 'ease-out', to: 0, from: 1 } })),
  ]),
  trigger('list', [
    transition(':enter', useAnimation(childAnimation)),
    transition(':leave', useAnimation(childAnimation)),
  ])
];
