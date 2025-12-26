"use client";

import { useEffect, useRef } from "react";
import { supabase } from "../_lib/supabase";

export function useRealTimeSubscription({ onChange }) {
  //Update cart items when making changes in items table
  const subscribedRef = useRef(false);
  const channelRef = useRef(null);
  useEffect(() => {
    if (subscribedRef.current) return;
    subscribedRef.current = true;
    console.log("MOUNT");
    const channel = supabase
      .channel("items")
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "items",
        },
        (payload) => {
          // console.log(payload);
          return onChange(payload);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "items",
        },
        (payload) => {
          // console.log(payload);
          return onChange(payload);
        }
      )
      .subscribe((status) => {
        console.log("FAV SUB STATUS:", status);
        if (status === "SUBSCRIBED") {
          subscribedRef.current = true;
        }
      });
    channelRef.current = channel;
    return () => {
      if (channelRef.current && subscribedRef.current) {
        supabase.removeChannel(channelRef.current);
        subscribedRef.current = false;
        channelRef.current = null;
      }
    };
  }, [onChange]);
}
