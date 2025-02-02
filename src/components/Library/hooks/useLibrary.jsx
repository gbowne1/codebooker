import { useState, useEffect } from 'react';
import { orderBy } from 'lodash';
import axios from 'axios';

export const useLibrary = (filter, setFilter) => {
    const [myRows, setMyRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sortOrder, setSortOrder] = useState(false);
    const [sortingColumn, setSortingColumn] = useState('');

    const handleSort = (columnName, order) => {
        const sortConfig = {
            title: 'title',
            author: 'author',
            category: 'category',
            publisher: 'publisher',
            year: 'year',
            ISBN: 'ISBN',
            edition: 'edition'
        };

        if (sortConfig[columnName]) {
            const sortedRows = orderBy(myRows, [sortConfig[columnName]], [order]);
            setMyRows(sortedRows);
        }
    };

    const removeBookByName = async (row) => {
        try {
            setLoading(true);
            const response = await axios.delete(
                `http://localhost:3001/api/books/${row._id}`,
                {
                    data: {
                        bookId: row._id,
                        userId: row.userId,
                        userEmail: JSON.parse(localStorage.getItem('user')).email,
                    },
                }
            );
            if (response.status === 200) {
                fetchBooksFromDB();
            }
        } catch (err) {
            console.error('Error removing book:', err);
        } finally {
            setLoading(false);
        }
    };

    const addItemToTable = async (bookData) => {
        try {
            setLoading(true);
            const response = await axios.post(
                'http://localhost:3001/api/books/newbook',
                { bookObj: bookData }
            );
            if (response.status === 200) {
                fetchBooksFromDB();
                return true;
            }
        } catch (err) {
            console.error('Error adding book:', err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const addBookToPersonalLibrary = async (book) => {
        try {
            const response = await axios.post(
                'http://localhost:3001/api/books/add-book-to-personal-library',
                { book }
            );
            return response.data.payload;
        } catch (error) {
            console.error('Error adding to personal library:', error);
            return null;
        }
    };

    const fetchBooksFromDB = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3001/api/books/getall');
            setMyRows(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooksFromDB();
    }, []);

    useEffect(() => {
        if (filter) {
            const filteredRows = myRows.filter(
                (row) =>
                    row.title.includes(filter) ||
                    (row.category && row.category.includes(filter)) ||
                    row.author.includes(filter)
            );
            setMyRows(filteredRows.length > 0 ? filteredRows : myRows);
        }

        return () => {
            setMyRows([]);
            setFilter('');
        };
    }, [filter, setFilter]);

    return {
        myRows,
        loading,
        handleSort,
        sortOrder,
        sortingColumn,
        setSortOrder,
        setSortingColumn,
        removeBookByName,
        addItemToTable,
        addBookToPersonalLibrary
    };
};