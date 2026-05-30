Request payload a simple search by name messi as you said:
{"query":{"bool":{"must":[{"query_string":{"fields":["cardName","commonName","firstName","lastName"],"query":"*messi*"}}],"should":[],"must_not":[]}},"sort":[{"rating":{"order":"desc"}},{"assetId":{"order":"desc"}}],"_source":[],"from":0,"size":40}

Request payload a simple search by name messi as you said auctionable enable:
{"query":{"bool":{"must":[{"query_string":{"fields":["cardName","commonName","firstName","lastName"],"query":"*messi*"}},{"match":{"auctionable":true}},{"range":{"priceData.0.basePrice":{}}}],"should":[],"must_not":[]}},"sort":[{"rating":{"order":"desc"}},{"assetId":{"order":"desc"}}],"_source":[],"from":0,"size":40}

Request payload players with rating > 100:
{"query":{"bool":{"must":[{"range":{"rating":{"gte":100,"lte":120}}}],"should":[],"must_not":[]}},"sort":[{"added":{"order":"desc"}},{"assetId":{"order":"desc"}}],"_source":[],"from":0,"size":40}



Response a simple search by name messi as you said (response is too big so I will paste some lines):
{
    "players": [
        {
            "assetId": 24035838,
            "playerId": 158023,
            "firstName": "Lionel",
            "lastName": "Messi",
            "commonName": "",
            "cardName": "Messi",
            "position": "RW",
            "rating": 119,
            "weakFoot": 5,
            "foot": 2,
            "source": "PROGRAM_TOTS26",
            "workRateAtt": 2,
            "workRateDef": 1,
            "weight": 67,
            "height": 169,
            "birthday": "1987-06-24T00:00:00Z",
            "bio": "biotxt_24035521",
            "bindingXml": "PLAYERCARDUI_TOTS26_REGULAR_B",
            "animation": {
                "cardData": [
                    "background",
                    "player",
                    "rating",
                    "position",
                    "nation",
                    "league",
                    "club",
                    "name",
                    "level",
                    "rank"
                ],
                "colors": {
                    "rating": "#FFFFFF",
                    "position": "#FFFFFF",
                    "name": "#FFFFFF",
                    "level": "#FFFFFF"
                },
                "layout": {
                    "player": {
                        "sizeX": 256,
                        "sizeY": 256,
                        "posX": 0,
                        "posY": 0
                    },
                    "rating": {
                        "sizeX": 80,
                        "sizeY": 80,
                        "posX": 36,
                        "posY": 4,
                        "fontSize": 36
                    },
                    "position": {
                        "sizeX": 40,
                        "sizeY": 20,
                        "posX": 56,
                        "posY": 64,
                        "fontSize": 24
                    },
                    "nation": {
                        "sizeX": 24,
                        "sizeY": 24,
                        "posX": 64.083,
                        "posY": 188.088
                    },
                    "club": {
                        "sizeX": 24,
                        "sizeY": 24,
                        "posX": 168,
                        "posY": 188
                    },
                    "league": {
                        "sizeX": 24,
                        "sizeY": 24,
                        "posX": 116,
                        "posY": 188
                    },
                    "name": {
                        "sizeX": 0,
                        "sizeY": 0,
                        "posX": 128.166,
                        "posY": 178.101,
                        "fontSize": 22
                    },
                    "level": {
                        "sizeX": 64,
                        "sizeY": 32,
                        "posX": 128,
                        "posY": 233,
                        "fontSize": 23
                    },
                    "rank": {
                        "sizeX": 32,
                        "sizeY": 32,
                        "posX": 128,
                        "posY": 232
                    }
                },
                "animations": [
                    {
                        "animations": [
                            {
                                "id": "LX0tOC",
                                "image": "https://images-v2.renderz.app/sprite_23_tots26_B_TOTS26_LIVE?verify=1779802790-JnBXR8AO8DArA3M8YqFcNHjYufKxP0HdCz9bS9hPGgQ%3D",
                                "imageName": "tots26_B_TOTS26_LIVE",
                                "imageHeight": 0,
                                "imageWidth": 0,
                                "maxFrames": 45
                            }
                        ],
                        "when": "(#cardSize == ~Constants.CARD_PICTURE_BIG_SIZE || (#cardSize == ~Constants.CARD_PICTURE_MEDIUM_SIZE && #UILevel != 0))"
                    }
                ]
            },
            "tags": "PHASE_3_C,GC260521,PHASE_3,PHASE_3_A,TOTS26,TOTS26_BADGE,TOTS26_ALL,TOTS26_W5,TOTS26_LIVE,S_25,PHASE_3_B,CLUB,BASEOVR_119,RANK_ATT,no_auction,24035838,ZEROWEIGHTEDPLAYER",
            "skillStyleId": 362,
            "skillStyleSkills": [
                {
                    "id": 36010,
                    "name": "NAME_SKILL_36010",
                    "image": "https://images-v2.renderz.app/skill_S10_WINGER_3?verify=1779281533-9apJdz40UlGxHjq16F719O0Dux7PUogrUtRCR4%2FPv1s%3D"
                },
                {
                    "id": 36040,
                    "name": "NAME_SKILL_36040",
                    "image": "https://images-v2.renderz.app/skill_S10_INVERTED_WINGER_3?verify=1779281533-cJr8Xq%2Bc%2FhN0NoN4iB%2FRaHIag%2BVWc1uruLzQVVHjXKk%3D"
                },
                {
                    "id": 36050,
                    "name": "NAME_SKILL_36050",
                    "image": "https://images-v2.renderz.app/skill_S10_DRIBBLING_3?verify=1779281533-AfeHrosMN8VCpDpBGZ5LkgjgtF87Wv4KRtKBGzWK2%2Fo%3D"
                },
                {
                    "id": 36060,
                    "name": "NAME_SKILL_36060",
                    "image": "https://images-v2.renderz.app/skill_S10_PASSING_3?verify=1779281533-A3Ee30HSr%2B29MH%2Fa%2BASu2QXLLCd7gaZ7oCwswA0ZMtM%3D"
                },
                {
                    "id": 36070,
                    "name": "NAME_SKILL_36070",
                    "image": "https://images-v2.renderz.app/skill_S10_SHOOTING_3?verify=1779281533-b%2FWqrUECi8TavXJlAZj15xV3JaLKxdrY77WK%2BSdSvdM%3D"
                }
            ],
            "images": {
                "playerCardImage": "https://images-v2.renderz.app/player_25_158023_TOTS26_LIVE_5996c96fd430e6d2?verify=1779281537-8%2B1UGiuTnR20%2BbVh8F3WYXlnBW5jOyozwKxwWpM3ZRc%3D",
                "playerCardBackground": "https://images-v2.renderz.app/bg_23_backgrounds_26_B_TOTS26_LIVE_STATIC?verify=1779281537-uGITM8WbcmN4fi2HmKrf540tH9mW0b6S%2FHP3lo36W8k%3D",
                "flagImage": "https://images-v2.renderz.app/flags_23_128x128_52?verify=1779281537-Hhol0MYOsh%2Bf8nUBumL3Gq9ukpYVBDH7Jq3tVOcHiaY%3D",
                "clubImage": "https://images-v2.renderz.app/club_23_112893?verify=1779281537-9GbMoRjsK5cxN57Cdx%2FlYHsebrVLwTps7h3MDO07qxE%3D",
                "leagueImage": "https://images-v2.renderz.app/league_23_39?verify=1779281537-8MQku%2B5vy0YxeoHOP85GRX2NezdBWsWGTn483DK%2FKlM%3D"
            },
            "skillMoves": {
                "id": 13,
                "title": "skillmove_name_13",
                "description": "skillmove_desc_13",
                "image": "https://images-v2.renderz.app/skillmovelogo_23_0?verify=1779281537-8k8IboqQoOy74bw8I%2B2NnoXVoUZPAOiLtoSfn5ZgILA%3D"
            },
            "skillMovesLevel": 4,
            "celebration": {
                "id": 52,
                "title": "celebration_name_52",
                "description": "celebration_desc_0",
                "image": "https://images-v2.renderz.app/celebrationlogo_23_0?verify=1779281537-z3rFuWORXFsfmRFzGeQF9JCqlLWmOA%2FEj4ToJkj0uvQ%3D"
            },
            "traits": [
                {
                    "id": 13,
                    "title": "trait_name_13",
                    "description": "trait_desc_13",
                    "image": "https://images-v2.renderz.app/traitlogo_23_13?verify=1779281538-Qw%2FdZZ5lpG0nqnW1TJhr2w4SMdZN96spXmgUJWy7%2BZY%3D"
                },
                {
                    "id": 16,
                    "title": "trait_name_16",
                    "description": "trait_desc_16",
                    "image": "https://images-v2.renderz.app/traitlogo_23_16?verify=1779281538-L1g9E5aFiRFgKbrl%2BGyxhexnMV3NsgRdgDH%2BTAv4758%3D"
                },
                {
                    "id": 18,
                    "title": "trait_name_18",
                    "description": "trait_desc_18",
                    "image": "https://images-v2.renderz.app/traitlogo_23_18?verify=1779281538-JJ9medS1yYw1RXscDbO5JaqyG3Pz31Ux8Zrj2Zabqzc%3D"
                }
            ],
            "club": {
                "id": 112893,
                "name": "TeamName_112893"
            },
            "league": {
                "id": 39,
                "name": "LeagueName_39"
            },
            "nation": {
                "id": 52,
                "name": "NationName_52"
            },
            "potentialPositions": [
                "ST",
                "CAM"
            ],
            "avgStats": {
                "avg1": 151,
                "avg2": 144,
                "avg3": 144,
                "avg4": 150,
                "avg5": 50,
                "avg6": 116
            },
            "avgGkStats": {
                "avg1": 6,
                "avg2": 14,
                "avg3": 11,
                "avg4": 8,
                "avg5": 15,
                "avg6": 147
            },
            "stats": {
                "acc": 153,
                "agg": 106,
                "agi": 148,
                "awr": 50,
                "bac": 152,
                "bal": 147,
                "cro": 138,
                "cur": 144,
                "dri": 153,
                "fin": 150,
                "frk": 135,
                "gkd": 6,
                "gkk": 15,
                "gkp": 14,
                "han": 11,
                "hea": 108,
                "jmp": 118,
                "lpa": 143,
                "lsa": 147,
                "mrk": 29,
                "pen": 125,
                "pos": 137,
                "rea": 151,
                "ref": 8,
                "sho": 142,
                "slt": 25,
                "spa": 148,
                "spd": 150,
                "str": 122,
                "stt": 60,
                "vis": 146,
                "vol": 140,
                "sta": 80,
                "total": 3501
            },
            "liveOvr": {
                "ovrUpgrade": 0
            },
            "priceData": {
                "0": {
                    "basePrice": 2140000000
                },
                "1": {
                    "basePrice": 2780000000
                },
                "2": {
                    "basePrice": 3610000000
                },
                "3": {
                    "basePrice": 4690000000
                },
                "4": {
                    "basePrice": 9370000000
                },
                "5": {
                    "basePrice": 9450000000
                }
            },
            "auctionable": false,
            "rank": 0,
            "likes": 0,
            "added": "2026-05-20T12:52:17.2664723Z",
            "revealOn": "2026-05-20T15:00:00Z"
        },
        {
            "assetId": 24035837,
            "playerId": 158023,
            "firstName": "Lionel",
            "lastName": "Messi",
            "commonName": "",
            "cardName": "Messi",
            "position": "RW",
            "rating": 119,
            "weakFoot": 5,
            "foot": 2,
            "source": "PROGRAM_TOTS26",
            "workRateAtt": 2,
            "workRateDef": 1,
            "weight": 67,
            "height": 169,
            "birthday": "1987-06-24T00:00:00Z",
            "bio": "biotxt_24035521",
            "bindingXml": "PLAYERCARDUI_TOTS26_REGULAR_B",
            "animation": {
                "cardData": [
                    "background",
                    "player",
                    "rating",
                    "position",
                    "nation",
                    "league",
                    "club",
                    "name",
                    "level",
                    "rank"
                ],
                "colors": {
                    "rating": "#FFFFFF",
                    "position": "#FFFFFF",
                    "name": "#FFFFFF",
                    "level": "#FFFFFF"
                },
                "layout": {
                    "player": {
                        "sizeX": 256,
                        "sizeY": 256,
                        "posX": 0,
                        "posY": 0
                    },
                    "rating": {
                        "sizeX": 80,
                        "sizeY": 80,
                        "posX": 36,
                        "posY": 4,
                        "fontSize": 36
                    },
                    "position": {
                        "sizeX": 40,
                        "sizeY": 20,
                        "posX": 56,
                        "posY": 64,
                        "fontSize": 24
                    },
                    "nation": {
                        "sizeX": 24,
                        "sizeY": 24,
                        "posX": 64.083,
                        "posY": 188.088
                    },
                    "club": {
                        "sizeX": 24,
                        "sizeY": 24,
                        "posX": 168,
                        "posY": 188
                    },
                    "league": {
                        "sizeX": 24,
                        "sizeY": 24,
                        "posX": 116,
                        "posY": 188
                    },
                    "name": {
                        "sizeX": 0,
                        "sizeY": 0,
                        "posX": 128.166,
                        "posY": 178.101,
                        "fontSize": 22
                    },
                    "level": {
                        "sizeX": 64,
                        "sizeY": 32,
                        "posX": 128,
                        "posY": 233,
                        "fontSize": 23
                    },
                    "rank": {
                        "sizeX": 32,
                        "sizeY": 32,
                        "posX": 128,
                        "posY": 232
                    }
                },
                "animations": [
                    {
                        "animations": [
                            {
                                "id": "gUYSq8",
                                "image": "https://images-v2.renderz.app/sprite_23_tots26_B_TOTS26_LIVE?verify=1779802790-JnBXR8AO8DArA3M8YqFcNHjYufKxP0HdCz9bS9hPGgQ%3D",
                                "imageName": "tots26_B_TOTS26_LIVE",
                                "imageHeight": 0,
                                "imageWidth": 0,
                                "maxFrames": 45
                            }
                        ],
                        "when": "(#cardSize == ~Constants.CARD_PICTURE_BIG_SIZE || (#cardSize == ~Constants.CARD_PICTURE_MEDIUM_SIZE && #UILevel != 0))"
                    }
                ]
            },
            "tags": "PHASE_3_C,GC260521,PHASE_3,PHASE_3_A,TOTS26,TOTS26_BADGE,TOTS26_ALL,TOTS26_W5,TOTS26_LIVE,S_25,PHASE_3_B,CLUB,BASEOVR_119,RANK_ATT,Auction,24035837",
            "skillStyleId": 362,
            "skillStyleSkills": [
                {
                    "id": 36010,
                    "name": "NAME_SKILL_36010",
                    "image": "https://images-v2.renderz.app/skill_S10_WINGER_3?verify=1779281533-9apJdz40UlGxHjq16F719O0Dux7PUogrUtRCR4%2FPv1s%3D"
                },
                {
                    "id": 36040,
                    "name": "NAME_SKILL_36040",
                    "image": "https://images-v2.renderz.app/skill_S10_INVERTED_WINGER_3?verify=1779281533-cJr8Xq%2Bc%2FhN0NoN4iB%2FRaHIag%2BVWc1uruLzQVVHjXKk%3D"
                },
                {
                    "id": 36050,
                    "name": "NAME_SKILL_36050",
                    "image": "https://images-v2.renderz.app/skill_S10_DRIBBLING_3?verify=1779281533-AfeHrosMN8VCpDpBGZ5LkgjgtF87Wv4KRtKBGzWK2%2Fo%3D"
                },
                {
                    "id": 36060,
                    "name": "NAME_SKILL_36060",
                    "image": "https://images-v2.renderz.app/skill_S10_PASSING_3?verify=1779281533-A3Ee30HSr%2B29MH%2Fa%2BASu2QXLLCd7gaZ7oCwswA0ZMtM%3D"
                },
                {
                    "id": 36070,
                    "name": "NAME_SKILL_36070",
                    "image": "https://images-v2.renderz.app/skill_S10_SHOOTING_3?verify=1779281533-b%2FWqrUECi8TavXJlAZj15xV3JaLKxdrY77WK%2BSdSvdM%3D"
                }
            ],
            "images": {
                "playerCardImage": "https://images-v2.renderz.app/player_25_158023_TOTS26_LIVE_5996c96fd430e6d2?verify=1779281537-8%2B1UGiuTnR20%2BbVh8F3WYXlnBW5jOyozwKxwWpM3ZRc%3D",
                "playerCardBackground": "https://images-v2.renderz.app/bg_23_backgrounds_26_B_TOTS26_LIVE_STATIC?verify=1779281537-uGITM8WbcmN4fi2HmKrf540tH9mW0b6S%2FHP3lo36W8k%3D",
                "flagImage": "https://images-v2.renderz.app/flags_23_128x128_52?verify=1779281537-Hhol0MYOsh%2Bf8nUBumL3Gq9ukpYVBDH7Jq3tVOcHiaY%3D",
                "clubImage": "https://images-v2.renderz.app/club_23_112893?verify=1779281537-9GbMoRjsK5cxN57Cdx%2FlYHsebrVLwTps7h3MDO07qxE%3D",
                "leagueImage": "https://images-v2.renderz.app/league_23_39?verify=1779281537-8MQku%2B5vy0YxeoHOP85GRX2NezdBWsWGTn483DK%2FKlM%3D"
            },
            "skillMoves": {
                "id": 13,
                "title": "skillmove_name_13",
                "description": "skillmove_desc_13",
                "image": "https://images-v2.renderz.app/skillmovelogo_23_0?verify=1779281537-8k8IboqQoOy74bw8I%2B2NnoXVoUZPAOiLtoSfn5ZgILA%3D"
            },
            "skillMovesLevel": 4,
            "celebration": {
                "id": 52,
                "title": "celebration_name_52",
                "description": "celebration_desc_0",
                "image": "https://images-v2.renderz.app/celebrationlogo_23_0?verify=1779281537-z3rFuWORXFsfmRFzGeQF9JCqlLWmOA%2FEj4ToJkj0uvQ%3D"
            },
            "traits": [
                {
                    "id": 13,
                    "title": "trait_name_13",
                    "description": "trait_desc_13",
                    "image": "https://images-v2.renderz.app/traitlogo_23_13?verify=1779281538-Qw%2FdZZ5lpG0nqnW1TJhr2w4SMdZN96spXmgUJWy7%2BZY%3D"
                },
                {
                    "id": 16,
                    "title": "trait_name_16",
                    "description": "trait_desc_16",
                    "image": "https://images-v2.renderz.app/traitlogo_23_16?verify=1779281538-L1g9E5aFiRFgKbrl%2BGyxhexnMV3NsgRdgDH%2BTAv4758%3D"
                },
                {
                    "id": 18,
                    "title": "trait_name_18",
                    "description": "trait_desc_18",
                    "image": "https://images-v2.renderz.app/traitlogo_23_18?verify=1779281538-JJ9medS1yYw1RXscDbO5JaqyG3Pz31Ux8Zrj2Zabqzc%3D"
                }
            ],
            "club": {
                "id": 112893,
                "name": "TeamName_112893"
            },
            "league": {
                "id": 39,
                "name": "LeagueName_39"
            },
            "nation": {
                "id": 52,
                "name": "NationName_52"
            },
            "potentialPositions": [
                "ST",
                "CAM"
            ],
            "avgStats": {
                "avg1": 151,
                "avg2": 144,
                "avg3": 144,
                "avg4": 150,
                "avg5": 50,
                "avg6": 116
            },
            "avgGkStats": {
                "avg1": 6,
                "avg2": 14,
                "avg3": 11,
                "avg4": 8,
                "avg5": 15,
                "avg6": 147
            },
            "stats": {
                "acc": 153,
                "agg": 106,
                "agi": 148,
                "awr": 50,
                "bac": 152,
                "bal": 147,
                "cro": 138,
                "cur": 144,
                "dri": 153,
                "fin": 150,
                "frk": 135,
                "gkd": 6,
                "gkk": 15,
                "gkp": 14,
                "han": 11,
                "hea": 108,
                "jmp": 118,
                "lpa": 143,
                "lsa": 147,
                "mrk": 29,
                "pen": 125,
                "pos": 137,
                "rea": 151,
                "ref": 8,
                "sho": 142,
                "slt": 25,
                "spa": 148,
                "spd": 150,
                "str": 122,
                "stt": 60,
                "vis": 146,
                "vol": 140,
                "sta": 80,
                "total": 3501
            },
            "liveOvr": {
                "ovrUpgrade": 0
            },
            "priceData": {
                "0": {
                    "basePrice": 5660000000
                },
                "1": {
                    "basePrice": 5440000000
                },
                "2": {
                    "basePrice": 6000000000
                },
                "3": {
                    "basePrice": 5580000000
                },
                "4": {
                    "basePrice": 5750000000
                },
                "5": {
                    "basePrice": 6100000000
                }
            },
            "auctionable": true,
            "rank": 0,
            "likes": 0,
            "added": "2026-05-20T12:52:17.2662722Z",
            "revealOn": "2026-05-20T15:00:00Z"
        },

Response players with rating > 100:
{
    "players": [
        {
            "assetId": 30912230,
            "playerId": 262271,
            "firstName": "Diego",
            "lastName": "Milito",
            "commonName": "",
            "cardName": "Milito",
            "position": "ST",
            "rating": 116,
            "weakFoot": 4,
            "foot": 1,
            "source": "PROGRAM_HEROS8",
            "workRateAtt": 2,
            "workRateDef": 1,
            "weight": 78,
            "height": 183,
            "birthday": "1979-06-12T00:00:00Z",
            "bio": "biotxt_30905000",
            "bindingXml": "PLAYERCARDUI_NATION_STORY26_ARGENTINA_ICON_B",
            "animation": {
                "cardData": [
                    "background",
                    "player",
                    "rating",
                    "position",
                    "nation",
                    "club",
                    "name",
                    "level",
                    "rank"
                ],
                "colors": {
                    "rating": "#513D03",
                    "position": "#513D03",
                    "name": "#513D03",
                    "level": "#FFFFFF"
                },
                "layout": {
                    "player": {
                        "sizeX": 256,
                        "sizeY": 256,
                        "posX": 0,
                        "posY": 0
                    },
                    "rating": {
                        "sizeX": 80,
                        "sizeY": 80,
                        "posX": 36,
                        "posY": 4,
                        "fontSize": 36
                    },
                    "position": {
                        "sizeX": 40,
                        "sizeY": 20,
                        "posX": 56,
                        "posY": 64,
                        "fontSize": 24
                    },
                    "nation": {
                        "sizeX": 24,
                        "sizeY": 24,
                        "posX": 82.7,
                        "posY": 188
                    },
                    "club": {
                        "sizeX": 24,
                        "sizeY": 24,
                        "posX": 146.6,
                        "posY": 188
                    },
                    "name": {
                        "sizeX": 0,
                        "sizeY": 0,
                        "posX": 128,
                        "posY": 178,
                        "fontSize": 22
                    },
                    "level": {
                        "sizeX": 64,
                        "sizeY": 32,
                        "posX": 128,
                        "posY": 233,
                        "fontSize": 23
                    },
                    "rank": {
                        "sizeX": 32,
                        "sizeY": 32,
                        "posX": 128,
                        "posY": 232
                    }
                },
                "animations": [
                    {
                        "animations": [
                            {
                                "id": "3c7Iiz",
                                "image": "https://images-v2.renderz.app/sprite_23_nation_s_story26_argentina26_B_A_NATION_S_STORY26_ARGENTINA_ICON_LOOP?verify=1779802905-KUYARpxuDWfajYlRhNvZzZE6CB9W3Kbg6yUUA6qUJ7o%3D",
                                "imageName": "nation_s_story26_argentina26_B_A_NATION_S_STORY26_ARGENTINA_ICON_LOOP",
                                "imageHeight": 0,
                                "imageWidth": 0,
                                "maxFrames": 45
                            }
                        ],
                        "when": "(#cardSize == ~Constants.CARD_PICTURE_BIG_SIZE || (#cardSize == ~Constants.CARD_PICTURE_MEDIUM_SIZE && #UILevel != 0))"
                    }
                ]
            },
            "tags": "HEROS10,ANS26,ANS26_BADGE,ANS26_ALL,GC260521,ANS26_ARG,S_25,CLUB,BASEOVR_116,RANK_ATT,no_auction,30912230,ZEROWEIGHTEDPLAYER",
            "skillStyleId": 370,
            "skillStyleSkills": [
                {
                    "id": 37010,
                    "name": "NAME_SKILL_37010",
                    "image": "https://images-v2.renderz.app/skill_S10_STRIKER_3?verify=1779281533-P4ZRnJ6fLoL6SgUuFyCIV7Q17242%2BwJggF5btQsFqlc%3D"
                },
                {
                    "id": 37020,
                    "name": "NAME_SKILL_37020",
                    "image": "https://images-v2.renderz.app/skill_S10_ADVANCE_FORWARD_3?verify=1779281533-97yoixo%2FZAIv3tJbwSxiu7vGyBJEMOc6GPEsaybH4BQ%3D"
                },
                {
                    "id": 37060,
                    "name": "NAME_SKILL_37060",
                    "image": "https://images-v2.renderz.app/skill_S10_DRIBBLING_3?verify=1779281533-AfeHrosMN8VCpDpBGZ5LkgjgtF87Wv4KRtKBGzWK2%2Fo%3D"
                },
                {
                    "id": 37070,
                    "name": "NAME_SKILL_37070",
                    "image": "https://images-v2.renderz.app/skill_S10_PHYSICAL_3?verify=1779281533-pnpqJFD7z8AqJYiUiHVkGMuM%2BZLuRbeRjP9NpFScfn4%3D"
                },
                {
                    "id": 37080,
                    "name": "NAME_SKILL_37080",
                    "image": "https://images-v2.renderz.app/skill_S10_HEADER_3?verify=1779281533-gjycEzcwJKDEeyRFmGmG5z6slMCYWug5gPfxUwf6Of0%3D"
                }
            ],
            "images": {
                "playerCardImage": "https://images-v2.renderz.app/player_25_262271_ANS26_HERO_451706c902bb50c0?verify=1779281538-Z%2BYHtJCUZ6wGH%2BXfsZhxlnsOkXGGJaAKYaVY0zgD%2FyU%3D",
                "playerCardBackground": "https://images-v2.renderz.app/bg_23_backgrounds_26_B_A_NATION_S_STORY26_ARGENTINA_ICON_STATIC?verify=1779281538-XQL0nPbxS5hA19SMA7tcrlvSM43kwEXiiuHmZd64AfE%3D",
                "flagImage": "https://images-v2.renderz.app/flags_23_128x128_52?verify=1779281538-lz8JUxghYv4FTvhpJhqN8CNuP2%2FyvQ0HAOT0n6rsAvA%3D",
                "clubImage": "https://images-v2.renderz.app/club_23_115935?verify=1779281538-8vEtKg010U0YAFs3Kl%2BWxo8tYR02Bv4HKfCOHDM5qcU%3D",
                "leagueImage": "https://images-v2.renderz.app/league_23_2118?verify=1779281538-jp9pPZNnFQx7%2BceE0CqtgIzJUyV9QYLke6npZw%2F7Lvs%3D"
            },
            "skillMoves": {
                "id": 13,
                "title": "skillmove_name_13",
                "description": "skillmove_desc_13",
                "image": "https://images-v2.renderz.app/skillmovelogo_23_0?verify=1779281538-YNY%2FoM0CXYJqO6z0x8RMP6q7jAOAo330mSqGBme9%2FNo%3D"
            },
            "skillMovesLevel": 3,
            "celebration": {
                "id": 44,
                "title": "celebration_name_44",
                "description": "celebration_desc_0",
                "image": "https://images-v2.renderz.app/celebrationlogo_23_0?verify=1779281538-3aA66r%2BcSrMLYKu9QPBMi8Zgyfn8ft3kXp5eoCPbOcA%3D"
            },
            "traits": [
                {
                    "id": 13,
                    "title": "trait_name_13",
                    "description": "trait_desc_13",
                    "image": "https://images-v2.renderz.app/traitlogo_23_13?verify=1779281538-Qw%2FdZZ5lpG0nqnW1TJhr2w4SMdZN96spXmgUJWy7%2BZY%3D"
                }
            ],
            "club": {
                "id": 115935,
                "name": "TeamName_115935"
            },
            "league": {
                "id": 2118,
                "name": "LeagueName_2118"
            },
            "nation": {
                "id": 52,
                "name": "NationName_52"
            },
            "avgStats": {
                "avg1": 136,
                "avg2": 135,
                "avg3": 101,
                "avg4": 127,
                "avg5": 58,
                "avg6": 114
            },
            "avgGkStats": {
                "avg1": 12,
                "avg2": 9,
                "avg3": 9,
                "avg4": 9,
                "avg5": 12,
                "avg6": 116
            },
            "stats": {
                "acc": 135,
                "agg": 94,
                "agi": 132,
                "awr": 54,
                "bac": 142,
                "bal": 117,
                "cro": 86,
                "cur": 115,
                "dri": 124,
                "fin": 143,
                "frk": 98,
                "gkd": 12,
                "gkk": 12,
                "gkp": 9,
                "han": 9,
                "hea": 129,
                "jmp": 123,
                "lpa": 102,
                "lsa": 123,
                "mrk": 38,
                "pen": 100,
                "pos": 138,
                "rea": 109,
                "ref": 9,
                "sho": 140,
                "slt": 40,
                "spa": 106,
                "spd": 138,
                "str": 124,
                "stt": 55,
                "vis": 102,
                "vol": 141,
                "sta": 81,
                "total": 3080
            },
            "liveOvr": {
                "ovrUpgrade": 0
            },
            "priceData": {
                "0": {
                    "basePrice": 1430000000
                },
                "1": {
                    "basePrice": 1440000000
                },
                "2": {
                    "basePrice": 1440000000
                },
                "3": {
                    "basePrice": 1450000000
                },
                "4": {
                    "basePrice": 1480000000
                },
                "5": {
                    "basePrice": 1530000000
                }
            },
            "auctionable": false,
            "rank": 0,
            "likes": 0,
            "added": "2026-05-20T12:52:18.481961Z",
            "revealOn": "2026-05-20T15:00:00Z"
        },
        {
            "assetId": 30912229,
            "playerId": 262271,
            "firstName": "Diego",
            "lastName": "Milito",
            "commonName": "",
            "cardName": "Milito",
            "position": "ST",
            "rating": 116,
            "weakFoot": 4,
            "foot": 1,
            "source": "PROGRAM_HEROS8",
            "workRateAtt": 2,
            "workRateDef": 1,
            "weight": 78,
            "height": 183,
            "birthday": "1979-06-12T00:00:00Z",
            "bio": "biotxt_30905000",
            "bindingXml": "PLAYERCARDUI_NATION_STORY26_ARGENTINA_ICON_B",
            "animation": {
                "cardData": [
                    "background",
                    "player",
                    "rating",
                    "position",
                    "nation",
                    "club",
                    "name",
                    "level",
                    "rank"
                ],
                "colors": {
                    "rating": "#513D03",
                    "position": "#513D03",
                    "name": "#513D03",
                    "level": "#FFFFFF"
                },
                "layout": {
                    "player": {
                        "sizeX": 256,
                        "sizeY": 256,
                        "posX": 0,
                        "posY": 0
                    },
                    "rating": {
                        "sizeX": 80,
                        "sizeY": 80,
                        "posX": 36,
                        "posY": 4,
                        "fontSize": 36
                    },
                    "position": {
                        "sizeX": 40,
                        "sizeY": 20,
                        "posX": 56,
                        "posY": 64,
                        "fontSize": 24
                    },
                    "nation": {
                        "sizeX": 24,
                        "sizeY": 24,
                        "posX": 82.7,
                        "posY": 188
                    },
                    "club": {
                        "sizeX": 24,
                        "sizeY": 24,
                        "posX": 146.6,
                        "posY": 188
                    },
                    "name": {
                        "sizeX": 0,
                        "sizeY": 0,
                        "posX": 128,
                        "posY": 178,
                        "fontSize": 22
                    },
                    "level": {
                        "sizeX": 64,
                        "sizeY": 32,
                        "posX": 128,
                        "posY": 233,
                        "fontSize": 23
                    },
                    "rank": {
                        "sizeX": 32,
                        "sizeY": 32,
                        "posX": 128,
                        "posY": 232
                    }
                },
                "animations": [
                    {
                        "animations": [
                            {
                                "id": "TR9Ok6",
                                "image": "https://images-v2.renderz.app/sprite_23_nation_s_story26_argentina26_B_A_NATION_S_STORY26_ARGENTINA_ICON_LOOP?verify=1779802905-KUYARpxuDWfajYlRhNvZzZE6CB9W3Kbg6yUUA6qUJ7o%3D",
                                "imageName": "nation_s_story26_argentina26_B_A_NATION_S_STORY26_ARGENTINA_ICON_LOOP",
                                "imageHeight": 0,
                                "imageWidth": 0,
                                "maxFrames": 45
                            }
                        ],
                        "when": "(#cardSize == ~Constants.CARD_PICTURE_BIG_SIZE || (#cardSize == ~Constants.CARD_PICTURE_MEDIUM_SIZE && #UILevel != 0))"
                    }
                ]
            },
            "tags": "HEROS10,ANS26,ANS26_BADGE,ANS26_ALL,GC260521,ANS26_ARG,S_25,CLUB,BASEOVR_116,RANK_ATT,Auction,30912229",
            "skillStyleId": 370,
            "skillStyleSkills": [
                {
                    "id": 37010,
                    "name": "NAME_SKILL_37010",
                    "image": "https://images-v2.renderz.app/skill_S10_STRIKER_3?verify=1779281533-P4ZRnJ6fLoL6SgUuFyCIV7Q17242%2BwJggF5btQsFqlc%3D"
                },
                {
                    "id": 37020,
                    "name": "NAME_SKILL_37020",
                    "image": "https://images-v2.renderz.app/skill_S10_ADVANCE_FORWARD_3?verify=1779281533-97yoixo%2FZAIv3tJbwSxiu7vGyBJEMOc6GPEsaybH4BQ%3D"
                },
                {
                    "id": 37060,
                    "name": "NAME_SKILL_37060",
                    "image": "https://images-v2.renderz.app/skill_S10_DRIBBLING_3?verify=1779281533-AfeHrosMN8VCpDpBGZ5LkgjgtF87Wv4KRtKBGzWK2%2Fo%3D"
                },
                {
                    "id": 37070,
                    "name": "NAME_SKILL_37070",
                    "image": "https://images-v2.renderz.app/skill_S10_PHYSICAL_3?verify=1779281533-pnpqJFD7z8AqJYiUiHVkGMuM%2BZLuRbeRjP9NpFScfn4%3D"
                },
                {
                    "id": 37080,
                    "name": "NAME_SKILL_37080",
                    "image": "https://images-v2.renderz.app/skill_S10_HEADER_3?verify=1779281533-gjycEzcwJKDEeyRFmGmG5z6slMCYWug5gPfxUwf6Of0%3D"
                }
            ],
            "images": {
                "playerCardImage": "https://images-v2.renderz.app/player_25_262271_ANS26_HERO_451706c902bb50c0?verify=1779281538-Z%2BYHtJCUZ6wGH%2BXfsZhxlnsOkXGGJaAKYaVY0zgD%2FyU%3D",
                "playerCardBackground": "https://images-v2.renderz.app/bg_23_backgrounds_26_B_A_NATION_S_STORY26_ARGENTINA_ICON_STATIC?verify=1779281538-XQL0nPbxS5hA19SMA7tcrlvSM43kwEXiiuHmZd64AfE%3D",
                "flagImage": "https://images-v2.renderz.app/flags_23_128x128_52?verify=1779281538-lz8JUxghYv4FTvhpJhqN8CNuP2%2FyvQ0HAOT0n6rsAvA%3D",
                "clubImage": "https://images-v2.renderz.app/club_23_115935?verify=1779281538-8vEtKg010U0YAFs3Kl%2BWxo8tYR02Bv4HKfCOHDM5qcU%3D",
                "leagueImage": "https://images-v2.renderz.app/league_23_2118?verify=1779281538-jp9pPZNnFQx7%2BceE0CqtgIzJUyV9QYLke6npZw%2F7Lvs%3D"
            },
            "skillMoves": {
                "id": 13,
                "title": "skillmove_name_13",
                "description": "skillmove_desc_13",
                "image": "https://images-v2.renderz.app/skillmovelogo_23_0?verify=1779281538-YNY%2FoM0CXYJqO6z0x8RMP6q7jAOAo330mSqGBme9%2FNo%3D"
            },
            "skillMovesLevel": 3,
            "celebration": {
                "id": 44,
                "title": "celebration_name_44",
                "description": "celebration_desc_0",
                "image": "https://images-v2.renderz.app/celebrationlogo_23_0?verify=1779281538-3aA66r%2BcSrMLYKu9QPBMi8Zgyfn8ft3kXp5eoCPbOcA%3D"
            },
            "traits": [
                {
                    "id": 13,
                    "title": "trait_name_13",
                    "description": "trait_desc_13",
                    "image": "https://images-v2.renderz.app/traitlogo_23_13?verify=1779281538-Qw%2FdZZ5lpG0nqnW1TJhr2w4SMdZN96spXmgUJWy7%2BZY%3D"
                }
            ],
            "club": {
                "id": 115935,
                "name": "TeamName_115935"
            },
            "league": {
                "id": 2118,
                "name": "LeagueName_2118"
            },
            "nation": {
                "id": 52,
                "name": "NationName_52"
            },
            "avgStats": {
                "avg1": 136,
                "avg2": 135,
                "avg3": 101,
                "avg4": 127,
                "avg5": 58,
                "avg6": 114
            },
            "avgGkStats": {
                "avg1": 12,
                "avg2": 9,
                "avg3": 9,
                "avg4": 9,
                "avg5": 12,
                "avg6": 116
            },
            "stats": {
                "acc": 135,
                "agg": 94,
                "agi": 132,
                "awr": 54,
                "bac": 142,
                "bal": 117,
                "cro": 86,
                "cur": 115,
                "dri": 124,
                "fin": 143,
                "frk": 98,
                "gkd": 12,
                "gkk": 12,
                "gkp": 9,
                "han": 9,
                "hea": 129,
                "jmp": 123,
                "lpa": 102,
                "lsa": 123,
                "mrk": 38,
                "pen": 100,
                "pos": 138,
                "rea": 109,
                "ref": 9,
                "sho": 140,
                "slt": 40,
                "spa": 106,
                "spd": 138,
                "str": 124,
                "stt": 55,
                "vis": 102,
                "vol": 141,
                "sta": 81,
                "total": 3080
            },
            "liveOvr": {
                "ovrUpgrade": 0
            },
            "priceData": {
                "0": {
                    "basePrice": 1800000000
                },
                "1": {
                    "basePrice": 1530000000
                },
                "2": {
                    "basePrice": 1440000000
                },
                "3": {
                    "basePrice": 1520000000
                },
                "4": {
                    "basePrice": 1530000000
                },
                "5": {
                    "basePrice": 1550000000
                }
            },
            "auctionable": true,
            "rank": 0,
            "likes": 0,
            "added": "2026-05-20T12:52:18.4810477Z",
            "revealOn": "2026-05-20T15:00:00Z"
        },