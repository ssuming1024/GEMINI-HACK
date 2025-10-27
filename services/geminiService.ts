
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const simulateHacking = async (target: string) => {
    const prompt = `
        Act as an expert cybersecurity AI conducting a penetration test. 
        You are simulating a hack against the target: "${target}".
        Generate a realistic but **completely fictional** stream of text that simulates the hacking process.
        The output should look like it's from a real command-line terminal.
        Do not include any warnings, disclaimers, or explanations that this is a simulation.
        Just output the raw, continuous stream of the fictional hacking sequence.

        Include the following steps in order, with realistic-looking but fake details:
        1.  Start with a confirmation message like "Initiating attack sequence on ${target}...".
        2.  **Reconnaissance:** Perform a fake port scan (e.g., using nmap), discover some open ports (like 22, 80, 443, 3306).
        3.  **Vulnerability Scanning:** Identify a fictional vulnerability on one of the open services (e.g., "Apache Struts RCE CVE-2017-5638" or "Outdated OpenSSH version").
        4.  **Exploitation:** Simulate the exploitation of the vulnerability. Show progress messages.
        5.  **Gaining Access:** Announce successful shell access (e.g., "Shell access granted. User: www-data").
        6.  **Privilege Escalation:** Find a way to escalate privileges to root (e.g., using a kernel exploit or a misconfigured sudo rule). Announce success ("Privilege escalation successful. Current user: root").
        7.  **Post-Exploitation:** Access a sensitive file, like '/etc/shadow' or a database config file. Display a snippet of fake sensitive data.
        8.  **Covering Tracks:** Clear logs or disable monitoring.
        9.  **Conclusion:** End with a clear success message like "[+] SYSTEM COMPROMISED. Mission complete. Disconnecting."
        
        Make the output look authentic. Use technical jargon, fake IP addresses, and command-like outputs.
        There should be slight delays implied between sections.
    `;

    const response = await ai.models.generateContentStream({
        model: "gemini-2.5-flash",
        contents: prompt,
    });

    return response;
};
