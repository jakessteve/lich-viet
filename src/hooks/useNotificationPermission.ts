// ══════════════════════════════════════════════════════════
// useNotificationPermission — Notification API wrapper
// ══════════════════════════════════════════════════════════
// Manages browser notification permission state and provides
// helpers to request permission and send test notifications.
// This is the client-side prep for the Push Notification Engine.
//
// NOTE: Full push notifications require a service worker +
// server-side push subscription management (Phase 2.3 server).

import { useState, useCallback, useEffect } from 'react';

type PermissionState = 'default' | 'granted' | 'denied' | 'unsupported';

interface NotificationPermissionInfo {
    /** Current permission state */
    permission: PermissionState;
    /** Whether notifications are available and granted */
    isGranted: boolean;
    /** Whether the browser supports notifications */
    isSupported: boolean;
    /** Request notification permission from the user */
    requestPermission: () => Promise<boolean>;
    /** Send a local test notification (no server needed) */
    sendTestNotification: (title: string, body: string) => void;
}

/**
 * Hook to manage browser Notification API permission.
 * Returns current state and helpers for requesting access.
 */
export function useNotificationPermission(): NotificationPermissionInfo {
    const isSupported = typeof window !== 'undefined' && 'Notification' in window;

    const [permission, setPermission] = useState<PermissionState>(() => {
        if (!isSupported) return 'unsupported';
        return Notification.permission as PermissionState;
    });

    // Listen for external permission changes
    useEffect(() => {
        if (!isSupported || !('permissions' in navigator)) return;

        let permStatus: PermissionStatus | null = null;
        const handleChange = () => {
            setPermission(Notification.permission as PermissionState);
        };

        navigator.permissions.query({ name: 'notifications' as PermissionName }).then((status) => {
            permStatus = status;
            status.addEventListener('change', handleChange);
            // Immediate sync
            setPermission(Notification.permission as PermissionState);
        }).catch(() => {
            // Some browsers don't support permissions.query for notifications
        });

        return () => {
            if (permStatus) permStatus.removeEventListener('change', handleChange);
        };
    }, [isSupported]);

    const requestPermission = useCallback(async (): Promise<boolean> => {
        if (!isSupported) return false;
        if (Notification.permission === 'granted') return true;
        if (Notification.permission === 'denied') return false;

        try {
            const result = await Notification.requestPermission();
            setPermission(result as PermissionState);
            return result === 'granted';
        } catch {
            return false;
        }
    }, [isSupported]);

    const sendTestNotification = useCallback((title: string, body: string) => {
        if (!isSupported || Notification.permission !== 'granted') return;
        new Notification(title, {
            body,
            icon: '/icons/icon-192x192.png',
            badge: '/icons/icon-72x72.png',
            tag: 'lich-viet-test',
        });
    }, [isSupported]);

    return {
        permission,
        isGranted: permission === 'granted',
        isSupported,
        requestPermission,
        sendTestNotification,
    };
}
