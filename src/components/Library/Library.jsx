import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { CircularProgress } from '@mui/material';
import AddBookButton from './components/AddBookButton';
import BooksTable from './components/BooksTable';
import { useLibrary } from './hooks/useLibrary';
import { useModals } from './hooks/useModals';
import { 
  AddBookModal, 
  ReviewModal, 
  ReadReviewModal, 
  LibraryAddModal 
} from './components/Modals';
import NotificationSnackbar from './components/NotificationSnackbar';

export default function Library({ filter, setFilter }) {
    const { t } = useTranslation();
    const {
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
    } = useLibrary(filter, setFilter);

    const {
        notifications,
        modalsState,
        modalActions,
        reviewState,
        handleBookReview,
        onPointerMove
    } = useModals();

    if (!myRows.length) {
        return (
            <div className="skeleton">
                <CircularProgress />
            </div>
        );
    }

    return (
        <>
            <NotificationSnackbar notifications={notifications} />
            
            <AddBookModal
                isOpen={modalsState.showModal}
                onClose={modalActions.handleModalBox}
                onSubmit={addItemToTable}
            />

            <ReviewModal
                isOpen={modalsState.showReviewModal}
                onClose={modalActions.handleReviewModal}
                bookName={reviewState.bookName}
                bookReview={reviewState.bookReview}
                rating={reviewState.rating}
                onReviewChange={handleBookReview}
                onPointerMove={onPointerMove}
            />

            <ReadReviewModal
                isOpen={modalsState.enableReviewModal}
                onClose={modalActions.setEnableReviewModal}
                book={reviewState.book}
            />

            <LibraryAddModal
                isOpen={modalsState.isLibraryModalOpen}
                onClose={modalActions.setIsLibraryModalOpen}
                message={modalsState.addToPersonalLibraryMessage}
            />

            <BooksTable
                rows={myRows}
                loading={loading}
                sortOrder={sortOrder}
                sortingColumn={sortingColumn}
                onSort={handleSort}
                onRemoveBook={removeBookByName}
                onAddToLibrary={addBookToPersonalLibrary}
                onOpenReviewModal={modalActions.handleReviewModal}
                onOpenReadReviewModal={modalActions.setEnableReviewModal}
            >
                <AddBookButton onClick={() => modalActions.handleModalBox(true)} />
            </BooksTable>
        </>
    );
}

Library.propTypes = {
    filter: PropTypes.string,
    setFilter: PropTypes.func,
};