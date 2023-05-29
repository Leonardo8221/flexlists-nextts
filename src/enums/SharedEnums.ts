export enum ListCategory {
    Content = 'Content',
    Events = 'Events',
    HRRecruiting = 'HRRecruiting',
    Marketing = 'Marketing',
    Communications = 'Communications',
    Design = 'Design',
    ProjectManagement = 'ProjectManagement',
    RemoteWork = 'RemoteWork',
    SalesCustomers = 'SalesCustomers',
    SoftwareDevelopment = 'SoftwareDevelopment',
}
export enum Errors {
    NotAUser = 'NotAUser',
    InvalidCredentials = 'InvalidCredentials',
    InvalidViewId = 'InvalidViewId',
    NotImplemented = 'NotImplemented',
}
export enum Role {
    FullAccess = 'FullAccess',
    ReadEdit = 'ReadEdit',
    ReadOnly = 'ReadOnly',
    AddOnly = 'AddOnly',
    ReadAdd = 'ReadAdd',
    None = 'None',
}
export enum FieldType {
    Text = 'Text',
    Integer = 'Integer',
    Decimal = 'Decimal',
    Date = 'Date',
    Time = 'Time',
    DateTime = 'DateTime',
    Money = 'Money',
    Boolean = 'Boolean',
    File = 'File',
    Image = 'Image',
}
export enum SearchType {
    List = 'List',
    AllLists = 'AllLists',
    Site = 'Site',
    All = 'All',
}
export enum ImportTypes {
    CSV = 'CSV',
    Excel = 'Excel',
    JSON = 'JSON',
    YAML = 'YAML',
    SQLite = 'SQLite',
}
export enum ExportTypes {
    CSV = 'CSV',
    Excel = 'Excel',
    JSON = 'JSON',
    YAML = 'YAML',
    SQLite = 'SQLite',
}
export enum ViewType {
    List = 'List',
    Calendar = 'Calendar',
    Kanban = 'Kanban',
    TimeLine = 'TimeLine',
    Gallery = 'Gallery',
    Map = 'Map',
}
export enum PublishType {
    HTML = 'HTML',
    JS = 'JS',
    RSS = 'RSS',
    JSON = 'JSON',
    JSIframe = 'JSIframe',
}