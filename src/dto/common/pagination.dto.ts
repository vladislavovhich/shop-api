export interface IPaginationDto {
    page: number
    pageSize: number
    offset: number
}

export class PaginationDto implements IPaginationDto {
    declare page: number
    declare pageSize: number
    declare offset: number

    constructor(data: IPaginationDto) {
        this.page = data.page
        this.pageSize = data.pageSize
        this.offset = data.pageSize * (data.page - 1)
    }
}