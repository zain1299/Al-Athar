import { MatPaginatorIntl } from '@angular/material/paginator';

export class CustomMatPaginatorIntl extends MatPaginatorIntl {
    override itemsPerPageLabel = 'العناصر لكل صفحة :';
    override nextPageLabel = 'Next';
    override previousPageLabel = 'Previous';
    override firstPageLabel = 'First';
    override lastPageLabel = 'Last';

    // Optionally, you can customize the range label as well
    override getRangeLabel = function (
        page: number,
        pageSize: number,
        length: number
    ): string {
        if (length === 0 || pageSize === 0) {
            return `0 of ${length}`;
        }
        const startIndex = page * pageSize;
        // If the start index exceeds the list length, do not try and fix the end index to the length
        const endIndex =
            startIndex < length
                ? Math.min(startIndex + pageSize, length)
                : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} of ${length}`;
    };
}
