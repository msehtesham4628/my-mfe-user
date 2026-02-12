import React, { useEffect, useState } from 'react';
import './index.css';

interface UserDashboardProps {
    token: string;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ token }) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!token) return;

        fetch('http://localhost:4000/api/user/data', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch user data');
                return res.json();
            })
            .then((data) => setData(data))
            .catch((err) => setError(err.message));
    }, [token]);

    return (
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="px-4 py-5 sm:px-6 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-900/30">
                <h3 className="text-lg leading-6 font-medium text-blue-800 dark:text-blue-200">
                    User Dashboard (MFE-B)
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-blue-600 dark:text-blue-300">
                    Your personal activity feed.
                </p>
            </div>
            <div className="px-4 py-5 sm:p-6">
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                {data ? (
                    <div>
                        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Recent Activities</h4>
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            {data.activities?.map((activity: string, index: number) => (
                                <li key={index} className="py-4 flex items-center">
                                    <span className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 mr-3">
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </span>
                                    <span className="text-gray-700 dark:text-gray-300">{activity}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6">
                            <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-auto text-xs text-gray-800 dark:text-gray-300">
                                {JSON.stringify(data, null, 2)}
                            </pre>
                        </div>
                    </div>
                ) : (
                    <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-4 py-1">
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDashboard;

