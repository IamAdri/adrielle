"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "../_lib/supabase";
/*
export function useRealTimeSubscription({ onChange }) {
  //Update cart items when making changes in items table

  useEffect(() => {
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
          return onChange(payload.new);
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
          return onChange(payload.new);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [onChange, supabase]);
}*/

export function useRealTimeSubscription({ onChange, channelName }) {
  const [isMounted, setIsMounted] = useState(false);
  //Update cart items when making changes in items table
  useEffect(() => {
    // Wait until client render is finished to avoid hydration mismatch
    setIsMounted(true);
  }, []);
  // const subscribedRef = useRef(false);
  // const channelRef = useRef(null);
  useEffect(() => {
    if (!isMounted) return;
    //  if (subscribedRef.current) return;
    //  subscribedRef.current = true;
    console.log("MOUNT");
    const channel = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "items",
        },
        (payload) => {
          console.log(payload);
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
          console.log(payload);
          return onChange(payload);
        }
      )
      .subscribe((status) => {
        console.log("FAV SUB STATUS:", status);
        //     if (status === "SUBSCRIBED") {
        //       subscribedRef.current = true;
        //    }
      });
    // channelRef.current = channel;
    return () => {
      supabase.removeChannel(channel);
      //  if (channelRef.current && subscribedRef.current) {
      //    supabase.removeChannel(channelRef.current);
      //     subscribedRef.current = false;
      //     channelRef.current = null;
      //   }
    };
  }, [onChange]);
}
