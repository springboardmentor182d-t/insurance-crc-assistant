import { createContext, useContext, useState, useEffect } from "react";
import api from "../api";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [token, setToken] = useState(
  localStorage.getItem("access_token")
);
const [role, setRole] = useState(
  localStorage.getItem("role")
);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = (accessToken, userRole) => {
    setToken(accessToken);
    setRole(userRole);
  };

  const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("role");
  setToken(null);
  setRole(null);
  setProfile(null);
};


  // 🔥 AUTO LOAD PROFILE AFTER LOGIN
  useEffect(() => {
    if (!token) return;

    setLoading(true);

    api
      .get("/api/profile")
      .then((res) => {
        const avatar = res.data?.avatar
          ? res.data.avatar.startsWith("http")
            ? res.data.avatar
            : process.env.REACT_APP_API_BASE_URL + res.data.avatar
          : null;

        setProfile({
          ...res.data,
          avatar,
        });
      })
      .catch(() => setProfile(null))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <ProfileContext.Provider
      value={{
        token,
        role,
        profile,
        setProfile,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
