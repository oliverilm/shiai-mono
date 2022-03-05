import React from 'react';

const logs = [
  {
    date: '10.09.2021',
    updates: [
      'Added Back button logic for inner pages',
      'Updated mobile view avatars to be square',
    ],
  },
  {
    date: '02.09.2021',
    updates: [
      'Users can see their information on the profile page.',
      'Club member pending requests are now visible on the club page for club owners.',
      'Club owners can now accept the pending members to their club.',
      'Club owners can now decline the pending requests.',
    ],
  },
];

const DevLog: React.FC = () => (
  <div>
    {logs.map((log) => (
      <div className="my-2">
        {log.date}
        <ol>
          {log.updates.map((up, i) => (
            <li>
              {i + 1}. {up}
            </li>
          ))}
        </ol>
      </div>
    ))}
  </div>
);

export default DevLog;
