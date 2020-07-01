import React, { useContext, useState } from 'react';
import { TabContainer } from '@inneisystem/tab-container';
import { AuthContext } from '../../context/AuthProvider';
import { FriendsList } from './FriendsList';
import { InviteFrends } from './InviteFriends';

export type FrendType = { id: number; fullName: string };

export const Frends: React.FC = () => {
  const { ninjaId, ninjaFullName } = useContext(AuthContext);
  const [friends, setFriends] = useState<FrendType[]>([]);
  const [ninjasList, setNinjasList] = useState<FrendType[]>([]);

  return (
    <div className="content__block content__block_800">
      <h1 className="content__caption">HELLO NINJA {ninjaFullName}</h1>
      <TabContainer names={['FRENDS LIST', 'IVITE FRIENDS']}>
        <FriendsList authId={ninjaId} friends={friends} setFriends={setFriends} />
        <InviteFrends {...{ ninjasList, setNinjasList, authId: ninjaId, friends, setFriends }} />
      </TabContainer>
    </div>
  );
};
