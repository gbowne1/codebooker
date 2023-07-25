import { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function BookDetails({ bookId }) {
    const [bookDetails, setBookDetails] = useState(null);

    const getBookDetails = useCallback(async () => {
        try {
            // make API call to fetch book details
            const response = await fetch(`/api/books/${bookId}`);
            const data = await response.json();
            // set book details in state
            setBookDetails(data);
        } catch (error) {
            // handle error
            console.error(error);
        }
    }, [bookId, setBookDetails]);

    // call getBookDetails when component mounts
    useEffect(() => {
        getBookDetails();
    }, [getBookDetails]);

    return (
        <div>
            {bookDetails ? (
                <div>
                    <h2>{bookDetails.title}</h2>
                    <p>Author: {bookDetails.author}</p>
                    <p>Genre: {bookDetails.genre}</p>
                    <p>Description: {bookDetails.description}</p>
                </div>
            ) : (
                <p>Loading book details...</p>
            )}
        </div>
    );
}

BookDetails.propTypes = {
    bookId: PropTypes.number,
};
export default BookDetails;
