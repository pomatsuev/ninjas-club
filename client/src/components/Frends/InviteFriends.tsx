import React, { useEffect, useState } from 'react';
import { FrendType } from './Frends';
import axios from 'axios';

interface IInviteFriendsProps {
  authId: number | null;
  friends: FrendType[];
  ninjasList: FrendType[];
  setNinjasList: React.Dispatch<React.SetStateAction<FrendType[]>>;
  setFriends: React.Dispatch<React.SetStateAction<FrendType[]>>;
}

export const InviteFrends: React.FC<IInviteFriendsProps> = ({
  authId,
  friends,
  setNinjasList,
  ninjasList,
  setFriends,
}) => {
  const [filterNinjas, setFilterNinjas] = useState<string>('');

  useEffect(() => {
    //here we can add debounce function, but we have fake API )))
    axios.get(filterNinjas ? `/api/ninja?searchName=${filterNinjas}` : '/api/all').then((res) => {
      res.status === 200 && setNinjasList(res.data);
    });
  }, [filterNinjas, setNinjasList]);

  function onChangeFilterHandler(evt: React.ChangeEvent<HTMLInputElement>) {
    setFilterNinjas(evt.target.value);
  }

  function addFriendHandler(id: number, evt: React.MouseEvent) {
    evt.preventDefault();
    axios
      .post(
        '/api/friends',
        { friendId: id },
        {
          headers: {
            'auth-id': authId,
          },
        }
      )
      .then((data) => {
        const ninjaFriend = ninjasList.find((ninja) => ninja.id === id);
        data.status === 201 && setFriends((old) => [...old, ninjaFriend!]);
      });
  }

  return (
    <ul className="ninja-list">
      <li className="ninja-list__li">
        <h2>all ninjas</h2>
      </li>
      <li className="ninja-list__li">
        <input
          type="text"
          style={{ maxWidth: '300px' }}
          placeholder="filter"
          value={filterNinjas}
          onChange={onChangeFilterHandler}
        />
      </li>

      {ninjasList && ninjasList.length > 0 ? (
        ninjasList.map(({ id, fullName }, index) => (
          <li key={id} className="ninja-list__li">
            {index + 1} - {fullName} -{' '}
            {friends.some((friend) => friend.id === id) ? (
              'Your friend'
            ) : (
              <>
                {id === authId ? (
                  "it's you"
                ) : (
                  <a className="link" href="/#" onClick={addFriendHandler.bind(null, id)}>
                    Add friend
                  </a>
                )}
              </>
            )}
          </li>
        ))
      ) : (
        <li className="ninja-list__li" style={{ textAlign: 'center' }}>
          WHERE ARE ALL NINJAS??? o_O
        </li>
      )}
    </ul>
  );
};
