import { useState, useEffect } from 'react';
import { supabase } from '../supabase';

// Función para cargar los datos del perfil (sin cambios, ya es correcta)
const fetchProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('username, avatar_url') 
    .eq('id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error("Error al cargar perfil:", error.message);
    return null;
  }
  return  data;
};

export const useAuth = () => {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Función centralizada para actualizar la sesión y el perfil
    const updateSessionAndProfile = async (newSession) => {
        setSession(newSession);
        
        if (newSession) {
            // Si hay sesión, cargar perfil y actualizar
            const userProfile = await fetchProfile(newSession.user.id);
            setProfile(userProfile);
        } else {
            // Si no hay sesión (log out), limpiar el perfil
            setProfile(null);
        }
        setLoading(false);
    };

    const handleAuth = async () => {
      setLoading(true);

      // 1. Carga inicial de la sesión
      const { data: { session: initialSession } } = await supabase.auth.getSession();
      await updateSessionAndProfile(initialSession); // Usar la función centralizada aquí

      // 2. Escuchar cambios de autenticación
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
        // En los cambios de estado, también usamos la función centralizada
        updateSessionAndProfile(newSession); 
      });

      return () => {
        // Limpiar la suscripción
        if (subscription) {
            subscription.unsubscribe();
        }
      };
    };

    handleAuth();
  }, []); 

  return { session, profile, loading, user: session?.user };
};