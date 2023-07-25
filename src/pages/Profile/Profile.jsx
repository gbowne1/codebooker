import React from 'react';
import { useParams } from 'react-router';

function Profile() {
    const { uid } = useParams();
    return <div>{uid}</div>;
}

export default Profile;
