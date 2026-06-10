// Master Skill Tree (Requirements & Boosts)
export const SKILL_TREE: Record<number, any> = {
  "1010": {
    "id": 1010,
    "name": "Shooting",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "fin": 5,
        "sho": 5,
        "lsa": 5
      },
      "2": {
        "fin": 10,
        "sho": 10,
        "lsa": 10
      },
      "3": {
        "fin": 15,
        "sho": 15,
        "lsa": 15
      }
    }
  },
  "1011": {
    "id": 1011,
    "name": "Shooting",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "fin": 3,
        "sho": 3,
        "lsa": 3
      },
      "2": {
        "fin": 6,
        "sho": 6,
        "lsa": 6
      },
      "3": {
        "fin": 9,
        "sho": 9,
        "lsa": 9
      }
    }
  },
  "1012": {
    "id": 1012,
    "name": "Shooting",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "fin": 1,
        "sho": 1,
        "lsa": 1
      },
      "2": {
        "fin": 2,
        "sho": 2,
        "lsa": 2
      },
      "3": {
        "fin": 3,
        "sho": 3,
        "lsa": 3
      }
    }
  },
  "1020": {
    "id": 1020,
    "name": "Passing",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "lpa": 5,
        "spa": 5,
        "vis": 5
      },
      "2": {
        "lpa": 10,
        "spa": 10,
        "vis": 10
      },
      "3": {
        "lpa": 15,
        "spa": 15,
        "vis": 15
      }
    }
  },
  "1021": {
    "id": 1021,
    "name": "Passing",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "lpa": 3,
        "spa": 3,
        "vis": 3
      },
      "2": {
        "lpa": 6,
        "spa": 6,
        "vis": 6
      },
      "3": {
        "lpa": 9,
        "spa": 9,
        "vis": 9
      }
    }
  },
  "1022": {
    "id": 1022,
    "name": "Passing",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "lpa": 1,
        "spa": 1,
        "vis": 1
      },
      "2": {
        "lpa": 2,
        "spa": 2,
        "vis": 2
      },
      "3": {
        "lpa": 3,
        "spa": 3,
        "vis": 3
      }
    }
  },
  "1030": {
    "id": 1030,
    "name": "Dexterity",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "acc": 5,
        "rea": 5,
        "agi": 5
      },
      "2": {
        "acc": 10,
        "rea": 10,
        "agi": 10
      },
      "3": {
        "acc": 15,
        "rea": 15,
        "agi": 15
      }
    }
  },
  "1031": {
    "id": 1031,
    "name": "Dexterity",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "acc": 3,
        "rea": 3,
        "agi": 3
      },
      "2": {
        "acc": 6,
        "rea": 6,
        "agi": 6
      },
      "3": {
        "acc": 9,
        "rea": 9,
        "agi": 9
      }
    }
  },
  "1032": {
    "id": 1032,
    "name": "Dexterity",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "acc": 1,
        "rea": 1,
        "agi": 1
      },
      "2": {
        "acc": 2,
        "rea": 2,
        "agi": 2
      },
      "3": {
        "acc": 3,
        "rea": 3,
        "agi": 3
      }
    }
  },
  "1040": {
    "id": 1040,
    "name": "Finisher",
    "maxLevel": 1,
    "requirement": {
      "skillId": 1010,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "hea": 10,
        "fin": 10,
        "sho": 10,
        "pos": 10,
        "lsa": 10,
        "vol": 10
      }
    }
  },
  "1041": {
    "id": 1041,
    "name": "Finisher",
    "maxLevel": 1,
    "requirement": {
      "skillId": 1011,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "hea": 6,
        "fin": 6,
        "sho": 6,
        "pos": 6,
        "lsa": 6,
        "vol": 6
      }
    }
  },
  "1042": {
    "id": 1042,
    "name": "Finisher",
    "maxLevel": 1,
    "requirement": {
      "skillId": 1012,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "hea": 2,
        "fin": 2,
        "sho": 2,
        "pos": 2,
        "lsa": 2,
        "vol": 2
      }
    }
  },
  "1050": {
    "id": 1050,
    "name": "Target Man",
    "maxLevel": 1,
    "requirement": {
      "skillId": 1020,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "bac": 10,
        "spa": 10,
        "str": 10,
        "pos": 10,
        "bal": 10,
        "vis": 10
      }
    }
  },
  "1051": {
    "id": 1051,
    "name": "Target Man",
    "maxLevel": 1,
    "requirement": {
      "skillId": 1021,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "bac": 6,
        "spa": 6,
        "str": 6,
        "pos": 6,
        "bal": 6,
        "vis": 6
      }
    }
  },
  "1052": {
    "id": 1052,
    "name": "Target Man",
    "maxLevel": 1,
    "requirement": {
      "skillId": 1022,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "bac": 2,
        "spa": 2,
        "str": 2,
        "pos": 2,
        "bal": 2,
        "vis": 2
      }
    }
  },
  "1060": {
    "id": 1060,
    "name": "Counter",
    "maxLevel": 1,
    "requirement": {
      "skillId": 1030,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "bac": 10,
        "dri": 10,
        "spd": 10,
        "sho": 10,
        "pos": 10,
        "agi": 10
      }
    }
  },
  "1061": {
    "id": 1061,
    "name": "Counter",
    "maxLevel": 1,
    "requirement": {
      "skillId": 1031,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "bac": 6,
        "dri": 6,
        "spd": 6,
        "sho": 6,
        "pos": 6,
        "agi": 6
      }
    }
  },
  "1062": {
    "id": 1062,
    "name": "Counter",
    "maxLevel": 1,
    "requirement": {
      "skillId": 1032,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "bac": 2,
        "dri": 2,
        "spd": 2,
        "sho": 2,
        "pos": 2,
        "agi": 2
      }
    }
  },
  "1310": {
    "id": 1310,
    "name": "Shooting",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "ST"
      ],
      "3": [
        "ST"
      ]
    },
    "boosts": {
      "1": {
        "fin": 6,
        "str": 6,
        "lsa": 6
      },
      "2": {
        "fin": 12,
        "str": 12,
        "lsa": 12
      },
      "3": {
        "fin": 18,
        "str": 18,
        "lsa": 18
      }
    }
  },
  "1340": {
    "id": 1340,
    "name": "Power-Striker",
    "maxLevel": 1,
    "requirement": {
      "skillId": 1310,
      "level": 3
    },
    "unlocks": {
      "1": [
        "ST"
      ]
    },
    "boosts": {
      "1": {
        "hea": 11,
        "fin": 11,
        "str": 11,
        "lsa": 11,
        "vol": 11,
        "cur": 11
      }
    }
  },
  "2010": {
    "id": 2010,
    "name": "Defending",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "CAM"
      ],
      "3": [
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "awr": 5,
        "mrk": 5,
        "stt": 5
      },
      "2": {
        "awr": 10,
        "mrk": 10,
        "stt": 10
      },
      "3": {
        "awr": 15,
        "mrk": 15,
        "stt": 15
      }
    }
  },
  "2011": {
    "id": 2011,
    "name": "Defending",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "awr": 3,
        "mrk": 3,
        "stt": 3
      },
      "2": {
        "awr": 6,
        "mrk": 6,
        "stt": 6
      },
      "3": {
        "awr": 9,
        "mrk": 9,
        "stt": 9
      }
    }
  },
  "2012": {
    "id": 2012,
    "name": "Defending",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "CAM",
        "RM"
      ],
      "3": [
        "CAM",
        "RM"
      ]
    },
    "boosts": {
      "1": {
        "awr": 1,
        "mrk": 1,
        "stt": 1
      },
      "2": {
        "awr": 2,
        "mrk": 2,
        "stt": 2
      },
      "3": {
        "awr": 3,
        "mrk": 3,
        "stt": 3
      }
    }
  },
  "2020": {
    "id": 2020,
    "name": "Passing",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "CAM"
      ],
      "3": [
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "lpa": 5,
        "spa": 5,
        "vis": 5
      },
      "2": {
        "lpa": 10,
        "spa": 10,
        "vis": 10
      },
      "3": {
        "lpa": 15,
        "spa": 15,
        "vis": 15
      }
    }
  },
  "2021": {
    "id": 2021,
    "name": "Passing",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "lpa": 3,
        "spa": 3,
        "vis": 3
      },
      "2": {
        "lpa": 6,
        "spa": 6,
        "vis": 6
      },
      "3": {
        "lpa": 9,
        "spa": 9,
        "vis": 9
      }
    }
  },
  "2022": {
    "id": 2022,
    "name": "Passing",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "CAM",
        "RM"
      ],
      "3": [
        "CAM",
        "RM"
      ]
    },
    "boosts": {
      "1": {
        "lpa": 1,
        "spa": 1,
        "vis": 1
      },
      "2": {
        "lpa": 2,
        "spa": 2,
        "vis": 2
      },
      "3": {
        "lpa": 3,
        "spa": 3,
        "vis": 3
      }
    }
  },
  "2030": {
    "id": 2030,
    "name": "Physical",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "CAM"
      ],
      "3": [
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 5,
        "str": 5,
        "bal": 5
      },
      "2": {
        "bac": 10,
        "str": 10,
        "bal": 10
      },
      "3": {
        "bac": 15,
        "str": 15,
        "bal": 15
      }
    }
  },
  "2031": {
    "id": 2031,
    "name": "Physical",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "bac": 3,
        "str": 3,
        "bal": 3
      },
      "2": {
        "bac": 6,
        "str": 6,
        "bal": 6
      },
      "3": {
        "bac": 9,
        "str": 9,
        "bal": 9
      }
    }
  },
  "2032": {
    "id": 2032,
    "name": "Physical",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "CAM",
        "RM"
      ],
      "3": [
        "CAM",
        "RM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 1,
        "str": 1,
        "bal": 1
      },
      "2": {
        "bac": 2,
        "str": 2,
        "bal": 2
      },
      "3": {
        "bac": 3,
        "str": 3,
        "bal": 3
      }
    }
  },
  "2040": {
    "id": 2040,
    "name": "Ball-Winning Midfielder",
    "maxLevel": 1,
    "requirement": {
      "skillId": 2010,
      "level": 3
    },
    "unlocks": {
      "1": [
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "awr": 10,
        "bac": 10,
        "sta": 10,
        "str": 10,
        "rea": 10,
        "bal": 10
      }
    }
  },
  "2041": {
    "id": 2041,
    "name": "Ball-Winning Midfielder",
    "maxLevel": 1,
    "requirement": {
      "skillId": 2011,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "awr": 6,
        "bac": 6,
        "sta": 6,
        "str": 6,
        "rea": 6,
        "bal": 6
      }
    }
  },
  "2042": {
    "id": 2042,
    "name": "Ball-Winning Midfielder",
    "maxLevel": 1,
    "requirement": {
      "skillId": 2012,
      "level": 3
    },
    "unlocks": {
      "1": [
        "CAM",
        "RM"
      ]
    },
    "boosts": {
      "1": {
        "awr": 2,
        "bac": 2,
        "sta": 2,
        "str": 2,
        "rea": 2,
        "bal": 2
      }
    }
  },
  "2050": {
    "id": 2050,
    "name": "Playmaker",
    "maxLevel": 1,
    "requirement": {
      "skillId": 2020,
      "level": 3
    },
    "unlocks": {
      "1": [
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 10,
        "dri": 10,
        "lpa": 10,
        "spa": 10,
        "agi": 10,
        "vis": 10
      }
    }
  },
  "2051": {
    "id": 2051,
    "name": "Playmaker",
    "maxLevel": 1,
    "requirement": {
      "skillId": 2021,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "bac": 6,
        "dri": 6,
        "lpa": 6,
        "spa": 6,
        "agi": 6,
        "vis": 6
      }
    }
  },
  "2052": {
    "id": 2052,
    "name": "Playmaker",
    "maxLevel": 1,
    "requirement": {
      "skillId": 2022,
      "level": 3
    },
    "unlocks": {
      "1": [
        "CAM",
        "RM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 2,
        "dri": 2,
        "lpa": 2,
        "spa": 2,
        "agi": 2,
        "vis": 2
      }
    }
  },
  "2060": {
    "id": 2060,
    "name": "Box-To-Box",
    "maxLevel": 1,
    "requirement": {
      "skillId": 2030,
      "level": 3
    },
    "unlocks": {
      "1": [
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 10,
        "spa": 10,
        "sta": 10,
        "rea": 10,
        "bal": 10,
        "vis": 10
      }
    }
  },
  "2061": {
    "id": 2061,
    "name": "Box-To-Box",
    "maxLevel": 1,
    "requirement": {
      "skillId": 2031,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "bac": 6,
        "spa": 6,
        "sta": 6,
        "rea": 6,
        "bal": 6,
        "vis": 6
      }
    }
  },
  "2062": {
    "id": 2062,
    "name": "Box-To-Box",
    "maxLevel": 1,
    "requirement": {
      "skillId": 2032,
      "level": 3
    },
    "unlocks": {
      "1": [
        "CAM",
        "RM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 2,
        "spa": 2,
        "sta": 2,
        "rea": 2,
        "bal": 2,
        "vis": 2
      }
    }
  },
  "2070": {
    "id": 2070,
    "name": "Mezzala",
    "maxLevel": 1,
    "requirement": {
      "skillId": 2030,
      "level": 3
    },
    "unlocks": {
      "1": [
        "CAM",
        "CDM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 10,
        "sho": 10,
        "sta": 10,
        "str": 10,
        "lsa": 10,
        "bal": 10
      }
    }
  },
  "2080": {
    "id": 2080,
    "name": "Awareness",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "CDM",
        "CAM"
      ],
      "3": [
        "CDM",
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "awr": 5,
        "pos": 5,
        "vis": 5
      },
      "2": {
        "awr": 10,
        "pos": 10,
        "vis": 10
      },
      "3": {
        "awr": 15,
        "pos": 15,
        "vis": 15
      }
    }
  },
  "2090": {
    "id": 2090,
    "name": "Roaming Midfielder",
    "maxLevel": 1,
    "requirement": {
      "skillId": 2080,
      "level": 3
    },
    "unlocks": {
      "1": [
        "CDM",
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "awr": 10,
        "dri": 10,
        "spa": 10,
        "pos": 10,
        "agi": 10,
        "vis": 10
      }
    }
  },
  "2510": {
    "id": 2510,
    "name": "Passing",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "RM",
        "RW"
      ],
      "3": [
        "RM",
        "RW"
      ]
    },
    "boosts": {
      "1": {
        "cro": 6,
        "lpa": 6,
        "spa": 6
      },
      "2": {
        "cro": 12,
        "lpa": 12,
        "spa": 12
      },
      "3": {
        "cro": 18,
        "lpa": 18,
        "spa": 18
      }
    }
  },
  "2540": {
    "id": 2540,
    "name": "Playmaker",
    "maxLevel": 1,
    "requirement": {
      "skillId": 2510,
      "level": 3
    },
    "unlocks": {
      "1": [
        "RM",
        "RW"
      ]
    },
    "boosts": {
      "1": {
        "cro": 11,
        "lpa": 11,
        "spa": 11,
        "lsa": 11,
        "vol": 11,
        "vis": 11
      }
    }
  },
  "3010": {
    "id": 3010,
    "name": "Defending",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "CAM"
      ],
      "3": [
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "awr": 5,
        "mrk": 5,
        "stt": 5
      },
      "2": {
        "awr": 10,
        "mrk": 10,
        "stt": 10
      },
      "3": {
        "awr": 15,
        "mrk": 15,
        "stt": 15
      }
    }
  },
  "3011": {
    "id": 3011,
    "name": "Defending",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "awr": 3,
        "mrk": 3,
        "stt": 3
      },
      "2": {
        "awr": 6,
        "mrk": 6,
        "stt": 6
      },
      "3": {
        "awr": 9,
        "mrk": 9,
        "stt": 9
      }
    }
  },
  "3012": {
    "id": 3012,
    "name": "Defending",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "awr": 1,
        "mrk": 1,
        "stt": 1
      },
      "2": {
        "awr": 2,
        "mrk": 2,
        "stt": 2
      },
      "3": {
        "awr": 3,
        "mrk": 3,
        "stt": 3
      }
    }
  },
  "3020": {
    "id": 3020,
    "name": "Passing",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "CAM"
      ],
      "3": [
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "lpa": 5,
        "spa": 5,
        "vis": 5
      },
      "2": {
        "lpa": 10,
        "spa": 10,
        "vis": 10
      },
      "3": {
        "lpa": 15,
        "spa": 15,
        "vis": 15
      }
    }
  },
  "3021": {
    "id": 3021,
    "name": "Passing",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "lpa": 3,
        "spa": 3,
        "vis": 3
      },
      "2": {
        "lpa": 6,
        "spa": 6,
        "vis": 6
      },
      "3": {
        "lpa": 9,
        "spa": 9,
        "vis": 9
      }
    }
  },
  "3022": {
    "id": 3022,
    "name": "Passing",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "lpa": 1,
        "spa": 1,
        "vis": 1
      },
      "2": {
        "lpa": 2,
        "spa": 2,
        "vis": 2
      },
      "3": {
        "lpa": 3,
        "spa": 3,
        "vis": 3
      }
    }
  },
  "3030": {
    "id": 3030,
    "name": "NAME_SKILL_3030",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "CAM"
      ],
      "3": [
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 5,
        "str": 5,
        "bal": 5
      },
      "2": {
        "bac": 10,
        "str": 10,
        "bal": 10
      },
      "3": {
        "bac": 15,
        "str": 15,
        "bal": 15
      }
    }
  },
  "3031": {
    "id": 3031,
    "name": "Physical",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "bac": 3,
        "str": 3,
        "bal": 3
      },
      "2": {
        "bac": 6,
        "str": 6,
        "bal": 6
      },
      "3": {
        "bac": 9,
        "str": 9,
        "bal": 9
      }
    }
  },
  "3032": {
    "id": 3032,
    "name": "Physical",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "bac": 1,
        "str": 1,
        "bal": 1
      },
      "2": {
        "bac": 2,
        "str": 2,
        "bal": 2
      },
      "3": {
        "bac": 3,
        "str": 3,
        "bal": 3
      }
    }
  },
  "3040": {
    "id": 3040,
    "name": "No-Nonsense Centre-Back",
    "maxLevel": 1,
    "requirement": {
      "skillId": 3010,
      "level": 3
    },
    "unlocks": {
      "1": [
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "awr": 10,
        "hea": 10,
        "mrk": 10,
        "str": 10,
        "bal": 10,
        "stt": 10
      }
    }
  },
  "3041": {
    "id": 3041,
    "name": "No-Nonsense Centre-Back",
    "maxLevel": 1,
    "requirement": {
      "skillId": 3011,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "awr": 6,
        "hea": 6,
        "mrk": 6,
        "str": 6,
        "bal": 6,
        "stt": 6
      }
    }
  },
  "3042": {
    "id": 3042,
    "name": "No-Nonsense Centre-Back",
    "maxLevel": 1,
    "requirement": {
      "skillId": 3012,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "awr": 2,
        "hea": 2,
        "mrk": 2,
        "str": 2,
        "bal": 2,
        "stt": 2
      }
    }
  },
  "3050": {
    "id": 3050,
    "name": "Ball-Playing Defender",
    "maxLevel": 1,
    "requirement": {
      "skillId": 3020,
      "level": 3
    },
    "unlocks": {
      "1": [
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 10,
        "lpa": 10,
        "mrk": 10,
        "spa": 10,
        "stt": 10,
        "vis": 10
      }
    }
  },
  "3051": {
    "id": 3051,
    "name": "Ball-Playing Defender",
    "maxLevel": 1,
    "requirement": {
      "skillId": 3021,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "bac": 6,
        "lpa": 6,
        "mrk": 6,
        "spa": 6,
        "stt": 6,
        "vis": 6
      }
    }
  },
  "3052": {
    "id": 3052,
    "name": "Ball-Playing Defender",
    "maxLevel": 1,
    "requirement": {
      "skillId": 3022,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "bac": 2,
        "lpa": 2,
        "mrk": 2,
        "spa": 2,
        "stt": 2,
        "vis": 2
      }
    }
  },
  "3060": {
    "id": 3060,
    "name": "Libero",
    "maxLevel": 1,
    "requirement": {
      "skillId": 3030,
      "level": 3
    },
    "unlocks": {
      "1": [
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "lpa": 10,
        "sta": 10,
        "str": 10,
        "bal": 10,
        "stt": 10,
        "vis": 10
      }
    }
  },
  "3061": {
    "id": 3061,
    "name": "Libero",
    "maxLevel": 1,
    "requirement": {
      "skillId": 3031,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "lpa": 6,
        "sta": 6,
        "str": 6,
        "bal": 6,
        "stt": 6,
        "vis": 6
      }
    }
  },
  "3062": {
    "id": 3062,
    "name": "Libero",
    "maxLevel": 1,
    "requirement": {
      "skillId": 3032,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "lpa": 2,
        "sta": 2,
        "str": 2,
        "bal": 2,
        "stt": 2,
        "vis": 2
      }
    }
  },
  "3070": {
    "id": 3070,
    "name": "Aerial",
    "maxLevel": 1,
    "requirement": {
      "skillId": 3030,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "hea": 10,
        "sta": 10,
        "str": 10,
        "bal": 10,
        "jmp": 10,
        "stt": 10
      }
    }
  },
  "3410": {
    "id": 3410,
    "name": "Tackler",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "LM"
      ],
      "3": [
        "LM"
      ]
    },
    "boosts": {
      "1": {
        "sho": 6,
        "str": 6,
        "bal": 6
      },
      "2": {
        "sho": 12,
        "str": 12,
        "bal": 12
      },
      "3": {
        "sho": 18,
        "str": 18,
        "bal": 18
      }
    }
  },
  "3440": {
    "id": 3440,
    "name": "Tackling Marksman",
    "maxLevel": 1,
    "requirement": {
      "skillId": 3410,
      "level": 3
    },
    "unlocks": {
      "1": [
        "LM"
      ]
    },
    "boosts": {
      "1": {
        "agg": 11,
        "hea": 11,
        "sho": 11,
        "str": 11,
        "rea": 11,
        "bal": 11
      }
    }
  },
  "3510": {
    "id": 3510,
    "name": "Defending",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "agg": 6,
        "mrk": 6,
        "stt": 6
      },
      "2": {
        "agg": 12,
        "mrk": 12,
        "stt": 12
      },
      "3": {
        "agg": 18,
        "mrk": 18,
        "stt": 18
      }
    }
  },
  "3540": {
    "id": 3540,
    "name": "No-Nonsense Centre-Back",
    "maxLevel": 1,
    "requirement": {
      "skillId": 3510,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "agg": 11,
        "hea": 11,
        "lpa": 11,
        "mrk": 11,
        "str": 11,
        "slt": 11
      }
    }
  },
  "4010": {
    "id": 4010,
    "name": "Passing",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "CM"
      ],
      "3": [
        "CM"
      ]
    },
    "boosts": {
      "1": {
        "lpa": 5,
        "spa": 5,
        "vis": 5
      },
      "2": {
        "lpa": 10,
        "spa": 10,
        "vis": 10
      },
      "3": {
        "lpa": 15,
        "spa": 15,
        "vis": 15
      }
    }
  },
  "4011": {
    "id": 4011,
    "name": "Passing",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "LM"
      ],
      "3": [
        "LM"
      ]
    },
    "boosts": {
      "1": {
        "lpa": 3,
        "spa": 3,
        "vis": 3
      },
      "2": {
        "lpa": 6,
        "spa": 6,
        "vis": 6
      },
      "3": {
        "lpa": 9,
        "spa": 9,
        "vis": 9
      }
    }
  },
  "4012": {
    "id": 4012,
    "name": "Passing",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "lpa": 1,
        "spa": 1,
        "vis": 1
      },
      "2": {
        "lpa": 2,
        "spa": 2,
        "vis": 2
      },
      "3": {
        "lpa": 3,
        "spa": 3,
        "vis": 3
      }
    }
  },
  "4020": {
    "id": 4020,
    "name": "Dribbling",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "CM"
      ],
      "3": [
        "CM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 5,
        "dri": 5,
        "agi": 5
      },
      "2": {
        "bac": 10,
        "dri": 10,
        "agi": 10
      },
      "3": {
        "bac": 15,
        "dri": 15,
        "agi": 15
      }
    }
  },
  "4021": {
    "id": 4021,
    "name": "Dribbling",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "LM"
      ],
      "3": [
        "LM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 3,
        "dri": 3,
        "agi": 3
      },
      "2": {
        "bac": 6,
        "dri": 6,
        "agi": 6
      },
      "3": {
        "bac": 9,
        "dri": 9,
        "agi": 9
      }
    }
  },
  "4022": {
    "id": 4022,
    "name": "Dribbling",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "bac": 1,
        "dri": 1,
        "agi": 1
      },
      "2": {
        "bac": 2,
        "dri": 2,
        "agi": 2
      },
      "3": {
        "bac": 3,
        "dri": 3,
        "agi": 3
      }
    }
  },
  "4030": {
    "id": 4030,
    "name": "NAME_SKILL_4030",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "CM"
      ],
      "3": [
        "CM"
      ]
    },
    "boosts": {
      "1": {
        "fin": 5,
        "sho": 5,
        "lsa": 5
      },
      "2": {
        "fin": 10,
        "sho": 10,
        "lsa": 10
      },
      "3": {
        "fin": 15,
        "sho": 15,
        "lsa": 15
      }
    }
  },
  "4031": {
    "id": 4031,
    "name": "Shooting",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "LM"
      ],
      "3": [
        "LM"
      ]
    },
    "boosts": {
      "1": {
        "fin": 3,
        "sho": 3,
        "lsa": 3
      },
      "2": {
        "fin": 6,
        "sho": 6,
        "lsa": 6
      },
      "3": {
        "fin": 9,
        "sho": 9,
        "lsa": 9
      }
    }
  },
  "4032": {
    "id": 4032,
    "name": "Shooting",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "fin": 1,
        "sho": 1,
        "lsa": 1
      },
      "2": {
        "fin": 2,
        "sho": 2,
        "lsa": 2
      },
      "3": {
        "fin": 3,
        "sho": 3,
        "lsa": 3
      }
    }
  },
  "4040": {
    "id": 4040,
    "name": "Playmaker",
    "maxLevel": 1,
    "requirement": {
      "skillId": 4010,
      "level": 3
    },
    "unlocks": {
      "1": [
        "CM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 10,
        "dri": 10,
        "lpa": 10,
        "spa": 10,
        "agi": 10,
        "vis": 10
      }
    }
  },
  "4041": {
    "id": 4041,
    "name": "Playmaker",
    "maxLevel": 1,
    "requirement": {
      "skillId": 4011,
      "level": 3
    },
    "unlocks": {
      "1": [
        "LM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 6,
        "dri": 6,
        "lpa": 6,
        "spa": 6,
        "agi": 6,
        "vis": 6
      }
    }
  },
  "4042": {
    "id": 4042,
    "name": "Playmaker",
    "maxLevel": 1,
    "requirement": {
      "skillId": 4012,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "bac": 2,
        "dri": 2,
        "lpa": 2,
        "spa": 2,
        "agi": 2,
        "vis": 2
      }
    }
  },
  "4050": {
    "id": 4050,
    "name": "Enganche",
    "maxLevel": 1,
    "requirement": {
      "skillId": 4020,
      "level": 3
    },
    "unlocks": {
      "1": [
        "CM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 10,
        "dri": 10,
        "spa": 10,
        "pos": 10,
        "rea": 10,
        "agi": 10
      }
    }
  },
  "4051": {
    "id": 4051,
    "name": "Enganche",
    "maxLevel": 1,
    "requirement": {
      "skillId": 4021,
      "level": 3
    },
    "unlocks": {
      "1": [
        "LM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 6,
        "dri": 6,
        "spa": 6,
        "pos": 6,
        "rea": 6,
        "agi": 6
      }
    }
  },
  "4052": {
    "id": 4052,
    "name": "Enganche",
    "maxLevel": 1,
    "requirement": {
      "skillId": 4022,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "bac": 2,
        "dri": 2,
        "spa": 2,
        "pos": 2,
        "rea": 2,
        "agi": 2
      }
    }
  },
  "4060": {
    "id": 4060,
    "name": "Shadow Striker",
    "maxLevel": 1,
    "requirement": {
      "skillId": 4030,
      "level": 3
    },
    "unlocks": {
      "1": [
        "CM"
      ]
    },
    "boosts": {
      "1": {
        "acc": 10,
        "fin": 10,
        "pos": 10,
        "rea": 10,
        "lsa": 10,
        "agi": 10
      }
    }
  },
  "4061": {
    "id": 4061,
    "name": "Shadow Striker",
    "maxLevel": 1,
    "requirement": {
      "skillId": 4031,
      "level": 3
    },
    "unlocks": {
      "1": [
        "LM"
      ]
    },
    "boosts": {
      "1": {
        "acc": 6,
        "fin": 6,
        "pos": 6,
        "rea": 6,
        "lsa": 6,
        "agi": 6
      }
    }
  },
  "4062": {
    "id": 4062,
    "name": "Shadow Striker",
    "maxLevel": 1,
    "requirement": {
      "skillId": 4032,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "acc": 2,
        "fin": 2,
        "pos": 2,
        "rea": 2,
        "lsa": 2,
        "agi": 2
      }
    }
  },
  "4070": {
    "id": 4070,
    "name": "Longshot Taker",
    "maxLevel": 1,
    "requirement": {
      "skillId": 4030,
      "level": 3
    },
    "unlocks": {
      "1": [
        "CM"
      ]
    },
    "boosts": {
      "1": {
        "acc": 10,
        "sho": 10,
        "pos": 10,
        "rea": 10,
        "lsa": 10,
        "agi": 10
      }
    }
  },
  "5010": {
    "id": 5010,
    "name": "Defending",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "CM",
        "CAM"
      ],
      "3": [
        "CM",
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "awr": 5,
        "mrk": 5,
        "stt": 5
      },
      "2": {
        "awr": 10,
        "mrk": 10,
        "stt": 10
      },
      "3": {
        "awr": 15,
        "mrk": 15,
        "stt": 15
      }
    }
  },
  "5011": {
    "id": 5011,
    "name": "Defending",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "CM"
      ],
      "3": [
        "CM"
      ]
    },
    "boosts": {
      "1": {
        "awr": 3,
        "mrk": 3,
        "stt": 3
      },
      "2": {
        "awr": 6,
        "mrk": 6,
        "stt": 6
      },
      "3": {
        "awr": 9,
        "mrk": 9,
        "stt": 9
      }
    }
  },
  "5012": {
    "id": 5012,
    "name": "Defending",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "awr": 1,
        "mrk": 1,
        "stt": 1
      },
      "2": {
        "awr": 2,
        "mrk": 2,
        "stt": 2
      },
      "3": {
        "awr": 3,
        "mrk": 3,
        "stt": 3
      }
    }
  },
  "5020": {
    "id": 5020,
    "name": "Passing",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "CM",
        "CAM"
      ],
      "3": [
        "CM",
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "lpa": 5,
        "spa": 5,
        "vis": 5
      },
      "2": {
        "lpa": 10,
        "spa": 10,
        "vis": 10
      },
      "3": {
        "lpa": 15,
        "spa": 15,
        "vis": 15
      }
    }
  },
  "5021": {
    "id": 5021,
    "name": "Passing",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "CM"
      ],
      "3": [
        "CM"
      ]
    },
    "boosts": {
      "1": {
        "lpa": 3,
        "spa": 3,
        "vis": 3
      },
      "2": {
        "lpa": 6,
        "spa": 6,
        "vis": 6
      },
      "3": {
        "lpa": 9,
        "spa": 9,
        "vis": 9
      }
    }
  },
  "5022": {
    "id": 5022,
    "name": "NAME_SKILL_5022",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "lpa": 1,
        "spa": 1,
        "vis": 1
      },
      "2": {
        "lpa": 2,
        "spa": 2,
        "vis": 2
      },
      "3": {
        "lpa": 3,
        "spa": 3,
        "vis": 3
      }
    }
  },
  "5030": {
    "id": 5030,
    "name": "Physical",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "CM",
        "CAM"
      ],
      "3": [
        "CM",
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 5,
        "str": 5,
        "bal": 5
      },
      "2": {
        "bac": 10,
        "str": 10,
        "bal": 10
      },
      "3": {
        "bac": 15,
        "str": 15,
        "bal": 15
      }
    }
  },
  "5031": {
    "id": 5031,
    "name": "Physical",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "CM"
      ],
      "3": [
        "CM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 3,
        "str": 3,
        "bal": 3
      },
      "2": {
        "bac": 6,
        "str": 6,
        "bal": 6
      },
      "3": {
        "bac": 9,
        "str": 9,
        "bal": 9
      }
    }
  },
  "5032": {
    "id": 5032,
    "name": "Physical",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "bac": 1,
        "str": 1,
        "bal": 1
      },
      "2": {
        "bac": 2,
        "str": 2,
        "bal": 2
      },
      "3": {
        "bac": 3,
        "str": 3,
        "bal": 3
      }
    }
  },
  "5040": {
    "id": 5040,
    "name": "Anchor",
    "maxLevel": 1,
    "requirement": {
      "skillId": 5010,
      "level": 3
    },
    "unlocks": {
      "1": [
        "CM",
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "awr": 10,
        "mrk": 10,
        "str": 10,
        "bal": 10,
        "stt": 10,
        "slt": 10
      }
    }
  },
  "5041": {
    "id": 5041,
    "name": "Anchor",
    "maxLevel": 1,
    "requirement": {
      "skillId": 5011,
      "level": 3
    },
    "unlocks": {
      "1": [
        "CM"
      ]
    },
    "boosts": {
      "1": {
        "awr": 6,
        "mrk": 6,
        "str": 6,
        "bal": 6,
        "stt": 6,
        "slt": 6
      }
    }
  },
  "5042": {
    "id": 5042,
    "name": "Anchor",
    "maxLevel": 1,
    "requirement": {
      "skillId": 5012,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "awr": 2,
        "mrk": 2,
        "str": 2,
        "bal": 2,
        "stt": 2,
        "slt": 2
      }
    }
  },
  "5050": {
    "id": 5050,
    "name": "Playmaker",
    "maxLevel": 1,
    "requirement": {
      "skillId": 5020,
      "level": 3
    },
    "unlocks": {
      "1": [
        "CM",
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 10,
        "dri": 10,
        "lpa": 10,
        "spa": 10,
        "agi": 10,
        "vis": 10
      }
    }
  },
  "5051": {
    "id": 5051,
    "name": "NAME_SKILL_5051",
    "maxLevel": 1,
    "requirement": {
      "skillId": 5021,
      "level": 3
    },
    "unlocks": {
      "1": [
        "CM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 6,
        "dri": 6,
        "lpa": 6,
        "spa": 6,
        "agi": 6,
        "vis": 6
      }
    }
  },
  "5052": {
    "id": 5052,
    "name": "NAME_SKILL_5052",
    "maxLevel": 1,
    "requirement": {
      "skillId": 5022,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "bac": 2,
        "dri": 2,
        "lpa": 2,
        "spa": 2,
        "agi": 2,
        "vis": 2
      }
    }
  },
  "5060": {
    "id": 5060,
    "name": "NAME_SKILL_5060",
    "maxLevel": 1,
    "requirement": {
      "skillId": 5030,
      "level": 3
    },
    "unlocks": {
      "1": [
        "CM",
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "awr": 10,
        "bac": 10,
        "dri": 10,
        "spa": 10,
        "str": 10,
        "bal": 10
      }
    }
  },
  "5061": {
    "id": 5061,
    "name": "Box-To-Box",
    "maxLevel": 1,
    "requirement": {
      "skillId": 5031,
      "level": 3
    },
    "unlocks": {
      "1": [
        "CM"
      ]
    },
    "boosts": {
      "1": {
        "awr": 6,
        "bac": 6,
        "dri": 6,
        "spa": 6,
        "str": 6,
        "bal": 6
      }
    }
  },
  "5062": {
    "id": 5062,
    "name": "Box-To-Box",
    "maxLevel": 1,
    "requirement": {
      "skillId": 5032,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "awr": 2,
        "bac": 2,
        "dri": 2,
        "spa": 2,
        "str": 2,
        "bal": 2
      }
    }
  },
  "5310": {
    "id": 5310,
    "name": "Interceptor",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "CM"
      ],
      "3": [
        "CM"
      ]
    },
    "boosts": {
      "1": {
        "awr": 6,
        "mrk": 6,
        "stt": 6
      },
      "2": {
        "awr": 12,
        "mrk": 12,
        "stt": 12
      },
      "3": {
        "awr": 18,
        "mrk": 18,
        "stt": 18
      }
    }
  },
  "5340": {
    "id": 5340,
    "name": "Intercept-Master",
    "maxLevel": 1,
    "requirement": {
      "skillId": 5310,
      "level": 3
    },
    "unlocks": {
      "1": [
        "CM"
      ]
    },
    "boosts": {
      "1": {
        "acc": 11,
        "dri": 11,
        "lpa": 11,
        "mrk": 11,
        "rea": 11,
        "slt": 11
      }
    }
  },
  "6010": {
    "id": 6010,
    "name": "Passing",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "CM",
        "LB"
      ],
      "3": [
        "CM",
        "LB"
      ]
    },
    "boosts": {
      "1": {
        "lpa": 5,
        "spa": 5,
        "vis": 5
      },
      "2": {
        "lpa": 10,
        "spa": 10,
        "vis": 10
      },
      "3": {
        "lpa": 15,
        "spa": 15,
        "vis": 15
      }
    }
  },
  "6011": {
    "id": 6011,
    "name": "Passing",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "LM"
      ],
      "3": [
        "LM"
      ]
    },
    "boosts": {
      "1": {
        "lpa": 3,
        "spa": 3,
        "vis": 3
      },
      "2": {
        "lpa": 6,
        "spa": 6,
        "vis": 6
      },
      "3": {
        "lpa": 9,
        "spa": 9,
        "vis": 9
      }
    }
  },
  "6012": {
    "id": 6012,
    "name": "Passing",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "ST",
        "CAM"
      ],
      "3": [
        "ST",
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "lpa": 1,
        "spa": 1,
        "vis": 1
      },
      "2": {
        "lpa": 2,
        "spa": 2,
        "vis": 2
      },
      "3": {
        "lpa": 3,
        "spa": 3,
        "vis": 3
      }
    }
  },
  "6020": {
    "id": 6020,
    "name": "NAME_SKILL_6020",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "CM",
        "LB"
      ],
      "3": [
        "CM",
        "LB"
      ]
    },
    "boosts": {
      "1": {
        "bac": 5,
        "dri": 5,
        "agi": 5
      },
      "2": {
        "bac": 10,
        "dri": 10,
        "agi": 10
      },
      "3": {
        "bac": 15,
        "dri": 15,
        "agi": 15
      }
    }
  },
  "6021": {
    "id": 6021,
    "name": "Dribbling",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "LM"
      ],
      "3": [
        "LM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 3,
        "dri": 3,
        "agi": 3
      },
      "2": {
        "bac": 6,
        "dri": 6,
        "agi": 6
      },
      "3": {
        "bac": 9,
        "dri": 9,
        "agi": 9
      }
    }
  },
  "6022": {
    "id": 6022,
    "name": "Dribbling",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "ST",
        "CAM"
      ],
      "3": [
        "ST",
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 1,
        "dri": 1,
        "agi": 1
      },
      "2": {
        "bac": 2,
        "dri": 2,
        "agi": 2
      },
      "3": {
        "bac": 3,
        "dri": 3,
        "agi": 3
      }
    }
  },
  "6030": {
    "id": 6030,
    "name": "Balanced",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "CM",
        "LB"
      ],
      "3": [
        "CM",
        "LB"
      ]
    },
    "boosts": {
      "1": {
        "cro": 5,
        "dri": 5,
        "stt": 5
      },
      "2": {
        "cro": 10,
        "dri": 10,
        "stt": 10
      },
      "3": {
        "cro": 15,
        "dri": 15,
        "stt": 15
      }
    }
  },
  "6031": {
    "id": 6031,
    "name": "Balanced",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "LM"
      ],
      "3": [
        "LM"
      ]
    },
    "boosts": {
      "1": {
        "cro": 3,
        "dri": 3,
        "stt": 3
      },
      "2": {
        "cro": 6,
        "dri": 6,
        "stt": 6
      },
      "3": {
        "cro": 9,
        "dri": 9,
        "stt": 9
      }
    }
  },
  "6032": {
    "id": 6032,
    "name": "Balanced",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "ST",
        "CAM"
      ],
      "3": [
        "ST",
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "cro": 1,
        "dri": 1,
        "stt": 1
      },
      "2": {
        "cro": 2,
        "dri": 2,
        "stt": 2
      },
      "3": {
        "cro": 3,
        "dri": 3,
        "stt": 3
      }
    }
  },
  "6040": {
    "id": 6040,
    "name": "Playmaker",
    "maxLevel": 1,
    "requirement": {
      "skillId": 6010,
      "level": 3
    },
    "unlocks": {
      "1": [
        "CM",
        "LB"
      ]
    },
    "boosts": {
      "1": {
        "bac": 10,
        "dri": 10,
        "lpa": 10,
        "spa": 10,
        "agi": 10,
        "vis": 10
      }
    }
  },
  "6041": {
    "id": 6041,
    "name": "Playmaker",
    "maxLevel": 1,
    "requirement": {
      "skillId": 6011,
      "level": 3
    },
    "unlocks": {
      "1": [
        "LM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 6,
        "dri": 6,
        "lpa": 6,
        "spa": 6,
        "agi": 6,
        "vis": 6
      }
    }
  },
  "6042": {
    "id": 6042,
    "name": "Playmaker",
    "maxLevel": 1,
    "requirement": {
      "skillId": 6012,
      "level": 3
    },
    "unlocks": {
      "1": [
        "ST",
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 2,
        "dri": 2,
        "lpa": 2,
        "spa": 2,
        "agi": 2,
        "vis": 2
      }
    }
  },
  "6050": {
    "id": 6050,
    "name": "Wide Target Man",
    "maxLevel": 1,
    "requirement": {
      "skillId": 6020,
      "level": 3
    },
    "unlocks": {
      "1": [
        "CM",
        "LB"
      ]
    },
    "boosts": {
      "1": {
        "bac": 10,
        "spa": 10,
        "str": 10,
        "pos": 10,
        "bal": 10,
        "vis": 10
      }
    }
  },
  "6051": {
    "id": 6051,
    "name": "Wide Target Man",
    "maxLevel": 1,
    "requirement": {
      "skillId": 6021,
      "level": 3
    },
    "unlocks": {
      "1": [
        "LM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 6,
        "spa": 6,
        "str": 6,
        "pos": 6,
        "bal": 6,
        "vis": 6
      }
    }
  },
  "6052": {
    "id": 6052,
    "name": "Wide Target Man",
    "maxLevel": 1,
    "requirement": {
      "skillId": 6022,
      "level": 3
    },
    "unlocks": {
      "1": [
        "ST",
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 2,
        "spa": 2,
        "str": 2,
        "pos": 2,
        "bal": 2,
        "vis": 2
      }
    }
  },
  "6060": {
    "id": 6060,
    "name": "Wide Midfielder",
    "maxLevel": 1,
    "requirement": {
      "skillId": 6030,
      "level": 3
    },
    "unlocks": {
      "1": [
        "CM",
        "LB"
      ]
    },
    "boosts": {
      "1": {
        "awr": 10,
        "bac": 10,
        "cro": 10,
        "dri": 10,
        "stt": 10,
        "vis": 10
      }
    }
  },
  "6061": {
    "id": 6061,
    "name": "Wide Midfielder",
    "maxLevel": 1,
    "requirement": {
      "skillId": 6031,
      "level": 3
    },
    "unlocks": {
      "1": [
        "LM"
      ]
    },
    "boosts": {
      "1": {
        "awr": 6,
        "bac": 6,
        "cro": 6,
        "dri": 6,
        "stt": 6,
        "vis": 6
      }
    }
  },
  "6062": {
    "id": 6062,
    "name": "Wide Midfielder",
    "maxLevel": 1,
    "requirement": {
      "skillId": 6032,
      "level": 3
    },
    "unlocks": {
      "1": [
        "ST",
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "awr": 2,
        "bac": 2,
        "cro": 2,
        "dri": 2,
        "stt": 2,
        "vis": 2
      }
    }
  },
  "7010": {
    "id": 7010,
    "name": "Defending",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "LM"
      ],
      "3": [
        "LM"
      ]
    },
    "boosts": {
      "1": {
        "awr": 5,
        "mrk": 5,
        "stt": 5
      },
      "2": {
        "awr": 10,
        "mrk": 10,
        "stt": 10
      },
      "3": {
        "awr": 15,
        "mrk": 15,
        "stt": 15
      }
    }
  },
  "7011": {
    "id": 7011,
    "name": "Defending",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "awr": 3,
        "mrk": 3,
        "stt": 3
      },
      "2": {
        "awr": 6,
        "mrk": 6,
        "stt": 6
      },
      "3": {
        "awr": 9,
        "mrk": 9,
        "stt": 9
      }
    }
  },
  "7012": {
    "id": 7012,
    "name": "Defending",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "awr": 1,
        "mrk": 1,
        "stt": 1
      },
      "2": {
        "awr": 2,
        "mrk": 2,
        "stt": 2
      },
      "3": {
        "awr": 3,
        "mrk": 3,
        "stt": 3
      }
    }
  },
  "7020": {
    "id": 7020,
    "name": "NAME_SKILL_7020",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "LM"
      ],
      "3": [
        "LM"
      ]
    },
    "boosts": {
      "1": {
        "lpa": 5,
        "spa": 5,
        "vis": 5
      },
      "2": {
        "lpa": 10,
        "spa": 10,
        "vis": 10
      },
      "3": {
        "lpa": 15,
        "spa": 15,
        "vis": 15
      }
    }
  },
  "7021": {
    "id": 7021,
    "name": "Passing",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "lpa": 3,
        "spa": 3,
        "vis": 3
      },
      "2": {
        "lpa": 6,
        "spa": 6,
        "vis": 6
      },
      "3": {
        "lpa": 9,
        "spa": 9,
        "vis": 9
      }
    }
  },
  "7022": {
    "id": 7022,
    "name": "Passing",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "lpa": 1,
        "spa": 1,
        "vis": 1
      },
      "2": {
        "lpa": 2,
        "spa": 2,
        "vis": 2
      },
      "3": {
        "lpa": 3,
        "spa": 3,
        "vis": 3
      }
    }
  },
  "7030": {
    "id": 7030,
    "name": "Balanced",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "LM"
      ],
      "3": [
        "LM"
      ]
    },
    "boosts": {
      "1": {
        "cro": 5,
        "dri": 5,
        "mrk": 5
      },
      "2": {
        "cro": 10,
        "dri": 10,
        "mrk": 10
      },
      "3": {
        "cro": 15,
        "dri": 15,
        "mrk": 15
      }
    }
  },
  "7031": {
    "id": 7031,
    "name": "Balanced",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "cro": 3,
        "dri": 3,
        "mrk": 3
      },
      "2": {
        "cro": 6,
        "dri": 6,
        "mrk": 6
      },
      "3": {
        "cro": 9,
        "dri": 9,
        "mrk": 9
      }
    }
  },
  "7032": {
    "id": 7032,
    "name": "Balanced",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "cro": 1,
        "dri": 1,
        "mrk": 1
      },
      "2": {
        "cro": 2,
        "dri": 2,
        "mrk": 2
      },
      "3": {
        "cro": 3,
        "dri": 3,
        "mrk": 3
      }
    }
  },
  "7040": {
    "id": 7040,
    "name": "No-Nonsense Fullback",
    "maxLevel": 1,
    "requirement": {
      "skillId": 7010,
      "level": 3
    },
    "unlocks": {
      "1": [
        "LM"
      ]
    },
    "boosts": {
      "1": {
        "acc": 10,
        "awr": 10,
        "mrk": 10,
        "str": 10,
        "stt": 10,
        "slt": 10
      }
    }
  },
  "7041": {
    "id": 7041,
    "name": "No-Nonsense Fullback",
    "maxLevel": 1,
    "requirement": {
      "skillId": 7011,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "acc": 6,
        "awr": 6,
        "mrk": 6,
        "str": 6,
        "stt": 6,
        "slt": 6
      }
    }
  },
  "7042": {
    "id": 7042,
    "name": "No-Nonsense Fullback",
    "maxLevel": 1,
    "requirement": {
      "skillId": 7012,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "acc": 2,
        "awr": 2,
        "mrk": 2,
        "str": 2,
        "stt": 2,
        "slt": 2
      }
    }
  },
  "7050": {
    "id": 7050,
    "name": "Attacking Fullback",
    "maxLevel": 1,
    "requirement": {
      "skillId": 7020,
      "level": 3
    },
    "unlocks": {
      "1": [
        "LM"
      ]
    },
    "boosts": {
      "1": {
        "acc": 10,
        "cro": 10,
        "lpa": 10,
        "spa": 10,
        "agi": 10,
        "vis": 10
      }
    }
  },
  "7051": {
    "id": 7051,
    "name": "Attacking Fullback",
    "maxLevel": 1,
    "requirement": {
      "skillId": 7021,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "acc": 6,
        "cro": 6,
        "lpa": 6,
        "spa": 6,
        "agi": 6,
        "vis": 6
      }
    }
  },
  "7052": {
    "id": 7052,
    "name": "Attacking Fullback",
    "maxLevel": 1,
    "requirement": {
      "skillId": 7022,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "acc": 2,
        "cro": 2,
        "lpa": 2,
        "spa": 2,
        "agi": 2,
        "vis": 2
      }
    }
  },
  "7060": {
    "id": 7060,
    "name": "Fullback",
    "maxLevel": 1,
    "requirement": {
      "skillId": 7030,
      "level": 3
    },
    "unlocks": {
      "1": [
        "LM"
      ]
    },
    "boosts": {
      "1": {
        "acc": 10,
        "awr": 10,
        "cro": 10,
        "dri": 10,
        "mrk": 10,
        "stt": 10
      }
    }
  },
  "7061": {
    "id": 7061,
    "name": "Fullback",
    "maxLevel": 1,
    "requirement": {
      "skillId": 7031,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "acc": 6,
        "awr": 6,
        "cro": 6,
        "dri": 6,
        "mrk": 6,
        "stt": 6
      }
    }
  },
  "7062": {
    "id": 7062,
    "name": "Fullback",
    "maxLevel": 1,
    "requirement": {
      "skillId": 7032,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "acc": 2,
        "awr": 2,
        "cro": 2,
        "dri": 2,
        "mrk": 2,
        "stt": 2
      }
    }
  },
  "7070": {
    "id": 7070,
    "name": "Tackler",
    "maxLevel": 1,
    "requirement": {
      "skillId": 7010,
      "level": 3
    },
    "unlocks": {
      "1": [
        "RB"
      ]
    },
    "boosts": {
      "1": {
        "acc": 10,
        "agg": 10,
        "awr": 10,
        "mrk": 10,
        "stt": 10,
        "slt": 10
      }
    }
  },
  "8010": {
    "id": 8010,
    "name": "Passing",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "LB",
        "LM"
      ],
      "3": [
        "LB",
        "LM"
      ]
    },
    "boosts": {
      "1": {
        "lpa": 5,
        "spa": 5,
        "vis": 5
      },
      "2": {
        "lpa": 10,
        "spa": 10,
        "vis": 10
      },
      "3": {
        "lpa": 15,
        "spa": 15,
        "vis": 15
      }
    }
  },
  "8011": {
    "id": 8011,
    "name": "Passing",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "LW",
        "RW"
      ],
      "3": [
        "LW",
        "RW"
      ]
    },
    "boosts": {
      "1": {
        "lpa": 3,
        "spa": 3,
        "vis": 3
      },
      "2": {
        "lpa": 6,
        "spa": 6,
        "vis": 6
      },
      "3": {
        "lpa": 9,
        "spa": 9,
        "vis": 9
      }
    }
  },
  "8012": {
    "id": 8012,
    "name": "NAME_SKILL_8012",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "RM",
        "CM"
      ],
      "3": [
        "RM",
        "CM"
      ]
    },
    "boosts": {
      "1": {
        "lpa": 1,
        "spa": 1,
        "vis": 1
      },
      "2": {
        "lpa": 2,
        "spa": 2,
        "vis": 2
      },
      "3": {
        "lpa": 3,
        "spa": 3,
        "vis": 3
      }
    }
  },
  "8020": {
    "id": 8020,
    "name": "Dribbling",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "LB",
        "LM"
      ],
      "3": [
        "LB",
        "LM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 5,
        "dri": 5,
        "agi": 5
      },
      "2": {
        "bac": 10,
        "dri": 10,
        "agi": 10
      },
      "3": {
        "bac": 15,
        "dri": 15,
        "agi": 15
      }
    }
  },
  "8021": {
    "id": 8021,
    "name": "Dribbling",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "LW",
        "RW"
      ],
      "3": [
        "LW",
        "RW"
      ]
    },
    "boosts": {
      "1": {
        "bac": 3,
        "dri": 3,
        "agi": 3
      },
      "2": {
        "bac": 6,
        "dri": 6,
        "agi": 6
      },
      "3": {
        "bac": 9,
        "dri": 9,
        "agi": 9
      }
    }
  },
  "8022": {
    "id": 8022,
    "name": "Dribbling",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "RM",
        "CM"
      ],
      "3": [
        "RM",
        "CM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 1,
        "dri": 1,
        "agi": 1
      },
      "2": {
        "bac": 2,
        "dri": 2,
        "agi": 2
      },
      "3": {
        "bac": 3,
        "dri": 3,
        "agi": 3
      }
    }
  },
  "8030": {
    "id": 8030,
    "name": "Balanced",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "LB",
        "LM"
      ],
      "3": [
        "LB",
        "LM"
      ]
    },
    "boosts": {
      "1": {
        "cro": 5,
        "dri": 5,
        "lpa": 5
      },
      "2": {
        "cro": 10,
        "dri": 10,
        "lpa": 10
      },
      "3": {
        "cro": 15,
        "dri": 15,
        "lpa": 15
      }
    }
  },
  "8031": {
    "id": 8031,
    "name": "Balanced",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "LW",
        "RW"
      ],
      "3": [
        "LW",
        "RW"
      ]
    },
    "boosts": {
      "1": {
        "cro": 3,
        "dri": 3,
        "lpa": 3
      },
      "2": {
        "cro": 6,
        "dri": 6,
        "lpa": 6
      },
      "3": {
        "cro": 9,
        "dri": 9,
        "lpa": 9
      }
    }
  },
  "8032": {
    "id": 8032,
    "name": "Balanced",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "RM",
        "CM"
      ],
      "3": [
        "RM",
        "CM"
      ]
    },
    "boosts": {
      "1": {
        "cro": 1,
        "dri": 1,
        "lpa": 1
      },
      "2": {
        "cro": 2,
        "dri": 2,
        "lpa": 2
      },
      "3": {
        "cro": 3,
        "dri": 3,
        "lpa": 3
      }
    }
  },
  "8040": {
    "id": 8040,
    "name": "Wingback",
    "maxLevel": 1,
    "requirement": {
      "skillId": 8010,
      "level": 3
    },
    "unlocks": {
      "1": [
        "LB",
        "LM"
      ]
    },
    "boosts": {
      "1": {
        "acc": 10,
        "cro": 10,
        "lpa": 10,
        "spd": 10,
        "spa": 10,
        "vis": 10
      }
    }
  },
  "8041": {
    "id": 8041,
    "name": "Wingback",
    "maxLevel": 1,
    "requirement": {
      "skillId": 8011,
      "level": 3
    },
    "unlocks": {
      "1": [
        "LW",
        "RW"
      ]
    },
    "boosts": {
      "1": {
        "acc": 6,
        "cro": 6,
        "lpa": 6,
        "spd": 6,
        "spa": 6,
        "vis": 6
      }
    }
  },
  "8042": {
    "id": 8042,
    "name": "Wingback",
    "maxLevel": 1,
    "requirement": {
      "skillId": 8012,
      "level": 3
    },
    "unlocks": {
      "1": [
        "RM",
        "CM"
      ]
    },
    "boosts": {
      "1": {
        "acc": 2,
        "cro": 2,
        "lpa": 2,
        "spd": 2,
        "spa": 2,
        "vis": 2
      }
    }
  },
  "8050": {
    "id": 8050,
    "name": "Inverted Wingback",
    "maxLevel": 1,
    "requirement": {
      "skillId": 8020,
      "level": 3
    },
    "unlocks": {
      "1": [
        "LB",
        "LM"
      ]
    },
    "boosts": {
      "1": {
        "acc": 10,
        "bac": 10,
        "dri": 10,
        "spd": 10,
        "spa": 10,
        "agi": 10
      }
    }
  },
  "8051": {
    "id": 8051,
    "name": "Inverted Wingback",
    "maxLevel": 1,
    "requirement": {
      "skillId": 8021,
      "level": 3
    },
    "unlocks": {
      "1": [
        "LW",
        "RW"
      ]
    },
    "boosts": {
      "1": {
        "acc": 6,
        "bac": 6,
        "dri": 6,
        "spd": 6,
        "spa": 6,
        "agi": 6
      }
    }
  },
  "8052": {
    "id": 8052,
    "name": "Inverted Wingback",
    "maxLevel": 1,
    "requirement": {
      "skillId": 8022,
      "level": 3
    },
    "unlocks": {
      "1": [
        "RM",
        "CM"
      ]
    },
    "boosts": {
      "1": {
        "acc": 2,
        "bac": 2,
        "dri": 2,
        "spd": 2,
        "spa": 2,
        "agi": 2
      }
    }
  },
  "8060": {
    "id": 8060,
    "name": "Complete Wingback",
    "maxLevel": 1,
    "requirement": {
      "skillId": 8030,
      "level": 3
    },
    "unlocks": {
      "1": [
        "LB",
        "LM"
      ]
    },
    "boosts": {
      "1": {
        "acc": 10,
        "cro": 10,
        "dri": 10,
        "lpa": 10,
        "spd": 10,
        "agi": 10
      }
    }
  },
  "8061": {
    "id": 8061,
    "name": "Complete Wingback",
    "maxLevel": 1,
    "requirement": {
      "skillId": 8031,
      "level": 3
    },
    "unlocks": {
      "1": [
        "LW",
        "RW"
      ]
    },
    "boosts": {
      "1": {
        "acc": 6,
        "cro": 6,
        "dri": 6,
        "lpa": 6,
        "spd": 6,
        "agi": 6
      }
    }
  },
  "8062": {
    "id": 8062,
    "name": "Complete Wingback",
    "maxLevel": 1,
    "requirement": {
      "skillId": 8032,
      "level": 3
    },
    "unlocks": {
      "1": [
        "RM",
        "CM"
      ]
    },
    "boosts": {
      "1": {
        "acc": 2,
        "cro": 2,
        "dri": 2,
        "lpa": 2,
        "spd": 2,
        "agi": 2
      }
    }
  },
  "9010": {
    "id": 9010,
    "name": "Passing",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "RM"
      ],
      "3": [
        "RM"
      ]
    },
    "boosts": {
      "1": {
        "lpa": 5,
        "spa": 5,
        "vis": 5
      },
      "2": {
        "lpa": 10,
        "spa": 10,
        "vis": 10
      },
      "3": {
        "lpa": 15,
        "spa": 15,
        "vis": 15
      }
    }
  },
  "9011": {
    "id": 9011,
    "name": "Passing",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "lpa": 3,
        "spa": 3,
        "vis": 3
      },
      "2": {
        "lpa": 6,
        "spa": 6,
        "vis": 6
      },
      "3": {
        "lpa": 9,
        "spa": 9,
        "vis": 9
      }
    }
  },
  "9012": {
    "id": 9012,
    "name": "NAME_SKILL_9012",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "lpa": 1,
        "spa": 1,
        "vis": 1
      },
      "2": {
        "lpa": 2,
        "spa": 2,
        "vis": 2
      },
      "3": {
        "lpa": 3,
        "spa": 3,
        "vis": 3
      }
    }
  },
  "9020": {
    "id": 9020,
    "name": "Dexterity",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "RM"
      ],
      "3": [
        "RM"
      ]
    },
    "boosts": {
      "1": {
        "acc": 5,
        "rea": 5,
        "agi": 5
      },
      "2": {
        "acc": 10,
        "rea": 10,
        "agi": 10
      },
      "3": {
        "acc": 15,
        "rea": 15,
        "agi": 15
      }
    }
  },
  "9021": {
    "id": 9021,
    "name": "Dexterity",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "acc": 3,
        "rea": 3,
        "agi": 3
      },
      "2": {
        "acc": 6,
        "rea": 6,
        "agi": 6
      },
      "3": {
        "acc": 9,
        "rea": 9,
        "agi": 9
      }
    }
  },
  "9022": {
    "id": 9022,
    "name": "Dexterity",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "acc": 1,
        "rea": 1,
        "agi": 1
      },
      "2": {
        "acc": 2,
        "rea": 2,
        "agi": 2
      },
      "3": {
        "acc": 3,
        "rea": 3,
        "agi": 3
      }
    }
  },
  "9030": {
    "id": 9030,
    "name": "Dribbling",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "RM"
      ],
      "3": [
        "RM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 5,
        "dri": 5,
        "agi": 5
      },
      "2": {
        "bac": 10,
        "dri": 10,
        "agi": 10
      },
      "3": {
        "bac": 15,
        "dri": 15,
        "agi": 15
      }
    }
  },
  "9031": {
    "id": 9031,
    "name": "Dribbling",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "bac": 3,
        "dri": 3,
        "agi": 3
      },
      "2": {
        "bac": 6,
        "dri": 6,
        "agi": 6
      },
      "3": {
        "bac": 9,
        "dri": 9,
        "agi": 9
      }
    }
  },
  "9032": {
    "id": 9032,
    "name": "Dribbling",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "bac": 1,
        "dri": 1,
        "agi": 1
      },
      "2": {
        "bac": 2,
        "dri": 2,
        "agi": 2
      },
      "3": {
        "bac": 3,
        "dri": 3,
        "agi": 3
      }
    }
  },
  "9040": {
    "id": 9040,
    "name": "Playmaker",
    "maxLevel": 1,
    "requirement": {
      "skillId": 9010,
      "level": 3
    },
    "unlocks": {
      "1": [
        "RM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 10,
        "dri": 10,
        "lpa": 10,
        "spa": 10,
        "agi": 10,
        "vis": 10
      }
    }
  },
  "9041": {
    "id": 9041,
    "name": "Playmaker",
    "maxLevel": 1,
    "requirement": {
      "skillId": 9011,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "bac": 6,
        "dri": 6,
        "lpa": 6,
        "spa": 6,
        "agi": 6,
        "vis": 6
      }
    }
  },
  "9042": {
    "id": 9042,
    "name": "Playmaker",
    "maxLevel": 1,
    "requirement": {
      "skillId": 9012,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "bac": 2,
        "dri": 2,
        "lpa": 2,
        "spa": 2,
        "agi": 2,
        "vis": 2
      }
    }
  },
  "9050": {
    "id": 9050,
    "name": "Raumdeuter",
    "maxLevel": 1,
    "requirement": {
      "skillId": 9020,
      "level": 3
    },
    "unlocks": {
      "1": [
        "RM"
      ]
    },
    "boosts": {
      "1": {
        "acc": 10,
        "hea": 10,
        "fin": 10,
        "pos": 10,
        "rea": 10,
        "agi": 10
      }
    }
  },
  "9051": {
    "id": 9051,
    "name": "Raumdeuter",
    "maxLevel": 1,
    "requirement": {
      "skillId": 9021,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "acc": 6,
        "hea": 6,
        "fin": 6,
        "pos": 6,
        "rea": 6,
        "agi": 6
      }
    }
  },
  "9052": {
    "id": 9052,
    "name": "Raumdeuter",
    "maxLevel": 1,
    "requirement": {
      "skillId": 9022,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "acc": 2,
        "hea": 2,
        "fin": 2,
        "pos": 2,
        "rea": 2,
        "agi": 2
      }
    }
  },
  "9060": {
    "id": 9060,
    "name": "Inverted Winger",
    "maxLevel": 1,
    "requirement": {
      "skillId": 9030,
      "level": 3
    },
    "unlocks": {
      "1": [
        "RM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 10,
        "dri": 10,
        "spa": 10,
        "sho": 10,
        "agi": 10,
        "vol": 10
      }
    }
  },
  "9061": {
    "id": 9061,
    "name": "Inverted Winger",
    "maxLevel": 1,
    "requirement": {
      "skillId": 9031,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "bac": 6,
        "dri": 6,
        "spa": 6,
        "sho": 6,
        "agi": 6,
        "vol": 6
      }
    }
  },
  "9062": {
    "id": 9062,
    "name": "Inverted Winger",
    "maxLevel": 1,
    "requirement": {
      "skillId": 9032,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "bac": 2,
        "dri": 2,
        "spa": 2,
        "sho": 2,
        "agi": 2,
        "vol": 2
      }
    }
  },
  "9070": {
    "id": 9070,
    "name": "Runner",
    "maxLevel": 1,
    "requirement": {
      "skillId": 9020,
      "level": 3
    },
    "unlocks": {
      "1": [
        "RM"
      ]
    },
    "boosts": {
      "1": {
        "spd": 10,
        "fin": 10,
        "pos": 10,
        "rea": 10,
        "agi": 10,
        "bal": 10
      }
    }
  },
  "9410": {
    "id": 9410,
    "name": "Dribbling",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "RW",
        "ST"
      ],
      "3": [
        "RW",
        "ST"
      ]
    },
    "boosts": {
      "1": {
        "dri": 6,
        "sho": 6,
        "agi": 6
      },
      "2": {
        "dri": 12,
        "sho": 12,
        "agi": 12
      },
      "3": {
        "dri": 18,
        "sho": 18,
        "agi": 18
      }
    }
  },
  "9440": {
    "id": 9440,
    "name": "NAME_SKILL_9440",
    "maxLevel": 1,
    "requirement": {
      "skillId": 9410,
      "level": 3
    },
    "unlocks": {
      "1": [
        "RW",
        "ST"
      ]
    },
    "boosts": {
      "1": {
        "dri": 11,
        "fin": 11,
        "sho": 11,
        "agi": 11,
        "bal": 11,
        "cur": 11
      }
    }
  },
  "10010": {
    "id": 10010,
    "name": "Shooting",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "ST"
      ],
      "3": [
        "ST"
      ]
    },
    "boosts": {
      "1": {
        "fin": 5,
        "sho": 5,
        "lsa": 5
      },
      "2": {
        "fin": 10,
        "sho": 10,
        "lsa": 10
      },
      "3": {
        "fin": 15,
        "sho": 15,
        "lsa": 15
      }
    }
  },
  "10011": {
    "id": 10011,
    "name": "Shooting",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "fin": 3,
        "sho": 3,
        "lsa": 3
      },
      "2": {
        "fin": 6,
        "sho": 6,
        "lsa": 6
      },
      "3": {
        "fin": 9,
        "sho": 9,
        "lsa": 9
      }
    }
  },
  "10012": {
    "id": 10012,
    "name": "Shooting",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "CAM",
        "LM"
      ],
      "3": [
        "CAM",
        "LM"
      ]
    },
    "boosts": {
      "1": {
        "fin": 1,
        "sho": 1,
        "lsa": 1
      },
      "2": {
        "fin": 2,
        "sho": 2,
        "lsa": 2
      },
      "3": {
        "fin": 3,
        "sho": 3,
        "lsa": 3
      }
    }
  },
  "10020": {
    "id": 10020,
    "name": "Passing",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "ST"
      ],
      "3": [
        "ST"
      ]
    },
    "boosts": {
      "1": {
        "lpa": 5,
        "spa": 5,
        "vis": 5
      },
      "2": {
        "lpa": 10,
        "spa": 10,
        "vis": 10
      },
      "3": {
        "lpa": 15,
        "spa": 15,
        "vis": 15
      }
    }
  },
  "10021": {
    "id": 10021,
    "name": "Passing",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "lpa": 3,
        "spa": 3,
        "vis": 3
      },
      "2": {
        "lpa": 6,
        "spa": 6,
        "vis": 6
      },
      "3": {
        "lpa": 9,
        "spa": 9,
        "vis": 9
      }
    }
  },
  "10022": {
    "id": 10022,
    "name": "Passing",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "CAM",
        "LM"
      ],
      "3": [
        "CAM",
        "LM"
      ]
    },
    "boosts": {
      "1": {
        "lpa": 1,
        "spa": 1,
        "vis": 1
      },
      "2": {
        "lpa": 2,
        "spa": 2,
        "vis": 2
      },
      "3": {
        "lpa": 3,
        "spa": 3,
        "vis": 3
      }
    }
  },
  "10030": {
    "id": 10030,
    "name": "Physical",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "ST"
      ],
      "3": [
        "ST"
      ]
    },
    "boosts": {
      "1": {
        "bac": 5,
        "str": 5,
        "bal": 5
      },
      "2": {
        "bac": 10,
        "str": 10,
        "bal": 10
      },
      "3": {
        "bac": 15,
        "str": 15,
        "bal": 15
      }
    }
  },
  "10031": {
    "id": 10031,
    "name": "Physical",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "bac": 3,
        "str": 3,
        "bal": 3
      },
      "2": {
        "bac": 6,
        "str": 6,
        "bal": 6
      },
      "3": {
        "bac": 9,
        "str": 9,
        "bal": 9
      }
    }
  },
  "10032": {
    "id": 10032,
    "name": "Physical",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {
      "2": [
        "CAM",
        "LM"
      ],
      "3": [
        "CAM",
        "LM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 1,
        "str": 1,
        "bal": 1
      },
      "2": {
        "bac": 2,
        "str": 2,
        "bal": 2
      },
      "3": {
        "bac": 3,
        "str": 3,
        "bal": 3
      }
    }
  },
  "10040": {
    "id": 10040,
    "name": "Sniper",
    "maxLevel": 1,
    "requirement": {
      "skillId": 10010,
      "level": 3
    },
    "unlocks": {
      "1": [
        "ST"
      ]
    },
    "boosts": {
      "1": {
        "fin": 10,
        "sho": 10,
        "lsa": 10,
        "frk": 10,
        "vol": 10,
        "cur": 10
      }
    }
  },
  "10041": {
    "id": 10041,
    "name": "Sniper",
    "maxLevel": 1,
    "requirement": {
      "skillId": 10011,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "fin": 6,
        "sho": 6,
        "lsa": 6,
        "frk": 6,
        "vol": 6,
        "cur": 6
      }
    }
  },
  "10042": {
    "id": 10042,
    "name": "Sniper",
    "maxLevel": 1,
    "requirement": {
      "skillId": 10012,
      "level": 3
    },
    "unlocks": {
      "1": [
        "CAM",
        "LM"
      ]
    },
    "boosts": {
      "1": {
        "fin": 2,
        "sho": 2,
        "lsa": 2,
        "frk": 2,
        "vol": 2,
        "cur": 2
      }
    }
  },
  "10050": {
    "id": 10050,
    "name": "False Nine",
    "maxLevel": 1,
    "requirement": {
      "skillId": 10020,
      "level": 3
    },
    "unlocks": {
      "1": [
        "ST"
      ]
    },
    "boosts": {
      "1": {
        "bac": 10,
        "dri": 10,
        "lpa": 10,
        "spa": 10,
        "agi": 10,
        "vis": 10
      }
    }
  },
  "10051": {
    "id": 10051,
    "name": "False Nine",
    "maxLevel": 1,
    "requirement": {
      "skillId": 10021,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "bac": 6,
        "dri": 6,
        "lpa": 6,
        "spa": 6,
        "agi": 6,
        "vis": 6
      }
    }
  },
  "10052": {
    "id": 10052,
    "name": "False Nine",
    "maxLevel": 1,
    "requirement": {
      "skillId": 10022,
      "level": 3
    },
    "unlocks": {
      "1": [
        "CAM",
        "LM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 2,
        "dri": 2,
        "lpa": 2,
        "spa": 2,
        "agi": 2,
        "vis": 2
      }
    }
  },
  "10060": {
    "id": 10060,
    "name": "Target Man",
    "maxLevel": 1,
    "requirement": {
      "skillId": 10030,
      "level": 3
    },
    "unlocks": {
      "1": [
        "ST"
      ]
    },
    "boosts": {
      "1": {
        "bac": 10,
        "spa": 10,
        "str": 10,
        "pos": 10,
        "bal": 10,
        "vis": 10
      }
    }
  },
  "10061": {
    "id": 10061,
    "name": "Target Man",
    "maxLevel": 1,
    "requirement": {
      "skillId": 10031,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "bac": 6,
        "spa": 6,
        "str": 6,
        "pos": 6,
        "bal": 6,
        "vis": 6
      }
    }
  },
  "10062": {
    "id": 10062,
    "name": "Target Man",
    "maxLevel": 1,
    "requirement": {
      "skillId": 10032,
      "level": 3
    },
    "unlocks": {
      "1": [
        "CAM",
        "LM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 2,
        "spa": 2,
        "str": 2,
        "pos": 2,
        "bal": 2,
        "vis": 2
      }
    }
  },
  "11010": {
    "id": 11010,
    "name": "Diving",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "ref": 5,
        "gkp": 5,
        "gkd": 5
      },
      "2": {
        "ref": 10,
        "gkp": 10,
        "gkd": 10
      },
      "3": {
        "ref": 15,
        "gkp": 15,
        "gkd": 15
      }
    }
  },
  "11011": {
    "id": 11011,
    "name": "Diving",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "ref": 3,
        "gkp": 3,
        "gkd": 3
      },
      "2": {
        "ref": 6,
        "gkp": 6,
        "gkd": 6
      },
      "3": {
        "ref": 9,
        "gkp": 9,
        "gkd": 9
      }
    }
  },
  "11012": {
    "id": 11012,
    "name": "Diving",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "ref": 1,
        "gkp": 1,
        "gkd": 1
      },
      "2": {
        "ref": 2,
        "gkp": 2,
        "gkd": 2
      },
      "3": {
        "ref": 3,
        "gkp": 3,
        "gkd": 3
      }
    }
  },
  "11020": {
    "id": 11020,
    "name": "GK Passing",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "han": 5,
        "agi": 5,
        "gkk": 5
      },
      "2": {
        "han": 10,
        "agi": 10,
        "gkk": 10
      },
      "3": {
        "han": 15,
        "agi": 15,
        "gkk": 15
      }
    }
  },
  "11021": {
    "id": 11021,
    "name": "GK Passing",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "han": 3,
        "agi": 3,
        "gkk": 3
      },
      "2": {
        "han": 6,
        "agi": 6,
        "gkk": 6
      },
      "3": {
        "han": 9,
        "agi": 9,
        "gkk": 9
      }
    }
  },
  "11022": {
    "id": 11022,
    "name": "GK Passing",
    "maxLevel": 3,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "han": 1,
        "agi": 1,
        "gkk": 1
      },
      "2": {
        "han": 2,
        "agi": 2,
        "gkk": 2
      },
      "3": {
        "han": 3,
        "agi": 3,
        "gkk": 3
      }
    }
  },
  "11030": {
    "id": 11030,
    "name": "Shot Stopper",
    "maxLevel": 1,
    "requirement": {
      "skillId": 11010,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "ref": 10,
        "han": 10,
        "gkp": 10,
        "rea": 10,
        "gkd": 10,
        "jmp": 10
      }
    }
  },
  "11031": {
    "id": 11031,
    "name": "Shot Stopper",
    "maxLevel": 1,
    "requirement": {
      "skillId": 11011,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "ref": 6,
        "han": 6,
        "gkp": 6,
        "rea": 6,
        "gkd": 6,
        "jmp": 6
      }
    }
  },
  "11032": {
    "id": 11032,
    "name": "Shot Stopper",
    "maxLevel": 1,
    "requirement": {
      "skillId": 11012,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "ref": 2,
        "han": 2,
        "gkp": 2,
        "rea": 2,
        "gkd": 2,
        "jmp": 2
      }
    }
  },
  "11040": {
    "id": 11040,
    "name": "Sweeper Keeper",
    "maxLevel": 1,
    "requirement": {
      "skillId": 11020,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "lpa": 10,
        "spa": 10,
        "han": 10,
        "rea": 10,
        "agi": 10,
        "gkk": 10
      }
    }
  },
  "11041": {
    "id": 11041,
    "name": "Sweeper Keeper",
    "maxLevel": 1,
    "requirement": {
      "skillId": 11021,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "lpa": 6,
        "spa": 6,
        "han": 6,
        "rea": 6,
        "agi": 6,
        "gkk": 6
      }
    }
  },
  "11042": {
    "id": 11042,
    "name": "Sweeper Keeper",
    "maxLevel": 1,
    "requirement": {
      "skillId": 11022,
      "level": 3
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "lpa": 2,
        "spa": 2,
        "han": 2,
        "rea": 2,
        "agi": 2,
        "gkk": 2
      }
    }
  },
  "20010": {
    "id": 20010,
    "name": "NAME_SKILL_20010",
    "maxLevel": 1,
    "requirement": null,
    "unlocks": {
      "1": [
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "fin": 15,
        "sho": 15,
        "lsa": 15
      }
    }
  },
  "20020": {
    "id": 20020,
    "name": "NAME_SKILL_20020",
    "maxLevel": 1,
    "requirement": null,
    "unlocks": {
      "1": [
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "cro": 15,
        "lpa": 15,
        "spa": 15
      }
    }
  },
  "20030": {
    "id": 20030,
    "name": "DRIBBLING",
    "maxLevel": 1,
    "requirement": null,
    "unlocks": {
      "1": [
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 15,
        "dri": 15,
        "agi": 15
      }
    }
  },
  "20040": {
    "id": 20040,
    "name": "DEXTERITY",
    "maxLevel": 1,
    "requirement": null,
    "unlocks": {
      "1": [
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "acc": 15,
        "rea": 15,
        "bal": 15
      }
    }
  },
  "20050": {
    "id": 20050,
    "name": "PHYSICAL",
    "maxLevel": 1,
    "requirement": null,
    "unlocks": {
      "1": [
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "agg": 15,
        "str": 15,
        "jmp": 15
      }
    }
  },
  "20060": {
    "id": 20060,
    "name": "AWARENESS",
    "maxLevel": 1,
    "requirement": null,
    "unlocks": {
      "1": [
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "awr": 15,
        "pos": 15,
        "vis": 15
      }
    }
  },
  "21010": {
    "id": 21010,
    "name": "PASSING",
    "maxLevel": 1,
    "requirement": null,
    "unlocks": {
      "1": [
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "cro": 15,
        "lpa": 15,
        "spa": 15
      }
    }
  },
  "21020": {
    "id": 21020,
    "name": "DRIBBLING",
    "maxLevel": 1,
    "requirement": null,
    "unlocks": {
      "1": [
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 15,
        "dri": 15,
        "agi": 15
      }
    }
  },
  "21030": {
    "id": 21030,
    "name": "DEFENDING",
    "maxLevel": 1,
    "requirement": null,
    "unlocks": {
      "1": [
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "mrk": 15,
        "stt": 15,
        "slt": 15
      }
    }
  },
  "21040": {
    "id": 21040,
    "name": "NAME_SKILL_21040",
    "maxLevel": 1,
    "requirement": null,
    "unlocks": {
      "1": [
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "acc": 15,
        "rea": 15,
        "bal": 15
      }
    }
  },
  "21050": {
    "id": 21050,
    "name": "PHYSICAL",
    "maxLevel": 1,
    "requirement": null,
    "unlocks": {
      "1": [
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "agg": 15,
        "str": 15,
        "jmp": 15
      }
    }
  },
  "21060": {
    "id": 21060,
    "name": "AWARENESS",
    "maxLevel": 1,
    "requirement": null,
    "unlocks": {
      "1": [
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "awr": 15,
        "pos": 15,
        "vis": 15
      }
    }
  },
  "30010": {
    "id": 30010,
    "name": "Centre Back",
    "maxLevel": 2,
    "requirement": null,
    "unlocks": {
      "2": [
        "RB"
      ]
    },
    "boosts": {
      "1": {
        "awr": 7,
        "mrk": 7,
        "stt": 7
      },
      "2": {
        "awr": 14,
        "mrk": 14,
        "stt": 14
      }
    }
  },
  "30020": {
    "id": 30020,
    "name": "Defender",
    "maxLevel": 2,
    "requirement": {
      "skillId": 30010,
      "level": 2
    },
    "unlocks": {
      "2": [
        "RB"
      ]
    },
    "boosts": {
      "1": {
        "hea": 10,
        "mrk": 10,
        "spd": 10,
        "str": 10,
        "stt": 10,
        "slt": 10
      },
      "2": {
        "hea": 20,
        "mrk": 20,
        "spd": 20,
        "str": 20,
        "stt": 20,
        "slt": 20
      }
    }
  },
  "30021": {
    "id": 30021,
    "name": "Defender",
    "maxLevel": 2,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "acc": 10,
        "hea": 10,
        "mrk": 10,
        "spd": 10,
        "str": 10,
        "jmp": 10,
        "stt": 10,
        "slt": 10
      },
      "2": {
        "acc": 20,
        "hea": 20,
        "mrk": 20,
        "spd": 20,
        "str": 20,
        "jmp": 20,
        "stt": 20,
        "slt": 20
      }
    }
  },
  "30030": {
    "id": 30030,
    "name": "Stopper",
    "maxLevel": 2,
    "requirement": {
      "skillId": 30010,
      "level": 2
    },
    "unlocks": {
      "2": [
        "RB"
      ]
    },
    "boosts": {
      "1": {
        "acc": 10,
        "awr": 10,
        "mrk": 10,
        "rea": 10,
        "bal": 10,
        "slt": 10
      },
      "2": {
        "acc": 20,
        "awr": 20,
        "mrk": 20,
        "rea": 20,
        "bal": 20,
        "slt": 20
      }
    }
  },
  "30031": {
    "id": 30031,
    "name": "Stopper",
    "maxLevel": 2,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "acc": 10,
        "agg": 10,
        "awr": 10,
        "mrk": 10,
        "spd": 10,
        "rea": 10,
        "stt": 10,
        "slt": 10
      },
      "2": {
        "acc": 20,
        "agg": 20,
        "awr": 20,
        "mrk": 20,
        "spd": 20,
        "rea": 20,
        "stt": 20,
        "slt": 20
      }
    }
  },
  "30040": {
    "id": 30040,
    "name": "Ball-Playing Defender",
    "maxLevel": 2,
    "requirement": {
      "skillId": 30010,
      "level": 2
    },
    "unlocks": {
      "2": [
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "acc": 10,
        "awr": 10,
        "dri": 10,
        "agi": 10,
        "stt": 10,
        "vis": 10
      },
      "2": {
        "acc": 20,
        "awr": 20,
        "dri": 20,
        "agi": 20,
        "stt": 20,
        "vis": 20
      }
    }
  },
  "30041": {
    "id": 30041,
    "name": "Ball-Playing Defender",
    "maxLevel": 2,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "acc": 10,
        "awr": 10,
        "dri": 10,
        "lpa": 10,
        "spd": 10,
        "spa": 10,
        "stt": 10,
        "vis": 10
      },
      "2": {
        "acc": 20,
        "awr": 20,
        "dri": 20,
        "lpa": 20,
        "spd": 20,
        "spa": 20,
        "stt": 20,
        "vis": 20
      }
    }
  },
  "30050": {
    "id": 30050,
    "name": "Header",
    "maxLevel": 1,
    "requirement": {
      "skillId": 30020,
      "level": 2
    },
    "unlocks": {
      "1": [
        "RB"
      ]
    },
    "boosts": {
      "1": {
        "hea": 15,
        "bal": 15,
        "jmp": 15
      }
    }
  },
  "30060": {
    "id": 30060,
    "name": "Physical",
    "maxLevel": 1,
    "requirement": {
      "skillId": 30020,
      "level": 2
    },
    "unlocks": {
      "1": [
        "RB"
      ]
    },
    "boosts": {
      "1": {
        "agg": 15,
        "str": 15,
        "bal": 15
      }
    }
  },
  "30070": {
    "id": 30070,
    "name": "Passing",
    "maxLevel": 1,
    "requirement": {
      "skillId": 30020,
      "level": 2
    },
    "unlocks": {
      "1": [
        "RB"
      ]
    },
    "boosts": {
      "1": {
        "lpa": 15,
        "spa": 15,
        "vis": 15
      }
    }
  },
  "31010": {
    "id": 31010,
    "name": "Fullback",
    "maxLevel": 2,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "awr": 7,
        "stt": 7,
        "slt": 7
      },
      "2": {
        "awr": 14,
        "stt": 14,
        "slt": 14
      }
    }
  },
  "31020": {
    "id": 31020,
    "name": "Complete Fullback",
    "maxLevel": 2,
    "requirement": {
      "skillId": 31010,
      "level": 2
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "agg": 10,
        "spd": 10,
        "str": 10,
        "bal": 10,
        "stt": 10,
        "slt": 10
      },
      "2": {
        "agg": 20,
        "spd": 20,
        "str": 20,
        "bal": 20,
        "stt": 20,
        "slt": 20
      }
    }
  },
  "31021": {
    "id": 31021,
    "name": "Complete Fullback",
    "maxLevel": 2,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "acc": 10,
        "awr": 10,
        "cro": 10,
        "spd": 10,
        "str": 10,
        "bal": 10,
        "stt": 10,
        "slt": 10
      },
      "2": {
        "acc": 20,
        "awr": 20,
        "cro": 20,
        "spd": 20,
        "str": 20,
        "bal": 20,
        "stt": 20,
        "slt": 20
      }
    }
  },
  "31030": {
    "id": 31030,
    "name": "Wingback",
    "maxLevel": 2,
    "requirement": {
      "skillId": 31010,
      "level": 2
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "acc": 10,
        "awr": 10,
        "bac": 10,
        "cro": 10,
        "spa": 10,
        "slt": 10
      },
      "2": {
        "acc": 20,
        "awr": 20,
        "bac": 20,
        "cro": 20,
        "spa": 20,
        "slt": 20
      }
    }
  },
  "31031": {
    "id": 31031,
    "name": "Wingback",
    "maxLevel": 2,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "acc": 10,
        "awr": 10,
        "bac": 10,
        "cro": 10,
        "spd": 10,
        "spa": 10,
        "agi": 10,
        "slt": 10
      },
      "2": {
        "acc": 20,
        "awr": 20,
        "bac": 20,
        "cro": 20,
        "spd": 20,
        "spa": 20,
        "agi": 20,
        "slt": 20
      }
    }
  },
  "31040": {
    "id": 31040,
    "name": "Falseback",
    "maxLevel": 2,
    "requirement": {
      "skillId": 31010,
      "level": 2
    },
    "unlocks": {
      "2": [
        "CDM",
        "CM"
      ]
    },
    "boosts": {
      "1": {
        "awr": 10,
        "bac": 10,
        "spd": 10,
        "spa": 10,
        "stt": 10,
        "vis": 10
      },
      "2": {
        "awr": 20,
        "bac": 20,
        "spd": 20,
        "spa": 20,
        "stt": 20,
        "vis": 20
      }
    }
  },
  "31050": {
    "id": 31050,
    "name": "Physical",
    "maxLevel": 1,
    "requirement": {
      "skillId": 31020,
      "level": 2
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "agg": 15,
        "str": 15,
        "bal": 15
      }
    }
  },
  "31060": {
    "id": 31060,
    "name": "NAME_SKILL_31060",
    "maxLevel": 1,
    "requirement": {
      "skillId": 31020,
      "level": 2
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "bac": 15,
        "dri": 15,
        "agi": 15
      }
    }
  },
  "31070": {
    "id": 31070,
    "name": "Crossing",
    "maxLevel": 1,
    "requirement": {
      "skillId": 31020,
      "level": 2
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "cro": 15,
        "lpa": 15,
        "vis": 15
      }
    }
  },
  "32010": {
    "id": 32010,
    "name": "Defensive Midfielder",
    "maxLevel": 2,
    "requirement": null,
    "unlocks": {
      "2": [
        "CM",
        "RM"
      ]
    },
    "boosts": {
      "1": {
        "awr": 7,
        "bac": 7,
        "stt": 7
      },
      "2": {
        "awr": 14,
        "bac": 14,
        "stt": 14
      }
    }
  },
  "32020": {
    "id": 32020,
    "name": "Holding",
    "maxLevel": 2,
    "requirement": {
      "skillId": 32010,
      "level": 2
    },
    "unlocks": {
      "2": [
        "CM",
        "RM"
      ]
    },
    "boosts": {
      "1": {
        "agg": 10,
        "awr": 10,
        "mrk": 10,
        "spd": 10,
        "str": 10,
        "stt": 10
      },
      "2": {
        "agg": 20,
        "awr": 20,
        "mrk": 20,
        "spd": 20,
        "str": 20,
        "stt": 20
      }
    }
  },
  "32021": {
    "id": 32021,
    "name": "Holding",
    "maxLevel": 2,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "acc": 10,
        "agg": 10,
        "awr": 10,
        "mrk": 10,
        "spd": 10,
        "spa": 10,
        "str": 10,
        "stt": 10
      },
      "2": {
        "acc": 20,
        "agg": 20,
        "awr": 20,
        "mrk": 20,
        "spd": 20,
        "spa": 20,
        "str": 20,
        "stt": 20
      }
    }
  },
  "32030": {
    "id": 32030,
    "name": "Box-To-Box",
    "maxLevel": 2,
    "requirement": {
      "skillId": 32010,
      "level": 2
    },
    "unlocks": {
      "2": [
        "CM"
      ]
    },
    "boosts": {
      "1": {
        "acc": 10,
        "awr": 10,
        "spa": 10,
        "str": 10,
        "bal": 10,
        "stt": 10
      },
      "2": {
        "acc": 20,
        "awr": 20,
        "spa": 20,
        "str": 20,
        "bal": 20,
        "stt": 20
      }
    }
  },
  "32031": {
    "id": 32031,
    "name": "Box-To-Box",
    "maxLevel": 2,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "acc": 10,
        "awr": 10,
        "bac": 10,
        "spd": 10,
        "spa": 10,
        "str": 10,
        "bal": 10,
        "stt": 10
      },
      "2": {
        "acc": 20,
        "awr": 20,
        "bac": 20,
        "spd": 20,
        "spa": 20,
        "str": 20,
        "bal": 20,
        "stt": 20
      }
    }
  },
  "32040": {
    "id": 32040,
    "name": "Deep-Lying Playmaker",
    "maxLevel": 2,
    "requirement": {
      "skillId": 32010,
      "level": 2
    },
    "unlocks": {
      "2": [
        "CM",
        "RB"
      ]
    },
    "boosts": {
      "1": {
        "bac": 10,
        "cro": 10,
        "lpa": 10,
        "spd": 10,
        "spa": 10,
        "vis": 10
      },
      "2": {
        "bac": 20,
        "cro": 20,
        "lpa": 20,
        "spd": 20,
        "spa": 20,
        "vis": 20
      }
    }
  },
  "32041": {
    "id": 32041,
    "name": "NAME_SKILL_32040",
    "maxLevel": 2,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "acc": 10,
        "awr": 10,
        "bac": 10,
        "lpa": 10,
        "spd": 10,
        "spa": 10,
        "agi": 10,
        "vis": 10
      },
      "2": {
        "acc": 20,
        "awr": 20,
        "bac": 20,
        "lpa": 20,
        "spd": 20,
        "spa": 20,
        "agi": 20,
        "vis": 20
      }
    }
  },
  "32050": {
    "id": 32050,
    "name": "Physical",
    "maxLevel": 1,
    "requirement": {
      "skillId": 32020,
      "level": 2
    },
    "unlocks": {
      "1": [
        "CM",
        "RM"
      ]
    },
    "boosts": {
      "1": {
        "agg": 15,
        "str": 15,
        "bal": 15
      }
    }
  },
  "32060": {
    "id": 32060,
    "name": "Defending",
    "maxLevel": 1,
    "requirement": {
      "skillId": 32020,
      "level": 2
    },
    "unlocks": {
      "1": [
        "CM",
        "RM"
      ]
    },
    "boosts": {
      "1": {
        "mrk": 15,
        "stt": 15,
        "slt": 15
      }
    }
  },
  "32070": {
    "id": 32070,
    "name": "Passing",
    "maxLevel": 1,
    "requirement": {
      "skillId": 32020,
      "level": 2
    },
    "unlocks": {
      "1": [
        "CM",
        "RM"
      ]
    },
    "boosts": {
      "1": {
        "lpa": 15,
        "spa": 15,
        "vis": 15
      }
    }
  },
  "33010": {
    "id": 33010,
    "name": "Central Midfielder",
    "maxLevel": 2,
    "requirement": null,
    "unlocks": {
      "2": [
        "CDM"
      ]
    },
    "boosts": {
      "1": {
        "cro": 7,
        "lpa": 7,
        "spa": 7
      },
      "2": {
        "cro": 14,
        "lpa": 14,
        "spa": 14
      }
    }
  },
  "33020": {
    "id": 33020,
    "name": "Holding",
    "maxLevel": 2,
    "requirement": {
      "skillId": 33010,
      "level": 2
    },
    "unlocks": {
      "2": [
        "CDM"
      ]
    },
    "boosts": {
      "1": {
        "agg": 10,
        "awr": 10,
        "mrk": 10,
        "spd": 10,
        "str": 10,
        "stt": 10
      },
      "2": {
        "agg": 20,
        "awr": 20,
        "mrk": 20,
        "spd": 20,
        "str": 20,
        "stt": 20
      }
    }
  },
  "33030": {
    "id": 33030,
    "name": "Box-To-Box",
    "maxLevel": 2,
    "requirement": {
      "skillId": 33010,
      "level": 2
    },
    "unlocks": {
      "2": [
        "CDM"
      ]
    },
    "boosts": {
      "1": {
        "acc": 10,
        "awr": 10,
        "spa": 10,
        "str": 10,
        "bal": 10,
        "stt": 10
      },
      "2": {
        "acc": 20,
        "awr": 20,
        "spa": 20,
        "str": 20,
        "bal": 20,
        "stt": 20
      }
    }
  },
  "33040": {
    "id": 33040,
    "name": "Deep-Lying Playmaker",
    "maxLevel": 2,
    "requirement": {
      "skillId": 33010,
      "level": 2
    },
    "unlocks": {
      "2": [
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 10,
        "cro": 10,
        "lpa": 10,
        "spd": 10,
        "spa": 10,
        "vis": 10
      },
      "2": {
        "bac": 20,
        "cro": 20,
        "lpa": 20,
        "spd": 20,
        "spa": 20,
        "vis": 20
      }
    }
  },
  "33050": {
    "id": 33050,
    "name": "Half-Winger",
    "maxLevel": 2,
    "requirement": {
      "skillId": 33010,
      "level": 2
    },
    "unlocks": {
      "2": [
        "RM"
      ]
    },
    "boosts": {
      "1": {
        "acc": 10,
        "bac": 10,
        "dri": 10,
        "spa": 10,
        "pos": 10,
        "vis": 10
      },
      "2": {
        "acc": 20,
        "bac": 20,
        "dri": 20,
        "spa": 20,
        "pos": 20,
        "vis": 20
      }
    }
  },
  "33051": {
    "id": 33051,
    "name": "Half-Winger",
    "maxLevel": 2,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "acc": 10,
        "bac": 10,
        "dri": 10,
        "spd": 10,
        "spa": 10,
        "agi": 10,
        "cur": 10,
        "vis": 10
      },
      "2": {
        "acc": 20,
        "bac": 20,
        "dri": 20,
        "spd": 20,
        "spa": 20,
        "agi": 20,
        "cur": 20,
        "vis": 20
      }
    }
  },
  "33060": {
    "id": 33060,
    "name": "Playmaker",
    "maxLevel": 2,
    "requirement": {
      "skillId": 33010,
      "level": 2
    },
    "unlocks": {
      "2": [
        "CDM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 10,
        "lpa": 10,
        "spd": 10,
        "spa": 10,
        "bal": 10,
        "vis": 10
      },
      "2": {
        "bac": 20,
        "lpa": 20,
        "spd": 20,
        "spa": 20,
        "bal": 20,
        "vis": 20
      }
    }
  },
  "33061": {
    "id": 33061,
    "name": "Playmaker",
    "maxLevel": 2,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "acc": 10,
        "bac": 10,
        "dri": 10,
        "lpa": 10,
        "spd": 10,
        "spa": 10,
        "cur": 10,
        "vis": 10
      },
      "2": {
        "acc": 20,
        "bac": 20,
        "dri": 20,
        "lpa": 20,
        "spd": 20,
        "spa": 20,
        "cur": 20,
        "vis": 20
      }
    }
  },
  "33070": {
    "id": 33070,
    "name": "Dribbling",
    "maxLevel": 1,
    "requirement": {
      "skillId": 33030,
      "level": 2
    },
    "unlocks": {
      "1": [
        "CDM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 15,
        "dri": 15,
        "agi": 15
      }
    }
  },
  "33080": {
    "id": 33080,
    "name": "Awareness",
    "maxLevel": 1,
    "requirement": {
      "skillId": 33030,
      "level": 2
    },
    "unlocks": {
      "1": [
        "CDM"
      ]
    },
    "boosts": {
      "1": {
        "awr": 15,
        "pos": 15,
        "vis": 15
      }
    }
  },
  "33090": {
    "id": 33090,
    "name": "Physical",
    "maxLevel": 1,
    "requirement": {
      "skillId": 33030,
      "level": 2
    },
    "unlocks": {
      "1": [
        "CDM"
      ]
    },
    "boosts": {
      "1": {
        "agg": 15,
        "str": 15,
        "bal": 15
      }
    }
  },
  "34010": {
    "id": 34010,
    "name": "NAME_SKILL_34010",
    "maxLevel": 2,
    "requirement": null,
    "unlocks": {
      "2": [
        "LW",
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "cro": 7,
        "dri": 7,
        "vis": 7
      },
      "2": {
        "cro": 14,
        "dri": 14,
        "vis": 14
      }
    }
  },
  "34020": {
    "id": 34020,
    "name": "Wide Playmaker",
    "maxLevel": 2,
    "requirement": {
      "skillId": 34010,
      "level": 2
    },
    "unlocks": {
      "2": [
        "LW",
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 10,
        "cro": 10,
        "lpa": 10,
        "spd": 10,
        "spa": 10,
        "agi": 10
      },
      "2": {
        "bac": 20,
        "cro": 20,
        "lpa": 20,
        "spd": 20,
        "spa": 20,
        "agi": 20
      }
    }
  },
  "34021": {
    "id": 34021,
    "name": "NAME_SKILL_34020",
    "maxLevel": 2,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "acc": 10,
        "bac": 10,
        "cro": 10,
        "lpa": 10,
        "spd": 10,
        "spa": 10,
        "agi": 10,
        "vis": 10
      },
      "2": {
        "acc": 20,
        "bac": 20,
        "cro": 20,
        "lpa": 20,
        "spd": 20,
        "spa": 20,
        "agi": 20,
        "vis": 20
      }
    }
  },
  "34030": {
    "id": 34030,
    "name": "Complete Wide Midfielder",
    "maxLevel": 2,
    "requirement": {
      "skillId": 34010,
      "level": 2
    },
    "unlocks": {
      "2": [
        "LW",
        "LB"
      ]
    },
    "boosts": {
      "1": {
        "agg": 10,
        "bac": 10,
        "cro": 10,
        "spd": 10,
        "spa": 10,
        "bal": 10
      },
      "2": {
        "agg": 20,
        "bac": 20,
        "cro": 20,
        "spd": 20,
        "spa": 20,
        "bal": 20
      }
    }
  },
  "34031": {
    "id": 34031,
    "name": "Complete Wide Midfielder",
    "maxLevel": 2,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "acc": 10,
        "agg": 10,
        "bac": 10,
        "cro": 10,
        "dri": 10,
        "spd": 10,
        "spa": 10,
        "stt": 10
      },
      "2": {
        "acc": 20,
        "agg": 20,
        "bac": 20,
        "cro": 20,
        "dri": 20,
        "spd": 20,
        "spa": 20,
        "stt": 20
      }
    }
  },
  "34040": {
    "id": 34040,
    "name": "Traditional Winger",
    "maxLevel": 2,
    "requirement": {
      "skillId": 34010,
      "level": 2
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "bac": 10,
        "cro": 10,
        "dri": 10,
        "lpa": 10,
        "spd": 10,
        "agi": 10
      },
      "2": {
        "bac": 20,
        "cro": 20,
        "dri": 20,
        "lpa": 20,
        "spd": 20,
        "agi": 20
      }
    }
  },
  "34041": {
    "id": 34041,
    "name": "Traditional Winger",
    "maxLevel": 2,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "acc": 10,
        "bac": 10,
        "cro": 10,
        "dri": 10,
        "lpa": 10,
        "spd": 10,
        "agi": 10,
        "cur": 10
      },
      "2": {
        "acc": 20,
        "bac": 20,
        "cro": 20,
        "dri": 20,
        "lpa": 20,
        "spd": 20,
        "agi": 20,
        "cur": 20
      }
    }
  },
  "34050": {
    "id": 34050,
    "name": "Passing",
    "maxLevel": 1,
    "requirement": {
      "skillId": 34020,
      "level": 2
    },
    "unlocks": {
      "1": [
        "LW",
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "lpa": 15,
        "spa": 15,
        "vis": 15
      }
    }
  },
  "34060": {
    "id": 34060,
    "name": "Defending",
    "maxLevel": 1,
    "requirement": {
      "skillId": 34020,
      "level": 2
    },
    "unlocks": {
      "1": [
        "LW",
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "mrk": 15,
        "stt": 15,
        "slt": 15
      }
    }
  },
  "34070": {
    "id": 34070,
    "name": "Physical",
    "maxLevel": 1,
    "requirement": {
      "skillId": 34020,
      "level": 2
    },
    "unlocks": {
      "1": [
        "LW",
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "agg": 15,
        "str": 15,
        "bal": 15
      }
    }
  },
  "35010": {
    "id": 35010,
    "name": "Attacking Midfielder",
    "maxLevel": 2,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "spa": 7,
        "pos": 7,
        "lsa": 7
      },
      "2": {
        "spa": 14,
        "pos": 14,
        "lsa": 14
      }
    }
  },
  "35020": {
    "id": 35020,
    "name": "Shadow Striker",
    "maxLevel": 2,
    "requirement": {
      "skillId": 35010,
      "level": 2
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "acc": 10,
        "fin": 10,
        "sho": 10,
        "pos": 10,
        "rea": 10,
        "cur": 10
      },
      "2": {
        "acc": 20,
        "fin": 20,
        "sho": 20,
        "pos": 20,
        "rea": 20,
        "cur": 20
      }
    }
  },
  "35021": {
    "id": 35021,
    "name": "Shadow Striker",
    "maxLevel": 2,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "acc": 10,
        "bac": 10,
        "spd": 10,
        "fin": 10,
        "sho": 10,
        "pos": 10,
        "rea": 10,
        "cur": 10
      },
      "2": {
        "acc": 20,
        "bac": 20,
        "spd": 20,
        "fin": 20,
        "sho": 20,
        "pos": 20,
        "rea": 20,
        "cur": 20
      }
    }
  },
  "35030": {
    "id": 35030,
    "name": "Playmaker",
    "maxLevel": 2,
    "requirement": {
      "skillId": 35010,
      "level": 2
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "bac": 10,
        "lpa": 10,
        "spd": 10,
        "spa": 10,
        "bal": 10,
        "vis": 10
      },
      "2": {
        "bac": 20,
        "lpa": 20,
        "spd": 20,
        "spa": 20,
        "bal": 20,
        "vis": 20
      }
    }
  },
  "35040": {
    "id": 35040,
    "name": "Half-Winger",
    "maxLevel": 2,
    "requirement": {
      "skillId": 35010,
      "level": 2
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "acc": 10,
        "bac": 10,
        "dri": 10,
        "spa": 10,
        "pos": 10,
        "vis": 10
      },
      "2": {
        "acc": 20,
        "bac": 20,
        "dri": 20,
        "spa": 20,
        "pos": 20,
        "vis": 20
      }
    }
  },
  "35050": {
    "id": 35050,
    "name": "Long Shot",
    "maxLevel": 1,
    "requirement": {
      "skillId": 35020,
      "level": 2
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "sho": 15,
        "lsa": 15,
        "cur": 15
      }
    }
  },
  "35060": {
    "id": 35060,
    "name": "Dribbling",
    "maxLevel": 1,
    "requirement": {
      "skillId": 35020,
      "level": 2
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "bac": 15,
        "dri": 15,
        "agi": 15
      }
    }
  },
  "35070": {
    "id": 35070,
    "name": "Crossing",
    "maxLevel": 1,
    "requirement": {
      "skillId": 35020,
      "level": 2
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "cro": 15,
        "lpa": 15,
        "vis": 15
      }
    }
  },
  "36010": {
    "id": 36010,
    "name": "Winger",
    "maxLevel": 2,
    "requirement": null,
    "unlocks": {
      "2": [
        "RM",
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "acc": 7,
        "cro": 7,
        "pos": 7
      },
      "2": {
        "acc": 14,
        "cro": 14,
        "pos": 14
      }
    }
  },
  "36020": {
    "id": 36020,
    "name": "Wide Playmaker",
    "maxLevel": 2,
    "requirement": {
      "skillId": 36010,
      "level": 2
    },
    "unlocks": {
      "2": [
        "RM",
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 10,
        "cro": 10,
        "lpa": 10,
        "spd": 10,
        "spa": 10,
        "agi": 10
      },
      "2": {
        "bac": 20,
        "cro": 20,
        "lpa": 20,
        "spd": 20,
        "spa": 20,
        "agi": 20
      }
    }
  },
  "36030": {
    "id": 36030,
    "name": "Traditional Winger",
    "maxLevel": 2,
    "requirement": {
      "skillId": 36010,
      "level": 2
    },
    "unlocks": {
      "2": [
        "RM",
        "RW",
        "ST"
      ]
    },
    "boosts": {
      "1": {
        "bac": 10,
        "cro": 10,
        "dri": 10,
        "lpa": 10,
        "spd": 10,
        "agi": 10
      },
      "2": {
        "bac": 20,
        "cro": 20,
        "dri": 20,
        "lpa": 20,
        "spd": 20,
        "agi": 20
      }
    }
  },
  "36040": {
    "id": 36040,
    "name": "Inside Forward",
    "maxLevel": 2,
    "requirement": {
      "skillId": 36010,
      "level": 2
    },
    "unlocks": {
      "2": [
        "ST"
      ]
    },
    "boosts": {
      "1": {
        "bac": 10,
        "dri": 10,
        "spd": 10,
        "fin": 10,
        "agi": 10,
        "cur": 10
      },
      "2": {
        "bac": 20,
        "dri": 20,
        "spd": 20,
        "fin": 20,
        "agi": 20,
        "cur": 20
      }
    }
  },
  "36041": {
    "id": 36041,
    "name": "Inside Forward",
    "maxLevel": 2,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "acc": 10,
        "bac": 10,
        "dri": 10,
        "spd": 10,
        "fin": 10,
        "sho": 10,
        "agi": 10,
        "cur": 10
      },
      "2": {
        "acc": 20,
        "bac": 20,
        "dri": 20,
        "spd": 20,
        "fin": 20,
        "sho": 20,
        "agi": 20,
        "cur": 20
      }
    }
  },
  "36050": {
    "id": 36050,
    "name": "Dribbling",
    "maxLevel": 1,
    "requirement": {
      "skillId": 36020,
      "level": 2
    },
    "unlocks": {
      "1": [
        "RM",
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 15,
        "dri": 15,
        "agi": 15
      }
    }
  },
  "36060": {
    "id": 36060,
    "name": "Passing",
    "maxLevel": 1,
    "requirement": {
      "skillId": 36020,
      "level": 2
    },
    "unlocks": {
      "1": [
        "RM",
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "lpa": 15,
        "spa": 15,
        "vis": 15
      }
    }
  },
  "36070": {
    "id": 36070,
    "name": "Shooting",
    "maxLevel": 1,
    "requirement": {
      "skillId": 36020,
      "level": 2
    },
    "unlocks": {
      "1": [
        "RM",
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "fin": 15,
        "sho": 15,
        "lsa": 15
      }
    }
  },
  "37010": {
    "id": 37010,
    "name": "Striker",
    "maxLevel": 2,
    "requirement": null,
    "unlocks": {
      "2": [
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "fin": 7,
        "sho": 7,
        "vol": 7
      },
      "2": {
        "fin": 14,
        "sho": 14,
        "vol": 14
      }
    }
  },
  "37020": {
    "id": 37020,
    "name": "Advance Forward",
    "maxLevel": 2,
    "requirement": {
      "skillId": 37010,
      "level": 2
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "spd": 10,
        "fin": 10,
        "sho": 10,
        "pos": 10,
        "rea": 10,
        "vol": 10
      },
      "2": {
        "spd": 20,
        "fin": 20,
        "sho": 20,
        "pos": 20,
        "rea": 20,
        "vol": 20
      }
    }
  },
  "37021": {
    "id": 37021,
    "name": "Advance Forward",
    "maxLevel": 2,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "acc": 10,
        "dri": 10,
        "spd": 10,
        "fin": 10,
        "sho": 10,
        "str": 10,
        "pos": 10,
        "vol": 10
      },
      "2": {
        "acc": 20,
        "dri": 20,
        "spd": 20,
        "fin": 20,
        "sho": 20,
        "str": 20,
        "pos": 20,
        "vol": 20
      }
    }
  },
  "37030": {
    "id": 37030,
    "name": "Poacher",
    "maxLevel": 2,
    "requirement": {
      "skillId": 37010,
      "level": 2
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "acc": 10,
        "fin": 10,
        "pos": 10,
        "rea": 10,
        "agi": 10,
        "vol": 10
      },
      "2": {
        "acc": 20,
        "fin": 20,
        "pos": 20,
        "rea": 20,
        "agi": 20,
        "vol": 20
      }
    }
  },
  "37031": {
    "id": 37031,
    "name": "Poacher",
    "maxLevel": 2,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "acc": 10,
        "hea": 10,
        "spd": 10,
        "fin": 10,
        "pos": 10,
        "rea": 10,
        "agi": 10,
        "vol": 10
      },
      "2": {
        "acc": 20,
        "hea": 20,
        "spd": 20,
        "fin": 20,
        "pos": 20,
        "rea": 20,
        "agi": 20,
        "vol": 20
      }
    }
  },
  "37040": {
    "id": 37040,
    "name": "Target Forward",
    "maxLevel": 2,
    "requirement": {
      "skillId": 37010,
      "level": 2
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "bac": 10,
        "hea": 10,
        "spd": 10,
        "spa": 10,
        "str": 10,
        "bal": 10
      },
      "2": {
        "bac": 20,
        "hea": 20,
        "spd": 20,
        "spa": 20,
        "str": 20,
        "bal": 20
      }
    }
  },
  "37041": {
    "id": 37041,
    "name": "NAME_SKILL_37040",
    "maxLevel": 2,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "acc": 10,
        "bac": 10,
        "hea": 10,
        "spd": 10,
        "spa": 10,
        "fin": 10,
        "str": 10,
        "jmp": 10
      },
      "2": {
        "acc": 20,
        "bac": 20,
        "hea": 20,
        "spd": 20,
        "spa": 20,
        "fin": 20,
        "str": 20,
        "jmp": 20
      }
    }
  },
  "37050": {
    "id": 37050,
    "name": "False 9",
    "maxLevel": 2,
    "requirement": {
      "skillId": 37010,
      "level": 2
    },
    "unlocks": {
      "2": [
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "acc": 10,
        "bac": 10,
        "dri": 10,
        "spa": 10,
        "pos": 10,
        "agi": 10
      },
      "2": {
        "acc": 20,
        "bac": 20,
        "dri": 20,
        "spa": 20,
        "pos": 20,
        "agi": 20
      }
    }
  },
  "37051": {
    "id": 37051,
    "name": "False 9",
    "maxLevel": 2,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "acc": 10,
        "bac": 10,
        "dri": 10,
        "spd": 10,
        "spa": 10,
        "fin": 10,
        "agi": 10,
        "vis": 10
      },
      "2": {
        "acc": 20,
        "bac": 20,
        "dri": 20,
        "spd": 20,
        "spa": 20,
        "fin": 20,
        "agi": 20,
        "vis": 20
      }
    }
  },
  "37060": {
    "id": 37060,
    "name": "Dribbling",
    "maxLevel": 1,
    "requirement": {
      "skillId": 37050,
      "level": 2
    },
    "unlocks": {
      "1": [
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 15,
        "dri": 15,
        "agi": 15
      }
    }
  },
  "37070": {
    "id": 37070,
    "name": "Physical",
    "maxLevel": 1,
    "requirement": {
      "skillId": 37050,
      "level": 2
    },
    "unlocks": {
      "1": [
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "agg": 15,
        "str": 15,
        "bal": 15
      }
    }
  },
  "37080": {
    "id": 37080,
    "name": "Header",
    "maxLevel": 1,
    "requirement": {
      "skillId": 37050,
      "level": 2
    },
    "unlocks": {
      "1": [
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "hea": 15,
        "bal": 15,
        "jmp": 15
      }
    }
  },
  "38010": {
    "id": 38010,
    "name": "Goal Keeper",
    "maxLevel": 2,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "rea": 7,
        "gkd": 7,
        "jmp": 7
      },
      "2": {
        "rea": 14,
        "gkd": 14,
        "jmp": 14
      }
    }
  },
  "38020": {
    "id": 38020,
    "name": "Shot Stopper",
    "maxLevel": 2,
    "requirement": {
      "skillId": 38010,
      "level": 2
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "ref": 10,
        "str": 10,
        "han": 10,
        "gkp": 10,
        "rea": 10,
        "gkd": 10
      },
      "2": {
        "ref": 20,
        "str": 20,
        "han": 20,
        "gkp": 20,
        "rea": 20,
        "gkd": 20
      }
    }
  },
  "38021": {
    "id": 38021,
    "name": "NAME_SKILL_38020",
    "maxLevel": 2,
    "requirement": null,
    "unlocks": {},
    "boosts": {
      "1": {
        "ref": 10,
        "han": 10,
        "gkp": 10,
        "rea": 10,
        "gkd": 10,
        "jmp": 10
      },
      "2": {
        "ref": 20,
        "han": 20,
        "gkp": 20,
        "rea": 20,
        "gkd": 20,
        "jmp": 20
      }
    }
  },
  "38030": {
    "id": 38030,
    "name": "Sweeper Keeper",
    "maxLevel": 2,
    "requirement": {
      "skillId": 38010,
      "level": 2
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "lpa": 10,
        "spa": 10,
        "ref": 10,
        "rea": 10,
        "agi": 10,
        "gkk": 10
      },
      "2": {
        "lpa": 20,
        "spa": 20,
        "ref": 20,
        "rea": 20,
        "agi": 20,
        "gkk": 20
      }
    }
  },
  "38040": {
    "id": 38040,
    "name": "NAME_SKILL_38040",
    "maxLevel": 1,
    "requirement": {
      "skillId": 38020,
      "level": 2
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "lpa": 15,
        "gkk": 15,
        "vis": 15
      }
    }
  },
  "38050": {
    "id": 38050,
    "name": "GK Rush",
    "maxLevel": 1,
    "requirement": {
      "skillId": 38020,
      "level": 2
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "acc": 15,
        "han": 15,
        "gkp": 15
      }
    }
  },
  "38060": {
    "id": 38060,
    "name": "Highballs",
    "maxLevel": 1,
    "requirement": {
      "skillId": 38020,
      "level": 2
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "han": 15,
        "gkp": 15,
        "jmp": 15
      }
    }
  },
  "39010": {
    "id": 39010,
    "name": "SCORING",
    "maxLevel": 1,
    "requirement": {
      "skillId": 32041,
      "level": 2
    },
    "unlocks": {
      "1": [
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "hea": 20,
        "fin": 20,
        "sho": 20,
        "lsa": 20
      }
    }
  },
  "39011": {
    "id": 39011,
    "name": "PASSING",
    "maxLevel": 1,
    "requirement": {
      "skillId": 32041,
      "level": 2
    },
    "unlocks": {
      "1": [
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "cro": 20,
        "lpa": 20,
        "spa": 20,
        "vis": 20
      }
    }
  },
  "39012": {
    "id": 39012,
    "name": "DRIBBLING",
    "maxLevel": 1,
    "requirement": {
      "skillId": 32041,
      "level": 2
    },
    "unlocks": {
      "1": [
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "bac": 20,
        "dri": 20,
        "rea": 20,
        "agi": 20
      }
    }
  },
  "39013": {
    "id": 39013,
    "name": "DEFENDING",
    "maxLevel": 1,
    "requirement": {
      "skillId": 32041,
      "level": 2
    },
    "unlocks": {
      "1": [
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "awr": 20,
        "mrk": 20,
        "stt": 20,
        "slt": 20
      }
    }
  },
  "39014": {
    "id": 39014,
    "name": "PHYSICAL",
    "maxLevel": 1,
    "requirement": {
      "skillId": 32041,
      "level": 2
    },
    "unlocks": {
      "1": [
        "CAM"
      ]
    },
    "boosts": {
      "1": {
        "agg": 20,
        "str": 20,
        "bal": 20,
        "jmp": 20
      }
    }
  },
  "39020": {
    "id": 39020,
    "name": "GK KICKING",
    "maxLevel": 1,
    "requirement": {
      "skillId": 38021,
      "level": 2
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "lpa": 20,
        "gkk": 20,
        "vis": 20
      }
    }
  },
  "39021": {
    "id": 39021,
    "name": "GK BALL-PLAYING",
    "maxLevel": 1,
    "requirement": {
      "skillId": 38021,
      "level": 2
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "bac": 20,
        "dri": 20,
        "spa": 20
      }
    }
  },
  "39022": {
    "id": 39022,
    "name": "GK RUSH",
    "maxLevel": 1,
    "requirement": {
      "skillId": 38021,
      "level": 2
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "acc": 20,
        "spd": 20,
        "slt": 20
      }
    }
  },
  "39023": {
    "id": 39023,
    "name": "HIGHBALLS",
    "maxLevel": 1,
    "requirement": {
      "skillId": 38021,
      "level": 2
    },
    "unlocks": {},
    "boosts": {
      "1": {
        "han": 20,
        "gkp": 20,
        "jmp": 20
      }
    }
  }
};
