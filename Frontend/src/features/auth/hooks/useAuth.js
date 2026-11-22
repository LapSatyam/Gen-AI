import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, logout, profile, register } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);

  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login({ email, password });

      setUser(data.user);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const { data } = await register({ username, email, password });

      setUser(data.user);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getAndSerUser = async () => {
      const { user } = await profile();
      setUser(user);

      setLoading(false);
    };

    getAndSerUser();
  }, []);

  return { user, loading, handleLogin, handleLogout, handleRegister };
};
