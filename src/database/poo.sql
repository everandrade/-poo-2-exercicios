-- Active: 1675186373421@@127.0.0.1@3306
CREATE TABLE videos (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    title TEXT NOT NULL,
    duration TEXT NOT NULL,
    uploaded_at TEXT DEFAULT (DATETIME()) NOT NULL
);

INSERT INTO videos (id, title, duration, uploaded_at)
VALUES
	("v01", "Filme 1", "01:21:21", "2023-01-21 14:00"),
	("v02", "Filme 2", "01:13:54", "2023-01-21 14:15");


SELECT * FROM videos
WHERE title LIKE "%1%";

DROP Table videos;