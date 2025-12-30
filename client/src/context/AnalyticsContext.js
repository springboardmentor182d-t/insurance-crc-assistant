import React, { createContext, useContext, useState } from 'react';

const AnalyticsContext = createContext();

export const AnalyticsProvider = ({ children }) => {
    const [events, setEvents] = useState([]);

    const trackEvent = (eventName, data) => {
        const newEvent = { eventName, data, timestamp: new Date().toISOString() };
        setEvents(prev => [...prev, newEvent]);
        console.log('[Analytics]:', eventName, data);
    };

    return (
        <AnalyticsContext.Provider value={{ trackEvent, events }}>
            {children}
        </AnalyticsContext.Provider>
    );
};

export const useAnalytics = () => useContext(AnalyticsContext);
