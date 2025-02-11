import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
    override itemsPerPageLabel = 'Item Per page:';
    override nextPageLabel = 'Next';
    override previousPageLabel = 'Previous';
    override firstPageLabel = 'First';
    override lastPageLabel = 'Last';

    override getRangeLabel = (
        page: number,
        pageSize: number,
        length: number
    ): string => {
        if (length === 0 || pageSize === 0) {
            return `0 of ${length}`;
        }
        const startIndex = page * pageSize;
        const endIndex =
            startIndex < length
                ? Math.min(startIndex + pageSize, length)
                : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} of ${length}`;
    };
}
