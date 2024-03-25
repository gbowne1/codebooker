import { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';

const useAxios = (
    config,
    initialState = { response: null, error: null, loading: true }
) => {
    const [response, setResponse] = useState(initialState.response);
    const [error, setError] = useState(initialState.error);
    const [loading, setLoading] = useState(initialState.loading);

    // Use useMemo to avoid unnecessary reruns
    const axiosConfig = useMemo(
        () => ({
            ...config,
        }),
        [config]
    );

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const result = await axios(axiosConfig);
            setResponse(result.data);
            setError(null);
        } catch (err) {
            setError(err.message);
            setResponse(null);
        } finally {
            setLoading(false);
        }
    }, [axiosConfig]);

    useEffect(() => {
        const source = axios.CancelToken.source();
        axiosConfig.cancelToken = source.token;

        fetchData();

        // Cancel the request if component unmounts
        return () => source.cancel('Axios request canceled.');
    }, [fetchData, axiosConfig]);

    return { response, error, loading, refetch: fetchData };
};

export default useAxios;

/* Examples of usage */

// Example Usage for a POST Request
// function PostCommentForm() {
//     const [comment, setComment] = useState('');
//     const { response, error, loading, refetch } = useAxios({
//         url: '/api/comments',
//         method: 'post',
//         data: { comment },
//     }, { loading: false }); // Prevents automatic fetching

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         refetch(); // Trigger the POST request manually
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
//             <button type="submit">Submit Comment</button>
//             {loading && <p>Submitting...</p>}
//             {error && <p>Error: {error}</p>}
//             {response && <p>Comment submitted successfully!</p>}
//         </form>
//     );
// }

// Example Usage for a GET Request with dynamic params
// function UserDetails({ userId }) {
//     const { response, error, loading, refetch } = useAxios({
//         url: `/api/users/${userId}`,
//         method: 'get',
//     }, { loading: false }); // Initially prevents fetching

//     useEffect(() => {
//         if (userId) {
//             refetch(); // Refetch user details when userId changes
//         }
//     }, [userId, refetch]);

//     if (loading) return <p>Loading user details...</p>;
//     if (error) return <p>Error fetching user details: {error}</p>;

//     return (
//         <div>
//             <h3>User Details</h3>
//             <p>Name: {response?.name}</p>
//             <p>Email: {response?.email}</p>
//         </div>
//     );
// }
