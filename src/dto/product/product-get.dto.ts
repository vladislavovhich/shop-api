import { Literal } from "sequelize/types/utils";
import { IPaginationDto, PaginationDto } from "../common/pagination.dto";

export type Fields = [string | Literal, string | undefined][]

export interface ISortField {
    fieldName: string
    fieldOrder: string
}

export interface IFilterField {
    fieldName: string
    fieldValue: string
}

export interface IProductGetDto extends IPaginationDto {
    sortFields: Fields
    filterFields: Fields
}

export class ProductGetDto extends PaginationDto implements IProductGetDto {
    public sortFields: Fields;
    public filterFields: Fields;

    constructor(data: IProductGetDto) {
        super(data)

        this.sortFields = data.sortFields
        this.filterFields = data.filterFields
    }
}