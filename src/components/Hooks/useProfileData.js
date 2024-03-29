import { useEffect, useState } from 'react';
import axios from 'axios';

const useProfileData = () => {
    const [loading, setLoading] = useState(false);
    const [profileData, setProfileData] = useState(null);

    const getProfileDataFromDB = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                'http://localhost:3001/api/profile/get-profile'
            );
            if (response.status === 200) {
                setProfileData(response.data);
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getProfileDataFromDB();
    }, []);
    return { loading, profileData };
};

export default useProfileData;
