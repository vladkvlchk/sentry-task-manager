"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ErrorTrigger() {
  const [count, setCount] = useState(0);

  const triggerClientError = () => {
    // Intentional client-side error
    throw new Error("Intentional client-side error for testing");
  };

  const triggerAsyncError = async () => {
    try {
      // Simulate async operation that fails
      await new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Async operation failed")), 1000);
      });
    } catch (error) {
      console.error("Async error:", error);
      throw error;
    }
  };

  const triggerNetworkError = async () => {
    try {
      const response = await fetch("/api/nonexistent-endpoint");
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const triggerTypeError = () => {
    // Intentional type error
    const obj = null;
    // @ts-expect-error
    console.log(obj.property.value);
  };

  const triggerRangeError = () => {
    // Intentional range error
    const arr = new Array(-1);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Error Testing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          variant="destructive"
          size="sm"
          className="w-full"
          onClick={triggerClientError}
        >
          Trigger Client Error
        </Button>
        <Button
          variant="destructive"
          size="sm"
          className="w-full"
          onClick={triggerAsyncError}
        >
          Trigger Async Error
        </Button>
        <Button
          variant="destructive"
          size="sm"
          className="w-full"
          onClick={triggerNetworkError}
        >
          Trigger Network Error
        </Button>
        <Button
          variant="destructive"
          size="sm"
          className="w-full"
          onClick={triggerTypeError}
        >
          Trigger Type Error
        </Button>
        <Button
          variant="destructive"
          size="sm"
          className="w-full"
          onClick={triggerRangeError}
        >
          Trigger Range Error
        </Button>
      </CardContent>
    </Card>
  );
}
