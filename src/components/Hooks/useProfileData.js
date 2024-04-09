import axios from 'axios';
import { useMemo, useState } from 'react';

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
    useMemo(() => {
        getProfileDataFromDB();
    }, []);
    return { loading, profileData };
};

export default useProfileData;
