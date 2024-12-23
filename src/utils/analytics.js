import { analytics } from '../firebase/config';

export const trackEvent = (eventName, properties) => {
  analytics.logEvent(eventName, {
    timestamp: new Date().toISOString(),
    ...properties
  });
};

export const trackPageView = (page) => {
  analytics.logEvent('page_view', {
    page_title: page,
    timestamp: new Date().toISOString()
  });
}; 