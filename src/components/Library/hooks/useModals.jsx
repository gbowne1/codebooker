import { useState } from 'react';

export const useModals = () => {
    const [notifications, setNotifications] = useState({
        isDeleted: false,
        isAdded: false,
        blankEntry: false,
        showSnackBar: false,
        removedItemName: '',
        bookUploadError: ''
    });

    const [modalsState, setModalsState] = useState({
        showModal: false,
        showReviewModal: false,
        enableReviewModal: false,
        isLibraryModalOpen: false,
        addToPersonalLibraryMessage: null
    });

    const [reviewState, setReviewState] = useState({
        bookName: '',
        bookReview: '',
        rating: 0,
        book: {}
    });

    const modalActions = {
        handleModalBox: (show) => setModalsState(prev => ({ ...prev, showModal: show })),
        handleReviewModal: (show) => setModalsState(prev => ({ ...prev, showReviewModal: show })),
        setEnableReviewModal: (show) => setModalsState(prev => ({ ...prev, enableReviewModal: show })),
        setIsLibraryModalOpen: (show) => setModalsState(prev => ({ ...prev, isLibraryModalOpen: show }))
    };

    const handleBookReview = (review) => {
        setReviewState(prev => ({
            ...prev,
            bookReview: review
        }));
    };

    const onPointerMove = (value) => {
        setReviewState(prev => ({
            ...prev,
            rating: value
        }));
    };

    return {
        notifications,
        modalsState,
        modalActions,
        reviewState,
        handleBookReview,
        onPointerMove
    };
};