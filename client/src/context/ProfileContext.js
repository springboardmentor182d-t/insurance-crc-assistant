import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ProfileContext = createContext(null);
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null); // ❌ no fake data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    axios
      .get(`${BASE_URL}/api/profile/1`)
      .then((res) => {
        if (!isMounted) return;

        setProfile({
          name: res.data.name,
          avatar: res.data.avatar
            ? `${BASE_URL}${res.data.avatar}`
            : null,
        });
        setLoading(false);
      })
      .catch(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false; // ✅ StrictMode safe
    };
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, loading, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
