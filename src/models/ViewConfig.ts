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
    imageId: number
    titleId: number
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