import React, { useEffect, useCallback } from 'react';
import { FrendType } from './Frends';
import axios from 'axios';

interface IFriendsListProps {
  authId: number | null;
  friends: FrendType[];
  setFriends: React.Dispatch<React.SetStateAction<FrendType[]>>;
}

export const FriendsList: React.FC<IFriendsListProps> = ({ authId, friends, setFriends }) => {
  const axiosInstance = useCallback(
    axios.create({
      headers: {
        'auth-id': authId,
      },
    }),
    [authId]
  );

  useEffect(() => {
    axiosInstance.get('/api/friends').then((res) => {
      res.status === 200 && setFriends(res.data);
    });
  }, [authId, setFriends, axiosInstance]);

  function removeFromFriendListHandler(id: number, evt: React.MouseEvent) {
    evt.preventDefault();
    axiosInstance
      .delete('/api/friends', { data: { friendId: id } })
      .then((data) => {
        data.status === 201 && setFriends((old) => [...old.filter((friend) => friend.id !== id)]);
      })
      .catch((err) => {
        /*
         * errors... hm... i think, it's testing...
         * we have fake API... don't worry about errors ninja...
         * real ninja are not afraid of difficulties...
         */
      });
  }

  return (
    <ul className="ninja-list">
      <li className="ninja-list__li">
        <h2 style={{ textAlign: friends.length > 0 ? 'left' : 'center' }}>
          Your best friends ninjas
        </h2>
      </li>
      {friends && friends.length > 0 ? (
        friends.map((friend, index) => (
          <li key={friend.id} className="ninja-list__li">
            {index + 1} - {friend.fullName} -{' '}
            {
              <a
                className="link"
                href="/#"
                onClick={removeFromFriendListHandler.bind(null, friend.id)}
              >
                Enemy
              </a>
            }
          </li>
        ))
      ) : (
        <li style={{ textAlign: 'center' }} className="ninja-list__li">
          U DON'T HAVE FRIENDS... Ninja without frends so weak!
        </li>
      )}
    </ul>
  );
};
