import { lazy, Suspense, ComponentProps } from 'react';

const LazyUserCard = lazy(() => import('./UserCard'));

const UserCard = (props: ComponentProps<typeof LazyUserCard>) => (
  <Suspense fallback={null}>
    <LazyUserCard {...props} />
  </Suspense>
);

export default UserCard;
