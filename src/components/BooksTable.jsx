import React from 'react';
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    TableSortLabel,
    Paper
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import BookTableRow from './BookTableRow';

const BooksTable = ({
    rows,
    loading,
    sortOrder,
    sortingColumn,
    onSort,
    onRemoveBook,
    onAddToLibrary,
    onOpenReviewModal,
    onOpenReadReviewModal,
    children
}) => {
    const { t } = useTranslation();
    const columns = [
        { id: 'title', label: 'title' },
        { id: 'author', label: 'author' },
        { id: 'category', label: 'category' },
        { id: 'publisher', label: 'publisher' },
        { id: 'ISBN', label: 'isbn' },
        { id: 'year', label: 'year' },
        { id: 'edition', label: 'edition' }
    ];

    return (
        <TableContainer style={{ marginTop: 80, marginInline: 10 }} component={Paper}>
            <Table sx={{ minWidth: 750 }} size="medium">
                <TableHead>
                    <TableRow>
                        <TableCell>{t('home.headings.action')}</TableCell>
                        {columns.map((column) => (
                            <TableCell key={column.id} align="center">
                                <TableSortLabel
                                    active={sortingColumn === column.id}
                                    direction={sortOrder ? 'desc' : 'asc'}
                                    onClick={() => onSort(column.id, sortOrder ? 'asc' : 'desc')}
                                >
                                    {t(`home.headings.${column.label}`)}
                                </TableSortLabel>
                            </TableCell>
                        ))}
                        <TableCell align="center">{t('home.headings.review')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {children}
                    {rows.map((row, idx) => (
                        <BookTableRow
                            key={row.title}
                            row={row}
                            index={idx}
                            onRemove={onRemoveBook}
                            onAddToLibrary={onAddToLibrary}
                            onOpenReviewModal={onOpenReviewModal}
                            onOpenReadReviewModal={onOpenReadReviewModal}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default BooksTable;