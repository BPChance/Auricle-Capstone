import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/components/AuthProvider";
import db from "@/lib/db";

export function useAccuracy() {
  const { session } = useAuth();
  const [accuracy, setAccuracy] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const userId = session?.user?.id;

  const fetchAccuracy = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const stats = await db.accuracy.getUserAccuracy(userId);
      setAccuracy(stats);
    } catch (err) {
      console.error("Failed to fetch accuracy:", err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchAccuracy();
  }, [fetchAccuracy]);

  return { accuracy, loading, refetch: fetchAccuracy };
}

export function useCategoryAccuracy(category: "notes" | "chords" | "intervals") {
  const { session } = useAuth();
  const [accuracy, setAccuracy] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const userId = session?.user?.id;

  const fetchAccuracy = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const stats = await db.accuracy.getCategoryAccuracy(userId, category);
      setAccuracy(stats);
    } catch (err) {
      console.error("Failed to fetch category accuracy:", err);
    } finally {
      setLoading(false);
    }
  }, [userId, category]);

  useEffect(() => {
    fetchAccuracy();
  }, [fetchAccuracy]);

  return { accuracy, loading, refetch: fetchAccuracy };
}