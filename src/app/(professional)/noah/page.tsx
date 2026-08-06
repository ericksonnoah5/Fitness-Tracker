"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

let PROMPT = "guest@noah:~$";

// Special sentinel a command can return to wipe the screen instead of
// printing output.
const CLEAR_SCREEN = Symbol("clear-screen");
type CommandResult = ReactNode | typeof CLEAR_SCREEN;

async function runCommand(raw: string): Promise<CommandResult> {
  const [name, ...args] = raw.trim().split(/\s+/);

  // Add new commands here as they're built.
  switch (name.toLowerCase()) {
    case "commands":
    case "help":
      return (
        <>
          <p>help</p>
          <p>clear</p>
          <p>echo [text]</p>
          <p>date</p>
          <p>whoami</p>
          <p>pwd</p>
          <p>ls</p>
          <p>ai</p>
        </>
      );

    case "ai":
      return (
        <>
          <p>--------------------</p>
          <p>Welcome back Noah</p>
          <p>--------------------</p>
          <p>What would you like to make today?</p>
        </>
      );
    case "clear":
      return CLEAR_SCREEN;

    case "echo":
      return <p>{args.join(" ")}</p>;

    case "date":
      return <p>{new Date().toString()}</p>;

    case "whoami":
      return <p>You are you</p>;

    case "cat about.txt":
      return <></>;
    case "pwd":
      return (
        <p>
          /home/user/desktop/repos/projects/ai/jail-broken-mythos/malware/envkeys/crypto-wallet
        </p>
      );

    case "ls":
      return (
        <>
          <p>SOUL.md</p>
        </>
      );

    default: {
      const res = await fetch("/api/verify-passkey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: name }),
      });
      const { valid } = await res.json();
      return valid ? (
        <p>Access granted.</p>
      ) : (
        <h1>incorrect input try commands</h1>
      );
    }
  }
}

type HistoryEntry = {
  command: string;
  output: ReactNode;
};

export default function NoahPage() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const command = input.trim();
    if (!command) return;

    setInput("");
    const output = await runCommand(command);
    if (output === CLEAR_SCREEN) {
      setHistory([]);
    } else {
      setHistory((prev) => [...prev, { command, output }]);
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#0c0c0c",
        color: "#c8ffc8",
        fontFamily:
          'Menlo, Monaco, "SF Mono", Consolas, "Courier New", monospace',
        fontSize: "15px",
        lineHeight: "1.5",
        padding: "16px",
        cursor: "text",
        overflow: "auto",
      }}
    >
      {history.map((entry, i) => (
        <div key={i}>
          <div>
            {PROMPT} {entry.command}
          </div>
          <div>{entry.output}</div>
        </div>
      ))}

      <span>
        {PROMPT} {input}
        <span
          style={{
            display: "inline-block",
            width: "8px",
            marginLeft: "1px",
            animation: "terminal-blink 1s step-end infinite",
          }}
        >
          |
        </span>
      </span>

      <input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        style={{
          position: "absolute",
          opacity: 0,
          pointerEvents: "none",
          width: 0,
          height: 0,
        }}
      />

      <style>{`
        @keyframes terminal-blink {
          0%, 50% { opacity: 1; }
          50.01%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
