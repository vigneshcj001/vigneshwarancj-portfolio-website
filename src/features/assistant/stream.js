import { openAssistantStream, PortfolioApiError } from "../../services/portfolioApi";

export async function consumeAssistantStream(payload, signal, onChunk) {
  const response = await openAssistantStream(payload, signal);
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let completed = false;
  let full = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done && !buffer.trim()) break;
    buffer += done ? "\n" : decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";
    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      let data;
      try { data = JSON.parse(line.slice(6)); } catch { continue; }
      if (data.error) throw new PortfolioApiError(data.error);
      if (data.text) onChunk(data.text);
      if (data.done) {
        completed = true;
        full = data.full || "";
        await reader.cancel();
        break;
      }
    }
    if (done || completed) break;
  }
  if (!completed) throw new PortfolioApiError("The response was interrupted. Please retry your question.");
  return full;
}
