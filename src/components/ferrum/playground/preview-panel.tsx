// Type-strict compliance: fixed noUncheckedIndexedAccess
"use client";

import { useRef, useEffect } from "react";
import { resolveIcon } from "@/lib/icon-resolver";
import { DEVICES } from "../playground-v2-data";

/* —— Live Preview —— */
export function LivePreview({
  html,
  device,
  customWidth,
  onDeviceChange,
}: {
  html: string;
  device: string;
  customWidth: number;
  onDeviceChange: (d: string) => void;
}) {
  const deviceInfo = DEVICES.find((d) => d.id === device) ?? DEVICES[0]!;
  const width = device === "custom" ? customWidth : deviceInfo.width;
  const height = device === "custom" ? 600 : Math.min(deviceInfo.height, 800);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = html;
    }
  }, [html]);

  return (
    <div className="flex-1 flex flex-col bg-foreground/[0.005] min-h-0">
      {/* Preview toolbar */}
      <div className="flex items-center justify-between border-b border-border px-3 h-10 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <span className="text-[11px] text-muted-foreground/40 ml-2">Preview</span>
        </div>
        <div className="flex items-center gap-1">
          {DEVICES.map((d) => {
            const Icon = resolveIcon(d.icon);
            return (
              <button
                key={d.id}
                onClick={() => onDeviceChange(d.id)}
                title={`${d.label} (${d.width}px)`}
                className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${
                  device === d.id
                    ? "bg-foreground/[0.08] text-foreground"
                    : "text-muted-foreground/40 hover:text-foreground/60 hover:bg-foreground/[0.04]"
                }`}
              >
                <Icon size={14} />
              </button>
            );
          })}
        </div>
      </div>
      {/* Preview area */}
      <div className="flex-1 flex items-center justify-center p-4 overflow-auto border border-border/20 bg-background">
        <div
          className="bg-foreground/[0.01] border border-border rounded-xl overflow-hidden transition-all duration-300 shadow-2xl"
          style={{
            width: device === "desktop" ? "100%" : `${Math.min(width, 800)}px`,
            maxWidth: "100%",
            height: device === "desktop" ? "100%" : `${height}px`,
          }}
        >
          <iframe
            ref={iframeRef}
            title="Ferrum Playground Preview"
            className="w-full h-full border-0"
            sandbox="allow-scripts"
          />
        </div>
      </div>
    </div>
  );
}
