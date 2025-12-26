import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ProfileContext = createContext(null);

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    avatar: null,
  });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/profile/1")
      .then((res) => {
        if (!res.data) return;

        setProfile({
          name: res.data.name || "John Doe",
          avatar: res.data.avatar
            ? "http://127.0.0.1:8000" + res.data.avatar
            : null,
        });
      })
      .catch(() => {});
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
