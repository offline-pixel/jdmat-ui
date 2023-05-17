export let arr: any = [
  { "name": 'Book', "arr": [{
    "hintLabel": 'Will be calculated in KG',
    "name": 'weight',
    "match": "/^\d+(\.\d{2})?$/i",
    "placeholder": 'E.g. 57',
    "errOne": "Please enter Weight(KG)",
    "errTwo": "Enter Minimum 1 KG",
    }]
  },
  { "name": 'DVD', "arr": [{
    "hintLabel": 'Will be calculated in MB',
    "name": 'size',
    "match": "/^\d+(\.\d{2})?$/i",
    "placeholder": 'E.g. 97',
    "errOne": "Please enter Size(MB)",
    "errTwo": "Enter Minimum 1 MB",
    }]
  },
  { "name": 'Furniture', "arr": [{
    "hintLabel": 'Will be calculated in CM',
    "name": 'length',
    "match": "/^\d+(\.\d{2})?$/i",
    "placeholder": 'E.g. 157',
    "errOne": "Please enter length(CM)",
    "errTwo": "Enter Minimum 1 CM",
    },{
      "hintLabel": 'Will be calculated in CM',
      "name": 'height',
      "match": "/^\d+(\.\d{2})?$/i",
      "placeholder": 'E.g. 357',
      "errOne": "Please enter height(CM)",
      "errTwo": "Enter Minimum 1 CM",
    },{
      "hintLabel": 'Will be calculated in CM',
      "name": 'width',
      "match": "/^\d+(\.\d{2})?$/i",
      "placeholder": 'E.g. 257',
      "errOne": "Please enter width(CM)",
      "errTwo": "Enter Minimum 1 CM",
    }]
  },
]