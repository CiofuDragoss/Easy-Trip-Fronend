import { useState, useRef, useCallback, useContext, useEffect } from "react";

import { useApiWithRefresh } from "@/hooks/refreshHook";
import routes from "@/constants/routes";

const BASE_URL = routes.backend_base;
const WS_URL = `${BASE_URL}/ws/recommend`;

export function useRecommendWs({ MainQuestions, SecondaryQuestions }) {
  const { startWSRefresh } = useApiWithRefresh();
  const [responses, setResponses] = useState(null);
  const [updates, setUpdates] = useState({});
  const [connecting, setConnecting] = useState(false);
  const wsRef = useRef(null);
  const wsCountRef = useRef(0);
  const [error, setError] = useState(null);

  const stop = useCallback(() => {
    const ws = wsRef.current;
    if (
      ws &&
      (ws.readyState === WebSocket.OPEN ||
        ws.readyState === WebSocket.CONNECTING)
    ) {
      ws.close(1000, "Client closed");
    }
    wsRef.current = null;
    console.log("ws closed");
  }, []);
  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);
  const start = useCallback(async () => {
    if (wsRef.current || connecting) return;
    setConnecting(true);
    wsCountRef.current += 1;
    console.log("WS instances created so far:", wsCountRef.current);
    try {
      const ws = await startWSRefresh(WS_URL, (ws) => {
        ws.onopen = () => {
          ws.send(
            JSON.stringify({
              MainQuestions,
              SecondaryQuestions,
            })
          );
        };
      });
      ws.onmessage = (mes) => {
        try {
          const data = JSON.parse(mes.data);
          if (data.data) {
            console.log("am ajuns aiiciii boss");
            setResponses(data);
            stop();
          }
          setUpdates(data);
        } catch {
          setError("Probleme de comunicare cu serverul! Incearca din nou");
        }
      };

      ws.onerror = (e) => setError("Eroare: ", e.message);
      ws.onclose = (e) => {
        ws.onopen = ws.onmessage = ws.onerror = ws.onclose = null;
        wsRef.current = null;
      };
      wsRef.current = ws;
    } catch (err) {
      setError(err);
      console.warn("Nu pot deschide ws", err);
    } finally {
      setConnecting(false);
    }
  }, [startWSRefresh, MainQuestions, SecondaryQuestions]);

  return {
    start,
    stop,
    responses,
    error,
    updates,
    connecting,
  };
}
