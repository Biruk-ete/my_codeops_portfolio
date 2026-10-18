'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import './Account.css';

import { FaUser, FaSignOutAlt } from 'react-icons/fa';

export default function Account() {
    const { user, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login?from=/account');
        }
    }, [user, router]);

    if (!user) {
        return null;
    }

    return (
        <div className="account-page">
            <div className="container">

                {/* Header */}
                <div className="account-header">
                    <div>
                        <span className="account-label">YOUR MESOB ACCOUNT</span>
                        <h1>Welcome, {user?.name || 'Guest'}</h1>
                        <p>Manage your preferences and Mesob Feast Circle rewards.</p>
                    </div>
                    <button className="btn-logout" onClick={logout}>
                        <FaSignOutAlt /> Sign Out
                    </button>
                </div>

                {/* Profile Section */}
                <div className="account-content">
                    <div className="account-section">
                        <h2>Profile Settings</h2>
                        <p className="account-section-desc">
                            Update your preferences and delivery details.
                        </p>

                        <div className="profile-field">
                            <label>Full Name</label>
                            <input
                                type="text"
                                defaultValue={user?.name || ''}
                                readOnly
                            />
                        </div>

                        <div className="profile-field">
                            <label>Email Address</label>
                            <input
                                type="email"
                                defaultValue={user?.email || ''}
                                readOnly
                            />
                        </div>

                        <div className="profile-field">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                defaultValue="+251 911 234 567"
                                readOnly
                            />
                        </div>

                        <p className="profile-note">
                            Editing is coming soon. Contact our Bole concierge for urgent changes.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}