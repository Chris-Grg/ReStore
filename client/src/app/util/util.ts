export function getCookie(key: string) {
    const match = document.cookie.match(`(^|;)\\s*${key}\\s*=\\s*([^;]+)`);
    return match ? match.pop() : "";
  }
  