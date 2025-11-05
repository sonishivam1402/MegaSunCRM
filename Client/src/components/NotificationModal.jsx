import React, { useState, useEffect } from 'react';
import { Bell, X, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { getNotify, markAllNotifyAsRead, markNotifyAsRead } from '../api/notificationApi';
import { useEscapeKey } from '../utils/useEscapeKey';

const NotificationModal = ({ isOpen, onClose, onUnreadCountChange }) => {

    const [notifications, setNotifications] = useState([]);

    useEscapeKey(() => {
        if (isOpen) onClose();
    });

    const getNotifications = async () => {
        try {
            const data = await getNotify();
            setNotifications(data.data);
        } catch (err) {
            console.error("Error fetching notifications:", err);
        }
    }

    useEffect(() => {
        getNotifications();
        const interval = setInterval(getNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const unreadCount = notifications.filter(n => !n.IsRead).length;
        if (onUnreadCountChange) {
            onUnreadCountChange(unreadCount);
        }
    }, [notifications, onUnreadCountChange]);

    const markAsRead = async (id) => {
        const res = await markNotifyAsRead(id);
        if (res.status === 200) {
            getNotifications();
        } else {
            console.error("Error marking notification as read");
        }
    };

    const markAllAsRead = async () => {
        const notifyIds = notifications.map(n => n.LogID);
        const res = await markAllNotifyAsRead({ notifyIds });
        if (res.status === 200) {
            getNotifications();
            onClose();
        } else {
            console.error("Error marking notifications as read");
        }
    };

    const unreadCount = notifications.filter(n => !n.IsRead).length;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-start justify-end pt-14 z-50 pr-23">
            <div className="border bg-[#f1f0e9] shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col mx-4">
                {/* Header */}
                <div className="flex items-center justify-between py-2 px-6 border-b">
                    <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-gray-700" />
                        <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
                        {unreadCount > 0 && (
                            <span className="px-3 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full">
                                {unreadCount} new
                            </span>
                        )}
                    </div>

                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Notifications List */}
                <div className="flex-1 overflow-y-auto">
                    {notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                            <Bell className="w-16 h-16 mb-4 opacity-50" />
                            <p className="text-lg">No notifications</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-[#1919194d]">
                            {notifications.map((notification) => (
                                <div
                                    key={notification.LogID}
                                    className={`px-6 py-4 hover:bg-gray-50 transition-color`}
                                >
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4 mb-2">
                                                <h3 className="font-semibold text-gray-600">
                                                    {notification.RenderedSubject}
                                                </h3>

                                                {!notification.IsRead && ( // Fixed
                                                    <button
                                                        onClick={() => markAsRead(notification.LogID)}
                                                        className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                                                    >
                                                        Mark as read
                                                    </button>
                                                )}
                                            </div>

                                            <p className="text-gray-600 text-sm">
                                                {notification.RenderedMessage}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                {unreadCount > 0 && (
                    <div className="p-4 border-t text-center">
                        <button
                            onClick={markAllAsRead}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Mark all as read
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationModal;