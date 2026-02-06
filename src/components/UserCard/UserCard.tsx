import type { FC } from 'react';
import { UserCardWrapper } from './UserCard.styled';

interface UserCardProps {}

const UserCard: FC<UserCardProps> = () => (
 <UserCardWrapper data-testid="UserCard">
    UserCard Component
 </UserCardWrapper>
);

export default UserCard;
