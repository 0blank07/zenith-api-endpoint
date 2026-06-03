blank@zenith-production:~$ psql -h localhost -U zenith_bot -d zenith_data
Password for user zenith_bot:
psql (14.23 (Ubuntu 14.23-0ubuntu0.22.04.1))
SSL connection (protocol: TLSv1.3, cipher: TLS_AES_256_GCM_SHA384, bits: 256, compression: off)
Type "help" for help.

zenith_data=> SELECT player_id, name, event, ovr FROM player_stats WHERE player_id=24044714;
 player_id | name | event | ovr
-----------+------+-------+-----
(0 rows)

zenith_data=> SELECT player_id, name, event, ovr FROM player_stats WHERE player_id=24044726;
 player_id | name | event | ovr
-----------+------+-------+-----
(0 rows)

zenith_data=>




here is check this:
blank@zenith-production:~$ psql -h localhost -U zenith_bot -d zenith_data -c "SELECT player_id, name, ovr, position, event, date_added FROM player_stats WHERE player_id IN (30913645, 30913644, 30913643, 30913642, 30913641, 30913640,
     30913639, 30913638, 30913637, 30913636);"
Password for user zenith_bot:
 player_id |   name    | ovr | position | event |          date_added
-----------+-----------+-----+----------+-------+------------------------------
  30913636 | Bale      | 115 | RW       |       | 2026-05-28T08:39:17.2049115Z
  30913637 | Di Natale | 115 | ST       |       | 2026-05-28T08:39:17.3542097Z
  30913638 | Maicon    | 115 | RB       |       | 2026-05-28T08:39:17.3545276Z
  30913639 | Barzagli  | 113 | CB       |       | 2026-05-28T08:39:17.3546782Z
  30913640 | Kaká      | 115 | CAM      |       | 2026-05-28T08:39:17.3555993Z
  30913641 | Chiellini | 115 | CB       |       | 2026-05-28T08:39:17.3557523Z
  30913642 | Ribéry    | 115 | LM       |       | 2026-05-28T08:39:17.3558651Z
  30913643 | Hagi      | 115 | CAM      |       | 2026-05-28T08:39:17.3563196Z
  30913644 | Zico      | 115 | CAM      |       | 2026-05-28T08:39:17.4954146Z
  30913645 | Baresi    | 115 | CB       |       | 2026-05-28T08:39:17.4964123Z
(10 rows)

blank@zenith-production:~$
