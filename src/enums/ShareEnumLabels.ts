import { FieldType, FieldUiType, FilterOperator, ListCategory, Role } from "./SharedEnums";

export const RoleLabel = new Map<string, string>([
  [Role.ReadOnly, 'Read Only'],
  [Role.ReadAdd, 'Read and Add'],
  [Role.ReadEdit, 'Read and Edit'],
  [Role.AddOnly, 'Add Only'],
  [Role.FullAccess, 'Full Access']
]); 
export const ListCategoryLabel = new Map<string, string>([
    [ListCategory.Content, 'Content'],
    [ListCategory.Events, 'Events'],
    [ListCategory.HRRecruiting, 'HR Recruiting'],
    [ListCategory.Marketing, 'Marketing'],
    [ListCategory.Communications, 'Communications'],
    [ListCategory.Design, 'Design'],
    [ListCategory.ProjectManagement, 'Project Management'],
    [ListCategory.RemoteWork, 'Remote Work'],
    [ListCategory.SalesCustomers, 'Sales Customers'],
    [ListCategory.SoftwareDevelopment, 'Software Development'],
  ]); 
  export const FieldTypeGroupLabel = new Map<string,{fieldType:string,displayName:string,config?:any}[]>([
    ["Text",[
         {fieldType:FieldType.Text,displayName:"One Line Text",config:{fieldUiType:FieldUiType.Text}},
         {fieldType:FieldType.Text,displayName:"Large Text",config:{fieldUiType:FieldUiType.LongText}}
      ]
    ],
    ["Number",[
      {fieldType:FieldType.Integer,displayName:"Integer",config:{fieldUiType:FieldUiType.Integer}},
      {fieldType:FieldType.Float,displayName:"Float",config:{fieldUiType:FieldUiType.Float}},
      {fieldType:FieldType.Percentage,displayName:"Percentage",config:{fieldUiType:FieldUiType.Percentage}},
      {fieldType:FieldType.Money,displayName:"Money",config:{fieldUiType:FieldUiType.Money}},
     ]
   ],
   ["Time",[
      {fieldType:FieldType.Date,displayName:"Date",config:{fieldUiType:FieldUiType.Date}},
      {fieldType:FieldType.DateTime,displayName:"DateTime",config:{fieldUiType:FieldUiType.DateTime}},
      {fieldType:FieldType.Time,displayName:"Time",config:{fieldUiType:FieldUiType.Time}},
    ]
  ],
   ["Switch",[
       {fieldType:FieldType.Choice,displayName:"Choice",config:{fieldUiType:FieldUiType.Choice}},
       {fieldType: FieldType.Boolean,displayName:"Boolean",config:{fieldUiType:FieldUiType.Boolean}},
       
      ]
    ],
   ["File",[
        {fieldType:FieldType.File,displayName:"File",config:{fieldUiType:FieldUiType.File}},
        {fieldType:FieldType.Image,displayName:"Image",config:{fieldUiType:FieldUiType.Image}},
      ]
    ]
])
// export const FieldTypeGroupLabel = new Map<string,string[]>([
//     ["Text",[
//           FieldType.Text,
//       ]
//     ],
//     ["Number",[
//       FieldType.Integer,
//       FieldType.Float,
//       FieldType.Double,
//       FieldType.Decimal,
//       FieldType.Percentage,
//       FieldType.Money,
//      ]
//    ],
//    ["Time",[
//         FieldType.Date,
//         FieldType.DateTime
//       ]
//     ],
//    ["Switch",[
//         FieldType.Choice,
//         FieldType.Boolean
//       ]
//     ],
//    ["File",[
//         FieldType.File,
//         FieldType.Image
//       ]
//     ]
// ])

export const StringFilterOperatorLabel = new Map<string, string>([
  [FilterOperator.eq, 'is'],
  [FilterOperator.neq, 'is not'],
  [FilterOperator.like, 'contain'],
  [FilterOperator.nlike, 'not contain']
]);
export const NumberFilterOperatorLabel = new Map<string, string>([
  [FilterOperator.eq, '='],
  [FilterOperator.neq, '!='],
  [FilterOperator.lt, '<'],
  [FilterOperator.lte, '<='],
  [FilterOperator.gt, '>'],
  [FilterOperator.gte, '>='],
]);
export const DateFilterOperatorLabel = new Map<string, string>([
  [FilterOperator.eq, 'is'],
  [FilterOperator.neq, 'is not'],
  [FilterOperator.lt, 'is before'],
  [FilterOperator.lte, 'is on or before'],
  [FilterOperator.gt, 'is after'],
  [FilterOperator.gte, 'is on or after'],
]);
export const ChoiceFilterOperatorLabel = new Map<string, string>([
  [FilterOperator.eq, 'is'],
  [FilterOperator.neq, 'is not'],
  [FilterOperator.in, 'is any of'],
  [FilterOperator.nin, 'is none of']
]);
export const BooleanFilterOperatorLabel = new Map<string, string>([
  [FilterOperator.eq, 'is'],
  [FilterOperator.neq, 'is not']
]);