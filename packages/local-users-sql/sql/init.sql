create table if not exists users (
    id TEXT NOT NULL UNIQUE DEFAULT (lower(hex(randomblob(16)))),
    displayName TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    roles TEXT NOT NULL DEFAULT '',
    "disabled" BIT NOT NULL DEFAULT 0,
    createdAt DATETIME NOT NULL DEFAULT (datetime('now')),
    updatedAt DATETIME NOT NULL DEFAULT (datetime('now'))
);
/*GO*/
insert OR IGNORE into users
    (id, displayName, [password], email, roles)
values
    ('admin', 'Admin', '', 'admin@localhost', 'admin,user');