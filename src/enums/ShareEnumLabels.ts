import { FieldType, ListCategory, Role } from "./SharedEnums";

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
export const FieldTypeGroupLabel = new Map<string,string[]>([
    ["Text",[
          FieldType.Text,
      ]
    ],
    ["Number",[
      FieldType.Integer,
      FieldType.Float,
      FieldType.Double,
      FieldType.Decimal,
      FieldType.Percentage,
      FieldType.Money,
     ]
   ],
   ["Time",[
        FieldType.Date,
        FieldType.DateTime
      ]
    ],
   ["Switch",[
        FieldType.Choice,
        FieldType.Boolean
      ]
    ],
   ["File",[
        FieldType.File,
        FieldType.Image
      ]
    ]
])