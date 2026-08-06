"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const PROMPT = "guest@noah:~$";

// Special sentinel a command can return to wipe the screen instead of
// printing output.
const CLEAR_SCREEN = Symbol("clear-screen");
type CommandResult = ReactNode | typeof CLEAR_SCREEN;

const FILES: Record<string, string> = {
  "about.txt":
    "Noah Erickson. Builds this whole site. Should probably be asleep right now.",
  "resume.txt":
    "Full-stack tinkerer. Ask nicely and maybe the real resume page gets finished.",
  "SOUL.md": "# SOUL.md\n\nStill compiling...",
  ".secret": "You found a hidden file. Try `hint` if you want a nudge.",
};

const JOKES = [
  "There are 10 kinds of people: those who understand binary and those who don't.",
  "Why do programmers prefer dark mode? Because light attracts bugs.",
  "A SQL query walks into a bar, walks up to two tables and asks: can I join you?",
  "I would tell you a UDP joke, but you might not get it.",
  "!false — it's funny because it's true.",
];

// Add new commands here as they're built.
async function runCommand(
  raw: string,
  history: string[],
): Promise<CommandResult> {
  const [name, ...args] = raw.trim().split(/\s+/);
  const cmd = name.toLowerCase();

  switch (cmd) {
    case "commands":
    case "help":
      return (
        <>
          <p>help / commands — show this list</p>
          <p>clear — clear the screen</p>
          <p>echo [text] — repeat text back</p>
          <p>date — current date/time</p>
          <p>whoami — who are you, really</p>
          <p>pwd — print working directory</p>
          <p>ls [-a] — list files</p>
          <p>cat [file] — read a file</p>
          <p>history — your past commands</p>
          <p>neofetch — system info, allegedly</p>
          <p>joke — a programming joke</p>
          <p>atlas — the goodest boy</p>
          <p>sudo [cmd] — try it</p>
          <p>ai — talk to the assistant</p>
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

    case "pwd":
      return (
        <p>
          /home/user/desktop/repos/projects/ai/jail-broken-mythos/malware/envkeys/crypto-wallet
        </p>
      );

    case "ls": {
      const showHidden = args.includes("-a");
      const names = Object.keys(FILES).filter(
        (f) => showHidden || !f.startsWith("."),
      );
      return (
        <>
          {names.map((f) => (
            <p key={f}>{f}</p>
          ))}
        </>
      );
    }

    case "cat": {
      const file = args[0];
      if (!file) return <p>usage: cat [file]</p>;
      if (file in FILES) {
        return (
          <>
            {FILES[file].split("\n").map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </>
        );
      }
      return <p>cat: {file}: No such file or directory</p>;
    }

    case "history":
      return history.length ? (
        <>
          {history.map((h, i) => (
            <p key={i}>
              {i + 1} {h}
            </p>
          ))}
        </>
      ) : (
        <p>No history yet.</p>
      );

    case "joke":
      return <p>{JOKES[Math.floor(Math.random() * JOKES.length)]}</p>;

    case "atlas":
      return (
        <>
          <p>Atlas is a very good dog and has never once had an accident.</p>
          <p>(Citation needed — see /dashboardv2 for the actual data.)</p>
        </>
      );

    case "coffee":
      return <p>418 I&apos;m a teapot — but here&apos;s a coffee anyway. ☕</p>;

    case "hint":
    case "unlock":
      return (
        <p>
          Hint: the answer to &ldquo;who goes there?&rdquo; isn&apos;t a command
          — it&apos;s a word only Noah knows.
        </p>
      );

    case "sudo": {
      const rest = args.join(" ").toLowerCase();
      if (!rest) return <p>usage: sudo [command]</p>;
      if (rest === "whoami") return <p>root</p>;
      return <p>Nice try. This incident will be reported.</p>;
    }

    case "rm":
      return args.join(" ").includes("-rf") ? (
        <p>Nice try. Nothing was harmed.</p>
      ) : (
        <p>rm: missing operand</p>
      );

    case "cd":
      return <p>cd: this isn&apos;t a real filesystem, nice try though</p>;

    case "neofetch":
    case "banner":
      return (
        <>
          <p>guest@noah</p>
          <p>----------</p>
          <p>OS: NoahOS (Next.js flavor)</p>
          <p>Shell: noah-sh</p>
          <p>Uptime: however long this tab has been open</p>
          <p>Terminal: you&apos;re looking at it</p>
        </>
      );

    case "matrix": {
      const rows = Array.from({ length: 8 }, () =>
        Array.from({ length: 36 }, () =>
          String.fromCharCode(0x30a0 + Math.floor(Math.random() * 96)),
        ).join(""),
      );
      return (
        <>
          {rows.map((r, i) => (
            <p key={i}>{r}</p>
          ))}
        </>
      );
    }

    case "":
      return <></>;

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
    const output = await runCommand(
      command,
      history.map((h) => h.command),
    );
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
          fontSize: "16px",
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
