import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ProfileContext = createContext();
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/profile/1`);
      setProfile(res.data);
    } catch (err) {
      console.error("Profile load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        setProfile,
        reloadProfile: loadProfile, // 🔥 IMPORTANT
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
