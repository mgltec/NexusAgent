import { NgClass } from "@angular/common";
import { Params } from "@angular/router";

export interface IResponsiveTableConfig {
    
}

export interface IResponsiveTableColumn {
    key?: string;
    value?: (item: any) => any;
    label?: string;
    pipe?: (value: any) => string | null;
    template?: (item: any) => string;
    
    totalsKey?: string;
    totalsValue?: (item: any) => any;
    totalsLabel?: string;
    totalsPipe?: (value: any) => string | null;

    title: string;
    frozen?: boolean;
    classes?: (value: any, item: any) => string;
    cellClasses?: string;
    
    route?: (item: any) => any[] | string | null | undefined;
    params?: (item: any) => Params | null | undefined;
    
}