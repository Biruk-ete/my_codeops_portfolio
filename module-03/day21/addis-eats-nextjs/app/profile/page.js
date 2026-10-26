import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import './ProfilePage.css';

export default async function ProfilePage() {
    const user = await getSession();

    if (!user) {
        redirect('/login?next=/profile');
    }

    return (
        <div className="profile-wrapper">
            <div className="profile-card">
                <h1>My Mesob Profile</h1>

                <div className="profile-info">
                    <div className="info-row">
                        <span className="info-label">Full Name</span>
                        <span className="info-value">{user.name}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Email Address</span>
                        <span className="info-value">{user.email}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Account Role</span>
                        <span className="info-value" style={{ textTransform: 'capitalize' }}>
                            {user.role}
                        </span>
                    </div>
                </div>

                <p className="profile-note">
                    To update your details or manage payment methods, please contact our Bole concierge.
                </p>
            </div>
        </div>
    );
}