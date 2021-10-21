import {
  trigger,
  transition,
  style,
  query,
  group,
  animateChild,
  animate,
  keyframes,
} from '@angular/animations';

export const fade = trigger('routeAnimations', [
  transition('HomePage => VideoPage', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        transform: 'translateX(-100%)',
        opacity: 0,
      }),
    ]),
    query(':enter', [
      animate(
        '400ms ease',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
    ]),
  ]),
  transition('VideoPage => HomePage', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        right: 0,
        top: 0,
        width: '100%',
        transform: 'translateX(100%)',
        opacity: 0,
      }),
    ]),
    query(':enter', [
      animate(
        '400ms ease',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
    ]),
  ]),
  transition('VideoPage => VideoDetailPage', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        transform: 'translateX(-100%)',
        opacity: 0,
      }),
    ]),
    query(':enter', [
      animate(
        '400ms ease',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
    ]),
  ]),
  transition('VideoDetailPage => VideoPage', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        right: 0,
        top: 0,
        width: '100%',
        transform: 'translateX(100%)',
        opacity: 0,
      }),
    ]),
    query(':enter', [
      animate(
        '400ms ease',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
    ]),
  ]),
  transition('VideoPage => FavoritePage', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        transform: 'translateX(-100%)',
        opacity: 0,
      }),
    ]),
    query(':enter', [
      animate(
        '400ms ease',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
    ]),
  ]),
  transition('FavoritePage => VideoPage', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        right: 0,
        top: 0,
        width: '100%',
        transform: 'translateX(100%)',
        opacity: 0,
      }),
    ]),
    query(':enter', [
      animate(
        '400ms ease',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
    ]),
  ]),
  transition('FavoritePage => FavoriteDetailPage', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        transform: 'translateX(-100%)',
        opacity: 0,
      }),
    ]),
    query(':enter', [
      animate(
        '400ms ease',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
    ]),
  ]),
  transition('FavoriteDetailPage => FavoritePage', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        right: 0,
        top: 0,
        width: '100%',
        transform: 'translateX(100%)',
        opacity: 0,
      }),
    ]),
    query(':enter', [
      animate(
        '400ms ease',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
    ]),
  ]),
  transition('FavoritePage => HomePage', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        right: 0,
        top: 0,
        width: '100%',
        transform: 'translateX(100%)',
        opacity: 0,
      }),
    ]),
    query(':enter', [
      animate(
        '400ms ease',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
    ]),
  ]),
  transition('FavoritePage => SubscriptionPage', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        transform: 'translateX(-100%)',
        opacity: 0,
      }),
    ]),
    query(':enter', [
      animate(
        '400ms ease',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
    ]),
  ]),
  transition('VideoPage => SubscriptionPage', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        transform: 'translateX(-100%)',
        opacity: 0,
      }),
    ]),
    query(':enter', [
      animate(
        '400ms ease',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
    ]),
  ]),
  transition('AuthPage => VideoPage', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        right: 0,
        top: 0,
        width: '100%',
        transform: 'translateX(-100%)',
        opacity: 0,
      }),
    ]),
    query(':enter', [
      animate(
        '700ms ease',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
    ]),
  ]),
  transition('AuthPage => HomePage', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        right: 0,
        top: 0,
        width: '100%',
        transform: 'translateX(100%)',
        opacity: 0,
      }),
    ]),
    query(':enter', [
      animate(
        '700ms ease',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
    ]),
  ]),
]);
