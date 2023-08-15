export type ListConfig = {

}

export type CalendarConfig = {
    dateFieldId: number
    titleId: number
}

export type KanbanConfig = {
    boardColumnId: number
    orderColumnId: number
    titleId: number
}

export type GalleryConfig = {
    avatarId: number
    nameId: number
    importanceId: number
    descriptionId: number
}

export type TimelineConfig = {
    titleId: number
    colorId: number
    levelId: number
    fromId: number
    toId: number
}

export type GanttConfig = {
    titleId: number
    colorId: number
    levelId: number
    fromId: number
    toId: number
}

export type MapConfigLacation = {
    latId: number
    lngId: number
    locationId: never
    titleId: number
}

export type MapConfigField = {
    latId: never
    lngId: never
    locationId: number
    titleId: number
}

export type MapConfig = MapConfigLacation | MapConfigField